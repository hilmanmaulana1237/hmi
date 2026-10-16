import type { CollectionConfig } from "payload";
import { cadreManagers } from "./access";

export const OrganizationStructure: CollectionConfig = {
  slug: "organization-structure",
  labels: {
    singular: "Struktur Kepengurusan",
    plural: "Struktur Kepengurusan",
  },
  admin: {
    group: "Profil",
    useAsTitle: "name",
    defaultColumns: ["name", "position", "department", "period", "order"],
  },
  access: {
    create: cadreManagers,
    read: () => true,
    update: cadreManagers,
    delete: cadreManagers,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "position", type: "text", required: true },
    { name: "department", type: "text" },
    { name: "photo", type: "upload", relationTo: "media" },
    { name: "description", type: "textarea" },
    { name: "order", type: "number", defaultValue: 0 },
    { name: "period", type: "text" },
    {
      name: "bidang",
      type: "select",
      label: "Bidang / Penempatan Bagan",
      options: [
        { label: "Ketua Umum / Presidium BPH", value: "bph_ketum" },
        { label: "Sekretaris Umum", value: "bph_sekum" },
        { label: "Bendahara Umum", value: "bph_bendum" },
        { label: "Bidang PPPA (Penelitian, Pembinaan & Pengkaderan)", value: "pppa" },
        { label: "Bidang PTKP (Perguruan Tinggi & Kepemudaan)", value: "ptkp" },
        { label: "Bidang KPP (Kewirausahaan & Pengembangan Profesi)", value: "kpp" },
        { label: "Bidang PP / KOHATI (Pemberdayaan Perempuan)", value: "kohati" },
      ],
      admin: {
        description: "Pilih bidang agar otomatis ditempatkan pada posisi bagan hierarki yang tepat.",
      },
    },
    {
      name: "roleLevel",
      type: "select",
      label: "Tingkatan Jabatan",
      options: [
        { label: "Ketua Umum", value: "ketum" },
        { label: "Sekretaris Umum / Bendahara Umum", value: "sekum_bendum" },
        { label: "Ketua Bidang (Kabid)", value: "kabid" },
        { label: "Wakil Sekretaris Umum (Wasekum)", value: "wasekum" },
        { label: "Bendahara KOHATI", value: "bendum_kohati" },
        { label: "Koordinator / Departemen", value: "departemen" },
      ],
      admin: {
        description: "Tingkatan jabatan dalam hierarki bidang (Ketua Bidang, Wasekum, atau Departemen).",
      },
    },
    { name: "instagram", type: "text" },
  ],
};
