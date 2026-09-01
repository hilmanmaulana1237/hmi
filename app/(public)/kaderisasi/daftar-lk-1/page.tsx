import { redirect } from "next/navigation";

export const metadata = {
  title: "Daftar LK-I",
  description: "Form pendaftaran LK-I HMI Komisariat Sains dan Teknologi.",
};

export default function DaftarLk1Page() {
  redirect("https://pendaftaran-lk1-saintek.vercel.app/");
}

