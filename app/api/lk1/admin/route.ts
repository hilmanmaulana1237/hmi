import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { getMysqlPool, isMysqlConfigured } from "@/lib/mysql";

export const dynamic = "force-dynamic";

const ADMIN_PASSWORD = process.env.LK_ADMIN_PASSWORD || "hilmanganteng@123";

function checkAuth(req: Request): boolean {
  const authHeader = req.headers.get("x-admin-key") || req.headers.get("authorization");
  if (!authHeader) return false;
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  return token === ADMIN_PASSWORD;
}

// ─────────────────────────────────────────────────────────────────
// GET: Ambil semua data pendaftar untuk Dashboard Monitor LK-I
// ─────────────────────────────────────────────────────────────────
export async function GET(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "lk1-registrations",
      limit: 1000,
      sort: "-submittedAt",
      overrideAccess: true,
    });

    const registrations = result.docs.map((doc: any) => ({
      id: String(doc.id),
      registration_code: doc.registrationCode || `LK1-${doc.id}`,
      full_name: doc.fullName || "",
      nickname: doc.nickname || "",
      gender: doc.gender || "Laki-laki",
      birth_place: doc.birthPlace || "",
      birth_date: doc.birthDate || "",
      whatsapp: doc.whatsapp || "",
      email: doc.email || "",
      address: doc.address || "",
      university: doc.university || "UIN Sunan Gunung Djati Bandung",
      faculty: doc.faculty || "Fakultas Sains dan Teknologi",
      study_program: doc.studyProgram || "",
      semester: doc.semester || 1,
      nim: doc.nim || "",
      class_name: doc.className || "",
      mentor_id: doc.mentorId || (typeof doc.mentor === "object" ? doc.mentor?.id : doc.mentor) || "",
      mentor_name: doc.mentorName || "",
      mentor_role: doc.mentorRole || "",
      mentor_whatsapp_group: doc.mentorWhatsappGroup || "",
      motivation: doc.motivation || "",
      organization_experience: doc.organizationExperience || "",
      interest_fields: doc.interestFields || [],
      photo_url: doc.photoUrl || "",
      payment_proof_url: doc.paymentProofUrl || "",
      status: doc.status || "Pending",
      payment_status: doc.paymentStatus || "Belum Dicek",
      screening_schedule: doc.screeningSchedule || "",
      screening_result: doc.screeningResult || "",
      screening_score_btq: doc.screeningScoreBtq || "",
      screening_score_hmi: doc.screeningScoreHmi || "",
      screening_score_kebangsaan: doc.screeningScoreKebangsaan || "",
      screening_notes: doc.screeningNotes || "",
      admin_notes: doc.adminNote || "",
      submitted_at: doc.submittedAt || doc.createdAt,
      created_at: doc.createdAt,
    }));

    return NextResponse.json({ ok: true, registrations });
  } catch (error: any) {
    console.warn("Payload find note in /api/lk1/admin, falling back to MySQL if available:", error);

    // Fallback to MySQL if configured
    if (isMysqlConfigured()) {
      try {
        const pool = getMysqlPool();
        const [rows] = await pool.query<any[]>(
          `SELECT * FROM lk1_registrations ORDER BY submitted_at DESC LIMIT 1000`
        );
        return NextResponse.json({ ok: true, registrations: rows });
      } catch (mysqlErr: any) {
        console.error("MySQL query error:", mysqlErr);
      }
    }

    return NextResponse.json(
      { ok: false, error: error.message || "Gagal memuat data pendaftaran" },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────────────────────────────
// PATCH: Update status, nilai screening, atau catatan pendaftar
// ─────────────────────────────────────────────────────────────────
export async function PATCH(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, ids, updates } = body;

    const targetIds: string[] = Array.isArray(ids) ? ids : id ? [String(id)] : [];
    if (targetIds.length === 0 || !updates) {
      return NextResponse.json({ ok: false, error: "Parameter id atau updates tidak valid" }, { status: 400 });
    }

    const payloadUpdates: Record<string, any> = {};
    if (updates.status !== undefined) payloadUpdates.status = updates.status;
    if (updates.payment_status !== undefined) payloadUpdates.paymentStatus = updates.payment_status;
    if (updates.admin_notes !== undefined) payloadUpdates.adminNote = updates.admin_notes;
    if (updates.screening_schedule !== undefined) payloadUpdates.screeningSchedule = updates.screening_schedule;
    if (updates.screening_result !== undefined) payloadUpdates.screeningResult = updates.screening_result;
    if (updates.screening_score_btq !== undefined) payloadUpdates.screeningScoreBtq = updates.screening_score_btq;
    if (updates.screening_score_hmi !== undefined) payloadUpdates.screeningScoreHmi = updates.screening_score_hmi;
    if (updates.screening_score_kebangsaan !== undefined) payloadUpdates.screeningScoreKebangsaan = updates.screening_score_kebangsaan;
    if (updates.screening_notes !== undefined) payloadUpdates.screeningNotes = updates.screening_notes;

    // 1. Update in Payload CMS
    try {
      const payload = await getPayload({ config });
      for (const targetId of targetIds) {
        await payload.update({
          collection: "lk1-registrations",
          id: targetId,
          data: payloadUpdates,
          overrideAccess: true,
        });
      }
    } catch (cmsErr) {
      console.warn("Payload update note in /api/lk1/admin:", cmsErr);
    }

    // 2. Update in MySQL if configured
    if (isMysqlConfigured()) {
      try {
        const pool = getMysqlPool();
        const setClauses: string[] = [];
        const setValues: any[] = [];

        if (updates.status !== undefined) {
          setClauses.push("status = ?");
          setValues.push(updates.status);
        }
        if (updates.payment_status !== undefined) {
          setClauses.push("payment_status = ?");
          setValues.push(updates.payment_status);
        }
        if (updates.admin_notes !== undefined) {
          setClauses.push("admin_note = ?");
          setValues.push(updates.admin_notes);
        }
        if (updates.screening_schedule !== undefined) {
          setClauses.push("screening_schedule = ?");
          setValues.push(updates.screening_schedule);
        }
        if (updates.screening_result !== undefined) {
          setClauses.push("screening_result = ?");
          setValues.push(updates.screening_result);
        }
        if (updates.screening_score_btq !== undefined) {
          setClauses.push("screening_score_btq = ?");
          setValues.push(updates.screening_score_btq);
        }
        if (updates.screening_score_hmi !== undefined) {
          setClauses.push("screening_score_hmi = ?");
          setValues.push(updates.screening_score_hmi);
        }
        if (updates.screening_score_kebangsaan !== undefined) {
          setClauses.push("screening_score_kebangsaan = ?");
          setValues.push(updates.screening_score_kebangsaan);
        }
        if (updates.screening_notes !== undefined) {
          setClauses.push("screening_notes = ?");
          setValues.push(updates.screening_notes);
        }

        if (setClauses.length > 0) {
          const inPlaceholders = targetIds.map(() => "?").join(",");
          const query = `UPDATE lk1_registrations SET ${setClauses.join(", ")} WHERE id IN (${inPlaceholders}) OR registration_code IN (${inPlaceholders})`;
          await pool.query(query, [...setValues, ...targetIds, ...targetIds]);
        }
      } catch (mysqlErr) {
        console.warn("MySQL update note:", mysqlErr);
      }
    }

    return NextResponse.json({ ok: true, updatedCount: targetIds.length });
  } catch (error: any) {
    console.error("Error in PATCH /api/lk1/admin:", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}

// ─────────────────────────────────────────────────────────────────
// DELETE: Hapus satu atau beberapa pendaftar
// ─────────────────────────────────────────────────────────────────
export async function DELETE(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, ids } = body;
    const targetIds: string[] = Array.isArray(ids) ? ids : id ? [String(id)] : [];

    if (targetIds.length === 0) {
      return NextResponse.json({ ok: false, error: "Parameter id atau ids wajib diisi" }, { status: 400 });
    }

    // 1. Delete in Payload CMS
    try {
      const payload = await getPayload({ config });
      for (const targetId of targetIds) {
        await payload.delete({
          collection: "lk1-registrations",
          id: targetId,
          overrideAccess: true,
        });
      }
    } catch (cmsErr) {
      console.warn("Payload delete note:", cmsErr);
    }

    // 2. Delete in MySQL if configured
    if (isMysqlConfigured()) {
      try {
        const pool = getMysqlPool();
        const inPlaceholders = targetIds.map(() => "?").join(",");
        await pool.query(
          `DELETE FROM lk1_registrations WHERE id IN (${inPlaceholders}) OR registration_code IN (${inPlaceholders})`,
          [...targetIds, ...targetIds]
        );
      } catch (mysqlErr) {
        console.warn("MySQL delete note:", mysqlErr);
      }
    }

    return NextResponse.json({ ok: true, deletedCount: targetIds.length });
  } catch (error: any) {
    console.error("Error in DELETE /api/lk1/admin:", error);
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
}

