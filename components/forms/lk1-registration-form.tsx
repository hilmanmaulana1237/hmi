"use client";

import type { FormEvent } from "react";
import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

const steps = [
  "Data Diri",
  "Data Akademik",
  "Motivasi",
  "Upload Berkas",
  "Konfirmasi",
];

const interestFields = [
  "Kaderisasi",
  "PTKP",
  "Kewirausahaan",
  "Media dan Komunikasi",
  "Keilmuan",
  "Keagamaan",
  "Sosial Masyarakat",
];

type SubmitState =
  | { status: "idle"; message?: string; code?: string }
  | { status: "loading"; message?: string; code?: string }
  | { status: "success"; message: string; code?: string }
  | { status: "error"; message: string; code?: string };

export function LK1RegistrationForm() {
  const [step, setStep] = useState(0);
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
  });
  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitState({ status: "loading" });

    try {
      const response = await fetch("/api/lk1", {
        method: "POST",
        body: new FormData(form),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(
          typeof data.error === "string"
            ? data.error
            : "Pendaftaran belum bisa disimpan. Periksa data lalu coba lagi.",
        );
      }

      setSubmitState({
        status: "success",
        message: "Pendaftaran berhasil dikirim.",
        code: data.registrationCode,
      });
      form.reset();
      setStep(0);
    } catch (error) {
      setSubmitState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Terjadi kesalahan saat mengirim pendaftaran.",
      });
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-[#DCE8E2] bg-white p-6 shadow-[0_18px_60px_rgba(0,61,43,0.08)]"
    >
      <div className="grid gap-3 sm:grid-cols-5">
        {steps.map((item, index) => (
          <button
            key={item}
            type="button"
            onClick={() => setStep(index)}
            className={`rounded-2xl p-4 text-left transition ${
              index === step
                ? "bg-[#006B3F] text-white"
                : "bg-[#F6F8F7] text-[#10231C]"
            }`}
          >
            <span
              className={`grid h-9 w-9 place-items-center rounded-full text-sm font-black ${
                index === step
                  ? "bg-white text-[#006B3F]"
                  : "bg-[#006B3F] text-white"
              }`}
            >
              {index + 1}
            </span>
            <p className="mt-3 text-sm font-bold">{item}</p>
          </button>
        ))}
      </div>
      <div className="mt-5 h-2 rounded-full bg-[#EAF2EE]">
        <div
          className="h-full rounded-full bg-[#F2994A] transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-8">
        <div className={step === 0 ? "block" : "hidden"}>
          <PersonalFields />
        </div>
        <div className={step === 1 ? "block" : "hidden"}>
          <AcademicFields />
        </div>
        <div className={step === 2 ? "block" : "hidden"}>
          <MotivationFields />
        </div>
        <div className={step === 3 ? "block" : "hidden"}>
          <UploadFields />
        </div>
        <div className={step === 4 ? "block" : "hidden"}>
          <ConfirmFields />
        </div>
      </div>

      {submitState.status === "success" ? (
        <div className="mt-6 rounded-2xl border border-[#B7E4C7] bg-[#F0FDF4] p-5 text-sm leading-6 text-[#166534]">
          <CheckCircle2 className="mr-2 inline h-5 w-5" />
          {submitState.message} Simpan kode pendaftaran:
          <strong className="ml-1">{submitState.code}</strong>
        </div>
      ) : null}

      {submitState.status === "error" ? (
        <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-5 text-sm leading-6 text-red-700">
          {submitState.message}
        </div>
      ) : null}

      <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between">
        <button
          type="button"
          onClick={() => setStep((value) => Math.max(0, value - 1))}
          disabled={step === 0}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-[#DCE8E2] px-6 py-3 text-sm font-black text-[#4B6259] disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ArrowLeft className="h-4 w-4" />
          Sebelumnya
        </button>
        <button
          type={step === steps.length - 1 ? "submit" : "button"}
          onClick={() => {
            if (step < steps.length - 1) {
              setStep((value) => value + 1);
            }
          }}
          disabled={submitState.status === "loading"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#006B3F] px-6 py-3 text-sm font-black text-white disabled:cursor-wait disabled:opacity-70"
        >
          {submitState.status === "loading" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : step === steps.length - 1 ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
          {step === steps.length - 1 ? "Kirim pendaftaran" : "Lanjutkan"}
        </button>
      </div>
    </form>
  );
}

function PersonalFields() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <TextInput label="Nama lengkap" name="fullName" required />
      <TextInput label="Nama panggilan" name="nickname" />
      <SelectInput
        label="Jenis kelamin"
        name="gender"
        options={["Laki-laki", "Perempuan"]}
      />
      <TextInput label="Tempat lahir" name="birthPlace" />
      <TextInput label="Tanggal lahir" name="birthDate" type="date" />
      <TextInput label="Nomor WhatsApp" name="whatsapp" required />
      <TextInput label="Email" name="email" type="email" required />
      <label className="grid gap-2 text-sm font-semibold md:col-span-2">
        Alamat domisili
        <textarea
          name="address"
          className="min-h-28 rounded-2xl border border-[#DCE8E2] px-4 py-3 outline-none focus:border-[#006B3F]"
        />
      </label>
    </div>
  );
}

function AcademicFields() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <TextInput
        label="Universitas"
        name="university"
        defaultValue="UIN Sunan Gunung Djati Bandung"
        required
      />
      <TextInput
        label="Fakultas"
        name="faculty"
        defaultValue="Sains dan Teknologi"
      />
      <TextInput label="Program studi" name="studyProgram" required />
      <TextInput label="Semester" name="semester" type="number" min="1" max="14" />
      <TextInput label="NIM" name="nim" required />
      <TextInput label="Kelas" name="className" />
    </div>
  );
}

function MotivationFields() {
  return (
    <div className="grid gap-5">
      <label className="grid gap-2 text-sm font-semibold">
        Motivasi mengikuti LK-I
        <textarea
          name="motivation"
          required
          minLength={20}
          className="min-h-36 rounded-2xl border border-[#DCE8E2] px-4 py-3 outline-none focus:border-[#006B3F]"
          placeholder="Ceritakan alasan dan harapan mengikuti LK-I"
        />
      </label>
      <label className="grid gap-2 text-sm font-semibold">
        Pengalaman organisasi
        <textarea
          name="organizationExperience"
          className="min-h-28 rounded-2xl border border-[#DCE8E2] px-4 py-3 outline-none focus:border-[#006B3F]"
        />
      </label>
      <fieldset className="grid gap-3">
        <legend className="text-sm font-semibold">Minat bidang</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {interestFields.map((field) => (
            <label
              key={field}
              className="flex items-center gap-3 rounded-2xl border border-[#DCE8E2] px-4 py-3 text-sm font-semibold"
            >
              <input
                type="checkbox"
                name="interestFields"
                value={field}
                className="h-4 w-4 accent-[#006B3F]"
              />
              {field}
            </label>
          ))}
        </div>
      </fieldset>
    </div>
  );
}

function UploadFields() {
  return (
    <div className="grid gap-5">
      <FileInput
        label="Bukti pembayaran (opsional)"
        name="paymentProof"
        accept="image/*"
        maxSizeMB={1}
      />
      <p className="rounded-2xl bg-[#F6F8F7] p-4 text-sm leading-6 text-[#4B6259]">
        Pastikan ukuran file bukti pembayaran tidak lebih dari 1 MB. File akan
        diproses melalui storage Payload.
      </p>
    </div>
  );
}

function ConfirmFields() {
  return (
    <div className="grid gap-5">
      <div className="rounded-2xl bg-[#F6F8F7] p-5 text-sm leading-7 text-[#4B6259]">
        Pastikan data sudah benar. Setelah dikirim, admin bidang kaderisasi akan
        melakukan verifikasi dan status dapat dicek memakai kode pendaftaran
        atau email.
      </div>
      <label className="flex items-start gap-3 text-sm font-semibold text-[#10231C]">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-4 w-4 accent-[#006B3F]"
        />
        Saya menyetujui data digunakan untuk kebutuhan pendaftaran LK-I dan
        administrasi kaderisasi HMI Komisariat Sains dan Teknologi.
      </label>
    </div>
  );
}

function TextInput({
  label,
  name,
  type = "text",
  required,
  defaultValue,
  min,
  max,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  defaultValue?: string;
  min?: string;
  max?: string;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue}
        min={min}
        max={max}
        className="rounded-2xl border border-[#DCE8E2] px-4 py-3 outline-none focus:border-[#006B3F]"
      />
    </label>
  );
}

function SelectInput({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold">
      {label}
      <select
        name={name}
        className="rounded-2xl border border-[#DCE8E2] bg-white px-4 py-3 outline-none focus:border-[#006B3F]"
      >
        <option value="">Pilih</option>
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}

function FileInput({
  label,
  name,
  accept,
  maxSizeMB,
}: {
  label: string;
  name: string;
  accept?: string;
  maxSizeMB?: number;
}) {
  return (
    <label className="grid gap-2 text-sm font-semibold">
      {label}
      <input
        name={name}
        type="file"
        accept={accept}
        onChange={(e) => {
          if (maxSizeMB && e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            if (file.size > maxSizeMB * 1024 * 1024) {
              alert(`Ukuran file maksimal ${maxSizeMB} MB.`);
              e.target.value = "";
            }
          }
        }}
        className="rounded-2xl border border-dashed border-[#BCD7CA] bg-[#F6F8F7] px-4 py-3 text-sm file:mr-4 file:rounded-full file:border-0 file:bg-[#006B3F] file:px-4 file:py-2 file:font-bold file:text-white"
      />
    </label>
  );
}
