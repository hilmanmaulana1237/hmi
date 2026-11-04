"use client";

import React from "react";
import { X, Printer, ShieldCheck, CheckCircle2, QrCode, Users } from "lucide-react";
import type { LK1FormData, StoredLK1Registration } from "./types";

interface ParticipantCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: LK1FormData | StoredLK1Registration;
  registrationCode: string;
}

export const ParticipantCardModal: React.FC<ParticipantCardModalProps> = ({
  isOpen,
  onClose,
  data,
  registrationCode,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const fullName = data.fullName;
  const nim = data.nim;
  const studyProgram = data.studyProgram;
  const faculty = data.faculty || "Fakultas Sains dan Teknologi";
  const university = data.university || "UIN Sunan Gunung Djati Bandung";
  const semester = data.semester || "1";
  const whatsapp = data.whatsapp;
  const email = data.email;
  const gender = data.gender;
  const mentorName = data.mentorName || "Panitia Kaderisasi LK-I";
  const mentorRole = data.mentorRole || "Mentor Bimbingan";

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 p-0 sm:p-4 backdrop-blur-sm animate-fade-in print:p-0 print:bg-white">
      <div
        className="relative w-full max-w-3xl max-h-[92vh] sm:max-h-[94vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-[#BCD7CA] bg-white p-3.5 sm:p-6 shadow-2xl print:max-w-none print:shadow-none print:border-none print:p-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Actions (Hidden on Print) */}
        <div className="flex items-center justify-between border-b border-[#DCE8E2] pb-3 print:hidden gap-2">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm font-black text-[#006144] truncate">
            <ShieldCheck className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />
            <span className="truncate">Kartu Peserta LK-I</span>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1 rounded-full bg-[#006144] px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-bold text-white shadow-md hover:bg-[#003324] active:scale-95 transition-all"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Cetak / PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-[#F6F8F7] text-gray-400 hover:bg-[#EAF2EE] hover:text-[#006144]"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Printable Official Document */}
        <div
          id="printable-document"
          className="mt-3 rounded-2xl border-2 border-[#006144] bg-white p-5 sm:p-6 text-[#10231C]"
        >
          {/* Letterhead Kop Surat */}
          <div className="flex items-center justify-between border-b-2 border-[#006144] pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#BCD7CA] bg-white p-1">
                <img
                  src="/logo.png"
                  alt="Logo HMI"
                  className="h-10 w-10 object-contain"
                  onError={(e) => {
                    (e.currentTarget as HTMLElement).style.display = "none";
                  }}
                />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#006144]">
                  Himpunan Mahasiswa Islam (HMI)
                </p>
                <h2 className="text-sm sm:text-base font-black tracking-tight text-[#10231C]">
                  KOMISARIAT SAINS DAN TEKNOLOGI
                </h2>
                <p className="text-[10px] text-[#4B6259]">
                  Cabang Kabupaten Bandung • UIN Sunan Gunung Djati Bandung
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block rounded-md bg-[#006144] px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white">
                KARTU PESERTA LK-I
              </span>
              <p className="mt-1 font-mono text-xs font-black text-[#006144]">
                {registrationCode}
              </p>
            </div>
          </div>

          {/* Card Body */}
          <div className="mt-5 grid gap-4 sm:grid-cols-4">
            {/* Photo / QR Column */}
            <div className="sm:col-span-1 flex flex-col items-center justify-between rounded-xl border border-[#DCE8E2] bg-[#F9FBFA] p-3 text-center">
              <div className="flex h-28 w-24 items-center justify-center rounded-lg border-2 border-dashed border-[#006144] bg-[#EAF2EE] text-[11px] font-bold text-[#006144]">
                Pas Foto Formal 3x4
              </div>

              <div className="mt-3 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-white border border-[#DCE8E2] text-[#006144]">
                  <QrCode className="h-10 w-10" />
                </div>
                <span className="mt-1 block font-mono text-[9px] text-[#4B6259]">
                  VERIFIED CODE
                </span>
              </div>
            </div>

            {/* Information Column */}
            <div className="sm:col-span-3 space-y-3">
              <div className="border-b border-[#EAF2EE] pb-2">
                <span className="text-[10px] font-semibold text-[#4B6259]">Nama Lengkap:</span>
                <h3 className="text-base font-black text-[#10231C]">{fullName}</h3>
                <span className="text-xs text-[#006144] font-bold">
                  NIM: {nim} • {gender || "Mahasiswa"}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-[#4B6259] block">Program Studi:</span>
                  <span className="font-bold text-[#10231C]">{studyProgram}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#4B6259] block">Fakultas:</span>
                  <span className="font-bold text-[#10231C]">{faculty}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#4B6259] block">Universitas:</span>
                  <span className="font-bold text-[#10231C]">{university}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#4B6259] block">Semester:</span>
                  <span className="font-bold text-[#10231C]">Semester {semester}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#4B6259] block">WhatsApp:</span>
                  <span className="font-mono font-bold text-[#10231C]">{whatsapp}</span>
                </div>
                <div>
                  <span className="text-[10px] text-[#4B6259] block">Email:</span>
                  <span className="font-medium text-[#10231C] truncate block">{email}</span>
                </div>
              </div>

              {/* MENTOR HIGHLIGHT ON CARD */}
              <div className="rounded-xl border border-[#006144]/30 bg-[#F0FDF4] p-2.5 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-[#006144]">
                  <Users className="h-3.5 w-3.5" />
                  <span>Mentor Bimbingan:</span>
                </div>
                <div className="mt-0.5 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <span className="font-black text-[#10231C]">{mentorName}</span>
                  <span className="text-[10px] font-bold text-[#006144] bg-white px-2 py-0.5 rounded border border-[#BCD7CA]">
                    {mentorRole}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Card Footer / Signatures */}
          <div className="mt-5 grid grid-cols-2 border-t border-[#DCE8E2] pt-4 text-center text-xs">
            <div>
              <p className="text-[10px] text-[#4B6259]">Calon Kader LK-I,</p>
              <div className="h-12" />
              <p className="font-bold text-[#10231C] underline">({fullName})</p>
            </div>
            <div>
              <p className="text-[10px] text-[#4B6259]">Ketua Pelaksana LK-I,</p>
              <div className="h-12" />
              <p className="font-bold text-[#10231C] underline">
                (Panitia Pelaksana LK-I)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

