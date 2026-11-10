"use client";

import { useState, useEffect } from "react";
import type { LK1FormData } from "./types";

const CACHE_KEY = "hmi_lk1_registration_cache_v2";
const STEP_KEY = "hmi_lk1_form_step_v2";

export const initialFormData: LK1FormData = {
  fullName: "",
  nickname: "",
  gender: "",
  birthPlace: "",
  birthDate: "",
  whatsapp: "",
  email: "",
  address: "",
  university: "UIN Sunan Gunung Djati Bandung",
  faculty: "Fakultas Sains dan Teknologi",
  studyProgram: "",
  customStudyProgram: "",
  semester: "1",
  nim: "",
  className: "",
  motivation: "",
  organizationExperience: "",
  interestFields: [],
  mentorId: "",
  mentorName: "",
  mentorRole: "",
  mentorWhatsappGroup: "",
  paymentProofUrl: "",
  photoUrl: "",
  igProofConfirmed: false,
  igProofDriveUrl: "",
  consent: false,
};

export function useFormCache() {
  const [formData, setFormData] = useState<LK1FormData>(initialFormData);
  const [step, setStep] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      const savedStep = localStorage.getItem(STEP_KEY);

      if (cached) {
        const parsed = JSON.parse(cached);
        setFormData((prev) => ({ ...initialFormData, ...prev, ...parsed }));
      }

      if (savedStep) {
        const s = parseInt(savedStep, 10);
        if (!isNaN(s) && s >= 0 && s <= 5) {
          setStep(s);
        }
      }
    } catch (e) {
      console.warn("Failed to load form cache:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(formData));
      localStorage.setItem(STEP_KEY, step.toString());
    } catch (e) {
      console.warn("Failed to save form cache:", e);
    }
  }, [formData, step, isLoaded]);

  const updateField = <K extends keyof LK1FormData>(
    field: K,
    value: LK1FormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleInterestField = (field: string) => {
    setFormData((prev) => {
      const exists = prev.interestFields.includes(field);
      const next = exists
        ? prev.interestFields.filter((item) => item !== field)
        : [...prev.interestFields, field];
      return { ...prev, interestFields: next };
    });
  };

  const clearCache = () => {
    try {
      localStorage.removeItem(CACHE_KEY);
      localStorage.removeItem(STEP_KEY);
    } catch {
      // ignore
    }
    setFormData(initialFormData);
    setStep(0);
  };

  return {
    formData,
    setFormData,
    step,
    setStep,
    updateField,
    toggleInterestField,
    clearCache,
    isLoaded,
  };
}

