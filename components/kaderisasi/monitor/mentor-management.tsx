"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  UserCheck,
  Plus,
  RefreshCw,
  Search,
  MessageCircle,
  ExternalLink,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  Users,
  Sparkles,
  ShieldAlert,
  Database,
} from "lucide-react";
import type { MentorItem } from "@/lib/default-mentors";
import { MentorFormModal } from "./mentor-form-modal";

interface MentorManagementProps {
  adminKey: string;
  registrations: any[];
}

export const MentorManagement: React.FC<MentorManagementProps> = ({
  adminKey,
  registrations,
}) => {
  const [mentors, setMentors] = useState<MentorItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState("");

  // Modal State
  const [selectedMentor, setSelectedMentor] = useState<MentorItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Fetch all mentors (including inactive)
  const fetchMentors = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/mentors?all=true", {
        headers: { "x-admin-key": adminKey },
      });
      const data = await res.json();
      if (data.ok && Array.isArray(data.mentors)) {
        setMentors(data.mentors);
      } else {
        throw new Error(data.error || "Gagal memuat data mentor.");
      }
    } catch (err: any) {
      console.error("Fetch mentors error:", err);
      setError(err.message || "Gagal menghubungi server untuk memuat mentor.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMentors();
  }, []);

  // Map how many registrations have chosen each mentor
  const applicantCountByMentor = useMemo(() => {
    const map: Record<string, number> = {};
    registrations.forEach((r) => {
      const name = r.mentor_name || r.mentorName;
      if (name) {
        map[name.toLowerCase()] = (map[name.toLowerCase()] || 0) + 1;
      }
      const id = r.mentor_id || r.mentorId;
      if (id) {
        map[id] = (map[id] || 0) + 1;
      }
    });
    return map;
  }, [registrations]);

  // Seed default mentors
  const handleSeedDefaults = async () => {
    if (!confirm("Inisialisasi 6 mentor default (Ketua DEMA, SEMA, HMJ) ke database?")) {
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/mentors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({ action: "seed_defaults" }),
      });
      const data = await res.json();
      if (data.ok) {
        setSuccessMsg(data.message || "Mentor default berhasil diinisialisasi.");
        setTimeout(() => setSuccessMsg(null), 4000);
        await fetchMentors();
      } else {
        throw new Error(data.error || "Gagal menginisialisasi mentor default.");
      }
    } catch (err: any) {
      setError(err.message || "Gagal memproses inisialisasi mentor.");
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle active status
  const handleToggleActive = async (mentor: MentorItem) => {
    const newStatus = !mentor.isActive;
    try {
      const res = await fetch("/api/mentors", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({
          id: mentor.id,
          isActive: newStatus,
        }),
      });

      const data = await res.json();
      if (data.ok) {
        setMentors((prev) =>
          prev.map((m) => (m.id === mentor.id ? { ...m, isActive: newStatus } : m))
        );
      } else {
        throw new Error(data.error || "Gagal memperbarui status aktif mentor.");
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  // Delete mentor
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/mentors?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: { "x-admin-key": adminKey },
      });
      const data = await res.json();
      if (data.ok) {
        setMentors((prev) => prev.filter((m) => m.id !== id));
        setDeleteConfirmId(null);
        setSuccessMsg("Mentor berhasil dihapus.");
        setTimeout(() => setSuccessMsg(null), 3000);
      } else {
        throw new Error(data.error || "Gagal menghapus mentor.");
      }
    } catch (err: any) {
      alert("Gagal menghapus mentor: " + err.message);
    }
  };

  // Filtered mentors
  const filteredMentors = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return mentors;
    return mentors.filter(
      (m) =>
        m.name?.toLowerCase().includes(q) ||
        m.role?.toLowerCase().includes(q) ||
        m.studyProgram?.toLowerCase().includes(q) ||
        m.guidanceFocus?.toLowerCase().includes(q)
    );
  }, [mentors, searchQuery]);

  // Copy WhatsApp link
  const handleCopyLink = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Actions */}
      <div className="rounded-3xl border border-[#BCD7CA] bg-white p-5 sm:p-6 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-[#EAF2EE] px-2.5 py-0.5 text-xs font-black uppercase text-[#006144]">
                Konfigurasi LK-I
              </span>
              <span className="text-xs text-[#4B6259]">Sinkronisasi Realtime</span>
            </div>
            <h2 className="mt-1 text-lg sm:text-xl font-black text-[#10231C]">
              Pengaturan Mentor Bimbingan & Grup WhatsApp
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#4B6259] max-w-3xl">
              Atur mentor figur/idola (Ketua DEMA, SEMA, HMJ) yang dapat dipilih calon kader saat
              mendaftar. Tautan grup WhatsApp masing-masing mentor akan otomatis diberikan kepada calon kader.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={fetchMentors}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#BCD7CA] bg-white px-3 py-2 text-xs font-bold text-[#006144] shadow-sm hover:bg-[#EAF2EE] transition"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin" : ""}`} />
              <span>Segarkan</span>
            </button>

            <button
              type="button"
              onClick={handleSeedDefaults}
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800 shadow-sm hover:bg-amber-100 transition"
              title="Isi database dengan 6 mentor default dari ormawa kampus"
            >
              <Database className="h-3.5 w-3.5 text-amber-600" />
              <span>Muat Default</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedMentor(null);
                setIsModalOpen(true);
              }}
              className="col-span-2 sm:col-span-1 inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#006144] px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-[#004D36] transition"
            >
              <Plus className="h-4 w-4" />
              <span>Tambah Mentor Baru</span>
            </button>
          </div>
        </div>

        {/* Notifications */}
        {successMsg && (
          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-bold text-emerald-800">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            <span>{successMsg}</span>
          </div>
        )}

        {error && (
          <div className="mt-4 flex items-center gap-2 rounded-2xl border border-red-200 bg-red-50 p-3 text-xs font-bold text-red-800">
            <AlertCircle className="h-4 w-4 text-red-600" />
            <span>{error}</span>
          </div>
        )}

        {/* Quick Stats & Search Bar */}
        <div className="mt-4 sm:mt-6 grid grid-cols-3 gap-2 sm:gap-3">
          <div className="rounded-xl sm:rounded-2xl border border-[#DCE8E2] bg-[#F6F8F7] p-2.5 sm:p-3 text-center">
            <p className="text-[10px] sm:text-[11px] font-bold text-[#4B6259]">Total Mentor</p>
            <p className="text-lg sm:text-xl font-black text-[#006144]">{mentors.length}</p>
          </div>
          <div className="rounded-xl sm:rounded-2xl border border-[#DCE8E2] bg-[#F6F8F7] p-2.5 sm:p-3 text-center">
            <p className="text-[10px] sm:text-[11px] font-bold text-[#4B6259]">Mentor Aktif</p>
            <p className="text-lg sm:text-xl font-black text-emerald-600">
              {mentors.filter((m) => m.isActive).length}
            </p>
          </div>
          <div className="rounded-xl sm:rounded-2xl border border-[#DCE8E2] bg-[#F6F8F7] p-2.5 sm:p-3 text-center">
            <p className="text-[10px] sm:text-[11px] font-bold text-[#4B6259]">Pendaftar</p>
            <p className="text-lg sm:text-xl font-black text-blue-600">
              {registrations.filter((r) => r.mentor_name || r.mentorName).length}
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="mt-4 relative">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari mentor berdasarkan nama, jabatan (Ketua DEMA, HMJ), atau prodi..."
            className="w-full rounded-2xl border border-[#DCE8E2] bg-white pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#10231C] outline-none transition focus:border-[#006144] focus:ring-2 focus:ring-[#006144]/15"
          />
        </div>
      </div>

      {/* Mentor Cards Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-[#BCD7CA] bg-white py-16 text-center">
          <div className="h-9 w-9 animate-spin rounded-full border-4 border-[#006144] border-t-transparent" />
          <p className="mt-3 text-xs font-bold text-[#4B6259]">Memuat daftar mentor...</p>
        </div>
      ) : filteredMentors.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-[#BCD7CA] bg-white p-12 text-center">
          <UserCheck className="mx-auto h-12 w-12 text-gray-300" />
          <h3 className="mt-3 text-sm font-bold text-gray-700">Tidak ada mentor yang cocok</h3>
          <p className="mt-1 text-xs text-gray-500">
            {searchQuery ? "Coba ganti kata kunci pencarian Anda." : "Belum ada mentor yang ditambahkan."}
          </p>
          <button
            type="button"
            onClick={handleSeedDefaults}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#006144] px-4 py-2 text-xs font-bold text-white shadow"
          >
            <Database className="h-4 w-4" />
            <span>Muat 6 Mentor Default Kampus</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filteredMentors.map((mentor) => {
            const applicantsCount =
              applicantCountByMentor[mentor.name.toLowerCase()] ||
              applicantCountByMentor[mentor.id] ||
              0;

            return (
              <div
                key={mentor.id}
                className={`relative flex flex-col justify-between rounded-3xl border bg-white p-5 shadow-sm transition-all hover:shadow-md ${
                  mentor.isActive ? "border-[#BCD7CA]" : "border-gray-200 opacity-75 bg-gray-50"
                }`}
              >
                <div>
                  {/* Card Header: Avatar, Name, Role, Active Badge */}
                  <div className="flex items-start gap-3">
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl border border-[#DCE8E2] bg-[#EAF2EE]">
                      <img
                        src={mentor.avatarUrl || "/ketua-umum.jpg"}
                        alt={mentor.name}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          (e.target as any).src = "/ketua-umum.jpg";
                        }}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <span
                          className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-black uppercase ${
                            mentor.isActive
                              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                              : "bg-gray-100 text-gray-600 border border-gray-200"
                          }`}
                        >
                          {mentor.isActive ? "Aktif di Form" : "Nonaktif"}
                        </span>

                        <span className="text-[10px] text-gray-400 font-mono">#{mentor.order ?? 0}</span>
                      </div>

                      <h4 className="mt-1 text-sm font-black text-[#10231C] leading-snug line-clamp-1">
                        {mentor.name}
                      </h4>
                      <p className="text-xs font-bold text-[#006144] line-clamp-1">{mentor.role}</p>
                      <p className="text-[11px] text-[#6C847A]">
                        {mentor.studyProgram} {mentor.batch ? `• ${mentor.batch}` : ""}
                      </p>
                    </div>
                  </div>

                  {/* Focus & Bio */}
                  {mentor.guidanceFocus && (
                    <div className="mt-3 flex items-center gap-1.5 rounded-xl bg-[#EAF2EE]/60 px-2.5 py-1 text-[11px] font-bold text-[#006144]">
                      <Sparkles className="h-3 w-3 shrink-0 text-amber-500" />
                      <span className="line-clamp-1">{mentor.guidanceFocus}</span>
                    </div>
                  )}

                  {mentor.bio && (
                    <p className="mt-2 text-xs text-[#4B6259] line-clamp-2 leading-relaxed">
                      {mentor.bio}
                    </p>
                  )}

                  {/* WhatsApp Group Box */}
                  <div className="mt-4 rounded-2xl border border-[#DCE8E2] bg-[#F6F8F7] p-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="flex items-center gap-1 font-bold text-[#10231C]">
                        <MessageCircle className="h-3.5 w-3.5 text-[#006144]" />
                        <span>Grup WhatsApp Bimbingan:</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => handleCopyLink(mentor.id, mentor.whatsappGroupUrl)}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-[#006144] hover:underline"
                        title="Salin Tautan"
                      >
                        {copiedId === mentor.id ? (
                          <>
                            <Check className="h-3 w-3 text-emerald-600" />
                            <span className="text-emerald-600">Disalin</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-3 w-3" />
                            <span>Salin</span>
                          </>
                        )}
                      </button>
                    </div>

                    <p className="mt-1 text-[11px] font-mono text-gray-500 truncate">
                      {mentor.whatsappGroupUrl || "Belum ada link grup"}
                    </p>

                    <div className="mt-2 flex items-center justify-between pt-1">
                      {mentor.whatsappGroupUrl && (
                        <a
                          href={mentor.whatsappGroupUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 rounded-lg bg-emerald-600 px-2.5 py-1 text-[11px] font-bold text-white shadow-sm hover:bg-emerald-700 transition"
                        >
                          <span>Buka Grup WA</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}

                      <div className="flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-lg border border-blue-200 ml-auto">
                        <Users className="h-3 w-3" />
                        <span>{applicantsCount} Calon Kader</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="mt-4 flex items-center justify-between border-t border-[#DCE8E2] pt-3">
                  <label className="flex items-center gap-1.5 text-xs font-bold text-[#4B6259] cursor-pointer">
                    <input
                      type="checkbox"
                      checked={mentor.isActive}
                      onChange={() => handleToggleActive(mentor)}
                      className="h-3.5 w-3.5 rounded text-[#006144] focus:ring-[#006144]"
                    />
                    <span>{mentor.isActive ? "Aktif" : "Nonaktif"}</span>
                  </label>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedMentor(mentor);
                        setIsModalOpen(true);
                      }}
                      className="inline-flex items-center gap-1 rounded-xl border border-[#BCD7CA] bg-white px-2.5 py-1.5 text-xs font-bold text-[#006144] hover:bg-[#EAF2EE] transition"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                      <span>Edit</span>
                    </button>

                    {deleteConfirmId === mentor.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleDelete(mentor.id)}
                          className="rounded-xl bg-red-600 px-2.5 py-1.5 text-[11px] font-bold text-white hover:bg-red-700 transition"
                        >
                          Hapus!
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(null)}
                          className="rounded-xl bg-gray-200 px-2 py-1.5 text-[11px] text-gray-700 hover:bg-gray-300 transition"
                        >
                          Batal
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(mentor.id)}
                        className="flex h-7 w-7 items-center justify-center rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-600 transition"
                        title="Hapus Mentor"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Mentor Add/Edit Modal */}
      <MentorFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedMentor(null);
        }}
        mentor={selectedMentor}
        adminKey={adminKey}
        onSaved={() => {
          setSuccessMsg("Data mentor berhasil disimpan.");
          setTimeout(() => setSuccessMsg(null), 3500);
          fetchMentors();
        }}
      />
    </div>
  );
};

