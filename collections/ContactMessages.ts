import type { CollectionConfig } from "payload";
import { authenticated } from "./access";

export const ContactMessages: CollectionConfig = {
  slug: "contact-messages",
  labels: {
    singular: "Pesan Kontak",
    plural: "Pesan Kontak",
  },
  admin: {
    group: "Layanan",
    useAsTitle: "subject",
    defaultColumns: ["name", "subject", "isRead", "createdAt"],
  },
  access: {
    create: () => true,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "email", type: "email" },
    { name: "whatsapp", type: "text" },
    { name: "subject", type: "text", required: true },
    { name: "message", type: "textarea", required: true },
    { name: "isRead", type: "checkbox", defaultValue: false },
    {
      name: "status",
      type: "select",
      defaultValue: "Masuk",
      options: ["Masuk", "Dibaca", "Dibalas", "Diarsipkan"],
    },
    { name: "handledBy", type: "relationship", relationTo: "users" },
    { name: "replyNote", type: "textarea" },
  ],
};
