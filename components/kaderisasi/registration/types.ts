import type { MentorItem } from "@/lib/default-mentors";

export interface LK1FormData {
  // Step 1: Data Diri
  fullName: string;
  nickname: string;
  gender: string;
  birthPlace: string;
  birthDate: string;
  whatsapp: string;
  email: string;
  address: string;

  // Step 2: Data Akademik
  university: string;
  faculty: string;
  studyProgram: string;
  semester: string;
  nim: string;
  className: string;

  // Step 3: Motivasi & Minat
  motivation: string;
  organizationExperience: string;
  interestFields: string[];

  // Step 4: Mentor Pilihan
  mentorId: string;
  mentorName: string;
  mentorRole: string;
  mentorWhatsappGroup: string;

  // Step 5: Berkas & Dokumen
  paymentProofUrl: string;
  photoUrl: string;

  // Step 6: Konfirmasi
  consent: boolean;
}

export interface StoredLK1Registration {
  id?: string;
  registrationCode: string;
  fullName: string;
  nickname?: string;
  gender?: string;
  birthPlace?: string;
  birthDate?: string;
  whatsapp: string;
  email: string;
  address?: string;
  university: string;
  faculty?: string;
  studyProgram: string;
  semester?: number;
  nim: string;
  className?: string;
  mentorId?: string;
  mentorName?: string;
  mentorRole?: string;
  mentorWhatsappGroup?: string;
  motivation?: string;
  organizationExperience?: string;
  interestFields?: string[];
  photoUrl?: string;
  paymentProofUrl?: string;
  status: string;
  paymentStatus?: string;
  screeningSchedule?: string;
  screeningResult?: string;
  screeningScoreBtq?: string;
  screeningScoreHmi?: string;
  screeningScoreKebangsaan?: string;
  screeningNotes?: string;
  adminNote?: string;
  submittedAt?: string;
}

export { type MentorItem };

