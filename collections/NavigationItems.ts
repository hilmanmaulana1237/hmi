import type { CollectionConfig } from "payload";
import {
  contentManagers,
  contentWriters,
  publicActiveCheckboxOrAuthenticated,
} from "./access";

export const NavigationItems: CollectionConfig = {
  slug: "navigation-items",
  labels: {
    singular: "Item Navigasi",
    plural: "Navigasi Website",
  },
  admin: {
    group: "Website",
    useAsTitle: "label",
    defaultColumns: ["label", "href", "location", "groupLabel", "isActive"],
    description:
      "Kontrol item navbar, dropdown, footer, dan shortcut yang tampil di website.",
  },
  access: {
    create: contentWriters,
    read: publicActiveCheckboxOrAuthenticated,
    update: contentManagers,
    delete: contentManagers,
  },
  fields: [
    { name: "label", type: "text", required: true },
    { name: "href", type: "text", required: true },
    {
      name: "location",
      type: "select",
      defaultValue: "navbar",
      required: true,
      options: [
        { label: "Navbar", value: "navbar" },
        { label: "Dropdown Profil", value: "profile_dropdown" },
        { label: "Dropdown Informasi", value: "info_dropdown" },
        { label: "Dropdown Kaderisasi", value: "cadre_dropdown" },
        { label: "Dropdown Layanan", value: "service_dropdown" },
        { label: "Footer Navigasi", value: "footer_navigation" },
        { label: "Footer Informasi", value: "footer_information" },
        { label: "Shortcut Admin", value: "admin_shortcut" },
      ],
    },
    {
      name: "groupLabel",
      type: "text",
      admin: {
        description:
          "Opsional. Gunakan untuk mengelompokkan item di dropdown/footer.",
      },
    },
    { name: "order", type: "number", defaultValue: 0 },
    { name: "isActive", type: "checkbox", defaultValue: true },
    { name: "opensInNewTab", type: "checkbox", defaultValue: false },
    {
      name: "adminOnly",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Aktifkan jika item hanya untuk pengurus/admin.",
      },
    },
  ],
};
