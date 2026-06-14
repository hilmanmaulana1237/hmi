import type { CollectionConfig } from "payload";
import { advocacyManagers } from "./access";

export const AdvocacyReports: CollectionConfig = {
  slug: "advocacy-reports",
  labels: {
    singular: "Laporan Advokasi",
    plural: "Laporan Advokasi",
  },
  admin: {
    group: "Layanan",
    useAsTitle: "topic",
    defaultColumns: ["topic", "status", "isConfidential", "updatedAt"],
  },
  access: {
    create: () => true,
    read: advocacyManagers,
    update: advocacyManagers,
    delete: advocacyManagers,
  },
  fields: [
    { name: "reporterNameOrInitial", type: "text" },
    { name: "contactOptional", type: "text" },
    { name: "topic", type: "text", required: true },
    { name: "description", type: "textarea", required: true },
    { name: "evidenceFile", type: "upload", relationTo: "media" },
    {
      name: "status",
      type: "select",
      defaultValue: "Masuk",
      required: true,
      options: ["Masuk", "Diproses", "Ditindaklanjuti", "Selesai", "Ditolak"],
    },
    { name: "isConfidential", type: "checkbox", defaultValue: true },
    { name: "adminNote", type: "textarea" },
    { name: "handledBy", type: "relationship", relationTo: "users" },
    { name: "lastFollowUpAt", type: "date" },
    {
      name: "followUps",
      type: "array",
      fields: [
        { name: "date", type: "date", required: true },
        { name: "note", type: "textarea", required: true },
        { name: "handledBy", type: "relationship", relationTo: "users" },
      ],
    },
  ],
};
