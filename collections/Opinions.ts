import type { CollectionConfig } from "payload";
import { contentManagers, contentWriters, publishedOrAuthenticated } from "./access";
import { coverImageField, publishedStatusField, slugField } from "./fields";

export const Opinions: CollectionConfig = {
  slug: "opinions",
  labels: {
    singular: "Gagasan Kader",
    plural: "Gagasan Kader",
  },
  admin: {
    group: "Informasi",
    useAsTitle: "title",
    defaultColumns: ["title", "authorName", "status", "publishedAt"],
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
    { name: "authorName", type: "text", required: true },
    { name: "authorPhoto", type: "upload", relationTo: "media" },
    { name: "authorProdi", type: "text" },
    { name: "authorStatus", type: "text" },
    { name: "excerpt", type: "textarea", required: true },
    { name: "content", type: "richText", required: true },
    coverImageField,
    { name: "category", type: "text" },
    { name: "publishedAt", type: "date" },
    publishedStatusField,
  ],
};
