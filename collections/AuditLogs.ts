import type { CollectionConfig } from "payload";
import { adminsAndChair, superAdmins } from "./access";

export const AuditLogs: CollectionConfig = {
  slug: "audit-logs",
  labels: {
    singular: "Audit Log",
    plural: "Audit Logs",
  },
  admin: {
    group: "Admin",
    useAsTitle: "action",
    defaultColumns: ["action", "collectionSlug", "user", "createdAt"],
  },
  access: {
    create: adminsAndChair,
    read: adminsAndChair,
    update: superAdmins,
    delete: superAdmins,
  },
  fields: [
    { name: "action", type: "text", required: true },
    { name: "collectionSlug", type: "text" },
    { name: "documentId", type: "text" },
    { name: "user", type: "relationship", relationTo: "users" },
    { name: "metadata", type: "json" },
  ],
};
