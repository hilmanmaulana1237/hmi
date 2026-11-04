import { NextResponse } from "next/server";
import { lk1RegistrationSchema } from "@/lib/validations";
import { getPayload } from "payload";
import config from "@payload-config";
import { saveRegistrationToMysql } from "@/lib/mysql";

export const dynamic = "force-dynamic";

function generateRegistrationCode(): string {
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  const year = new Date().getFullYear();
  return `LK1-${year}-${random}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = lk1RegistrationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const regCode = generateRegistrationCode();

    const dataToSave = {
      ...parsed.data,
      registrationCode: regCode,
      status: "Pending" as const,
      paymentStatus: (parsed.data.paymentProofUrl
        ? "Menunggu Verifikasi"
        : "Belum Dicek") as any,
    };

    let payloadSaved = false;

    // 1. Save to Payload CMS Collection
    try {
      const payload = await getPayload({ config });
      await payload.create({
        collection: "lk1-registrations",
        data: dataToSave,
      });
      payloadSaved = true;
    } catch (payloadError) {
      console.warn("Payload CMS insert note:", payloadError);
    }

    // 2. Mirror to MySQL if MySQL is configured
    try {
      await saveRegistrationToMysql(dataToSave);
    } catch (mysqlError) {
      console.warn("MySQL sync note:", mysqlError);
    }

    return NextResponse.json({
      ok: true,
      registrationCode: regCode,
      status: "Pending",
      mentorName: parsed.data.mentorName,
      mentorRole: parsed.data.mentorRole,
      mentorWhatsappGroup: parsed.data.mentorWhatsappGroup,
    });
  } catch (error: any) {
    console.error("Error in /api/lk1:", error);
    return NextResponse.json(
      {
        ok: false,
        error: error.message || "Terjadi kesalahan saat memproses pendaftaran.",
      },
      { status: 500 }
    );
  }
}

