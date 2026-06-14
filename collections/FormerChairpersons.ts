import type { CollectionConfig } from "payload";
import { cadreManagers } from "./access";

export const FormerChairpersons: CollectionConfig = {
  slug: "former-chairpersons",
  labels: {
    singular: "Mantan Ketua Umum",
    plural: "Mantan Ketua Umum",
  },
  admin: {
    group: "Profil",
    useAsTitle: "name",
    defaultColumns: ["name", "period", "order"],
  },
  access: {
    create: cadreManagers,
    read: () => true,
    update: cadreManagers,
    delete: cadreManagers,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "photo", type: "upload", relationTo: "media" },
    { name: "period", type: "text", required: true },
    { name: "quote", type: "textarea" },
    { name: "description", type: "textarea" },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
