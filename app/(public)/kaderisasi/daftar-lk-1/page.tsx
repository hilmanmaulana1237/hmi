import { LK1RegistrationPortal } from "@/components/kaderisasi/registration/lk1-registration-portal";
import { getActiveMentors } from "@/lib/mentors";

export const metadata = {
  title: "Pendaftaran LK-I Online | HMI Sains dan Teknologi",
  description:
    "Portal resmi pendaftaran Basic Training (LK-I) HMI Komisariat Sains dan Teknologi UIN Sunan Gunung Djati Bandung. Pilih mentor bimbingan akademik & organisasi serta bergabung ke grup WhatsApp.",
};

export const dynamic = "force-dynamic";

export default async function DaftarLk1Page() {
  const mentors = await getActiveMentors();

  return <LK1RegistrationPortal initialMentors={mentors} />;
}
