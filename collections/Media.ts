import fs from "fs";
import path from "path";
import type { CollectionConfig } from "payload";
import { authenticated, contentWriters } from "./access";

const localMediaDir = path.resolve(process.cwd(), "media");
const vercelMediaDir = "/tmp/media";

const getMediaStaticDir = () => {
  if (!process.env.VERCEL) return localMediaDir;

  try {
    fs.mkdirSync(vercelMediaDir, { recursive: true });

    if (fs.existsSync(localMediaDir)) {
      for (const entry of fs.readdirSync(localMediaDir)) {
        const source = path.join(localMediaDir, entry);
        const target = path.join(vercelMediaDir, entry);

        if (!fs.existsSync(target)) {
          fs.cpSync(source, target, { recursive: true });
        }
      }
    }
  } catch (error) {
    console.warn("Failed to prepare Vercel media directory", error);
  }

  return vercelMediaDir;
};

export const Media: CollectionConfig = {
  slug: "media",
  upload: {
    staticDir: getMediaStaticDir(),
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
