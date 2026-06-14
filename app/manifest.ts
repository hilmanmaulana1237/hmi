import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HMI Komisariat Sains dan Teknologi UIN SGD Bandung",
    short_name: "HMI Saintek",
    description: "Official Website HMI Komisariat Sains dan Teknologi UIN Sunan Gunung Djati Bandung",
    start_url: "/",
    display: "standalone",
    background_color: "#F6F8F7",
    theme_color: "#006144",
    icons: [
      {
        src: "/icon.png",
        sizes: "any",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "any",
        type: "image/png",
      },
    ],
  };
}
