"use client";

import React, { useState } from "react";
import { X, MessageCircle, Send, CheckCircle2 } from "lucide-react";

interface BulkWhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCandidates: any[];
}

export const BulkWhatsAppModal: React.FC<BulkWhatsAppModalProps> = ({
  isOpen,
  onClose,
  selectedCandidates,
}) => {
  const [templateType, setTemplateType] = useState<
    "konfirmasi" | "screening" | "kelulusan" | "custom"
  >("screening");
  const [customMessage, setCustomMessage] = useState("");
  const [sentIds, setSentIds] = useState<string[]>([]);

  if (!isOpen || selectedCandidates.length === 0) return null;

  const getMessageForCandidate = (c: any) => {
    const fullName = c.full_name || c.fullName;
    const regCode = c.registration_code || c.registrationCode;
    const schedule = c.screening_schedule || c.screeningSchedule;
    const mentorName = c.mentor_name || c.mentorName;
    const mentorWa = c.mentor_whatsapp_group || c.mentorWhatsappGroup;

    if (templateType === "konfirmasi") {
      return `Assalamu'alaikum Wr. Wb. Halo ${fullName},\n\nKami dari Panitia LK-I HMI Komisariat Sains dan Teknologi mengonfirmasi pendaftaran Anda dengan kode *${regCode}* telah diterima. Mohon pastikan link berkas Google Drive Anda disetel publik.\n\n*Bidang Kaderisasi HMI Saintek*`;
    }
    if (templateType === "screening") {
      return `Assalamu'alaikum Wr. Wb. Halo ${fullName},\n\nSelamat! Berkas pendaftaran LK-I Anda (*${regCode}*) telah kami verifikasi.\n\nJadwal Screening / Wawancara LK-I Anda:\n🗓 ${schedule ? new Date(schedule).toLocaleString("id-ID") : "[Jadwal segera diumumkan oleh panitia]"}\n\nMohon konfirmasi kehadiran Anda. Terima kasih!\n\n*Panitia LK-I HMI Saintek*`;
    }
    if (templateType === "kelulusan") {
      return `Assalamu'alaikum Wr. Wb. Halo ${fullName},\n\nSelamat! Anda dinyatakan *DITERIMA* sebagai Peserta Latihan Kader I (LK-I) HMI Komisariat Sains dan Teknologi UIN Sunan Gunung Djati Bandung.\n\nMentor Bimbingan Anda: *${mentorName || "Panitia Kaderisasi"}*\nSilakan bergabung ke Grup WhatsApp:\n👉 ${mentorWa || "https://chat.whatsapp.com/EaDcUHFcNud8Dr2yOu4D01"}\n\n*YAKUSA - Yakin Usaha Sampai!*`;
    }
    return customMessage
      .replace(/{nama}/g, fullName)
      .replace(/{kode}/g, regCode);
  };

  const openWhatsAppFor = (c: any) => {
    let cleanPhone = (c.whatsapp || "").replace(/[^0-9]/g, "");
    if (cleanPhone.startsWith("0")) {
      cleanPhone = "62" + cleanPhone.slice(1);
    }
    const msg = getMessageForCandidate(c);
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`, "_blank");

    if (!sentIds.includes(c.id)) {
      setSentIds((prev) => [...prev, c.id]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 p-0 sm:p-4 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-[#BCD7CA] bg-white p-4 sm:p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#DCE8E2] pb-3.5">
          <div className="flex items-center gap-2 text-[#006144]">
            <MessageCircle className="h-5 w-5 text-[#25D366]" />
            <h3 className="text-base sm:text-lg font-black text-[#10231C]">
              Broadcast WhatsApp ({selectedCandidates.length} Peserta)
            </h3>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F6F8F7] text-gray-400 hover:bg-[#EAF2EE]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-4 space-y-4 text-xs sm:text-sm">
          {/* Template Selector */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-[#10231C]">Pilih Format Template Pesan:</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {[
                { type: "konfirmasi", label: "Konfirmasi" },
                { type: "screening", label: "Jadwal Screening" },
                { type: "kelulusan", label: "Kelulusan" },
                { type: "custom", label: "Custom" },
              ].map((t) => (
                <button
                  key={t.type}
                  type="button"
                  onClick={() => setTemplateType(t.type as any)}
                  className={`rounded-xl px-2.5 py-2 text-xs font-bold transition-all ${
                    templateType === t.type
                      ? "bg-[#006144] text-white shadow-xs"
                      : "bg-[#F6F8F7] text-[#4B6259] hover:bg-[#EAF2EE]"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {templateType === "custom" && (
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#10231C]">
                Tulis Pesan Custom (Gunakan tag {"{nama}"} dan {"{kode}"}):
              </label>
              <textarea
                rows={4}
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Halo {nama}, pendaftaran Anda dengan kode {kode}..."
                className="w-full rounded-xl border border-[#DCE8E2] bg-white p-3 text-xs text-[#10231C] outline-none focus:border-[#006B3F]"
              />
            </div>
          )}

          {/* Preview box */}
          <div className="rounded-2xl border border-[#BCD7CA] bg-[#F4F9F6] p-3 text-xs">
            <p className="font-bold text-[#006144] mb-1">Preview Pesan (Contoh: {selectedCandidates[0]?.full_name}):</p>
            <pre className="whitespace-pre-wrap font-sans text-[11px] text-[#2D4A3E] leading-relaxed">
              {getMessageForCandidate(selectedCandidates[0])}
            </pre>
          </div>

          {/* List of Candidates with Send Buttons */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#10231C]">Daftar Kontak Peserta:</label>
              <span className="text-[11px] text-[#006144] font-bold">
                Terkirim: {sentIds.length} / {selectedCandidates.length}
              </span>
            </div>

            <div className="max-h-52 overflow-y-auto space-y-1.5 pr-1">
              {selectedCandidates.map((c) => {
                const isSent = sentIds.includes(c.id);
                return (
                  <div
                    key={c.id}
                    className="flex items-center justify-between rounded-xl border border-[#DCE8E2] bg-white p-2.5 text-xs hover:border-[#BCD7CA]"
                  >
                    <div>
                      <h5 className="font-bold text-[#10231C]">{c.full_name || c.fullName}</h5>
                      <p className="text-[10px] text-[#4B6259]">
                        WA: {c.whatsapp} • {c.study_program || c.studyProgram}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => openWhatsAppFor(c)}
                      className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-bold transition-all active:scale-95 ${
                        isSent
                          ? "bg-[#EAF2EE] text-[#006144] border border-[#BCD7CA]"
                          : "bg-[#25D366] text-white hover:bg-[#1EBE5D] shadow-xs"
                      }`}
                    >
                      {isSent ? (
                        <>
                          <CheckCircle2 className="h-3.5 w-3.5" />
                          <span>Sudah Dikirim</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-3.5 w-3.5" />
                          <span>Kirim Pesan</span>
                        </>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

