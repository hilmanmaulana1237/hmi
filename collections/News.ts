import type { CollectionConfig } from "payload";
import {
  contentManagers,
  contentPublishersField,
  contentWriters,
  publishedOrAuthenticated,
} from "./access";
import { coverImageField, publishedStatusField, seoFields, slugField } from "./fields";

export const News: CollectionConfig = {
  slug: "news",
  labels: {
    singular: "Berita",
    plural: "Berita",
  },
  admin: {
    group: "Informasi",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "status", "publishedAt"],
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
    { name: "excerpt", type: "textarea", required: true },
    { name: "content", type: "richText", required: true },
    coverImageField,
    { name: "category", type: "text", required: true },
    { name: "author", type: "relationship", relationTo: "users" },
    { name: "publishedAt", type: "date" },
    {
      ...publishedStatusField,
      access: {
        update: contentPublishersField,
      },
    },
    { name: "featured", type: "checkbox", defaultValue: false },
    ...seoFields,
  ],
};
