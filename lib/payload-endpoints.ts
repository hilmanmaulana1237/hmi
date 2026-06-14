import type { Endpoint, PayloadRequest } from "payload";
import {
  advocacyReportSchema,
  lk1RegistrationSchema,
} from "@/lib/validations";

async function readBody(req: PayloadRequest) {
  const contentType = req.headers.get("content-type") ?? "";
  const request = req as Request;

  if (contentType.includes("application/json")) {
    return request.json();
  }

  const formData = await request.formData();
  const body: Record<string, FormDataEntryValue | FormDataEntryValue[]> = {};

  formData.forEach((value, key) => {
    if (value instanceof File && value.size === 0) {
      return;
    }

    const existing = body[key];

    if (Array.isArray(existing)) {
      body[key] = [...existing, value];
      return;
    }

    if (existing) {
      body[key] = [existing, value];
      return;
    }

    body[key] = value;
  });

  return body;
}

function validationError(error: unknown) {
  return Response.json(
    {
      ok: false,
      error,
    },
    { status: 400 },
  );
}

export const payloadEndpoints: Endpoint[] = [
  {
    path: "/lk1",
    method: "post",
    handler: async (req) => {
      const body = await readBody(req);
      const parsed = lk1RegistrationSchema.safeParse(body);

      if (!parsed.success) {
        return validationError(parsed.error.flatten());
      }

      const registration = await req.payload.create({
        collection: "lk1-registrations",
        data: parsed.data,
      });

      return Response.json({
        ok: true,
        registrationCode: registration.registrationCode,
        status: registration.status,
      });
    },
  },
  {
    path: "/lk1/status",
    method: "get",
    handler: async (req) => {
      const url = new URL((req as Request).url);
      const query = url.searchParams.get("q")?.trim();

      if (!query) {
        return validationError({
          q: ["Kode pendaftaran atau email wajib diisi."],
        });
      }

      const result = await req.payload.find({
        collection: "lk1-registrations",
        limit: 1,
        where: {
          or: [
            { registrationCode: { equals: query } },
            { email: { equals: query } },
          ],
        },
      });

      const registration = result.docs[0];

      if (!registration) {
        return Response.json(
          {
            ok: false,
            error: "Data pendaftaran tidak ditemukan.",
          },
          { status: 404 },
        );
      }

      return Response.json({
        ok: true,
        registration: {
          registrationCode: registration.registrationCode,
          fullName: registration.fullName,
          studyProgram: registration.studyProgram,
          status: registration.status,
          adminNote: registration.adminNote,
        },
      });
    },
  },
  {
    path: "/advocacy",
    method: "post",
    handler: async (req) => {
      const body = await readBody(req);
      const parsed = advocacyReportSchema.safeParse({
        ...body,
        isConfidential:
          body.isConfidential === "on" || body.isConfidential === true,
      });

      if (!parsed.success) {
        return validationError(parsed.error.flatten());
      }

      const report = await req.payload.create({
        collection: "advocacy-reports",
        data: parsed.data,
      });

      return Response.json({
        ok: true,
        id: report.id,
        status: report.status,
      });
    },
  },
  {
    path: "/search",
    method: "get",
    handler: async (req) => {
      const url = new URL((req as Request).url);
      const q = url.searchParams.get("q")?.trim();

      if (!q) {
        return Response.json({ ok: true, results: [] });
      }

      const [news, events, opinions, documents] = await Promise.all([
        req.payload.find({
          collection: "news",
          limit: 5,
          where: { title: { like: q } },
        }),
        req.payload.find({
          collection: "events",
          limit: 5,
          where: { title: { like: q } },
        }),
        req.payload.find({
          collection: "opinions",
          limit: 5,
          where: { title: { like: q } },
        }),
        req.payload.find({
          collection: "documents",
          limit: 5,
          where: { title: { like: q } },
        }),
      ]);

      return Response.json({
        ok: true,
        results: {
          news: news.docs,
          events: events.docs,
          opinions: opinions.docs,
          documents: documents.docs,
        },
      });
    },
  },
  {
    path: "/export/lk1",
    method: "get",
    handler: async (req) => {
      const data = await req.payload.find({
        collection: "lk1-registrations",
        limit: 0,
      });

      const headers = [
        "registrationCode", "fullName", "nickname", "gender", "whatsapp",
        "email", "university", "faculty", "studyProgram", "semester",
        "nim", "status", "paymentStatus", "submittedAt"
      ];

      const escape = (val: any) => `"${String(val ?? "").replace(/"/g, '""')}"`;
      const rows = data.docs.map((doc: any) =>
        headers.map(h => escape(doc[h])).join(",")
      );
      
      const csv = [headers.join(","), ...rows].join("\n");

      return new Response(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": 'attachment; filename="lk1-registrations.csv"',
        },
      });
    },
  },
  {
    path: "/export/cadres",
    method: "get",
    handler: async (req) => {
      const url = new URL((req as Request).url);
      const isTemplate = url.searchParams.get("template") === "true";

      const headers = [
        "fullName", "nickname", "gender", "university", "faculty",
        "studyProgram", "nim", "batchYear", "cadreStatus", "phonePrivate",
        "emailPrivate", "isPublic"
      ];

      let csv = headers.join(",") + "\n";

      if (isTemplate) {
        csv += `"Contoh Nama","Contoh Panggilan","Laki-laki","UIN Sunan Gunung Djati Bandung","Sains dan Teknologi","Teknik Informatika","123456789","2026","Anggota Muda","08123456789","email@contoh.com","true"\n`;
      } else {
        const data = await req.payload.find({
          collection: "cadres",
          limit: 0,
        });

        const escape = (val: any) => `"${String(val ?? "").replace(/"/g, '""')}"`;
        const rows = data.docs.map((doc: any) =>
          headers.map(h => escape(doc[h])).join(",")
        );
        csv += rows.join("\n");
      }

      return new Response(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="${isTemplate ? "template-cadres" : "cadres"}.csv"`,
        },
      });
    },
  },
  {
    path: "/import/cadres",
    method: "post",
    handler: async (req) => {
      try {
        const request = req as Request;
        const formData = await request.formData();
        const file = formData.get("file") as File;
        
        if (!file) return validationError("No file provided");

        const text = await file.text();
        const lines = text.trim().split("\n");
        if (lines.length < 2) return validationError("File is empty or missing data");

        const headers = lines[0].split(",").map(h => h.replace(/^"|"$/g, "").trim());
        const regex = /,(?=(?:(?:[^"]*"){2})*[^"]*$)/;

        let count = 0;
        for (let i = 1; i < lines.length; i++) {
          const vals = lines[i].split(regex).map(val => val.replace(/^"|"$/g, "").replace(/""/g, '"').trim());
          const obj: any = {};
          headers.forEach((h, index) => {
            obj[h] = vals[index];
          });

          // Basic validation and mapping
          if (!obj.fullName || !obj.studyProgram || !obj.batchYear || !obj.cadreStatus) continue;

          await req.payload.create({
            collection: "cadres",
            data: {
              fullName: obj.fullName,
              nickname: obj.nickname,
              gender: obj.gender,
              university: obj.university,
              faculty: obj.faculty,
              studyProgram: obj.studyProgram,
              nim: obj.nim,
              batchYear: parseInt(obj.batchYear, 10),
              cadreStatus: obj.cadreStatus,
              phonePrivate: obj.phonePrivate,
              emailPrivate: obj.emailPrivate,
              isPublic: obj.isPublic === "true",
            },
          });
          count++;
        }

        return Response.json({ ok: true, count });
      } catch (error: any) {
        return validationError(error.message);
      }
    },
  },
];
