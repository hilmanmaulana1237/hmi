"use client";

import React, { useState } from "react";
import { X, Save, Calendar, Award, Loader2 } from "lucide-react";

interface ScreeningModalProps {
  candidate: any | null;
  onClose: () => void;
  onSaved: (updated: any) => void;
}

const scoreGrades = ["A (Sangat Baik)", "B (Baik)", "C (Cukup)", "D (Kurang)"];
const recommendationOptions = [
  "Lulus Murni",
  "Lulus Bersyarat",
  "Mengikuti Screening Ulang",
  "Cadangan",
  "Tidak Lulus",
];

export const ScreeningModal: React.FC<ScreeningModalProps> = ({
  candidate,
  onClose,
  onSaved,
}) => {
  if (!candidate) return null;

  const [schedule, setSchedule] = useState(candidate.screening_schedule || "");
  const [scoreBtq, setScoreBtq] = useState(candidate.screening_score_btq || "B (Baik)");
  const [scoreHmi, setScoreHmi] = useState(candidate.screening_score_hmi || "B (Baik)");
  const [scoreKebangsaan, setScoreKebangsaan] = useState(
    candidate.screening_score_kebangsaan || "B (Baik)"
  );
  const [result, setResult] = useState(candidate.screening_result || "Lulus Murni");
  const [notes, setNotes] = useState(candidate.screening_notes || "");
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const updates = {
        screening_schedule: schedule || null,
        screening_score_btq: scoreBtq,
        screening_score_hmi: scoreHmi,
        screening_score_kebangsaan: scoreKebangsaan,
        screening_result: result,
        screening_notes: notes || null,
        status:
          result === "Lulus Murni" || result === "Lulus Bersyarat"
            ? "Diterima"
            : result === "Tidak Lulus"
            ? "Ditolak"
            : "Mengikuti Screening",
      };

      const adminPassword = sessionStorage.getItem("hmi_admin_authenticated_key") || "hilmanganteng@123";

      const res = await fetch("/api/lk1/admin", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminPassword,
        },
        body: JSON.stringify({
          id: candidate.id,
          updates,
        }),
      });

      const resData = await res.json();
      if (!res.ok || !resData.ok) {
        throw new Error(resData.error || "Gagal menyimpan hasil screening.");
      }

      onSaved({ ...candidate, ...updates });
      onClose();
    } catch (err: any) {
      console.error("Error saving screening:", err);
      alert(err.message || "Gagal menyimpan hasil screening.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 p-0 sm:p-4 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-[#BCD7CA] bg-white p-4 sm:p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#DCE8E2] pb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#006144] text-white">
              <Award className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-[#10231C]">
                Penilaian Screening LK-I
              </h3>
              <p className="text-[11px] text-[#4B6259]">
                {candidate.full_name} ({candidate.registration_code})
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F6F8F7] text-gray-400 hover:bg-[#EAF2EE] hover:text-[#006144]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="mt-4 space-y-4">
          {/* Jadwal Screening */}
          <div className="space-y-1">
            <label className="flex items-center gap-1.5 text-xs font-bold text-[#10231C]">
              <Calendar className="h-3.5 w-3.5 text-[#006144]" />
              <span>Jadwal Screening / Wawancara</span>
            </label>
            <input
              type="datetime-local"
              value={schedule}
              onChange={(e) => setSchedule(e.target.value)}
              className="w-full rounded-xl border border-[#DCE8E2] bg-white px-3 py-2 text-xs sm:text-sm text-[#10231C] outline-none focus:border-[#006B3F] focus:ring-2 focus:ring-[#006144]/20"
            />
          </div>

          {/* 3 Nilai Screening */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#10231C] block">
                Nilai BTQ (Al-Qur'an)
              </label>
              <select
                value={scoreBtq}
                onChange={(e) => setScoreBtq(e.target.value)}
                className="w-full rounded-xl border border-[#DCE8E2] bg-white px-2.5 py-2 text-xs text-[#10231C] outline-none focus:border-[#006B3F]"
              >
                {scoreGrades.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#10231C] block">
                Nilai Ke-HMI-an
              </label>
              <select
                value={scoreHmi}
                onChange={(e) => setScoreHmi(e.target.value)}
                className="w-full rounded-xl border border-[#DCE8E2] bg-white px-2.5 py-2 text-xs text-[#10231C] outline-none focus:border-[#006B3F]"
              >
                {scoreGrades.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-bold text-[#10231C] block">
                Nilai Kebangsaan
              </label>
              <select
                value={scoreKebangsaan}
                onChange={(e) => setScoreKebangsaan(e.target.value)}
                className="w-full rounded-xl border border-[#DCE8E2] bg-white px-2.5 py-2 text-xs text-[#10231C] outline-none focus:border-[#006B3F]"
              >
                {scoreGrades.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Hasil Rekomendasi */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#10231C] block">
              Rekomendasi / Keputusan Kelulusan Screening
            </label>
            <select
              value={result}
              onChange={(e) => setResult(e.target.value)}
              className="w-full rounded-xl border border-[#BCD7CA] bg-[#F0FDF4] px-3 py-2 text-xs sm:text-sm font-bold text-[#006144] outline-none focus:border-[#006B3F]"
            >
              {recommendationOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          {/* Catatan Screening */}
          <div className="space-y-1">
            <label className="text-xs font-bold text-[#10231C] block">
              Catatan Evaluator / Screener
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Catatan kelebihan, kekurangan, atau syarat kelulusan peserta..."
              className="w-full rounded-xl border border-[#DCE8E2] bg-white p-3 text-xs text-[#10231C] outline-none focus:border-[#006B3F] focus:ring-2 focus:ring-[#006144]/20"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#DCE8E2]">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-[#DCE8E2] bg-white px-4 py-2 text-xs font-bold text-[#4B6259] hover:bg-[#F6F8F7]"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#006144] px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#003324] disabled:opacity-60 transition-all"
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Simpan Hasil Screening</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

