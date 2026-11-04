"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  Users,
  Search,
  RefreshCw,
  Download,
  LogOut,
  X,
  MessageCircle,
  ExternalLink,
  Trash2,
  Award,
  BarChart2,
  CheckSquare,
  Square,
  Printer,
  Eye,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  AlertCircle,
  Save,
  Check,
  Calendar,
  Layers,
  FileCheck,
  Edit2,
  Filter,
  UserCheck,
} from "lucide-react";
import { CandidateCharts } from "./candidate-charts";
import { ScreeningModal } from "./screening-modal";
import { BulkWhatsAppModal } from "./bulk-whatsapp-modal";
import { ParticipantCardModal } from "../registration/participant-card-modal";
import { MentorManagement } from "./mentor-management";
import Link from "next/link";

interface MonitorDashboardProps {
  onLogout: () => void;
  adminKey: string;
}

const statusOptions = [
  "Pending",
  "Diverifikasi",
  "Mengikuti Screening",
  "Diterima",
  "Lulus LK-I",
  "Cadangan",
  "Ditolak",
];

const paymentStatusOptions = [
  "Belum Dicek",
  "Belum Bayar",
  "Menunggu Verifikasi",
  "Terverifikasi",
  "Ditolak",
  "Gratis",
];

export const MonitorDashboard: React.FC<MonitorDashboardProps> = ({
  onLogout,
  adminKey,
}) => {
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [berkasFilter, setBerkasFilter] = useState<"ALL" | "WITH_PHOTO" | "WITH_PAYMENT" | "NO_FILES">("ALL");
  const [sortBy, setSortBy] = useState<"NEWEST" | "OLDEST" | "NAME_ASC" | "NAME_DESC" | "MAJOR">("NEWEST");
  const [activeTab, setActiveTab] = useState<"list" | "analytics" | "mentors">("list");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  // Modals & Selection
  const [selectedCandidate, setSelectedCandidate] = useState<any | null>(null);
  const [screeningCandidate, setScreeningCandidate] = useState<any | null>(null);
  const [cardCandidate, setCardCandidate] = useState<any | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [adminNoteInput, setAdminNoteInput] = useState("");
  const [isSavingNote, setIsSavingNote] = useState(false);
  const [noteSavedSuccess, setNoteSavedSuccess] = useState(false);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  useEffect(() => {
    if (selectedCandidate) {
      setAdminNoteInput(selectedCandidate.admin_notes || selectedCandidate.adminNote || "");
      setNoteSavedSuccess(false);
    }
  }, [selectedCandidate]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, berkasFilter, sortBy, pageSize]);

  async function fetchRegistrations() {
    setIsLoading(true);
    try {
      const res = await fetch("/api/lk1/admin", {
        headers: { "x-admin-key": adminKey },
      });
      const data = await res.json();
      if (data.ok && Array.isArray(data.registrations)) {
        setRegistrations(data.registrations);
      }
    } catch (err) {
      console.error("Error fetching registrations:", err);
    } finally {
      setIsLoading(false);
    }
  }

  // Update Status Single
  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch("/api/lk1/admin", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({
          id,
          updates: { status: newStatus },
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setRegistrations((prev) =>
          prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
        );
        if (selectedCandidate?.id === id) {
          setSelectedCandidate((prev: any) => ({ ...prev, status: newStatus }));
        }
      }
    } catch (e) {
      console.error("Failed to update status:", e);
    }
  };

  // Update Payment Status Single
  const handleUpdatePaymentStatus = async (id: string, newPaymentStatus: string) => {
    try {
      const res = await fetch("/api/lk1/admin", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({
          id,
          updates: { payment_status: newPaymentStatus },
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setRegistrations((prev) =>
          prev.map((r) => (r.id === id ? { ...r, payment_status: newPaymentStatus } : r))
        );
        if (selectedCandidate?.id === id) {
          setSelectedCandidate((prev: any) => ({ ...prev, payment_status: newPaymentStatus }));
        }
      }
    } catch (e) {
      console.error("Failed to update payment status:", e);
    }
  };

  // Save Admin Note
  const handleSaveAdminNote = async () => {
    if (!selectedCandidate) return;
    setIsSavingNote(true);
    setNoteSavedSuccess(false);

    try {
      const res = await fetch("/api/lk1/admin", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({
          id: selectedCandidate.id,
          updates: { admin_notes: adminNoteInput },
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setRegistrations((prev) =>
          prev.map((r) =>
            r.id === selectedCandidate.id ? { ...r, admin_notes: adminNoteInput } : r
          )
        );
        setSelectedCandidate((prev: any) => ({ ...prev, admin_notes: adminNoteInput }));
        setNoteSavedSuccess(true);
        setTimeout(() => setNoteSavedSuccess(false), 2500);
      }
    } catch (e) {
      console.error("Failed to save note:", e);
    } finally {
      setIsSavingNote(false);
    }
  };

  // Delete Single Candidate
  const handleDeleteCandidate = async (id: string, name: string) => {
    if (!window.confirm(`Yakin ingin menghapus data pendaftar "${name}"?`)) return;

    try {
      const res = await fetch("/api/lk1/admin", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (data.ok) {
        setRegistrations((prev) => prev.filter((r) => r.id !== id));
        setSelectedIds((prev) => prev.filter((itemId) => itemId !== id));
        if (selectedCandidate?.id === id) setSelectedCandidate(null);
      }
    } catch (e) {
      console.error("Failed to delete candidate:", e);
    }
  };

  // Bulk Status Update
  const handleBulkStatusUpdate = async (newStatus: string) => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Ubah status ${selectedIds.length} peserta terpilih menjadi "${newStatus}"?`)) return;

    try {
      const res = await fetch("/api/lk1/admin", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({
          ids: selectedIds,
          updates: { status: newStatus },
        }),
      });
      const data = await res.json();
      if (data.ok) {
        setRegistrations((prev) =>
          prev.map((r) => (selectedIds.includes(r.id) ? { ...r, status: newStatus } : r))
        );
        setSelectedIds([]);
      }
    } catch (e) {
      console.error("Failed bulk status update:", e);
    }
  };

  // Bulk Delete
  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`PERINGATAN: Hapus permanen ${selectedIds.length} pendaftar terpilih?`)) return;

    try {
      const res = await fetch("/api/lk1/admin", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-admin-key": adminKey,
        },
        body: JSON.stringify({ ids: selectedIds }),
      });
      const data = await res.json();
      if (data.ok) {
        setRegistrations((prev) => prev.filter((r) => !selectedIds.includes(r.id)));
        setSelectedIds([]);
      }
    } catch (e) {
      console.error("Failed bulk delete:", e);
    }
  };

  // Export CSV
  const handleExportCSV = () => {
    if (registrations.length === 0) return;

    const headers = [
      "No",
      "Kode Pendaftaran",
      "Nama Lengkap",
      "Nama Panggilan",
      "Gender",
      "NIM",
      "Perguruan Tinggi",
      "Fakultas",
      "Program Studi",
      "Semester",
      "WhatsApp",
      "Email",
      "Mentor Pilihan",
      "Jabatan Mentor",
      "Link WA Mentor",
      "Status",
      "Status Pembayaran",
      "Pas Foto URL",
      "Bukti Transfer URL",
      "Jadwal Screening",
      "Nilai BTQ",
      "Nilai Ke-HMI-an",
      "Nilai Kebangsaan",
      "Hasil Screening",
      "Catatan Screening",
      "Catatan Panitia",
      "Waktu Daftar",
    ];

    const escape = (val: any) => `"${String(val ?? "").replace(/"/g, '""')}"`;

    const rows = filteredAndSorted.map((r, idx) => [
      idx + 1,
      escape(r.registration_code),
      escape(r.full_name),
      escape(r.nickname),
      escape(r.gender),
      escape(r.nim),
      escape(r.university),
      escape(r.faculty),
      escape(r.study_program),
      escape(r.semester),
      escape(r.whatsapp),
      escape(r.email),
      escape(r.mentor_name),
      escape(r.mentor_role),
      escape(r.mentor_whatsapp_group),
      escape(r.status),
      escape(r.payment_status),
      escape(r.photo_url),
      escape(r.payment_proof_url),
      escape(r.screening_schedule),
      escape(r.screening_score_btq),
      escape(r.screening_score_hmi),
      escape(r.screening_score_kebangsaan),
      escape(r.screening_result),
      escape(r.screening_notes),
      escape(r.admin_notes),
      escape(r.submitted_at),
    ]);

    const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `data_pendaftar_lk1_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // KPI Metrics Calculation
  const metrics = {
    total: registrations.length,
    pending: registrations.filter((r) => r.status === "Pending").length,
    screening: registrations.filter((r) => r.status === "Diverifikasi" || r.status === "Mengikuti Screening").length,
    accepted: registrations.filter((r) => r.status === "Diterima" || r.status === "Lulus LK-I").length,
    rejected: registrations.filter((r) => r.status === "Ditolak" || r.status === "Cadangan").length,
  };

  // Filtered & Sorted list
  const filteredAndSorted = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    const result = registrations.filter((item) => {
      const matchQuery =
        !q ||
        (item.full_name || "").toLowerCase().includes(q) ||
        (item.registration_code || "").toLowerCase().includes(q) ||
        (item.nim || "").toLowerCase().includes(q) ||
        (item.whatsapp || "").includes(q) ||
        (item.email || "").toLowerCase().includes(q) ||
        (item.study_program || "").toLowerCase().includes(q) ||
        (item.mentor_name || "").toLowerCase().includes(q);

      const matchStatus = statusFilter === "ALL" || item.status === statusFilter;

      let matchBerkas = true;
      if (berkasFilter === "WITH_PHOTO") matchBerkas = !!item.photo_url;
      else if (berkasFilter === "WITH_PAYMENT") matchBerkas = !!item.payment_proof_url;
      else if (berkasFilter === "NO_FILES") matchBerkas = !item.photo_url && !item.payment_proof_url;

      return matchQuery && matchStatus && matchBerkas;
    });

    result.sort((a, b) => {
      if (sortBy === "NEWEST") {
        const timeA = a.submitted_at ? new Date(a.submitted_at).getTime() : 0;
        const timeB = b.submitted_at ? new Date(b.submitted_at).getTime() : 0;
        return timeB - timeA;
      }
      if (sortBy === "OLDEST") {
        const timeA = a.submitted_at ? new Date(a.submitted_at).getTime() : 0;
        const timeB = b.submitted_at ? new Date(b.submitted_at).getTime() : 0;
        return timeA - timeB;
      }
      if (sortBy === "NAME_ASC") {
        return (a.full_name || "").localeCompare(b.full_name || "");
      }
      if (sortBy === "NAME_DESC") {
        return (b.full_name || "").localeCompare(a.full_name || "");
      }
      if (sortBy === "MAJOR") {
        return (a.study_program || "").localeCompare(b.study_program || "");
      }
      return 0;
    });

    return result;
  }, [registrations, searchQuery, statusFilter, berkasFilter, sortBy]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredAndSorted.length / pageSize));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredAndSorted.length);
  const paginatedList = filteredAndSorted.slice(startIndex, endIndex);

  // Toggle select candidate
  const toggleSelectCandidate = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === paginatedList.length && paginatedList.length > 0) {
      setSelectedIds([]);
    } else {
      setSelectedIds(paginatedList.map((item) => item.id));
    }
  };

  const getStatusBadgeClass = (st: string) => {
    switch (st?.toLowerCase()) {
      case "diterima":
      case "lulus lk-i":
        return "bg-emerald-50 text-emerald-800 border-emerald-300";
      case "mengikuti screening":
      case "diverifikasi":
        return "bg-blue-50 text-blue-800 border-blue-300";
      case "ditolak":
        return "bg-red-50 text-red-800 border-red-300";
      case "cadangan":
        return "bg-purple-50 text-purple-800 border-purple-300";
      default:
        return "bg-amber-50 text-amber-800 border-amber-300";
    }
  };

  const getPaymentBadgeClass = (pst: string) => {
    switch (pst?.toLowerCase()) {
      case "terverifikasi":
      case "gratis":
        return "bg-emerald-50 text-emerald-800 border-emerald-300";
      case "menunggu verifikasi":
        return "bg-blue-50 text-blue-800 border-blue-300";
      case "ditolak":
        return "bg-red-50 text-red-800 border-red-300";
      case "belum bayar":
        return "bg-amber-50 text-amber-800 border-amber-300";
      default:
        return "bg-gray-50 text-gray-700 border-gray-300";
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F6] text-[#10231C]">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-[#BCD7CA] bg-white/95 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl border border-[#DCE8E2] bg-white p-1 sm:p-1.5 shadow-xs">
              <img src="/logo.png" alt="Logo HMI" className="h-6 w-6 sm:h-8 sm:w-8 object-contain" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="rounded bg-[#EAF2EE] px-1.5 py-0.5 text-[9px] sm:text-[10px] font-black uppercase text-[#006144]">
                  Panitia
                </span>
                <span className="hidden xs:inline text-[11px] sm:text-xs font-bold text-[#4B6259]">HMI Saintek</span>
              </div>
              <h2 className="text-xs sm:text-base font-black text-[#10231C] truncate max-w-[130px] xs:max-w-[180px] sm:max-w-none">
                Monitoring LK-I
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setActiveTab("mentors")}
              className={`inline-flex items-center gap-1 sm:gap-1.5 rounded-full border px-2.5 sm:px-3 py-1.5 text-xs font-bold transition-all ${
                activeTab === "mentors"
                  ? "border-[#006144] bg-[#EAF2EE] text-[#006144] ring-2 ring-[#006144]/20"
                  : "border-[#DCE8E2] bg-white text-[#4B6259] hover:bg-[#F6F8F7]"
              }`}
              title="Pengaturan Mentor & Grup WA"
            >
              <UserCheck className="h-3.5 w-3.5 text-[#006144]" />
              <span className="hidden md:inline">Setting Mentor</span>
            </button>

            <Link
              href="/kaderisasi/daftar-lk-1"
              target="_blank"
              className="hidden lg:inline-flex items-center gap-1.5 rounded-full border border-[#DCE8E2] bg-white px-3.5 py-1.5 text-xs font-bold text-[#006144] hover:bg-[#F6F8F7]"
            >
              <span>Lihat Formulir LK-I</span>
              <ExternalLink className="h-3 w-3" />
            </Link>

            <button
              type="button"
              onClick={handleExportCSV}
              className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full bg-[#006144] px-2.5 sm:px-3.5 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#003324] active:scale-95 transition-all"
              title="Export CSV"
            >
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>

            <button
              type="button"
              onClick={fetchRegistrations}
              disabled={isLoading}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DCE8E2] bg-white text-gray-500 hover:text-[#006144] hover:bg-[#F6F8F7] active:scale-95"
              title="Refresh Data"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? "animate-spin text-[#006144]" : ""}`} />
            </button>

            <button
              type="button"
              onClick={onLogout}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100 active:scale-95"
              title="Keluar"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 space-y-6">
        {/* KPI Metrics Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          <div
            onClick={() => setStatusFilter("ALL")}
            className={`cursor-pointer rounded-2xl border p-4 transition-all hover:shadow-xs ${
              statusFilter === "ALL"
                ? "border-[#006144] bg-[#F0FDF4] ring-2 ring-[#006144]/20"
                : "border-[#DCE8E2] bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#4B6259]">Semua Pendaftar</span>
              <Users className="h-4 w-4 text-[#006144]" />
            </div>
            <p className="mt-2 text-2xl font-black text-[#10231C]">{metrics.total}</p>
          </div>

          <div
            onClick={() => setStatusFilter("Pending")}
            className={`cursor-pointer rounded-2xl border p-4 transition-all hover:shadow-xs ${
              statusFilter === "Pending"
                ? "border-amber-500 bg-amber-50 ring-2 ring-amber-500/20"
                : "border-[#DCE8E2] bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-700">Pending</span>
              <Clock className="h-4 w-4 text-amber-600" />
            </div>
            <p className="mt-2 text-2xl font-black text-amber-800">{metrics.pending}</p>
          </div>

          <div
            onClick={() => setStatusFilter("Mengikuti Screening")}
            className={`cursor-pointer rounded-2xl border p-4 transition-all hover:shadow-xs ${
              statusFilter === "Mengikuti Screening" || statusFilter === "Diverifikasi"
                ? "border-blue-500 bg-blue-50 ring-2 ring-blue-500/20"
                : "border-[#DCE8E2] bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-blue-700">Screening</span>
              <Award className="h-4 w-4 text-blue-600" />
            </div>
            <p className="mt-2 text-2xl font-black text-blue-800">{metrics.screening}</p>
          </div>

          <div
            onClick={() => setStatusFilter("Diterima")}
            className={`cursor-pointer rounded-2xl border p-4 transition-all hover:shadow-xs ${
              statusFilter === "Diterima" || statusFilter === "Lulus LK-I"
                ? "border-emerald-500 bg-emerald-50 ring-2 ring-emerald-500/20"
                : "border-[#DCE8E2] bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-700">Diterima / Lulus</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            </div>
            <p className="mt-2 text-2xl font-black text-emerald-800">{metrics.accepted}</p>
          </div>

          <div
            onClick={() => setStatusFilter("Ditolak")}
            className={`col-span-2 sm:col-span-1 cursor-pointer rounded-2xl border p-4 transition-all hover:shadow-xs ${
              statusFilter === "Ditolak" || statusFilter === "Cadangan"
                ? "border-red-500 bg-red-50 ring-2 ring-red-500/20"
                : "border-[#DCE8E2] bg-white"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-red-700">Ditolak / Cadangan</span>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </div>
            <p className="mt-2 text-2xl font-black text-red-800">{metrics.rejected}</p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-2 text-xs flex-nowrap border-b border-[#DCE8E2]">
          <button
            type="button"
            onClick={() => setActiveTab("list")}
            className={`shrink-0 inline-flex items-center gap-1.5 rounded-xl px-3 sm:px-4 py-2 text-xs font-bold transition-all ${
              activeTab === "list"
                ? "bg-[#006144] text-white shadow-xs"
                : "bg-white border border-[#DCE8E2] text-[#4B6259] hover:bg-[#F6F8F7]"
            }`}
          >
            <Users className="h-4 w-4" />
            <span>Daftar Pendaftar ({filteredAndSorted.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("analytics")}
            className={`shrink-0 inline-flex items-center gap-1.5 rounded-xl px-3 sm:px-4 py-2 text-xs font-bold transition-all ${
              activeTab === "analytics"
                ? "bg-[#006144] text-white shadow-xs"
                : "bg-white border border-[#DCE8E2] text-[#4B6259] hover:bg-[#F6F8F7]"
            }`}
          >
            <BarChart2 className="h-4 w-4" />
            <span>Grafik Persebaran & Mentor</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("mentors")}
            className={`shrink-0 inline-flex items-center gap-1.5 rounded-xl px-3 sm:px-4 py-2 text-xs font-bold transition-all ${
              activeTab === "mentors"
                ? "bg-[#006144] text-white shadow-xs"
                : "bg-white border border-[#DCE8E2] text-[#4B6259] hover:bg-[#F6F8F7]"
            }`}
          >
            <UserCheck className="h-4 w-4" />
            <span>Pengaturan Mentor & Grup WA</span>
          </button>
        </div>

        {/* Mentors Management Tab */}
        {activeTab === "mentors" && (
          <div className="animate-fade-in">
            <MentorManagement adminKey={adminKey} registrations={registrations} />
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <div className="animate-fade-in">
            <CandidateCharts registrations={registrations} />
          </div>
        )}

        {/* List Tab */}
        {activeTab === "list" && (
          <div className="space-y-4 animate-fade-in">
            {/* Filter & Search Toolbar */}
            <div className="rounded-2xl border border-[#DCE8E2] bg-white p-4 shadow-xs space-y-3">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Cari nama, NIM, prodi, WA, atau kode pendaftaran..."
                    className="w-full rounded-xl border border-[#DCE8E2] bg-white py-2 pl-10 pr-4 text-xs sm:text-sm text-[#10231C] placeholder:text-gray-400 outline-none focus:border-[#006B3F] focus:ring-2 focus:ring-[#006144]/20"
                  />
                </div>

                <div className="grid grid-cols-2 sm:flex sm:items-center gap-2">
                  <select
                    value={berkasFilter}
                    onChange={(e) => setBerkasFilter(e.target.value as any)}
                    className="w-full sm:w-auto rounded-xl border border-[#DCE8E2] bg-white px-2.5 sm:px-3 py-2 text-xs font-medium text-[#10231C] outline-none focus:border-[#006B3F]"
                  >
                    <option value="ALL">Semua Berkas</option>
                    <option value="WITH_PHOTO">Ada Pas Foto</option>
                    <option value="WITH_PAYMENT">Ada Bukti Bayar</option>
                    <option value="NO_FILES">Tanpa Berkas</option>
                  </select>

                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="w-full sm:w-auto rounded-xl border border-[#DCE8E2] bg-white px-2.5 sm:px-3 py-2 text-xs font-medium text-[#10231C] outline-none focus:border-[#006B3F]"
                  >
                    <option value="NEWEST">Terbaru</option>
                    <option value="OLDEST">Terlama</option>
                    <option value="NAME_ASC">Nama (A-Z)</option>
                    <option value="NAME_DESC">Nama (Z-A)</option>
                    <option value="MAJOR">Prodi</option>
                  </select>

                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                    className="col-span-2 sm:col-span-1 w-full sm:w-auto rounded-xl border border-[#DCE8E2] bg-white px-2.5 sm:px-3 py-2 text-xs font-medium text-[#10231C] outline-none focus:border-[#006B3F]"
                  >
                    <option value={10}>10 Baris</option>
                    <option value={15}>15 Baris</option>
                    <option value={25}>25 Baris</option>
                    <option value={50}>50 Baris</option>
                  </select>
                </div>
              </div>

              {/* Status Filter Horizontal Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
                <span className="text-[11px] font-bold text-[#4B6259] shrink-0 mr-1">Status:</span>
                {[
                  { key: "ALL", label: `Semua (${registrations.length})` },
                  { key: "Pending", label: `Pending (${registrations.filter((r) => r.status === "Pending").length})` },
                  { key: "Diverifikasi", label: `Diverifikasi (${registrations.filter((r) => r.status === "Diverifikasi").length})` },
                  { key: "Mengikuti Screening", label: `Screening (${registrations.filter((r) => r.status === "Mengikuti Screening").length})` },
                  { key: "Diterima", label: `Diterima (${registrations.filter((r) => r.status === "Diterima").length})` },
                  { key: "Lulus LK-I", label: `Lulus (${registrations.filter((r) => r.status === "Lulus LK-I").length})` },
                  { key: "Cadangan", label: `Cadangan (${registrations.filter((r) => r.status === "Cadangan").length})` },
                  { key: "Ditolak", label: `Ditolak (${registrations.filter((r) => r.status === "Ditolak").length})` },
                ].map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => setStatusFilter(s.key)}
                    className={`rounded-full px-3 py-1 text-[11px] font-bold whitespace-nowrap transition-all ${
                      statusFilter === s.key
                        ? "bg-[#006144] text-white shadow-xs"
                        : "bg-[#F6F8F7] text-[#4B6259] hover:bg-[#EAF2EE]"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Bulk Action Bar (Visible when candidates are selected) */}
            {selectedIds.length > 0 && (
              <div className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-[#25D366] bg-[#F0FDF4] p-3 text-xs shadow-xs animate-fade-in">
                <div className="flex items-center gap-2 text-[#006144] font-bold">
                  <CheckSquare className="h-4 w-4" />
                  <span>{selectedIds.length} Pendaftar Terpilih</span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <select
                    onChange={(e) => {
                      if (e.target.value) {
                        handleBulkStatusUpdate(e.target.value);
                        e.target.value = "";
                      }
                    }}
                    className="rounded-xl border border-[#BCD7CA] bg-white px-2.5 py-1.5 text-xs font-bold text-[#006144] outline-none"
                  >
                    <option value="">Ubah Status Massal...</option>
                    {statusOptions.map((st) => (
                      <option key={st} value={st}>
                        Ubah ke: {st}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => setIsBulkModalOpen(true)}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-[#25D366] px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-[#1EBE5D] active:scale-95"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>Broadcast WA</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleBulkDelete}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-red-600 px-3 py-1.5 text-xs font-bold text-white shadow-xs hover:bg-red-700 active:scale-95"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Hapus Massal</span>
                  </button>
                </div>
              </div>
            )}

            {/* Table & Cards Container */}
            <div className="overflow-hidden rounded-2xl border border-[#DCE8E2] bg-white shadow-xs">
              
              {/* MOBILE CARD VIEW (< lg) */}
              <div className="block lg:hidden divide-y divide-[#EAF2EE]">
                {paginatedList.map((item) => {
                  const isSelected = selectedIds.includes(item.id);
                  const cleanWa = (item.whatsapp || "").replace(/[^0-9]/g, "").replace(/^0/, "62");
                  return (
                    <div
                      key={item.id}
                      className={`p-3.5 space-y-2.5 transition-colors ${
                        isSelected ? "bg-[#F0FDF4]" : "hover:bg-[#F9FBFA]"
                      }`}
                    >
                      {/* Top: Checkbox, Name, Reg Code, Status */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5 min-w-0 flex-1">
                          <button
                            type="button"
                            onClick={() => toggleSelectCandidate(item.id)}
                            className="mt-0.5 text-gray-500 hover:text-[#006144]"
                          >
                            {isSelected ? (
                              <CheckSquare className="h-4 w-4 text-[#006144]" />
                            ) : (
                              <Square className="h-4 w-4" />
                            )}
                          </button>
                          <div className="min-w-0 flex-1">
                            <button
                              type="button"
                              onClick={() => setSelectedCandidate(item)}
                              className="font-black text-xs text-[#10231C] hover:text-[#006144] hover:underline text-left block truncate"
                            >
                              {item.full_name || item.fullName}
                            </button>
                            <span className="font-mono text-[10px] font-bold text-[#006144] block">
                              {item.registration_code || item.registrationCode}
                            </span>
                            <span className="text-[10px] text-[#4B6259] block truncate">
                              NIM: {item.nim} • {item.study_program || item.studyProgram}
                            </span>
                          </div>
                        </div>

                        {/* Status Dropdown */}
                        <div className="shrink-0">
                          <select
                            value={item.status || "Pending"}
                            onChange={(e) => handleUpdateStatus(item.id, e.target.value)}
                            className={`rounded-lg px-2 py-1 text-[10px] font-black border uppercase tracking-wider outline-none ${getStatusBadgeClass(
                              item.status
                            )}`}
                          >
                            {statusOptions.map((st) => (
                              <option key={st} value={st} className="text-gray-900 normal-case font-medium">
                                {st}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Middle: Mentor & Payment Info */}
                      <div className="grid grid-cols-2 gap-2 text-[11px]">
                        <div className="rounded-xl border border-[#DCE8E2] bg-[#F6F8F7] p-2">
                          <span className="text-[10px] font-bold text-[#4B6259] block">Mentor Pilihan:</span>
                          <span className="font-bold text-[#10231C] truncate block text-[11px]">
                            {item.mentor_name || item.mentorName || "Belum Pilih"}
                          </span>
                          {item.mentor_whatsapp_group && (
                            <a
                              href={item.mentor_whatsapp_group}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-[10px] font-bold text-[#25D366] hover:underline mt-0.5"
                            >
                              <MessageCircle className="h-2.5 w-2.5" />
                              <span>Grup WA</span>
                              <ExternalLink className="h-2 w-2" />
                            </a>
                          )}
                        </div>

                        <div className="rounded-xl border border-[#DCE8E2] bg-[#F6F8F7] p-2">
                          <span className="text-[10px] font-bold text-[#4B6259] block">Pembayaran & Berkas:</span>
                          <div className="flex items-center justify-between gap-1 mt-0.5">
                            <select
                              value={item.payment_status || "Belum Dicek"}
                              onChange={(e) => handleUpdatePaymentStatus(item.id, e.target.value)}
                              className={`rounded px-1.5 py-0.5 text-[9px] font-bold border ${getPaymentBadgeClass(
                                item.payment_status
                              )}`}
                            >
                              {paymentStatusOptions.map((pst) => (
                                <option key={pst} value={pst} className="text-gray-900">
                                  {pst}
                                </option>
                              ))}
                            </select>

                            <div className="flex gap-1.5 text-[10px] font-bold text-[#006144]">
                              {item.photo_url && (
                                <a href={item.photo_url} target="_blank" rel="noreferrer" className="hover:underline">
                                  Foto ↗
                                </a>
                              )}
                              {item.payment_proof_url && (
                                <a href={item.payment_proof_url} target="_blank" rel="noreferrer" className="hover:underline">
                                  Bayar ↗
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Action Row */}
                      <div className="flex items-center justify-between pt-1 text-xs">
                        {cleanWa ? (
                          <a
                            href={`https://wa.me/${cleanWa}?text=${encodeURIComponent(
                              `Halo ${item.full_name || item.fullName}, kami dari Panitia LK-I HMI Saintek...`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 border border-emerald-200 px-2.5 py-1 text-[11px] font-bold text-emerald-800 hover:bg-emerald-100"
                          >
                            <MessageCircle className="h-3 w-3 text-[#25D366]" />
                            <span>WA Calon</span>
                          </a>
                        ) : (
                          <span className="text-[10px] text-gray-400">Tidak ada WA</span>
                        )}

                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => setSelectedCandidate(item)}
                            className="rounded-lg border border-[#DCE8E2] bg-white px-2 py-1 text-[11px] font-bold text-[#006144] hover:bg-[#EAF2EE]"
                          >
                            Detail
                          </button>
                          <button
                            type="button"
                            onClick={() => setScreeningCandidate(item)}
                            className="rounded-lg border border-blue-200 bg-blue-50 px-2 py-1 text-[11px] font-bold text-blue-800 hover:bg-blue-100"
                          >
                            Screening
                          </button>
                          <button
                            type="button"
                            onClick={() => setCardCandidate(item)}
                            className="rounded-lg border border-purple-200 bg-purple-50 p-1 text-purple-800 hover:bg-purple-100"
                            title="Cetak Kartu"
                          >
                            <Printer className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteCandidate(
                                item.id,
                                item.full_name || item.fullName || "Pendaftar"
                              )
                            }
                            className="rounded-lg border border-red-200 bg-red-50 p-1 text-red-600 hover:bg-red-100"
                            title="Hapus"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* DESKTOP TABLE VIEW (hidden on < lg) */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full text-left text-xs text-[#10231C]">
                  <thead className="border-b border-[#DCE8E2] bg-[#F9FBFA] text-[11px] font-bold text-[#4B6259]">
                    <tr>
                      <th className="p-3 text-center w-10">
                        <button
                          type="button"
                          onClick={toggleSelectAll}
                          className="flex items-center justify-center text-gray-500 hover:text-[#006144]"
                        >
                          {selectedIds.length === paginatedList.length && paginatedList.length > 0 ? (
                            <CheckSquare className="h-4 w-4 text-[#006144]" />
                          ) : (
                            <Square className="h-4 w-4" />
                          )}
                        </button>
                      </th>
                      <th className="p-3">Calon Peserta</th>
                      <th className="p-3">Program Studi & NIM</th>
                      <th className="p-3">Mentor Pilihan</th>
                      <th className="p-3">Berkas</th>
                      <th className="p-3">Status Verifikasi</th>
                      <th className="p-3">Pembayaran</th>
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#EAF2EE]">
                    {paginatedList.map((item) => {
                      const isSelected = selectedIds.includes(item.id);
                      return (
                        <tr
                          key={item.id}
                          className={`hover:bg-[#F9FBFA] transition-colors ${
                            isSelected ? "bg-[#F0FDF4]" : ""
                          }`}
                        >
                          {/* Checkbox */}
                          <td className="p-3 text-center">
                            <button
                              type="button"
                              onClick={() => toggleSelectCandidate(item.id)}
                              className="text-gray-500 hover:text-[#006144]"
                            >
                              {isSelected ? (
                                <CheckSquare className="h-4 w-4 text-[#006144]" />
                              ) : (
                                <Square className="h-4 w-4" />
                              )}
                            </button>
                          </td>

                          {/* Calon Peserta */}
                          <td className="p-3">
                            <button
                              type="button"
                              onClick={() => setSelectedCandidate(item)}
                              className="font-bold text-[#10231C] hover:text-[#006144] hover:underline text-left block"
                            >
                              {item.full_name || item.fullName}
                            </button>
                            <span className="font-mono text-[10px] text-[#006144] block">
                              {item.registration_code || item.registrationCode}
                            </span>
                            <span className="text-[10px] text-[#4B6259]">
                              {item.whatsapp} • {item.gender}
                            </span>
                          </td>

                          {/* Prodi & NIM */}
                          <td className="p-3">
                            <span className="font-semibold block">{item.study_program || item.studyProgram}</span>
                            <span className="text-[10px] text-[#4B6259] block">
                              NIM: {item.nim} (Sem. {item.semester})
                            </span>
                          </td>

                          {/* Mentor Pilihan */}
                          <td className="p-3">
                            {item.mentor_name || item.mentorName ? (
                              <div>
                                <span className="font-bold text-[#006144] block truncate max-w-[150px]">
                                  {item.mentor_name || item.mentorName}
                                </span>
                                {(item.mentor_role || item.mentorRole) && (
                                  <span className="text-[9px] font-bold text-[#4B6259] bg-[#EAF2EE] px-1.5 py-0.5 rounded">
                                    {item.mentor_role || item.mentorRole}
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-gray-400 italic text-[11px]">-</span>
                            )}
                          </td>

                          {/* Berkas */}
                          <td className="p-3">
                            <div className="flex items-center gap-1.5">
                              {item.photo_url ? (
                                <a
                                  href={item.photo_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Lihat Pas Foto"
                                  className="rounded bg-[#EAF2EE] px-1.5 py-0.5 text-[10px] font-bold text-[#006144] hover:bg-[#BCD7CA]"
                                >
                                  Foto ✓
                                </a>
                              ) : (
                                <span className="text-[10px] text-gray-400">No Foto</span>
                              )}

                              {item.payment_proof_url ? (
                                <a
                                  href={item.payment_proof_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  title="Lihat Bukti Bayar"
                                  className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-bold text-blue-700 hover:bg-blue-100"
                                >
                                  Bukti ✓
                                </a>
                              ) : (
                                <span className="text-[10px] text-gray-400">No Bukti</span>
                              )}
                            </div>
                          </td>

                          {/* Status Verifikasi (Inline Select) */}
                          <td className="p-3">
                            <select
                              value={item.status || "Pending"}
                              onChange={(e) => handleUpdateStatus(item.id, e.target.value)}
                              className={`rounded-lg border px-2 py-1 text-[11px] font-bold outline-none cursor-pointer ${getStatusBadgeClass(
                                item.status
                              )}`}
                            >
                              {statusOptions.map((st) => (
                                <option key={st} value={st}>
                                  {st}
                                </option>
                              ))}
                            </select>
                          </td>

                          {/* Pembayaran (Inline Select) */}
                          <td className="p-3">
                            <select
                              value={item.payment_status || "Belum Dicek"}
                              onChange={(e) => handleUpdatePaymentStatus(item.id, e.target.value)}
                              className="rounded-lg border border-[#DCE8E2] bg-white px-2 py-1 text-[11px] font-semibold text-[#10231C] outline-none cursor-pointer"
                            >
                              {paymentStatusOptions.map((ps) => (
                                <option key={ps} value={ps}>
                                  {ps}
                                </option>
                              ))}
                            </select>
                          </td>

                          {/* Aksi */}
                          <td className="p-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              {/* Screening Input */}
                              <button
                                type="button"
                                onClick={() => setScreeningCandidate(item)}
                                title="Nilai & Jadwal Screening"
                                className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#EAF2EE] text-[#006144] hover:bg-[#BCD7CA]"
                              >
                                <Award className="h-3.5 w-3.5" />
                              </button>

                              {/* Cetak Kartu */}
                              <button
                                type="button"
                                onClick={() => setCardCandidate(item)}
                                title="Cetak Kartu Peserta"
                                className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-[#DCE8E2] text-gray-600 hover:text-[#006144]"
                              >
                                <Printer className="h-3.5 w-3.5" />
                              </button>

                              {/* WA Chat */}
                              <button
                                type="button"
                                onClick={() => {
                                  let phone = (item.whatsapp || "").replace(/[^0-9]/g, "");
                                  if (phone.startsWith("0")) phone = "62" + phone.slice(1);
                                  window.open(
                                    `https://wa.me/${phone}?text=Halo%20${encodeURIComponent(
                                      item.full_name
                                    )}%2C%20kami%20dari%20Panitia%20LK-I%20HMI%20Saintek...`,
                                    "_blank"
                                  );
                                }}
                                title="Chat WhatsApp"
                                className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-[#25D366] hover:bg-emerald-100"
                              >
                                <MessageCircle className="h-3.5 w-3.5" />
                              </button>

                              {/* Detail Drawer */}
                              <button
                                type="button"
                                onClick={() => setSelectedCandidate(item)}
                                title="Lihat Detail"
                                className="flex h-7 w-7 items-center justify-center rounded-lg bg-white border border-[#DCE8E2] text-gray-600 hover:text-[#006144]"
                              >
                                <Eye className="h-3.5 w-3.5" />
                              </button>

                              {/* Delete */}
                              <button
                                type="button"
                                onClick={() => handleDeleteCandidate(item.id, item.full_name || item.fullName)}
                                title="Hapus"
                                className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-50 text-red-600 hover:bg-red-100"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {paginatedList.length === 0 && (
                <div className="p-8 text-center text-xs text-[#4B6259]">
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <RefreshCw className="h-4 w-4 animate-spin text-[#006144]" />
                      <span>Memuat data pendaftar...</span>
                    </div>
                  ) : (
                    <span>Tidak ada data pendaftar yang cocok dengan filter.</span>
                  )}
                </div>
              )}

              {/* Pagination Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#DCE8E2] bg-[#F9FBFA] p-3 text-xs text-[#4B6259]">
                <span>
                  Menampilkan {startIndex + 1} - {endIndex} dari {filteredAndSorted.length} pendaftar
                </span>

                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={validCurrentPage === 1}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#DCE8E2] bg-white disabled:opacity-40"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <span className="px-2 text-xs font-bold text-[#10231C]">
                    Halaman {validCurrentPage} dari {totalPages}
                  </span>
                  <button
                    type="button"
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={validCurrentPage === totalPages}
                    className="flex h-7 w-7 items-center justify-center rounded-lg border border-[#DCE8E2] bg-white disabled:opacity-40"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================
          CANDIDATE DETAIL MODAL / DRAWER
          ======================================================== */}
      {selectedCandidate && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 p-0 sm:p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedCandidate(null)}
        >
          <div
            className="relative w-full max-w-2xl max-h-[90vh] sm:max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-[#BCD7CA] bg-white p-4 sm:p-7 shadow-2xl space-y-4 sm:space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#DCE8E2] pb-3">
              <div>
                <span className="font-mono text-xs font-bold text-[#006144]">
                  {selectedCandidate.registration_code || selectedCandidate.registrationCode}
                </span>
                <h3 className="text-base sm:text-lg font-black text-[#10231C]">
                  {selectedCandidate.full_name || selectedCandidate.fullName}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedCandidate(null)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F6F8F7] text-gray-400 hover:bg-[#EAF2EE]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Candidate Details Grid */}
            <div className="grid gap-3 sm:grid-cols-2 text-xs">
              <div className="rounded-xl border border-[#DCE8E2] p-3 space-y-1.5">
                <span className="font-bold text-[#006144] block">Data Akademik:</span>
                <p>Kampus: <strong>{selectedCandidate.university}</strong></p>
                <p>Fakultas: <strong>{selectedCandidate.faculty}</strong></p>
                <p>Jurusan: <strong>{selectedCandidate.study_program || selectedCandidate.studyProgram}</strong></p>
                <p>NIM: <strong>{selectedCandidate.nim}</strong> (Semester {selectedCandidate.semester})</p>
                {selectedCandidate.class_name && <p>Kelas: <strong>{selectedCandidate.class_name}</strong></p>}
              </div>

              <div className="rounded-xl border border-[#DCE8E2] p-3 space-y-1.5">
                <span className="font-bold text-[#006144] block">Kontak & Domisili:</span>
                <p>WhatsApp: <strong>{selectedCandidate.whatsapp}</strong></p>
                <p>Email: <strong>{selectedCandidate.email}</strong></p>
                <p>Gender: <strong>{selectedCandidate.gender}</strong></p>
                {selectedCandidate.address && <p>Alamat: <strong>{selectedCandidate.address}</strong></p>}
              </div>

              {/* Mentor Pilihan */}
              <div className="sm:col-span-2 rounded-xl border border-[#BCD7CA] bg-[#F0FDF4] p-3.5 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#006144] flex items-center gap-1.5">
                    <Users className="h-4 w-4" />
                    <span>Mentor Bimbingan Pilihan:</span>
                  </span>
                  {selectedCandidate.mentor_role && (
                    <span className="rounded bg-[#006144] px-2 py-0.5 text-[10px] font-bold text-white">
                      {selectedCandidate.mentor_role}
                    </span>
                  )}
                </div>
                <h4 className="text-sm font-black text-[#10231C]">
                  {selectedCandidate.mentor_name || "Belum Memilih Mentor"}
                </h4>
                {selectedCandidate.mentor_whatsapp_group && (
                  <a
                    href={selectedCandidate.mentor_whatsapp_group}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#25D366] hover:underline"
                  >
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>Buka Link Grup WhatsApp Mentor</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>

              {/* Motivasi & Minat */}
              <div className="sm:col-span-2 rounded-xl border border-[#DCE8E2] p-3 space-y-2">
                <div>
                  <span className="font-bold text-[#006144] block">Motivasi LK-I:</span>
                  <p className="mt-0.5 text-[#2D4A3E] leading-relaxed">
                    "{selectedCandidate.motivation}"
                  </p>
                </div>
                {selectedCandidate.organization_experience && (
                  <div>
                    <span className="font-bold text-[#006144] block">Pengalaman Organisasi:</span>
                    <p className="mt-0.5 text-[#4B6259]">
                      {selectedCandidate.organization_experience}
                    </p>
                  </div>
                )}
              </div>

              {/* Tautan Berkas */}
              <div className="sm:col-span-2 rounded-xl border border-[#DCE8E2] bg-[#F9FBFA] p-3 space-y-2">
                <span className="font-bold text-[#006144] block">Tautan Berkas Google Drive:</span>
                <div className="flex flex-col sm:flex-row gap-2">
                  {selectedCandidate.photo_url ? (
                    <a
                      href={selectedCandidate.photo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-[#BCD7CA] px-3 py-1.5 font-bold text-[#006144] hover:bg-[#EAF2EE]"
                    >
                      <span>Lihat Pas Foto</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="text-gray-400">Tidak ada pas foto</span>
                  )}

                  {selectedCandidate.payment_proof_url ? (
                    <a
                      href={selectedCandidate.payment_proof_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-white border border-[#BCD7CA] px-3 py-1.5 font-bold text-[#006144] hover:bg-[#EAF2EE]"
                    >
                      <span>Lihat Bukti Bayar</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="text-gray-400">Belum ada bukti bayar</span>
                  )}
                </div>
              </div>

              {/* Catatan Panitia */}
              <div className="sm:col-span-2 space-y-2">
                <label className="font-bold text-[#10231C] block">Catatan Internal Panitia:</label>
                <div className="flex gap-2">
                  <textarea
                    rows={2}
                    value={adminNoteInput}
                    onChange={(e) => setAdminNoteInput(e.target.value)}
                    placeholder="Tulis catatan verifikasi atau arahan untuk pendaftar ini..."
                    className="flex-1 rounded-xl border border-[#DCE8E2] bg-white p-2.5 text-xs outline-none focus:border-[#006B3F]"
                  />
                  <button
                    type="button"
                    onClick={handleSaveAdminNote}
                    disabled={isSavingNote}
                    className="self-end inline-flex items-center gap-1 rounded-xl bg-[#006144] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#003324]"
                  >
                    {isSavingNote ? (
                      <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    ) : noteSavedSuccess ? (
                      <Check className="h-3.5 w-3.5" />
                    ) : (
                      <Save className="h-3.5 w-3.5" />
                    )}
                    <span>Simpan</span>
                  </button>
                </div>
                {noteSavedSuccess && (
                  <p className="text-[11px] font-bold text-emerald-600">✓ Catatan berhasil disimpan!</p>
                )}
              </div>
            </div>

            {/* Quick Actions at bottom of modal */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-[#DCE8E2] pt-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setCardCandidate(selectedCandidate);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#DCE8E2] bg-white px-3.5 py-2 text-xs font-bold text-[#006144] hover:bg-[#F6F8F7]"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>Lihat Kartu Peserta</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setScreeningCandidate(selectedCandidate);
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl bg-[#006144] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#003324]"
                >
                  <Award className="h-3.5 w-3.5" />
                  <span>Nilai Screening</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  let phone = (selectedCandidate.whatsapp || "").replace(/[^0-9]/g, "");
                  if (phone.startsWith("0")) phone = "62" + phone.slice(1);
                  window.open(`https://wa.me/${phone}`, "_blank");
                }}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#25D366] px-4 py-2 text-xs font-bold text-white hover:bg-[#1EBE5D]"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span>Chat Peserta</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Screening Modal */}
      {screeningCandidate && (
        <ScreeningModal
          candidate={screeningCandidate}
          onClose={() => setScreeningCandidate(null)}
          onSaved={(updated) => {
            setRegistrations((prev) =>
              prev.map((r) => (r.id === updated.id ? { ...r, ...updated } : r))
            );
            if (selectedCandidate?.id === updated.id) {
              setSelectedCandidate((prev: any) => ({ ...prev, ...updated }));
            }
          }}
        />
      )}

      {/* Participant ID Card Modal */}
      {cardCandidate && (
        <ParticipantCardModal
          isOpen={!!cardCandidate}
          onClose={() => setCardCandidate(null)}
          data={{
            registrationCode: cardCandidate.registration_code || cardCandidate.registrationCode || "",
            fullName: cardCandidate.full_name || cardCandidate.fullName || "",
            nickname: cardCandidate.nickname,
            gender: cardCandidate.gender,
            birthPlace: cardCandidate.birth_place,
            birthDate: cardCandidate.birth_date,
            nim: cardCandidate.nim || "",
            studyProgram: cardCandidate.study_program || cardCandidate.studyProgram || "",
            faculty: cardCandidate.faculty,
            university: cardCandidate.university || "UIN SGD Bandung",
            semester: typeof cardCandidate.semester === "number" ? cardCandidate.semester : Number(cardCandidate.semester) || 1,
            className: cardCandidate.class_name,
            whatsapp: cardCandidate.whatsapp || "",
            email: cardCandidate.email || "",
            address: cardCandidate.address,
            mentorId: cardCandidate.mentor_id,
            mentorName: cardCandidate.mentor_name || cardCandidate.mentorName,
            mentorRole: cardCandidate.mentor_role || cardCandidate.mentorRole,
            mentorWhatsappGroup: cardCandidate.mentor_whatsapp_group || cardCandidate.mentorWhatsappGroup,
            motivation: cardCandidate.motivation,
            organizationExperience: cardCandidate.organization_experience,
            interestFields: cardCandidate.interest_fields,
            photoUrl: cardCandidate.photo_url,
            paymentProofUrl: cardCandidate.payment_proof_url,
            status: cardCandidate.status || "Pending",
          }}
          registrationCode={cardCandidate.registration_code || cardCandidate.registrationCode}
        />
      )}

      {/* Bulk WhatsApp Modal */}
      {isBulkModalOpen && (
        <BulkWhatsAppModal
          isOpen={isBulkModalOpen}
          onClose={() => setIsBulkModalOpen(false)}
          selectedCandidates={registrations.filter((r) => selectedIds.includes(r.id))}
        />
      )}
    </div>
  );
};
