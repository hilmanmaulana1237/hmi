import type { CollectionConfig } from "payload";
import {
  contentManagers,
  contentWriters,
  publicPublishedCheckboxOrAuthenticated,
} from "./access";
import { coverImageField, seoFields, slugField } from "./fields";

export const Events: CollectionConfig = {
  slug: "events",
  labels: {
    singular: "Agenda",
    plural: "Agenda",
  },
  admin: {
    group: "Informasi",
    useAsTitle: "title",
    defaultColumns: ["title", "date", "status", "location"],
  },
  access: {
    create: contentWriters,
    read: publicPublishedCheckboxOrAuthenticated,
    update: contentManagers,
    delete: contentManagers,
  },
  fields: [
    { name: "title", type: "text", required: true },
    slugField,
    { name: "excerpt", type: "textarea" },
    { name: "description", type: "richText" },
    { name: "date", type: "date", required: true },
    { name: "startTime", type: "text" },
    { name: "endTime", type: "text" },
    { name: "location", type: "text", required: true },
    coverImageField,
    {
      name: "status",
      type: "select",
      defaultValue: "upcoming",
      required: true,
      options: [
        { label: "Upcoming", value: "upcoming" },
        { label: "Ongoing", value: "ongoing" },
        { label: "Done", value: "done" },
        { label: "Cancelled", value: "cancelled" },
        { label: "Published", value: "published" },
      ],
    },
    { name: "registrationLink", type: "text" },
    { name: "isPublished", type: "checkbox", defaultValue: true },
    { name: "featured", type: "checkbox", defaultValue: false },
    {
      name: "documentationGallery",
      type: "relationship",
      relationTo: "gallery",
      hasMany: true,
    },
    ...seoFields,
  ],
};
