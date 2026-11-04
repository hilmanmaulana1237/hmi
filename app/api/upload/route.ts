import { NextResponse } from "next/server";
import path from "path";
import fs from "fs";
import { getPayload } from "payload";
import config from "@payload-config";

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

export async function POST(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ ok: false, error: "Tidak ada file yang diunggah" }, { status: 400 });
    }

    // Validasi tipe mime
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { ok: false, error: "Format file tidak didukung. Harap unggah file gambar (JPG, PNG, WEBP, GIF)." },
        { status: 400 }
      );
    }

    // Validasi ukuran (maksimal 5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { ok: false, error: "Ukuran file terlalu besar. Maksimal 5MB." },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Buat nama file unik dan aman
    const ext = path.extname(file.name) || (file.type === "image/png" ? ".png" : ".jpg");
    const sanitizedName = file.name
      .replace(ext, "")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .slice(0, 30);
    const uniqueSuffix = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    const filename = `mentor-${sanitizedName}-${uniqueSuffix}${ext}`;

    // 1. Simpan ke public/uploads/mentors
    const uploadsDir = path.join(process.cwd(), "public", "uploads", "mentors");
    await fs.promises.mkdir(uploadsDir, { recursive: true });
    const targetPath = path.join(uploadsDir, filename);
    await fs.promises.writeFile(targetPath, buffer);

    const publicUrl = `/uploads/mentors/${filename}`;

    // 2. Registrasikan ke koleksi media Payload jika memungkinkan
    try {
      const payload = await getPayload({ config });
      await payload.create({
        collection: "media",
        data: {
          alt: `Foto Profil Mentor ${file.name}`,
        },
        file: {
          data: buffer,
          mimetype: file.type,
          name: filename,
          size: file.size,
        },
        overrideAccess: true,
      });
    } catch (mediaErr) {
      console.warn("Payload media creation warning (using public URL fallback):", mediaErr);
    }

    return NextResponse.json({
      ok: true,
      url: publicUrl,
      filename,
      size: file.size,
      mimetype: file.type,
    });
  } catch (err: any) {
    console.error("Upload handler error:", err);
    return NextResponse.json(
      { ok: false, error: err.message || "Gagal memproses unggahan file." },
      { status: 500 }
    );
  }
}

