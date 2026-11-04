import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { getMysqlPool, isMysqlConfigured } from "@/lib/mysql";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const query = url.searchParams.get("q")?.trim();

    if (!query) {
      return NextResponse.json(
        { ok: false, error: "Kode pendaftaran, NIM, atau email wajib diisi." },
        { status: 400 }
      );
    }

    // 1. First attempt to query Payload CMS
    try {
      const payload = await getPayload({ config });
      const result = await payload.find({
        collection: "lk1-registrations",
        limit: 1,
        where: {
          or: [
            { registrationCode: { equals: query } },
            { email: { equals: query } },
            { nim: { equals: query } },
          ],
        },
      });

      if (result.docs && result.docs.length > 0) {
        const reg = result.docs[0];
        return NextResponse.json({
          ok: true,
          registration: {
            registrationCode: reg.registrationCode,
            fullName: reg.fullName,
            nickname: reg.nickname,
            gender: reg.gender,
            university: reg.university,
            faculty: reg.faculty,
            studyProgram: reg.studyProgram,
            semester: reg.semester,
            nim: reg.nim,
            whatsapp: reg.whatsapp,
            email: reg.email,
            status: reg.status,
            paymentStatus: reg.paymentStatus,
            mentorName: reg.mentorName,
            mentorRole: reg.mentorRole,
            mentorWhatsappGroup: reg.mentorWhatsappGroup,
            screeningSchedule: reg.screeningSchedule,
            screeningResult: reg.screeningResult,
            screeningScoreBtq: reg.screeningScoreBtq,
            screeningScoreHmi: reg.screeningScoreHmi,
            screeningScoreKebangsaan: reg.screeningScoreKebangsaan,
            screeningNotes: reg.screeningNotes,
            adminNote: reg.adminNote,
            submittedAt: reg.submittedAt,
          },
        });
      }
    } catch (cmsError) {
      console.warn("CMS status query note:", cmsError);
    }

    // 2. Fallback to MySQL if configured
    if (isMysqlConfigured()) {
      try {
        const mysql = getMysqlPool();
        const [rows] = await mysql.query<any[]>(
          `SELECT * FROM lk1_registrations WHERE registration_code = ? OR email = ? OR nim = ? LIMIT 1`,
          [query, query, query]
        );

        if (rows && rows.length > 0) {
          const row = rows[0];
          return NextResponse.json({
            ok: true,
            registration: {
              registrationCode: row.registration_code,
              fullName: row.full_name,
              nickname: row.nickname,
              gender: row.gender,
              university: row.university,
              faculty: row.faculty,
              studyProgram: row.study_program,
              semester: row.semester,
              nim: row.nim,
              whatsapp: row.whatsapp,
              email: row.email,
              status: row.status,
              paymentStatus: row.payment_status,
              mentorName: row.mentor_name,
              mentorRole: row.mentor_role,
              mentorWhatsappGroup: row.mentor_whatsapp_group,
              screeningSchedule: row.screening_schedule,
              screeningResult: row.screening_result,
              screeningScoreBtq: row.screening_score_btq,
              screeningScoreHmi: row.screening_score_hmi,
              screeningScoreKebangsaan: row.screening_score_kebangsaan,
              screeningNotes: row.screening_notes,
              adminNote: row.admin_note,
              submittedAt: row.submitted_at,
            },
          });
        }
      } catch (mysqlErr) {
        console.warn("MySQL status fallback note:", mysqlErr);
      }
    }

    return NextResponse.json(
      { ok: false, error: "Data pendaftaran tidak ditemukan. Pastikan kode atau email sudah benar." },
      { status: 404 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: err.message || "Gagal memproses pengecekan status." },
      { status: 500 }
    );
  }
}

