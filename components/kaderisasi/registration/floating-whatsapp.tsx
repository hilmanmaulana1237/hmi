"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "6287827718245";
  const defaultMessage =
    "Halo Panitia LK-I HMI Sains & Teknologi, saya ingin bertanya terkait pendaftaran LK-I / pemilihan mentor.";

  const handleOpenWhatsApp = (customText?: string) => {
    const text = customText || defaultMessage;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-4 z-40 flex flex-col items-end sm:bottom-6 sm:right-6">
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2rem)] max-w-72 rounded-2xl border border-[#BCD7CA] bg-white p-4 shadow-2xl animate-fade-in">
          <div className="flex items-center justify-between border-b border-[#EAF2EE] pb-2.5">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#25D366] text-white">
                <MessageCircle className="h-4 w-4" />
              </div>
              <span className="text-xs font-black text-[#10231C]">Pusat Bantuan & CP</span>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-gray-400 hover:bg-[#F6F8F7] hover:text-gray-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="mt-2 text-xs leading-relaxed text-[#4B6259]">
            Ada kendala pengisian formulir atau pertanyaan seputar LK-I & Mentor? Hubungi panitia:
          </p>

          <div className="mt-3 space-y-2">
            <button
              type="button"
              onClick={() =>
                handleOpenWhatsApp(
                  "Halo Admin IT HMI Saintek, saya mengalami kendala teknis / error saat mengisi formulir pendaftaran LK-I."
                )
              }
              className="flex w-full items-center justify-between rounded-xl border border-red-100 bg-red-50/70 p-2.5 text-left text-xs font-bold text-red-700 hover:bg-red-100/80 transition-all"
            >
              <span>🚨 Laporkan Kendala / Error</span>
            </button>

            <button
              type="button"
              onClick={() =>
                handleOpenWhatsApp(
                  "Halo Panitia LK-I HMI Saintek, saya ingin konsultasi mengenai mentor bimbingan & jadwal LK-I."
                )
              }
              className="flex w-full items-center justify-between rounded-xl border border-[#DCE8E2] bg-[#F6F8F7] p-2.5 text-left text-xs font-bold text-[#006144] hover:bg-[#EAF2EE] transition-all"
            >
              <span>💬 Tanya Info Pendaftaran & Mentor</span>
            </button>
          </div>

          <div className="mt-3 text-center">
            <span className="text-[10px] text-[#4B6259]">
              Nomor Resmi: <strong>0878-2771-8245</strong>
            </span>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-full bg-[#25D366] px-3.5 py-2.5 text-white shadow-xl shadow-[#25D366]/30 transition-all hover:bg-[#1EBE5D] hover:scale-105 active:scale-95"
        title="Bantuan WhatsApp"
      >
        <MessageCircle className="h-5 w-5 fill-white stroke-[#25D366]" />
        <span className="text-xs font-black tracking-wide hidden sm:inline">
          Bantuan Panitia
        </span>
      </button>
    </div>
  );
};

