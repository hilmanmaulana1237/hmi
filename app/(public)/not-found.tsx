import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto grid min-h-[60vh] max-w-3xl place-items-center px-4 py-20 text-center sm:px-6 lg:px-8">
      <div>
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#006B3F]">
          404
        </p>
        <h1 className="mt-4 text-4xl font-black text-[#10231C]">
          Halaman tidak ditemukan
        </h1>
        <p className="mt-4 text-[#4B6259]">
          Konten yang dicari belum tersedia atau alamatnya berubah.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[#006B3F] px-6 py-3 text-sm font-bold text-white"
        >
          Kembali ke beranda
        </Link>
      </div>
    </main>
  );
}
