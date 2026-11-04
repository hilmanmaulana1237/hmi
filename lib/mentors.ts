import config from "@payload-config";
import { getPayload } from "payload";
import { defaultMentors, type MentorItem } from "./default-mentors";

export async function getActiveMentors(): Promise<MentorItem[]> {
  try {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "mentors",
      limit: 50,
      where: {
        isActive: {
          equals: true,
        },
      },
      sort: "order",
    });

    if (result.docs && result.docs.length > 0) {
      return result.docs.map((doc: any) => ({
        id: String(doc.id),
        name: doc.name,
        role: doc.role,
        faculty: doc.faculty || "Fakultas Sains dan Teknologi",
        studyProgram: doc.studyProgram || "",
        batch: doc.batch || "",
        avatarUrl: doc.avatarUrl || "/apple-icon.png",
        bio: doc.bio || "",
        guidanceFocus: doc.guidanceFocus || "",
        whatsappGroupUrl: doc.whatsappGroupUrl,
        whatsappNumber: doc.whatsappNumber || "",
        isActive: doc.isActive !== false,
        order: doc.order || 0,
      }));
    }
  } catch (error) {
    console.warn("Could not query mentors, using default mentors:", error);
  }

  return defaultMentors;
}

