import type { CollectionConfig } from "payload";
import { contentManagers, contentWriters, publishedOrAuthenticated } from "./access";
import { publishedStatusField, seoFields, slugField } from "./fields";

export const Pages: CollectionConfig = {
  slug: "pages",
  admin: {
    group: "Website",
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "status", "updatedAt"],
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
    publishedStatusField,
    ...seoFields,
  ],
};
