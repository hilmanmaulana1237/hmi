import mysql from "mysql2/promise";

let pool: mysql.Pool | null = null;

export function isMysqlConfigured(): boolean {
  return Boolean(process.env.MYSQL_DATABASE || process.env.MYSQL_HOST);
}

export function getMysqlPool(): mysql.Pool {
  if (!pool) {
    const host = process.env.MYSQL_HOST || "localhost";
    const port = Number(process.env.MYSQL_PORT) || 3306;
    const user = process.env.MYSQL_USER || "root";
    const password = process.env.MYSQL_PASSWORD || "";
    const database = process.env.MYSQL_DATABASE || "hmi_saintek";

    pool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      charset: "utf8mb4",
    });
  }
  return pool;
}

export async function saveRegistrationToMysql(data: {
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
  motivation: string;
  organizationExperience?: string;
  interestFields?: string[];
  photoUrl?: string;
  paymentProofUrl?: string;
  status?: string;
  paymentStatus?: string;
}) {
  if (!isMysqlConfigured()) {
    return false;
  }

  try {
    const db = getMysqlPool();
    const query = `
      INSERT INTO lk1_registrations (
        registration_code,
        full_name,
        nickname,
        gender,
        birth_place,
        birth_date,
        whatsapp,
        email,
        address,
        university,
        faculty,
        study_program,
        semester,
        nim,
        class_name,
        mentor_id,
        mentor_name,
        mentor_role,
        mentor_whatsapp_group,
        motivation,
        organization_experience,
        interest_fields,
        photo_url,
        payment_proof_url,
        status,
        payment_status
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        full_name = VALUES(full_name),
        status = VALUES(status),
        mentor_name = VALUES(mentor_name),
        mentor_whatsapp_group = VALUES(mentor_whatsapp_group)
    `;

    const values = [
      data.registrationCode,
      data.fullName,
      data.nickname || null,
      data.gender || null,
      data.birthPlace || null,
      data.birthDate || null,
      data.whatsapp,
      data.email,
      data.address || null,
      data.university,
      data.faculty || null,
      data.studyProgram,
      data.semester || 1,
      data.nim,
      data.className || null,
      data.mentorId || null,
      data.mentorName || null,
      data.mentorRole || null,
      data.mentorWhatsappGroup || null,
      data.motivation,
      data.organizationExperience || null,
      data.interestFields ? JSON.stringify(data.interestFields) : null,
      data.photoUrl || null,
      data.paymentProofUrl || null,
      data.status || "Pending",
      data.paymentStatus || "Belum Dicek",
    ];

    await db.execute(query, values);
    return true;
  } catch (error) {
    console.warn("Could not sync registration to MySQL:", error);
    return false;
  }
}

export async function saveMentorToMysql(mentor: {
  id: string;
  name: string;
  role: string;
  faculty?: string;
  studyProgram?: string;
  batch?: string;
  avatarUrl?: string;
  bio?: string;
  guidanceFocus?: string;
  whatsappGroupUrl: string;
  whatsappNumber?: string;
  isActive?: boolean;
  order?: number;
}) {
  if (!isMysqlConfigured()) return false;
  try {
    const db = getMysqlPool();
    const query = `
      INSERT INTO mentors (
        mentor_key,
        name,
        role,
        faculty,
        study_program,
        batch,
        avatar_url,
        bio,
        guidance_focus,
        whatsapp_group_url,
        whatsapp_number,
        is_active,
        display_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        name = VALUES(name),
        role = VALUES(role),
        faculty = VALUES(faculty),
        study_program = VALUES(study_program),
        batch = VALUES(batch),
        avatar_url = VALUES(avatar_url),
        bio = VALUES(bio),
        guidance_focus = VALUES(guidance_focus),
        whatsapp_group_url = VALUES(whatsapp_group_url),
        whatsapp_number = VALUES(whatsapp_number),
        is_active = VALUES(is_active),
        display_order = VALUES(display_order)
    `;

    const values = [
      String(mentor.id),
      mentor.name,
      mentor.role,
      mentor.faculty || "Fakultas Sains dan Teknologi",
      mentor.studyProgram || "",
      mentor.batch || "",
      mentor.avatarUrl || null,
      mentor.bio || null,
      mentor.guidanceFocus || null,
      mentor.whatsappGroupUrl,
      mentor.whatsappNumber || null,
      mentor.isActive !== false ? 1 : 0,
      mentor.order || 0,
    ];

    await db.execute(query, values);
    return true;
  } catch (error) {
    console.warn("Could not sync mentor to MySQL:", error);
    return false;
  }
}

export async function deleteMentorFromMysql(id: string) {
  if (!isMysqlConfigured()) return false;
  try {
    const db = getMysqlPool();
    await db.execute("DELETE FROM mentors WHERE mentor_key = ? OR id = ?", [id, id]);
    return true;
  } catch (error) {
    console.warn("Could not delete mentor from MySQL:", error);
    return false;
  }
}

export async function getAllMentorsFromMysql() {
  if (!isMysqlConfigured()) return [];
  try {
    const db = getMysqlPool();
    const [rows] = await db.query<any[]>(
      "SELECT * FROM mentors ORDER BY display_order ASC, name ASC"
    );
    return rows.map((r) => ({
      id: String(r.mentor_key || r.id),
      name: r.name,
      role: r.role,
      faculty: r.faculty,
      studyProgram: r.study_program,
      batch: r.batch,
      avatarUrl: r.avatar_url,
      bio: r.bio,
      guidanceFocus: r.guidance_focus,
      whatsappGroupUrl: r.whatsapp_group_url,
      whatsappNumber: r.whatsapp_number,
      isActive: Boolean(r.is_active),
      order: Number(r.display_order) || 0,
    }));
  } catch (error) {
    console.warn("Could not fetch mentors from MySQL:", error);
    return [];
  }
}


