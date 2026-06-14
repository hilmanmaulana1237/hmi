import type { CollectionConfig } from "payload";
import {
  contentManagers,
  contentWriters,
  publicActiveCheckboxOrAuthenticated,
} from "./access";
import { coverImageField, slugField } from "./fields";

export const Programs: CollectionConfig = {
  slug: "programs",
  labels: {
    singular: "Program",
    plural: "Program",
  },
  admin: {
    group: "Website",
    useAsTitle: "title",
    defaultColumns: ["title", "department", "isActive"],
  },
  access: {
    create: contentWriters,
    read: publicActiveCheckboxOrAuthenticated,
    update: contentManagers,
    delete: contentManagers,
  },
  fields: [
    { name: "title", type: "text", required: true },
    slugField,
    { name: "department", type: "text" },
    { name: "description", type: "textarea" },
    coverImageField,
    { name: "isActive", type: "checkbox", defaultValue: true },
    { name: "order", type: "number", defaultValue: 0 },
  ],
};
