"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Download, ShieldCheck } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import type { CadreItem } from "@/lib/site-data";

type CadreTableProps = {
  cadres: CadreItem[];
};

const pageSize = 8;

export function CadreTable({ cadres }: CadreTableProps) {
  const [query, setQuery] = useState("");
  const [program, setProgram] = useState("Semua");
  const [status, setStatus] = useState("Semua");
  const [page, setPage] = useState(1);

  const programs = useMemo(
    () => ["Semua", ...Array.from(new Set(cadres.map((cadre) => cadre.studyProgram)))],
    [cadres],
  );

  const statuses = useMemo(
    () => ["Semua", ...Array.from(new Set(cadres.map((cadre) => cadre.cadreStatus)))],
    [cadres],
  );

  const filtered = useMemo(() => {
    const search = query.toLowerCase().trim();

    return cadres.filter((cadre) => {
      const matchesSearch =
        !search ||
        cadre.fullName.toLowerCase().includes(search) ||
        cadre.studyProgram.toLowerCase().includes(search);
      const matchesProgram =
        program === "Semua" || cadre.studyProgram === program;
      const matchesStatus = status === "Semua" || cadre.cadreStatus === status;

      return matchesSearch && matchesProgram && matchesStatus;
    });
  }, [cadres, program, query, status]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount);
  const shown = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  function resetAndSet(callback: () => void) {
    callback();
    setPage(1);
  }

  return (
    <div className="rounded-[1.5rem] border border-[#DCE8E2] bg-white p-4 shadow-[0_18px_60px_rgba(0,61,43,0.08)] sm:p-6">
      <div className="grid gap-3 lg:grid-cols-[1.3fr_0.85fr_0.85fr_auto]">
        <label className="grid gap-2 text-sm font-bold text-[#10231C]">
          Cari kader
          <input
            value={query}
            onChange={(event) =>
              resetAndSet(() => setQuery(event.target.value))
            }
            className="rounded-2xl border border-[#DCE8E2] px-4 py-3 outline-none focus:border-[#006B3F]"
            placeholder="Nama atau prodi"
          />
        </label>
        <label className="grid gap-2 text-sm font-bold text-[#10231C]">
          Program studi
          <select
            value={program}
            onChange={(event) =>
              resetAndSet(() => setProgram(event.target.value))
            }
            className="rounded-2xl border border-[#DCE8E2] bg-white px-4 py-3 outline-none focus:border-[#006B3F]"
          >
            {programs.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-bold text-[#10231C]">
          Status
          <select
            value={status}
            onChange={(event) =>
              resetAndSet(() => setStatus(event.target.value))
            }
            className="rounded-2xl border border-[#DCE8E2] bg-white px-4 py-3 outline-none focus:border-[#006B3F]"
          >
            {statuses.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <div className="flex items-end">
          <button
            type="button"
            disabled
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-3 text-sm font-black text-slate-400 disabled:cursor-not-allowed"
            title="Export hanya tersedia untuk admin CMS"
          >
            <Download className="h-4 w-4" />
            Export admin
          </button>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border border-[#DCE8E2] bg-[#F6F8F7] p-4 text-sm leading-6 text-[#4B6259]">
        <ShieldCheck className="mr-2 inline h-4 w-4 text-[#006B3F]" />
        Data publik hanya menampilkan nama, prodi, status kader, dan angkatan.
        NIM, nomor HP, email, alamat, dan catatan privat tidak ditampilkan.
      </div>

      {shown.length ? (
        <>
          <div className="mt-6 overflow-hidden rounded-2xl border border-[#DCE8E2]">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#DCE8E2] text-left text-sm">
                <thead className="bg-[#003324] text-white">
                  <tr>
                    <th className="px-5 py-4 font-black">Nama</th>
                    <th className="px-5 py-4 font-black">Program Studi</th>
                    <th className="px-5 py-4 font-black">Status</th>
                    <th className="px-5 py-4 font-black">Angkatan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCE8E2] bg-white">
                  {shown.map((cadre) => (
                    <tr key={`${cadre.fullName}-${cadre.batchYear}`}>
                      <td className="px-5 py-4 font-bold text-[#10231C]">
                        {cadre.fullName}
                      </td>
                      <td className="px-5 py-4 text-[#4B6259]">
                        {cadre.studyProgram}
                      </td>
                      <td className="px-5 py-4">
                        <span className="rounded-full bg-[#E8F7EF] px-3 py-1 text-xs font-black text-[#006B3F]">
                          {cadre.cadreStatus}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-[#4B6259]">
                        {cadre.batchYear}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-6 flex flex-col items-center justify-between gap-3 text-sm text-[#4B6259] sm:flex-row">
            <p>
              Menampilkan {shown.length} dari {filtered.length} kader publik
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setPage((value) => Math.max(1, value - 1))}
                disabled={safePage === 1}
                className="grid h-10 w-10 place-items-center rounded-full border border-[#DCE8E2] disabled:opacity-40"
                aria-label="Halaman sebelumnya"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="font-black text-[#003324]">
                {safePage} / {pageCount}
              </span>
              <button
                type="button"
                onClick={() =>
                  setPage((value) => Math.min(pageCount, value + 1))
                }
                disabled={safePage === pageCount}
                className="grid h-10 w-10 place-items-center rounded-full border border-[#DCE8E2] disabled:opacity-40"
                aria-label="Halaman berikutnya"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="mt-6">
          <EmptyState
            title="Data kader tidak ditemukan"
            description="Coba ubah kata kunci, program studi, atau status kader yang dipilih."
          />
        </div>
      )}
    </div>
  );
}
