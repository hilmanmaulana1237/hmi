"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  ShieldAlert,
  Search,
  Users,
  Award,
  Clock,
  MessageCircle,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { useFormCache } from "./use-form-cache";
import { StepDataDiri } from "./steps/step-data-diri";
import { StepDataAkademik } from "./steps/step-data-akademik";
import { StepMotivasi } from "./steps/step-motivasi";
import { StepPilihMentor } from "./steps/step-pilih-mentor";
import { StepUploadBerkas } from "./steps/step-upload-berkas";
import { StepKonfirmasi } from "./steps/step-konfirmasi";
import { RegistrationSuccess } from "./registration-success";
import { StatusCheckModal } from "./status-check-modal";
import { TimelineSection } from "./timeline-section";
import { FloatingWhatsApp } from "./floating-whatsapp";
import type { MentorItem } from "./types";
import { defaultMentors } from "@/lib/default-mentors";

const steps = [
  { title: "Data Diri", short: "Diri", desc: "Identitas Calon Peserta" },
  { title: "Data Akademik", short: "Akademik", desc: "Kampus & Jurusan" },
  { title: "Motivasi", short: "Motivasi", desc: "Latar Belakang & Minat" },
  { title: "Pilih Mentor", short: "Mentor", desc: "Idola & Grup WA" },
  { title: "Upload Berkas", short: "Berkas", desc: "Link Google Drive" },
  { title: "Konfirmasi", short: "Review", desc: "Review & Persetujuan" },
];

interface LK1RegistrationPortalProps {
  initialMentors?: MentorItem[];
}

export const LK1RegistrationPortal: React.FC<LK1RegistrationPortalProps> = ({
  initialMentors = defaultMentors,
}) => {
  const {
    formData,
    step,
    setStep,
    updateField,
    toggleInterestField,
    clearCache,
    isLoaded,
  } = useFormCache();

  const [mentors, setMentors] = useState<MentorItem[]>(initialMentors);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedCode, setSubmittedCode] = useState<string | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [statusQuery, setStatusQuery] = useState("");
  const [honeypot, setHoneypot] = useState("");

  // Fetch updated mentors from CMS API
  useEffect(() => {
    async function loadMentors() {
      try {
        const res = await fetch("/api/mentors");
        const data = await res.json();
        if (data.ok && Array.isArray(data.mentors) && data.mentors.length > 0) {
          setMentors(data.mentors);
        }
      } catch (e) {
        console.warn("Could not fetch latest mentors, using fallback:", e);
      }
    }
    loadMentors();
  }, []);

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);

  const validateStep = (currentStep: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (currentStep === 0) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = "Nama lengkap wajib diisi.";
      } else if (formData.fullName.trim().length < 3) {
        newErrors.fullName = "Nama lengkap minimal 3 karakter.";
      }

      if (!formData.gender) {
        newErrors.gender = "Pilih jenis kelamin.";
      }

      if (!formData.whatsapp.trim()) {
        newErrors.whatsapp = "Nomor WhatsApp wajib diisi.";
      } else if (formData.whatsapp.trim().length < 8) {
        newErrors.whatsapp = "Nomor WhatsApp minimal 8 digit.";
      }

      if (!formData.email.trim()) {
        newErrors.email = "Alamat email wajib diisi.";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
        newErrors.email = "Format alamat email tidak valid.";
      }
    }

    if (currentStep === 1) {
      if (!formData.university.trim()) {
        newErrors.university = "Nama perguruan tinggi / universitas wajib diisi.";
      }
      if (!formData.studyProgram.trim()) {
        newErrors.studyProgram = "Program studi / jurusan wajib diisi.";
      }
      if (!formData.nim.trim()) {
        newErrors.nim = "Nomor Induk Mahasiswa (NIM) wajib diisi.";
      } else if (formData.nim.trim().length < 4) {
        newErrors.nim = "NIM minimal 4 karakter.";
      }
    }

    if (currentStep === 2) {
      if (!formData.motivation.trim()) {
        newErrors.motivation = "Motivasi mengikuti LK-I wajib diisi.";
      } else if (formData.motivation.trim().length < 10) {
        newErrors.motivation = "Motivasi minimal 10 karakter.";
      }
    }

    if (currentStep === 3) {
      if (!formData.mentorId) {
        newErrors.mentorId = "Silakan pilih salah satu figur mentor bimbingan Anda.";
      }
    }

    if (currentStep === 5) {
      if (!formData.consent) {
        newErrors.consent = "Anda wajib mencentang persetujuan pernyataan di atas.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, steps.length - 1));
      window.scrollTo({ top: 180, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 0));
    window.scrollTo({ top: 180, behavior: "smooth" });
  };

  const handleStepClick = (index: number) => {
    if (index < step) {
      setStep(index);
      window.scrollTo({ top: 180, behavior: "smooth" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (honeypot) {
      console.warn("Bot detected via honeypot.");
      return;
    }

    if (!validateStep(5)) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const payload = {
        fullName: formData.fullName.trim(),
        nickname: formData.nickname.trim() || undefined,
        gender: formData.gender || undefined,
        birthPlace: formData.birthPlace.trim() || undefined,
        birthDate: formData.birthDate || undefined,
        whatsapp: formData.whatsapp.trim(),
        email: formData.email.trim().toLowerCase(),
        address: formData.address.trim() || undefined,
        university: formData.university.trim(),
        faculty: formData.faculty.trim() || undefined,
        studyProgram: formData.studyProgram.trim(),
        semester: formData.semester ? parseInt(formData.semester, 10) : 1,
        nim: formData.nim.trim(),
        className: formData.className.trim() || undefined,
        mentorId: formData.mentorId || undefined,
        mentorName: formData.mentorName || undefined,
        mentorRole: formData.mentorRole || undefined,
        mentorWhatsappGroup: formData.mentorWhatsappGroup || undefined,
        motivation: formData.motivation.trim(),
        organizationExperience: formData.organizationExperience.trim() || undefined,
        interestFields: formData.interestFields.length > 0 ? formData.interestFields : undefined,
        photoUrl: formData.photoUrl.trim() || undefined,
        paymentProofUrl: formData.paymentProofUrl.trim() || undefined,
      };

      const response = await fetch("/api/lk1", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(
          typeof data.error === "string"
            ? data.error
            : data.error?.message || "Pendaftaran belum dapat disimpan ke server. Silakan coba lagi."
        );
      }

      const generatedCode = data.registrationCode;

      // Save code and candidate name to localStorage for quick retrieval
      localStorage.setItem("hmi_my_registration_code", generatedCode);
      localStorage.setItem("hmi_saved_candidate_name", formData.fullName.trim());

      setSubmittedCode(generatedCode);
      window.scrollTo({ top: 120, behavior: "smooth" });
    } catch (err: unknown) {
      console.error("Submission error:", err);
      setSubmitError(
        err instanceof Error
          ? err.message
          : "Terjadi kendala saat menyimpan pendaftaran ke database. Silakan hubungi CP panitia jika masalah berlanjut."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenStatusCheck = (code?: string) => {
    if (code) setStatusQuery(code);
    setIsStatusModalOpen(true);
  };

  if (!isLoaded) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#006B3F]" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* ========================================================
          HERO BANNER SECTION (Designed specifically for LK-1)
          ======================================================== */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#003324] via-[#004732] to-[#006144] px-4 pt-32 pb-16 sm:pt-40 sm:pb-24 text-center text-white sm:px-6 lg:px-8">
        {/* Geometric pattern background */}
        <div className="hmi-pattern pointer-events-none absolute inset-0 opacity-30" />

        {/* Glow highlight orb */}
        <div className="pointer-events-none absolute left-1/2 top-10 h-48 sm:h-64 w-[350px] sm:w-[600px] -translate-x-1/2 rounded-full bg-[#008f62]/25 blur-3xl" />

        <div className="relative mx-auto max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-md transition-all hover:bg-white/20">
            <span className="h-2 w-2 rounded-full bg-[#F2994A] animate-pulse" />
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#F2994A]">
              PORTAL KADERISASI HMI SAINTEK
            </span>
          </div>

          <h1 className="text-2xl font-black tracking-tight sm:text-4xl lg:text-5xl leading-tight">
            Pendaftaran LK-I Online
          </h1>

          <p className="mx-auto max-w-2xl text-xs sm:text-base leading-relaxed text-white/85">
            Latihan Kader I (Basic Training) HMI Komisariat Sains dan Teknologi UIN Sunan Gunung Djati Bandung.
            Pilih mentor idola Anda (Ketua DEMA, SEMA, HMJ) untuk mendampingi akademik & organisasi Anda.
          </p>

          {/* Quick Action Shortcuts inside Hero */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={() => handleOpenStatusCheck()}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/15 px-4 py-2 text-xs font-bold text-white backdrop-blur-md hover:bg-white/25 active:scale-95 transition-all shadow-xs"
            >
              <Search className="h-3.5 w-3.5" />
              <span>Sudah Daftar? Cek Status</span>
            </button>

            <a
              href="https://wa.me/6287827718245?text=Halo%20Panitia%20LK-I%20HMI%20Saintek%2C%20saya%20ingin%20konsultasi%20pendaftaran"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/40 bg-emerald-500/20 px-4 py-2 text-xs font-bold text-white backdrop-blur-md hover:bg-emerald-500/30 active:scale-95 transition-all shadow-xs"
            >
              <MessageCircle className="h-3.5 w-3.5 text-[#25D366]" />
              <span>Bantuan Panitia (WhatsApp)</span>
            </a>
          </div>
        </div>
      </section>

      {/* ========================================================
          MAIN CONTENT CONTAINER (Gracefully overlaps Hero)
          ======================================================== */}
      <main className="relative -mt-8 sm:-mt-14 flex-1 px-3.5 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl space-y-6">
          {submittedCode ? (
            <div className="space-y-8 animate-fade-in">
              <RegistrationSuccess
                registrationCode={submittedCode}
                formData={formData}
                onReset={() => {
                  setSubmittedCode(null);
                  clearCache();
                }}
                onCheckStatus={handleOpenStatusCheck}
              />
              <TimelineSection />
            </div>
          ) : (
            <>
              {/* Form Card */}
              <form
                onSubmit={handleSubmit}
                noValidate
                className="rounded-3xl border border-[#DCE8E2] bg-white p-4 sm:p-8 shadow-[0_18px_60px_rgba(0,61,43,0.08)]"
              >
                {/* Anti-Bot Honeypot */}
                <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
                  <input
                    type="text"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {/* Mobile Step Header */}
                <div className="sm:hidden space-y-2.5 pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#006B3F] text-[11px] font-black text-white">
                        {step + 1}
                      </span>
                      <div>
                        <h3 className="text-xs font-black text-[#10231C]">{steps[step].title}</h3>
                        <p className="text-[10px] text-[#4B6259]">{steps[step].desc}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-[#EAF2EE] px-2.5 py-0.5 text-[10px] font-black text-[#006144]">
                      {step + 1} / {steps.length}
                    </span>
                  </div>

                  {/* Quick Step Jump Pills for Mobile */}
                  <div className="flex items-center justify-between gap-1 pt-0.5">
                    {steps.map((item, index) => {
                      const isActive = index === step;
                      const isCompleted = index < step;
                      return (
                        <button
                          key={item.title}
                          type="button"
                          onClick={() => handleStepClick(index)}
                          className={`flex-1 flex items-center justify-center py-1.5 rounded-lg text-[11px] font-bold transition-all active:scale-95 ${
                            isActive
                              ? "bg-[#006B3F] text-white shadow-xs"
                              : isCompleted
                              ? "bg-[#F0FDF4] text-[#006144] border border-[#BCD7CA]"
                              : "bg-[#F6F8F7] text-[#4B6259]"
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 className="h-3.5 w-3.5" /> : index + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Desktop Step Indicator Grid */}
                <div className="hidden sm:grid grid-cols-6 gap-2.5">
                  {steps.map((item, index) => {
                    const isActive = index === step;
                    const isCompleted = index < step;
                    return (
                      <button
                        key={item.title}
                        type="button"
                        onClick={() => handleStepClick(index)}
                        className={`relative flex flex-col items-center rounded-2xl p-3 text-center transition-all active:scale-95 ${
                          isActive
                            ? "bg-[#006B3F] text-white shadow-md shadow-[#006B3F]/25"
                            : isCompleted
                            ? "bg-[#F0FDF4] text-[#006144] border border-[#BCD7CA] hover:bg-[#EAF2EE] cursor-pointer"
                            : "bg-[#F6F8F7] text-[#10231C] border border-transparent hover:border-[#DCE8E2]"
                        }`}
                      >
                        <span
                          className={`grid h-7 w-7 place-items-center rounded-full text-xs font-black transition-all ${
                            isActive
                              ? "bg-white text-[#006B3F]"
                              : isCompleted
                              ? "bg-[#006144] text-white"
                              : "bg-[#EAF2EE] text-[#006144]"
                          }`}
                        >
                          {isCompleted ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
                        </span>
                        <p className="mt-2 text-xs font-bold truncate max-w-full">{item.title}</p>
                        <p className="text-[10px] opacity-75 truncate max-w-full">{item.desc}</p>
                      </button>
                    );
                  })}
                </div>

                {/* Smooth Progress Bar */}
                <div className="my-5 h-1.5 w-full overflow-hidden rounded-full bg-[#EAF2EE]">
                  <div
                    className="h-full bg-gradient-to-r from-[#006144] to-[#25D366] transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Error notification */}
                {submitError && (
                  <div className="mb-4 rounded-2xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-700 flex items-start gap-2.5">
                    <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Pendaftaran belum berhasil dikirim:</p>
                      <p className="mt-0.5">{submitError}</p>
                    </div>
                  </div>
                )}

                {/* Step Form Contents */}
                <div className="py-2">
                  {step === 0 && (
                    <StepDataDiri
                      formData={formData}
                      updateField={updateField}
                      errors={errors}
                    />
                  )}

                  {step === 1 && (
                    <StepDataAkademik
                      formData={formData}
                      updateField={updateField}
                      errors={errors}
                    />
                  )}

                  {step === 2 && (
                    <StepMotivasi
                      formData={formData}
                      updateField={updateField}
                      toggleInterestField={toggleInterestField}
                      errors={errors}
                    />
                  )}

                  {step === 3 && (
                    <StepPilihMentor
                      formData={formData}
                      updateField={updateField}
                      mentors={mentors}
                      errors={errors}
                    />
                  )}

                  {step === 4 && (
                    <StepUploadBerkas
                      formData={formData}
                      updateField={updateField}
                      errors={errors}
                    />
                  )}

                  {step === 5 && (
                    <StepKonfirmasi
                      formData={formData}
                      updateField={updateField}
                      onGoToStep={(stepIdx) => setStep(stepIdx)}
                      errors={errors}
                    />
                  )}
                </div>

                {/* Form Action Buttons (Prev, Next, Submit) */}
                <div className="mt-8 flex flex-col-reverse xs:flex-row items-stretch xs:items-center justify-between gap-2.5 border-t border-[#DCE8E2] pt-4">
                  {step > 0 ? (
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[#DCE8E2] bg-white px-4 sm:px-5 py-2.5 text-xs font-bold text-[#10231C] hover:bg-[#F6F8F7] active:scale-95 disabled:opacity-50 transition-all"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      <span>Kembali</span>
                    </button>
                  ) : (
                    <div className="hidden xs:block" />
                  )}

                  {step < steps.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="inline-flex items-center justify-center gap-1.5 rounded-full bg-[#006144] px-5 sm:px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-[#006144]/25 hover:bg-[#003324] active:scale-95 transition-all"
                    >
                      <span>Lanjut: {steps[step + 1].short}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#006144] to-[#008f62] px-5 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-black text-white shadow-lg shadow-[#006144]/30 hover:brightness-110 active:scale-95 transition-all disabled:opacity-60"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span>Mengirim...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Kirim Pendaftaran LK-I</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>

              {/* LK-I Stages Timeline */}
              <TimelineSection />

              {/* 3 Quick Informational Cards below Form */}
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-[#DCE8E2] bg-white p-5 sm:p-6 shadow-xs">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-[#EAF2EE] text-[#006144]">
                    <Award className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h4 className="mt-3.5 text-sm sm:text-base font-black text-[#10231C]">
                    Jenjang Pengkaderan
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#4B6259]">
                    LK-I adalah tahapan wajib pembentukan karakter intelek muslim yang kritis, mandiri,
                    dan berwawasan kebangsaan luas.
                  </p>
                </div>

                <div className="rounded-3xl border border-[#DCE8E2] bg-white p-5 sm:p-6 shadow-xs">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-[#EAF2EE] text-[#006144]">
                    <Users className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h4 className="mt-3.5 text-sm sm:text-base font-black text-[#10231C]">
                    Mentoring Mahasiswa
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#4B6259]">
                    Dimentori langsung oleh Ketua DEMA, SEMA, dan HMJ untuk sukses perkuliahan, IPK tinggi, dan kepemimpinan ormawa.
                  </p>
                </div>

                <div className="rounded-3xl border border-[#DCE8E2] bg-white p-5 sm:p-6 shadow-xs">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-[#EAF2EE] text-[#006144]">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>
                  <h4 className="mt-3.5 text-sm sm:text-base font-black text-[#10231C]">
                    Proses Screening
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#4B6259]">
                    Wawancara santai seputar BTQ, wawasan keislaman, ke-HMI-an, dan kebangsaan didampingi mentor bimbingan.
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Status Check Modal */}
      <StatusCheckModal
        isOpen={isStatusModalOpen}
        onClose={() => setIsStatusModalOpen(false)}
        initialQuery={statusQuery}
      />

      {/* Floating WhatsApp Helpdesk */}
      <FloatingWhatsApp />
    </div>
  );
};
