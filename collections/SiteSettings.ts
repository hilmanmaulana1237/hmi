import type { CollectionConfig } from "payload";
import { adminsAndChair, anyone, superAdmins } from "./access";

export const SiteSettings: CollectionConfig = {
  slug: "site-settings",
  admin: {
    group: "Website",
    useAsTitle: "siteName",
    defaultColumns: ["siteName", "activePeriod", "updatedAt"],
  },
  access: {
    create: superAdmins,
    read: anyone,
    update: adminsAndChair,
    delete: superAdmins,
  },
  fields: [
    { name: "siteName", type: "text", required: true },
    { name: "siteDescription", type: "textarea" },
    {
      name: "visionMision",
      type: "group",
      label: "Visi, Misi & Landasan Gerak",
      fields: [
        {
          name: "vision",
          type: "textarea",
          label: "Visi Utama Organisasi",
          admin: {
            description: "Pernyataan visi utama HMI Komisariat Sains & Teknologi",
          },
        },
        {
          name: "visionDescription",
          type: "textarea",
          label: "Penjelasan / Catatan Visi",
          admin: {
            description: "Catatan penjelas visi yang tampil di bawah teks visi",
          },
        },
        {
          name: "arahGerakQuote",
          type: "textarea",
          label: "Kutipan Arah Gerak",
        },
        {
          name: "arahGerakDescription",
          type: "textarea",
          label: "Deskripsi Arah Gerak",
        },
        {
          name: "tujuanHmi",
          type: "textarea",
          label: "Tujuan HMI (Pasal 4 AD HMI)",
        },
        {
          name: "missions",
          type: "array",
          label: "Daftar Misi Strategis",
          labels: {
            singular: "Misi",
            plural: "Daftar Misi",
          },
          fields: [
            { name: "title", type: "text", label: "Judul Misi", required: true },
            { name: "description", type: "textarea", label: "Penjelasan Misi", required: true },
          ],
        },
      ],
    },
    { name: "logo", type: "upload", relationTo: "media" },
    { name: "smallLogo", type: "upload", relationTo: "media" },
    { name: "activePeriod", type: "text" },
    { name: "organizationName", type: "text" },
    { name: "branchName", type: "text" },
    { name: "universityName", type: "text" },
    { name: "address", type: "textarea" },
    { name: "email", type: "email" },
    { name: "phone", type: "text" },
    { name: "whatsapp", type: "text" },
    { name: "instagram", type: "text" },
    { name: "tiktok", type: "text" },
    { name: "youtube", type: "text" },
    { name: "googleMapsEmbed", type: "textarea" },
    { name: "footerDescription", type: "textarea" },
    { name: "tagline", type: "textarea" },
    {
      name: "homepage",
      type: "group",
      label: "Kontrol Beranda",
      fields: [
        { name: "heroBadge", type: "text", defaultValue: "Official Website" },
        { name: "heroTitle", type: "text" },
        { name: "heroSubtitle", type: "textarea" },
        { name: "heroImage", type: "upload", relationTo: "media" },
        { name: "primaryCtaLabel", type: "text", defaultValue: "Daftar LK-I" },
        { name: "primaryCtaHref", type: "text", defaultValue: "https://pendaftaran-lk1-saintek.vercel.app/" },
        { name: "secondaryCtaLabel", type: "text", defaultValue: "Lihat Profil" },
        { name: "secondaryCtaHref", type: "text", defaultValue: "/profil" },
        { name: "totalCadres", type: "number" },
        { name: "totalAlumni", type: "number" },
        { name: "totalAgenda", type: "number" },
        { name: "totalPublications", type: "number" },
        { name: "totalDocuments", type: "number" },
      ],
    },
    {
      name: "featureToggles",
      type: "group",
      label: "Saklar Fitur",
      fields: [
        { name: "showNews", type: "checkbox", defaultValue: true },
        { name: "showAgenda", type: "checkbox", defaultValue: true },
        { name: "showOpinions", type: "checkbox", defaultValue: true },
        { name: "showGallery", type: "checkbox", defaultValue: true },
        { name: "showAdvocacy", type: "checkbox", defaultValue: true },
        { name: "showChatWidget", type: "checkbox", defaultValue: true },
        { name: "openLK1Registration", type: "checkbox", defaultValue: true },
      ],
    },
  ],
};
