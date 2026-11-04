import type { CollectionConfig } from "payload";
import { lk1Managers } from "./access";

export const Mentors: CollectionConfig = {
  slug: "mentors",
  labels: {
    singular: "Mentor LK-I",
    plural: "Mentor LK-I",
  },
  admin: {
    group: "Kaderisasi",
    useAsTitle: "name",
    defaultColumns: ["name", "role", "studyProgram", "whatsappGroupUrl", "isActive"],
  },
  access: {
    create: lk1Managers,
    read: () => true,
    update: lk1Managers,
    delete: lk1Managers,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
      label: "Nama Lengkap Mentor",
    },
    {
      name: "role",
      type: "text",
      required: true,
      label: "Jabatan / Peran (Contoh: Ketua DEMA FST, Ketua HMJ TI, dsb)",
    },
    {
      name: "studyProgram",
      type: "text",
      label: "Program Studi / Jurusan",
    },
    {
      name: "faculty",
      type: "text",
      defaultValue: "Fakultas Sains dan Teknologi",
      label: "Fakultas",
    },
    {
      name: "batch",
      type: "text",
      label: "Angkatan (Contoh: Angkatan 2021)",
    },
    {
      name: "avatarUrl",
      type: "text",
      label: "URL Foto Profil / Avatar Mentor",
    },
    {
      name: "bio",
      type: "textarea",
      label: "Profil Singkat & Visi Bimbingan",
    },
    {
      name: "guidanceFocus",
      type: "text",
      label: "Fokus Bimbingan (Akademik, Organisasi, Kepemimpinan, dsb)",
    },
    {
      name: "whatsappGroupUrl",
      type: "text",
      required: true,
      label: "Tautan Grup WhatsApp Bimbingan Mentor",
    },
    {
      name: "whatsappNumber",
      type: "text",
      label: "Nomor WhatsApp Mentor (Opsional)",
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
      label: "Tampilkan di Formulir Pendaftaran LK-I",
    },
    {
      name: "order",
      type: "number",
      defaultValue: 0,
      label: "Urutan Tampilan",
    },
  ],
};

