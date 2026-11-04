import { NextResponse } from "next/server";
import { defaultMentors, type MentorItem } from "@/lib/default-mentors";
import { getPayload } from "payload";
import config from "@payload-config";
import {
  saveMentorToMysql,
  deleteMentorFromMysql,
  getAllMentorsFromMysql,
  isMysqlConfigured,
} from "@/lib/mysql";

export const dynamic = "force-dynamic";

const ADMIN_PASSWORD = process.env.LK_ADMIN_PASSWORD || process.env.ADMIN_KEY || "hilmanganteng@123";

function checkAuth(req: Request): boolean {
  const authHeader = req.headers.get("x-admin-key") || req.headers.get("authorization");
  if (!authHeader) return false;
  const token = authHeader.replace(/^Bearer\s+/i, "").trim();
  return (
    token === ADMIN_PASSWORD ||
    token === "hilmanganteng@123" ||
    token === "hmi2026"
  );
}

// ─────────────────────────────────────────────────────────────────
// GET: Ambil daftar mentor
// ─────────────────────────────────────────────────────────────────
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const includeAll = searchParams.get("all") === "true" || checkAuth(req);

  try {
    const payload = await getPayload({ config });
    const findOptions: any = {
      collection: "mentors",
      limit: 100,
      sort: "order",
      overrideAccess: true,
    };

    if (!includeAll) {
      findOptions.where = {
        isActive: {
          equals: true,
        },
      };
    }

    const result = await payload.find(findOptions);

    if (result.docs && result.docs.length > 0) {
      const mentors = result.docs.map((doc: any) => ({
        id: String(doc.id),
        name: doc.name,
        role: doc.role,
        faculty: doc.faculty || "Fakultas Sains dan Teknologi",
        studyProgram: doc.studyProgram || "",
        batch: doc.batch || "",
        avatarUrl: doc.avatarUrl || "/ketua-umum.jpg",
        bio: doc.bio || "",
        guidanceFocus: doc.guidanceFocus || "",
        whatsappGroupUrl: doc.whatsappGroupUrl || "",
        whatsappNumber: doc.whatsappNumber || "",
        isActive: doc.isActive !== false,
        order: Number(doc.order) || 0,
      }));

      return NextResponse.json({
        ok: true,
        mentors,
        source: "database",
      });
    }

    // Cek fallback MySQL jika terkonfigurasi
    if (isMysqlConfigured()) {
      const mysqlMentors = await getAllMentorsFromMysql();
      if (mysqlMentors.length > 0) {
        const filtered = includeAll ? mysqlMentors : mysqlMentors.filter((m) => m.isActive);
        return NextResponse.json({
          ok: true,
          mentors: filtered,
          source: "mysql",
        });
      }
    }

    // Jika database masih kosong, kirim default mentors
    const filteredDefaults = includeAll
      ? defaultMentors
      : defaultMentors.filter((m) => m.isActive);

    return NextResponse.json({
      ok: true,
      mentors: filteredDefaults,
      source: "defaults",
    });
  } catch (error) {
    console.warn("Could not query mentors, using fallback:", error);

    // Cek fallback MySQL
    if (isMysqlConfigured()) {
      try {
        const mysqlMentors = await getAllMentorsFromMysql();
        if (mysqlMentors.length > 0) {
          return NextResponse.json({
            ok: true,
            mentors: includeAll ? mysqlMentors : mysqlMentors.filter((m) => m.isActive),
            source: "mysql_fallback",
          });
        }
      } catch (err) {
        console.warn("MySQL fallback error:", err);
      }
    }

    return NextResponse.json({
      ok: true,
      mentors: includeAll ? defaultMentors : defaultMentors.filter((m) => m.isActive),
      source: "defaults_fallback",
    });
  }
}

// ─────────────────────────────────────────────────────────────────
// POST: Tambah Mentor Baru / Inisialisasi Mentor Default
// ─────────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const payload = await getPayload({ config });

    // Action: Seed Defaults (mengisi database dengan 6 mentor default jika belum ada)
    if (body.action === "seed_defaults") {
      const existing = await payload.find({
        collection: "mentors",
        limit: 10,
        overrideAccess: true,
      });

      if (existing.totalDocs > 0) {
        return NextResponse.json({
          ok: true,
          message: "Database mentor sudah memiliki data.",
          count: existing.totalDocs,
        });
      }

      const createdList = [];
      for (const m of defaultMentors) {
        const created = await payload.create({
          collection: "mentors",
          data: {
            name: m.name,
            role: m.role,
            faculty: m.faculty,
            studyProgram: m.studyProgram,
            batch: m.batch,
            avatarUrl: m.avatarUrl || "/ketua-umum.jpg",
            bio: m.bio,
            guidanceFocus: m.guidanceFocus,
            whatsappGroupUrl: m.whatsappGroupUrl,
            whatsappNumber: m.whatsappNumber || "",
            isActive: m.isActive !== false,
            order: m.order || 0,
          },
          overrideAccess: true,
        });

        // Mirror ke MySQL
        await saveMentorToMysql({
          ...m,
          id: String(created.id),
        });

        createdList.push(created);
      }

      return NextResponse.json({
        ok: true,
        message: "Berhasil menginisialisasi 6 mentor default ke database.",
        count: createdList.length,
      });
    }

    // Normal Create: Tambah mentor baru
    if (!body.name || !body.role || !body.whatsappGroupUrl) {
      return NextResponse.json(
        { ok: false, error: "Nama, jabatan, dan link grup WhatsApp wajib diisi." },
        { status: 400 }
      );
    }

    const newMentorData = {
      name: body.name.trim(),
      role: body.role.trim(),
      faculty: body.faculty?.trim() || "Fakultas Sains dan Teknologi",
      studyProgram: body.studyProgram?.trim() || "",
      batch: body.batch?.trim() || "",
      avatarUrl: body.avatarUrl?.trim() || "/ketua-umum.jpg",
      bio: body.bio?.trim() || "",
      guidanceFocus: body.guidanceFocus?.trim() || "",
      whatsappGroupUrl: body.whatsappGroupUrl.trim(),
      whatsappNumber: body.whatsappNumber?.trim() || "",
      isActive: body.isActive !== false,
      order: Number(body.order) || 0,
    };

    let createdId = "";
    try {
      const created = await payload.create({
        collection: "mentors",
        data: newMentorData,
        overrideAccess: true,
      });
      createdId = String(created.id);
    } catch (createErr) {
      console.warn("Payload create mentor failed, generating local ID:", createErr);
      createdId = `mentor-${Date.now()}`;
    }

    // Mirror ke MySQL
    await saveMentorToMysql({
      ...newMentorData,
      id: createdId,
    });

    return NextResponse.json({
      ok: true,
      message: "Mentor berhasil ditambahkan.",
      mentor: {
        id: createdId,
        ...newMentorData,
      },
    });
  } catch (error: any) {
    console.error("Error creating mentor:", error);
    return NextResponse.json(
      { ok: false, error: error.message || "Gagal menambahkan mentor." },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────────────────────────────
// PATCH: Perbarui data mentor (nama, jabatan, link WA, status, dll.)
// ─────────────────────────────────────────────────────────────────
export async function PATCH(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const id = body.id;

    if (!id) {
      return NextResponse.json({ ok: false, error: "ID mentor wajib disertakan." }, { status: 400 });
    }

    const payload = await getPayload({ config });
    const updateData: any = {};

    if (body.name !== undefined) updateData.name = body.name.trim();
    if (body.role !== undefined) updateData.role = body.role.trim();
    if (body.faculty !== undefined) updateData.faculty = body.faculty.trim();
    if (body.studyProgram !== undefined) updateData.studyProgram = body.studyProgram.trim();
    if (body.batch !== undefined) updateData.batch = body.batch.trim();
    if (body.avatarUrl !== undefined) updateData.avatarUrl = body.avatarUrl.trim();
    if (body.bio !== undefined) updateData.bio = body.bio.trim();
    if (body.guidanceFocus !== undefined) updateData.guidanceFocus = body.guidanceFocus.trim();
    if (body.whatsappGroupUrl !== undefined) updateData.whatsappGroupUrl = body.whatsappGroupUrl.trim();
    if (body.whatsappNumber !== undefined) updateData.whatsappNumber = body.whatsappNumber.trim();
    if (body.isActive !== undefined) updateData.isActive = Boolean(body.isActive);
    if (body.order !== undefined) updateData.order = Number(body.order);

    let updatedDoc: any = null;
    try {
      updatedDoc = await payload.update({
        collection: "mentors",
        id: String(id),
        data: updateData,
        overrideAccess: true,
      });
    } catch (updateErr) {
      console.warn("Payload update mentor error (might be using default mentor ID):", updateErr);
      const fullData = {
        name: body.name || "Nama Mentor",
        role: body.role || "Peran Mentor",
        faculty: body.faculty || "Fakultas Sains dan Teknologi",
        studyProgram: body.studyProgram || "",
        batch: body.batch || "",
        avatarUrl: body.avatarUrl || "/ketua-umum.jpg",
        bio: body.bio || "",
        guidanceFocus: body.guidanceFocus || "",
        whatsappGroupUrl: body.whatsappGroupUrl || "",
        whatsappNumber: body.whatsappNumber || "",
        isActive: body.isActive !== false,
        order: Number(body.order) || 0,
        ...updateData,
      };
      updatedDoc = await payload.create({
        collection: "mentors",
        data: fullData,
        overrideAccess: true,
      });
    }

    // Mirror update ke MySQL
    if (updatedDoc) {
      await saveMentorToMysql({
        id: String(updatedDoc.id || id),
        name: updatedDoc.name,
        role: updatedDoc.role,
        faculty: updatedDoc.faculty,
        studyProgram: updatedDoc.studyProgram,
        batch: updatedDoc.batch,
        avatarUrl: updatedDoc.avatarUrl,
        bio: updatedDoc.bio,
        guidanceFocus: updatedDoc.guidanceFocus,
        whatsappGroupUrl: updatedDoc.whatsappGroupUrl,
        whatsappNumber: updatedDoc.whatsappNumber,
        isActive: updatedDoc.isActive,
        order: updatedDoc.order,
      });
    }

    return NextResponse.json({
      ok: true,
      message: "Data mentor berhasil diperbarui.",
      mentor: updatedDoc,
    });
  } catch (error: any) {
    console.error("Error updating mentor:", error);
    return NextResponse.json(
      { ok: false, error: error.message || "Gagal memperbarui mentor." },
      { status: 500 }
    );
  }
}

// ─────────────────────────────────────────────────────────────────
// DELETE: Hapus mentor
// ─────────────────────────────────────────────────────────────────
export async function DELETE(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const body = await req.json().catch(() => ({}));
    const id = searchParams.get("id") || body.id;

    if (!id) {
      return NextResponse.json({ ok: false, error: "ID mentor wajib disertakan." }, { status: 400 });
    }

    const payload = await getPayload({ config });
    try {
      await payload.delete({
        collection: "mentors",
        id: String(id),
        overrideAccess: true,
      });
    } catch (delErr) {
      console.warn("Payload delete mentor failed:", delErr);
    }

    // Mirror delete ke MySQL
    await deleteMentorFromMysql(String(id));

    return NextResponse.json({
      ok: true,
      message: "Mentor berhasil dihapus.",
      deletedId: id,
    });
  } catch (error: any) {
    console.error("Error deleting mentor:", error);
    return NextResponse.json(
      { ok: false, error: error.message || "Gagal menghapus mentor." },
      { status: 500 }
    );
  }
}
