import { z } from "zod";

export const lk1RegistrationSchema = z.object({
  fullName: z.string().min(3),
  nickname: z.string().optional(),
  gender: z.enum(["Laki-laki", "Perempuan"]).optional(),
  birthPlace: z.string().optional(),
  birthDate: z.string().optional(),
  whatsapp: z.string().min(8),
  email: z.email(),
  address: z.string().optional(),
  university: z.string().min(2),
  faculty: z.string().optional(),
  studyProgram: z.string().min(2),
  semester: z.coerce.number().int().min(1).max(14).optional(),
  nim: z.string().min(4),
  className: z.string().optional(),
  motivation: z.string().min(20),
  organizationExperience: z.string().optional(),
  interestFields: z.array(z.string()).optional(),
});

export const advocacyReportSchema = z.object({
  reporterNameOrInitial: z.string().optional(),
  contactOptional: z.string().optional(),
  topic: z.string().min(3),
  description: z.string().min(15),
  isConfidential: z.boolean().default(true),
});

export type LK1RegistrationInput = z.infer<typeof lk1RegistrationSchema>;
export type AdvocacyReportInput = z.infer<typeof advocacyReportSchema>;
