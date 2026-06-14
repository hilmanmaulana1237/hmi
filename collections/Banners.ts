import type { CollectionConfig } from "payload";
import {
  contentManagers,
  contentWriters,
  publicActiveCheckboxOrAuthenticated,
} from "./access";

export const Banners: CollectionConfig = {
  slug: "banners",
  labels: {
    singular: "Banner",
    plural: "Banners",
  },
  admin: {
    group: "Website",
    useAsTitle: "title",
    defaultColumns: ["title", "placement", "isActive", "order"],
  },
  access: {
    create: contentWriters,
    read: publicActiveCheckboxOrAuthenticated,
    update: contentManagers,
    delete: contentManagers,
  },
  fields: [
    { name: "title", type: "text", required: true },
    { name: "subtitle", type: "textarea" },
    { name: "image", type: "upload", relationTo: "media" },
    { name: "ctaLabel", type: "text" },
    { name: "ctaHref", type: "text" },
    { name: "placement", type: "text" },
    { name: "isActive", type: "checkbox", defaultValue: true },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
