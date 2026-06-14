import type { CollectionConfig } from "payload";
import { contentManagers, contentWriters, publishedOrAuthenticated } from "./access";
import { publishedStatusField, slugField } from "./fields";

export const Announcements: CollectionConfig = {
  slug: "announcements",
  labels: {
    singular: "Pengumuman",
    plural: "Pengumuman",
  },
  admin: {
    group: "Informasi",
    useAsTitle: "title",
    defaultColumns: ["title", "status", "publishedAt"],
  },
  access: {
    create: contentWriters,
    read: publishedOrAuthenticated,
    update: contentManagers,
    delete: contentManagers,
  },
  fields: [
    { name: "title", type: "text", required: true },
    slugField,
    { name: "excerpt", type: "textarea" },
    { name: "content", type: "richText" },
    { name: "publishedAt", type: "date" },
    publishedStatusField,
  ],
};
