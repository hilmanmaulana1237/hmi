"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Save,
  UserCheck,
  MessageCircle,
  ExternalLink,
  GraduationCap,
  Sparkles,
  Camera,
  UploadCloud,
  Trash2,
  Loader2,
  Check,
} from "lucide-react";
import type { MentorItem } from "@/lib/default-mentors";

interface MentorFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  mentor: MentorItem | null;
  adminKey: string;
  onSaved: (mentor: MentorItem) => void;
}

const prodiOptions = [
  "Teknik Informatika",
  "Teknik Elektro",
  "Biologi",
  "Fisika",
  "Kimia",
  "Matematika",
  "Agroteknologi",
  "Umum / Luar FST",
];

export const MentorFormModal: React.FC<MentorFormModalProps> = ({
  isOpen,
  onClose,
  mentor,
  adminKey,
  onSaved,
}) => {
  const isEditing = Boolean(mentor);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    faculty: "Fakultas Sains dan Teknologi",
    studyProgram: "Teknik Informatika",
    batch: "Angkatan 2022",
    avatarUrl: "/ketua-umum.jpg",
    bio: "",
    guidanceFocus: "",
    whatsappGroupUrl: "",
    whatsappNumber: "",
    isActive: true,
    order: 1,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mentor) {
      setFormData({
        name: mentor.name || "",
        role: mentor.role || "",
        faculty: mentor.faculty || "Fakultas Sains dan Teknologi",
        studyProgram: mentor.studyProgram || "Teknik Informatika",
        batch: mentor.batch || "",
        avatarUrl: mentor.avatarUrl || "/ketua-umum.jpg",
        bio: mentor.bio || "",
        guidanceFocus: mentor.guidanceFocus || "",
        whatsappGroupUrl: mentor.whatsappGroupUrl || "",
        whatsappNumber: mentor.whatsappNumber || "",
        isActive: mentor.isActive !== false,
        order: mentor.order ?? 1,
      });
    } else {
      setFormData({
        name: "",
        role: "",
        faculty: "Fakultas Sains dan Teknologi",
        studyProgram: "Teknik Informatika",
        batch: "Angkatan 2022",
        avatarUrl: "/ketua-umum.jpg",
        bio: "",
        guidanceFocus: "",
        whatsappGroupUrl: "https://chat.whatsapp.com/",
        whatsappNumber: "",
        isActive: true,
        order: 1,
      });
    }
    setError(null);
    setUploadError(null);
  }, [mentor, isOpen]);

  if (!isOpen) return null;

  // Handle Photo File Upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Harap pilih file gambar (JPG, PNG, atau WEBP).");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Ukuran foto maksimal 5MB.");
      return;
    }

    setIsUploading(true);
    setUploadError(null);

    // Instant local preview
    const localUrl = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, avatarUrl: localUrl }));

    try {
      const uploadFormData = new FormData();
      uploadFormData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "x-admin-key": adminKey,
        },
        body: uploadFormData,
      });

      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Gagal mengunggah foto.");
      }

      setFormData((prev) => ({ ...prev, avatarUrl: data.url }));
    } catch (err: any) {
      console.error("Upload error:", err);
      setUploadError(err.message || "Gagal mengunggah foto ke server.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Nama mentor wajib diisi.");
      return;
    }
    if (!formData.role.trim()) {
      setError("Jabatan / peran mentor wajib diisi (misal: Ketua DEMA FST, Ketua HMJ TI).");
      return;
    }
    if (!formData.whatsappGroupUrl.trim()) {
      setError("Tautan grup WhatsApp bimbingan wajib diisi.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const method = isEditing ? "PATCH" : "POST";
      const payloadBody = isEditing
        ? { id: mentor?.id, ...formData }
        : formData;

      const res = await fetch("/api/mentors", {
        method,
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify(payloadBody),
      });

      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Gagal menyimpan data mentor.");
      }

      onSaved(json.mentor || { id: mentor?.id || `mentor-${Date.now()}`, ...formData });
      onClose();
    } catch (err: any) {
      console.error("Save mentor error:", err);
      setError(err.message || "Terjadi kesalahan saat menyimpan mentor.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 p-0 sm:p-4 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div
        className="relative my-0 sm:my-8 w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-[#BCD7CA] bg-white p-4 sm:p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#DCE8E2] pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF2EE] text-[#006144] border border-[#BCD7CA]">
              <UserCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-[#10231C]">
                {isEditing ? "Edit Data Mentor LK-I" : "Tambah Mentor Baru"}
              </h3>
              <p className="text-xs text-[#4B6259]">
                Kelola profil, jabatan ormawa, foto, dan tautan grup WhatsApp bimbingan
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-100 text-gray-500 hover:bg-gray-200 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            {error}
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Foto Profil Mentor (File Upload Langsung) */}
            <div className="space-y-2 sm:col-span-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#10231C] flex items-center gap-1.5">
                  <Camera className="h-4 w-4 text-[#006144]" />
                  <span>Foto Profil Mentor</span>
                </label>
                <button
                  type="button"
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="text-[11px] font-bold text-[#006144] hover:underline"
                >
                  {showUrlInput ? "Tutup Input URL" : "Atau Gunakan Link / URL Foto"}
                </button>
              </div>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileChange}
                className="hidden"
              />

              {uploadError && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-2.5 text-xs text-red-600 flex items-center gap-1.5">
                  <span>⚠️ {uploadError}</span>
                </div>
              )}

              {/* Upload Dropzone & Live Preview */}
              <div className="flex flex-col sm:flex-row items-center gap-4 rounded-2xl border-2 border-dashed border-[#BCD7CA] bg-[#F6F8F7] p-4 transition hover:border-[#006144]">
                {/* Photo Preview Thumbnail */}
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border-2 border-[#006144] bg-white shadow-sm">
                  {formData.avatarUrl ? (
                    <img
                      src={formData.avatarUrl}
                      alt="Preview Foto Mentor"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as any).src = "/ketua-umum.jpg";
                      }}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-[#EAF2EE] text-[#006144]">
                      <UserCheck className="h-8 w-8" />
                    </div>
                  )}

                  {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white">
                      <Loader2 className="h-6 w-6 animate-spin" />
                    </div>
                  )}
                </div>

                {/* Upload Action Description & Buttons */}
                <div className="flex-1 text-center sm:text-left space-y-1.5">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={isUploading}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#006144] px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-[#004D36] active:scale-95 transition disabled:opacity-50"
                    >
                      {isUploading ? (
                        <>
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          <span>Mengunggah...</span>
                        </>
                      ) : (
                        <>
                          <UploadCloud className="h-4 w-4" />
                          <span>Pilih Foto dari HP / Laptop</span>
                        </>
                      )}
                    </button>

                    {formData.avatarUrl && formData.avatarUrl !== "/ketua-umum.jpg" && (
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, avatarUrl: "/ketua-umum.jpg" })}
                        className="inline-flex items-center gap-1 rounded-xl border border-gray-300 bg-white px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 transition"
                      >
                        <Trash2 className="h-3.5 w-3.5 text-red-500" />
                        <span>Reset Foto</span>
                      </button>
                    )}
                  </div>

                  <p className="text-[11px] text-[#4B6259]">
                    Format gambar JPG, PNG, atau WEBP. Maksimal 5MB. Foto otomatis diunggah dan disimpan ke server.
                  </p>
                </div>
              </div>

              {/* Optional Manual URL Input Toggle */}
              {showUrlInput && (
                <div className="pt-1 animate-fade-in space-y-1">
                  <label className="text-[11px] font-bold text-[#4B6259]">URL Foto Manual (Opsional):</label>
                  <input
                    type="text"
                    value={formData.avatarUrl}
                    onChange={(e) => setFormData({ ...formData, avatarUrl: e.target.value })}
                    placeholder="/uploads/mentors/... atau link foto online"
                    className="w-full rounded-xl border border-[#DCE8E2] bg-white px-3.5 py-2 text-xs text-[#10231C] outline-none transition focus:border-[#006144]"
                  />
                </div>
              )}
            </div>

            {/* Nama Lengkap */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-[#10231C]">
                Nama Lengkap Mentor <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Contoh: Muhammad Farhan Al-Ghifari, S.T."
                required
                className="w-full rounded-xl border border-[#DCE8E2] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#10231C] outline-none transition focus:border-[#006144] focus:ring-2 focus:ring-[#006144]/15"
              />
            </div>

            {/* Jabatan / Peran */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#10231C]">
                Jabatan / Peran Ormawa <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                placeholder="Contoh: Ketua DEMA FST / Ketua HMJ TI"
                required
                className="w-full rounded-xl border border-[#DCE8E2] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#10231C] outline-none transition focus:border-[#006144] focus:ring-2 focus:ring-[#006144]/15"
              />
            </div>

            {/* Program Studi */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#10231C]">Program Studi</label>
              <select
                value={formData.studyProgram}
                onChange={(e) => setFormData({ ...formData, studyProgram: e.target.value })}
                className="w-full rounded-xl border border-[#DCE8E2] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#10231C] outline-none transition focus:border-[#006144] focus:ring-2 focus:ring-[#006144]/15"
              >
                {prodiOptions.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Angkatan */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#10231C]">Angkatan</label>
              <input
                type="text"
                value={formData.batch}
                onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                placeholder="Contoh: Angkatan 2021"
                className="w-full rounded-xl border border-[#DCE8E2] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#10231C] outline-none transition focus:border-[#006144] focus:ring-2 focus:ring-[#006144]/15"
              />
            </div>

            {/* Nomor WhatsApp */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#10231C]">No. WhatsApp Mentor</label>
              <input
                type="text"
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                placeholder="Contoh: 087827718245"
                className="w-full rounded-xl border border-[#DCE8E2] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#10231C] outline-none transition focus:border-[#006144] focus:ring-2 focus:ring-[#006144]/15"
              />
            </div>

            {/* Link Grup WhatsApp Bimbingan */}
            <div className="space-y-1 sm:col-span-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-[#10231C] flex items-center gap-1.5">
                  <MessageCircle className="h-4 w-4 text-[#006144]" />
                  <span>Tautan Grup WhatsApp Bimbingan Mentor</span>
                  <span className="text-red-500">*</span>
                </label>
                {formData.whatsappGroupUrl && formData.whatsappGroupUrl.startsWith("http") && (
                  <a
                    href={formData.whatsappGroupUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-[#006144] hover:underline"
                  >
                    <span>Uji Tautan Grup</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>
              <input
                type="url"
                value={formData.whatsappGroupUrl}
                onChange={(e) => setFormData({ ...formData, whatsappGroupUrl: e.target.value })}
                placeholder="https://chat.whatsapp.com/L8oJqcIbNBq8Ipje6JM38u"
                required
                className="w-full rounded-xl border border-[#DCE8E2] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#10231C] outline-none transition focus:border-[#006144] focus:ring-2 focus:ring-[#006144]/15"
              />
              <p className="text-[11px] text-[#6C847A]">
                Pendaftar yang memilih mentor ini akan otomatis diarahkan untuk bergabung ke grup ini setelah submit form.
              </p>
            </div>

            {/* Fokus Bimbingan */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-[#10231C] flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>Fokus Bimbingan Mentor</span>
              </label>
              <input
                type="text"
                value={formData.guidanceFocus}
                onChange={(e) => setFormData({ ...formData, guidanceFocus: e.target.value })}
                placeholder="Contoh: Kepemimpinan Ormawa, Diplomasi Kampus & Sukses Akademik"
                className="w-full rounded-xl border border-[#DCE8E2] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#10231C] outline-none transition focus:border-[#006144] focus:ring-2 focus:ring-[#006144]/15"
              />
            </div>

            {/* Profil Singkat & Visi */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-[#10231C]">
                Profil Singkat & Visi Bimbingan
              </label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Jelaskan bagaimana mentor akan membina calon kader baru..."
                className="w-full rounded-xl border border-[#DCE8E2] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#10231C] outline-none transition focus:border-[#006144] focus:ring-2 focus:ring-[#006144]/15"
              />
            </div>

            {/* Urutan & Status Aktif */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-[#10231C]">Urutan Tampilan</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) || 0 })}
                className="w-full rounded-xl border border-[#DCE8E2] bg-white px-3.5 py-2.5 text-xs sm:text-sm text-[#10231C] outline-none transition focus:border-[#006144] focus:ring-2 focus:ring-[#006144]/15"
              />
            </div>

            <div className="flex items-center gap-2 pt-6">
              <label className="flex items-center gap-2.5 text-xs font-bold text-[#10231C] cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="h-4 w-4 rounded text-[#006144] focus:ring-[#006144]"
                />
                <span>Tampilkan di Formulir Pendaftaran LK-I</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2.5 border-t border-[#DCE8E2] pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting || isUploading}
              className="rounded-xl border border-gray-300 px-4 py-2 text-xs font-bold text-gray-700 hover:bg-gray-100 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="inline-flex items-center gap-2 rounded-xl bg-[#006144] px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-[#004D36] transition disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>{isEditing ? "Simpan Perubahan" : "Tambah Mentor"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
