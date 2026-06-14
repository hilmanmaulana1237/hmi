import type { Field, SelectField, TextField, UploadField } from "payload";

export const slugField: TextField = {
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  admin: {
    description: "Gunakan huruf kecil, angka, dan tanda hubung.",
  },
};

export const seoFields: Field[] = [
  {
    name: "seoTitle",
    type: "text",
  },
  {
    name: "seoDescription",
    type: "textarea",
  },
];

export const publishedStatusField: SelectField = {
  name: "status",
  type: "select",
  defaultValue: "draft",
  required: true,
  options: [
    { label: "Draft", value: "draft" },
    { label: "Published", value: "published" },
    { label: "Archived", value: "archived" },
  ],
};

export const coverImageField: UploadField = {
  name: "coverImage",
  type: "upload",
  relationTo: "media",
};
