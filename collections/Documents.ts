import type { CollectionConfig } from "payload";
import { documentManagers } from "./access";

export const Documents: CollectionConfig = {
  slug: "documents",
  labels: {
    singular: "Dokumen",
    plural: "Dokumen",
  },
  admin: {
    group: "Layanan",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "access", "updatedAt"],
  },
  access: {
    create: documentManagers,
    read: ({ req: { user } }) => {
      if (user) {
        return true;
      }

      return {
        access: {
          equals: "public",
        },
      };
    },
    update: documentManagers,
    delete: documentManagers,
  },
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        "Materi LK-I",
        "Materi LK-II",
        "Konstitusi HMI",
        "Administrasi",
        "Surat",
        "Pedoman Organisasi",
      ],
    },
    { name: "file", type: "upload", relationTo: "media" },
    { 
      name: "fileUrl", 
      type: "text",
      label: "Tautan Dokumen Eksternal (URL)",
      admin: {
        description: "PASTE URL DI SINI (Contoh: Link Google Drive/Dropbox) JIKA TIDAK MENGUNGGAH FILE DI ATAS.",
      }
    },
    { name: "description", type: "textarea" },
    {
      name: "access",
      type: "select",
      defaultValue: "public",
      required: true,
      options: [
        { label: "Public", value: "public" },
        { label: "Kader", value: "kader" },
        { label: "Admin", value: "admin" },
      ],
    },
    { name: "uploadedBy", type: "relationship", relationTo: "users" },
    { name: "version", type: "text" },
    { name: "isFeatured", type: "checkbox", defaultValue: false },
    { name: "publishedAt", type: "date" },
  ],
};
