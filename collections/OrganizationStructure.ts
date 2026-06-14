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
    { name: "instagram", type: "text" },
  ],
};
