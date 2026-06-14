import type { CollectionConfig } from "payload";
import {
  authenticatedField,
  cadreManagers,
  publicCadresOrAuthenticated,
} from "./access";

export const Cadres: CollectionConfig = {
  slug: "cadres",
  labels: {
    singular: "Kader",
    plural: "Database Kader",
  },
  admin: {
    group: "Kaderisasi",
    useAsTitle: "fullName",
    defaultColumns: ["fullName", "studyProgram", "cadreStatus", "batchYear"],
    components: {
      beforeListTable: ["@/components/admin/cadres-actions#CadresActions"],
    },
  },
  access: {
    create: cadreManagers,
    read: publicCadresOrAuthenticated,
    update: cadreManagers,
    delete: cadreManagers,
  },
  fields: [
    { name: "fullName", type: "text", required: true },
    { name: "nickname", type: "text", access: { read: authenticatedField } },
    { name: "gender", type: "select", options: ["Laki-laki", "Perempuan"] },
    { name: "university", type: "text" },
    { name: "faculty", type: "text" },
    { name: "studyProgram", type: "text", required: true },
    { name: "nim", type: "text", access: { read: authenticatedField } },
    { name: "batchYear", type: "number", required: true },
    {
      name: "cadreStatus",
      type: "select",
      required: true,
      options: [
        "Anggota Muda",
        "LK-I",
        "LK-II",
        "LK-III",
        "Pengurus",
        "Alumni",
      ],
    },
    { name: "phonePrivate", type: "text", access: { read: authenticatedField } },
    { name: "emailPrivate", type: "email", access: { read: authenticatedField } },
    {
      name: "addressPrivate",
      type: "textarea",
      access: { read: authenticatedField },
    },
    { name: "photo", type: "upload", relationTo: "media" },
    { name: "isPublic", type: "checkbox", defaultValue: true },
    {
      name: "notesPrivate",
      type: "textarea",
      access: { read: authenticatedField },
    },
  ],
};
