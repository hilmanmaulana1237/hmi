import type { CollectionConfig } from "payload";
import { lk1Managers } from "./access";

function registrationCode() {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `LK1-${new Date().getFullYear()}-${random}`;
}

export const LK1Registrations: CollectionConfig = {
  slug: "lk1-registrations",
  labels: {
    singular: "Pendaftaran LK-I",
    plural: "Pendaftaran LK-I",
  },
  admin: {
    group: "Kaderisasi",
    useAsTitle: "fullName",
    defaultColumns: [
      "registrationCode",
      "fullName",
      "studyProgram",
      "mentorName",
      "status",
      "submittedAt",
    ],
    components: {
      beforeListTable: ["@/components/admin/lk1-export-action#Lk1ExportAction"],
    },
  },
  access: {
    create: () => true,
    read: lk1Managers,
    update: lk1Managers,
    delete: lk1Managers,
  },
  fields: [
    {
      name: "registrationCode",
      type: "text",
      required: true,
      unique: true,
      defaultValue: registrationCode,
      admin: {
        readOnly: true,
      },
    },
    { name: "fullName", type: "text", required: true },
    { name: "nickname", type: "text" },
    { name: "gender", type: "select", options: ["Laki-laki", "Perempuan"] },
    { name: "birthPlace", type: "text" },
    { name: "birthDate", type: "date" },
    { name: "whatsapp", type: "text", required: true },
    { name: "email", type: "email", required: true },
    { name: "address", type: "textarea" },
    { name: "university", type: "text", required: true },
    { name: "faculty", type: "text" },
    { name: "studyProgram", type: "text", required: true },
    { name: "semester", type: "number" },
    { name: "nim", type: "text", required: true },
    { name: "className", type: "text" },

    // Mentor Selection Fields
    {
      name: "mentor",
      type: "relationship",
      relationTo: "mentors",
      label: "Mentor Pilihan",
    },
    {
      name: "mentorName",
      type: "text",
      label: "Nama Mentor Pilihan",
    },
    {
      name: "mentorRole",
      type: "text",
      label: "Jabatan / Peran Mentor (misal: Ketua DEMA, Ketua HMJ)",
    },
    {
      name: "mentorWhatsappGroup",
      type: "text",
      label: "Link WhatsApp Group Mentor",
    },

    { name: "motivation", type: "textarea", required: true },
    { name: "organizationExperience", type: "textarea" },
    {
      name: "interestFields",
      type: "select",
      hasMany: true,
      options: [
        "Kaderisasi",
        "PTKP",
        "Kewirausahaan",
        "Media dan Komunikasi",
        "Keilmuan",
        "Keagamaan",
        "Sosial Masyarakat",
      ],
    },

    // Berkas & Bukti (Both Media Upload & External Link)
    { name: "photoUrl", type: "text", label: "Link Pas Foto (Google Drive)" },
    { name: "paymentProofUrl", type: "text", label: "Link Bukti Bayar (Google Drive)" },
    { name: "paymentProof", type: "upload", relationTo: "media" },
    {
      name: "paymentStatus",
      type: "select",
      defaultValue: "Belum Dicek",
      options: [
        "Belum Dicek",
        "Belum Bayar",
        "Menunggu Verifikasi",
        "Terverifikasi",
        "Ditolak",
        "Gratis",
      ],
      admin: {
        position: "sidebar",
      },
    },
    { name: "paymentAmount", type: "number" },
    { name: "paymentMethod", type: "text" },
    { name: "paymentVerifiedAt", type: "date" },
    { name: "paymentVerifiedBy", type: "relationship", relationTo: "users" },
    {
      name: "status",
      type: "select",
      defaultValue: "Pending",
      required: true,
      options: [
        "Pending",
        "Diverifikasi",
        "Diterima",
        "Ditolak",
        "Cadangan",
        "Mengikuti Screening",
        "Lulus LK-I",
      ],
    },
    { name: "adminNote", type: "textarea" },
    {
      name: "submittedAt",
      type: "date",
      defaultValue: () => new Date().toISOString(),
      admin: {
        readOnly: true,
      },
    },
    { name: "verifiedBy", type: "relationship", relationTo: "users" },
    { name: "hasBeenContacted", type: "checkbox", defaultValue: false },
    { name: "screeningSchedule", type: "date" },
    { name: "screeningResult", type: "textarea" },
    { name: "screeningScoreBtq", type: "text", label: "Nilai BTQ" },
    { name: "screeningScoreHmi", type: "text", label: "Nilai Ke-HMI-an" },
    { name: "screeningScoreKebangsaan", type: "text", label: "Nilai Wawasan Kebangsaan" },
    { name: "screeningNotes", type: "textarea", label: "Catatan Screening" },
    { name: "followUpNote", type: "textarea" },
  ],
};
