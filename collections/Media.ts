import type { CollectionConfig } from "payload";
import { authenticated, contentWriters } from "./access";

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticDir: "media",
    mimeTypes: ["image/*", "application/pdf"],
  },
  admin: {
    group: "Media",
    useAsTitle: "alt",
  },
  access: {
    create: contentWriters,
    read: () => true,
    update: authenticated,
    delete: contentWriters,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "caption",
      type: "textarea",
    },
  ],
};
