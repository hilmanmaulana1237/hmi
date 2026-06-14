import type { CollectionConfig } from "payload";
import {
  contentManagers,
  contentWriters,
  publicPublishedCheckboxOrAuthenticated,
} from "./access";

export const Gallery: CollectionConfig = {
  slug: "gallery",
  labels: {
    singular: "Galeri",
    plural: "Galeri",
  },
  admin: {
    group: "Media",
    useAsTitle: "title",
    defaultColumns: ["title", "category", "date", "isPublished"],
  },
  access: {
    create: contentWriters,
    read: publicPublishedCheckboxOrAuthenticated,
    update: contentManagers,
    delete: contentManagers,
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea" },
    { name: "category", type: "text" },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "videoUrl", type: "text" },
    { name: "date", type: "date" },
    { name: "isPublished", type: "checkbox", defaultValue: true },
  ],
};
