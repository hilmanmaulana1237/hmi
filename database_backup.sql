-- =====================================================================
-- PostgreSQL Database Backup
-- Export Date: 2026-11-03T07:52:36.079Z
-- Server Version: PostgreSQL 18.6 (4e5fd08) on aarch64-unknown-linux-gnu, compiled by gcc (Ubuntu 13.3.0-6ubuntu2~24.04.1) 13.3.0, 64-bit
-- Target File: backup_database_20261103.sql
-- =====================================================================

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- Ensure public schema exists
CREATE SCHEMA IF NOT EXISTS "public";

-- =====================================================================
-- Custom ENUM Types
-- =====================================================================

DO $$ BEGIN
  CREATE TYPE "public"."enum_advocacy_reports_status" AS ENUM ('Masuk', 'Diproses', 'Ditindaklanjuti', 'Selesai', 'Ditolak');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."enum_announcements_status" AS ENUM ('draft', 'published', 'archived');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."enum_cadres_cadre_status" AS ENUM ('Anggota Muda', 'LK-I', 'LK-II', 'LK-III', 'Pengurus', 'Alumni');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."enum_cadres_gender" AS ENUM ('Laki-laki', 'Perempuan');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."enum_contact_messages_status" AS ENUM ('Masuk', 'Dibaca', 'Dibalas', 'Diarsipkan');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."enum_documents_access" AS ENUM ('public', 'kader', 'admin');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."enum_documents_category" AS ENUM ('Materi LK-I', 'Materi LK-II', 'Konstitusi HMI', 'Administrasi', 'Surat', 'Pedoman Organisasi');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."enum_events_status" AS ENUM ('upcoming', 'ongoing', 'done', 'cancelled', 'published');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."enum_lk1_registrations_gender" AS ENUM ('Laki-laki', 'Perempuan');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."enum_lk1_registrations_interest_fields" AS ENUM ('Kaderisasi', 'PTKP', 'Kewirausahaan', 'Media dan Komunikasi', 'Keilmuan', 'Keagamaan', 'Sosial Masyarakat');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."enum_lk1_registrations_payment_status" AS ENUM ('Belum Dicek', 'Belum Bayar', 'Menunggu Verifikasi', 'Terverifikasi', 'Ditolak', 'Gratis');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."enum_lk1_registrations_status" AS ENUM ('Pending', 'Diverifikasi', 'Diterima', 'Ditolak', 'Cadangan', 'Mengikuti Screening', 'Lulus LK-I');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."enum_navigation_items_location" AS ENUM ('navbar', 'profile_dropdown', 'info_dropdown', 'cadre_dropdown', 'service_dropdown', 'footer_navigation', 'footer_information', 'admin_shortcut');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."enum_news_status" AS ENUM ('draft', 'published', 'archived');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."enum_opinions_status" AS ENUM ('draft', 'published', 'archived');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."enum_organization_structure_bidang" AS ENUM ('bph_ketum', 'bph_sekum', 'bph_bendum', 'pppa', 'ptkp', 'kpp', 'kohati');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."enum_organization_structure_role_level" AS ENUM ('ketum', 'sekum_bendum', 'kabid', 'wasekum', 'bendum_kohati', 'departemen');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."enum_pages_status" AS ENUM ('draft', 'published', 'archived');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE TYPE "public"."enum_users_roles" AS ENUM ('super_admin', 'ketua_umum', 'sekretaris_umum', 'bendahara_umum', 'bidang_kaderisasi', 'bidang_ptkp', 'bidang_media', 'editor', 'viewer');
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- =====================================================================
-- Sequences
-- =====================================================================

CREATE SEQUENCE IF NOT EXISTS "public"."advocacy_reports_id_seq"
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 2147483647
  CACHE 1;
CREATE SEQUENCE IF NOT EXISTS "public"."announcements_id_seq"
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 2147483647
  CACHE 1;
CREATE SEQUENCE IF NOT EXISTS "public"."audit_logs_id_seq"
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 2147483647
  CACHE 1;
CREATE SEQUENCE IF NOT EXISTS "public"."banners_id_seq"
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 2147483647
  CACHE 1;
CREATE SEQUENCE IF NOT EXISTS "public"."cadres_id_seq"
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 2147483647
  CACHE 1;
CREATE SEQUENCE IF NOT EXISTS "public"."contact_messages_id_seq"
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 2147483647
  CACHE 1;
CREATE SEQUENCE IF NOT EXISTS "public"."documents_id_seq"
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 2147483647
  CACHE 1;
CREATE SEQUENCE IF NOT EXISTS "public"."events_id_seq"
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 2147483647
  CACHE 1;
CREATE SEQUENCE IF NOT EXISTS "public"."events_rels_id_seq"
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 2147483647
  CACHE 1;
CREATE SEQUENCE IF NOT EXISTS "public"."former_chairpersons_id_seq"
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 2147483647
  CACHE 1;
CREATE SEQUENCE IF NOT EXISTS "public"."gallery_id_seq"
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 2147483647
  CACHE 1;
CREATE SEQUENCE IF NOT EXISTS "public"."lk1_registrations_id_seq"
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 2147483647
  CACHE 1;
CREATE SEQUENCE IF NOT EXISTS "public"."lk1_registrations_interest_fields_id_seq"
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 2147483647
  CACHE 1;
CREATE SEQUENCE IF NOT EXISTS "public"."media_id_seq"
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 2147483647
  CACHE 1;
CREATE SEQUENCE IF NOT EXISTS "public"."navigation_items_id_seq"
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 2147483647
  CACHE 1;
CREATE SEQUENCE IF NOT EXISTS "public"."news_id_seq"
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 2147483647
  CACHE 1;
CREATE SEQUENCE IF NOT EXISTS "public"."opinions_id_seq"
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 2147483647
  CACHE 1;
CREATE SEQUENCE IF NOT EXISTS "public"."organization_structure_id_seq"
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 2147483647
  CACHE 1;
CREATE SEQUENCE IF NOT EXISTS "public"."pages_id_seq"
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 2147483647
  CACHE 1;
CREATE SEQUENCE IF NOT EXISTS "public"."payload_kv_id_seq"
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 2147483647
  CACHE 1;
CREATE SEQUENCE IF NOT EXISTS "public"."payload_locked_documents_id_seq"
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 2147483647
  CACHE 1;
CREATE SEQUENCE IF NOT EXISTS "public"."payload_locked_documents_rels_id_seq"
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 2147483647
  CACHE 1;
CREATE SEQUENCE IF NOT EXISTS "public"."payload_migrations_id_seq"
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 2147483647
  CACHE 1;
CREATE SEQUENCE IF NOT EXISTS "public"."payload_preferences_id_seq"
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 2147483647
  CACHE 1;
CREATE SEQUENCE IF NOT EXISTS "public"."payload_preferences_rels_id_seq"
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 2147483647
  CACHE 1;
CREATE SEQUENCE IF NOT EXISTS "public"."programs_id_seq"
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 2147483647
  CACHE 1;
CREATE SEQUENCE IF NOT EXISTS "public"."site_settings_id_seq"
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 2147483647
  CACHE 1;
CREATE SEQUENCE IF NOT EXISTS "public"."users_id_seq"
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 2147483647
  CACHE 1;
CREATE SEQUENCE IF NOT EXISTS "public"."users_roles_id_seq"
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 2147483647
  CACHE 1;

-- =====================================================================
-- Tables Schema
-- =====================================================================

CREATE TABLE IF NOT EXISTS "public"."advocacy_reports" (
    "id" integer NOT NULL DEFAULT nextval('advocacy_reports_id_seq'::regclass),
    "reporter_name_or_initial" character varying,
    "contact_optional" character varying,
    "topic" character varying NOT NULL,
    "description" character varying NOT NULL,
    "evidence_file_id" integer,
    "status" enum_advocacy_reports_status NOT NULL DEFAULT 'Masuk'::enum_advocacy_reports_status,
    "is_confidential" boolean DEFAULT true,
    "admin_note" character varying,
    "handled_by_id" integer,
    "last_follow_up_at" timestamp(3) with time zone,
    "updated_at" timestamp(3) with time zone NOT NULL DEFAULT now(),
    "created_at" timestamp(3) with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "public"."advocacy_reports_follow_ups" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" character varying NOT NULL,
    "date" timestamp(3) with time zone NOT NULL,
    "note" character varying NOT NULL,
    "handled_by_id" integer
);

CREATE TABLE IF NOT EXISTS "public"."announcements" (
    "id" integer NOT NULL DEFAULT nextval('announcements_id_seq'::regclass),
    "title" character varying NOT NULL,
    "slug" character varying NOT NULL,
    "excerpt" character varying,
    "content" jsonb,
    "published_at" timestamp(3) with time zone,
    "status" enum_announcements_status NOT NULL DEFAULT 'draft'::enum_announcements_status,
    "updated_at" timestamp(3) with time zone NOT NULL DEFAULT now(),
    "created_at" timestamp(3) with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "public"."audit_logs" (
    "id" integer NOT NULL DEFAULT nextval('audit_logs_id_seq'::regclass),
    "action" character varying NOT NULL,
    "collection_slug" character varying,
    "document_id" character varying,
    "user_id" integer,
    "metadata" jsonb,
    "updated_at" timestamp(3) with time zone NOT NULL DEFAULT now(),
    "created_at" timestamp(3) with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "public"."banners" (
    "id" integer NOT NULL DEFAULT nextval('banners_id_seq'::regclass),
    "title" character varying NOT NULL,
    "subtitle" character varying,
    "image_id" integer,
    "cta_label" character varying,
    "cta_href" character varying,
    "placement" character varying,
    "is_active" boolean DEFAULT true,
    "order" numeric DEFAULT 0,
    "updated_at" timestamp(3) with time zone NOT NULL DEFAULT now(),
    "created_at" timestamp(3) with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "public"."cadres" (
    "id" integer NOT NULL DEFAULT nextval('cadres_id_seq'::regclass),
    "full_name" character varying NOT NULL,
    "nickname" character varying,
    "gender" enum_cadres_gender,
    "university" character varying,
    "faculty" character varying,
    "study_program" character varying NOT NULL,
    "nim" character varying,
    "batch_year" numeric NOT NULL,
    "cadre_status" enum_cadres_cadre_status NOT NULL,
    "phone_private" character varying,
    "email_private" character varying,
    "address_private" character varying,
    "photo_id" integer,
    "is_public" boolean DEFAULT true,
    "notes_private" character varying,
    "updated_at" timestamp(3) with time zone NOT NULL DEFAULT now(),
    "created_at" timestamp(3) with time zone NOT NULL DEFAULT now(),
    "training_batch" character varying
);

CREATE TABLE IF NOT EXISTS "public"."contact_messages" (
    "id" integer NOT NULL DEFAULT nextval('contact_messages_id_seq'::regclass),
    "name" character varying NOT NULL,
    "email" character varying,
    "whatsapp" character varying,
    "subject" character varying NOT NULL,
    "message" character varying NOT NULL,
    "is_read" boolean DEFAULT false,
    "status" enum_contact_messages_status DEFAULT 'Masuk'::enum_contact_messages_status,
    "handled_by_id" integer,
    "reply_note" character varying,
    "updated_at" timestamp(3) with time zone NOT NULL DEFAULT now(),
    "created_at" timestamp(3) with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "public"."documents" (
    "id" integer NOT NULL DEFAULT nextval('documents_id_seq'::regclass),
    "title" character varying NOT NULL,
    "category" enum_documents_category NOT NULL,
    "file_id" integer,
    "file_url" character varying,
    "description" character varying,
    "access" enum_documents_access NOT NULL DEFAULT 'public'::enum_documents_access,
    "uploaded_by_id" integer,
    "version" character varying,
    "is_featured" boolean DEFAULT false,
    "published_at" timestamp(3) with time zone,
    "updated_at" timestamp(3) with time zone NOT NULL DEFAULT now(),
    "created_at" timestamp(3) with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "public"."events" (
    "id" integer NOT NULL DEFAULT nextval('events_id_seq'::regclass),
    "title" character varying NOT NULL,
    "slug" character varying NOT NULL,
    "excerpt" character varying,
    "description" jsonb,
    "date" timestamp(3) with time zone NOT NULL,
    "start_time" character varying,
    "end_time" character varying,
    "location" character varying NOT NULL,
    "cover_image_id" integer,
    "status" enum_events_status NOT NULL DEFAULT 'upcoming'::enum_events_status,
    "registration_link" character varying,
    "is_published" boolean DEFAULT true,
    "featured" boolean DEFAULT false,
    "seo_title" character varying,
    "seo_description" character varying,
    "updated_at" timestamp(3) with time zone NOT NULL DEFAULT now(),
    "created_at" timestamp(3) with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "public"."events_rels" (
    "id" integer NOT NULL DEFAULT nextval('events_rels_id_seq'::regclass),
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" character varying NOT NULL,
    "gallery_id" integer
);

CREATE TABLE IF NOT EXISTS "public"."former_chairpersons" (
    "id" integer NOT NULL DEFAULT nextval('former_chairpersons_id_seq'::regclass),
    "name" character varying NOT NULL,
    "photo_id" integer,
    "period" character varying NOT NULL,
    "quote" character varying,
    "description" character varying,
    "order" numeric DEFAULT 0,
    "updated_at" timestamp(3) with time zone NOT NULL DEFAULT now(),
    "created_at" timestamp(3) with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "public"."gallery" (
    "id" integer NOT NULL DEFAULT nextval('gallery_id_seq'::regclass),
    "title" character varying NOT NULL,
    "description" character varying,
    "category" character varying,
    "image_id" integer,
    "video_url" character varying,
    "date" timestamp(3) with time zone,
    "is_published" boolean DEFAULT true,
    "updated_at" timestamp(3) with time zone NOT NULL DEFAULT now(),
    "created_at" timestamp(3) with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "public"."lk1_registrations" (
    "id" integer NOT NULL DEFAULT nextval('lk1_registrations_id_seq'::regclass),
    "registration_code" character varying NOT NULL,
    "full_name" character varying NOT NULL,
    "nickname" character varying,
    "gender" enum_lk1_registrations_gender,
    "birth_place" character varying,
    "birth_date" timestamp(3) with time zone,
    "whatsapp" character varying NOT NULL,
    "email" character varying NOT NULL,
    "address" character varying,
    "university" character varying NOT NULL,
    "faculty" character varying,
    "study_program" character varying NOT NULL,
    "semester" numeric,
    "nim" character varying NOT NULL,
    "class_name" character varying,
    "motivation" character varying NOT NULL,
    "organization_experience" character varying,
    "payment_proof_id" integer,
    "payment_status" enum_lk1_registrations_payment_status DEFAULT 'Belum Dicek'::enum_lk1_registrations_payment_status,
    "payment_amount" numeric,
    "payment_method" character varying,
    "payment_verified_at" timestamp(3) with time zone,
    "payment_verified_by_id" integer,
    "status" enum_lk1_registrations_status NOT NULL DEFAULT 'Pending'::enum_lk1_registrations_status,
    "admin_note" character varying,
    "submitted_at" timestamp(3) with time zone,
    "verified_by_id" integer,
    "has_been_contacted" boolean DEFAULT false,
    "screening_schedule" timestamp(3) with time zone,
    "screening_result" character varying,
    "follow_up_note" character varying,
    "updated_at" timestamp(3) with time zone NOT NULL DEFAULT now(),
    "created_at" timestamp(3) with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "public"."lk1_registrations_interest_fields" (
    "order" integer NOT NULL,
    "parent_id" integer NOT NULL,
    "value" enum_lk1_registrations_interest_fields,
    "id" integer NOT NULL DEFAULT nextval('lk1_registrations_interest_fields_id_seq'::regclass)
);

CREATE TABLE IF NOT EXISTS "public"."media" (
    "id" integer NOT NULL DEFAULT nextval('media_id_seq'::regclass),
    "alt" character varying NOT NULL,
    "caption" character varying,
    "updated_at" timestamp(3) with time zone NOT NULL DEFAULT now(),
    "created_at" timestamp(3) with time zone NOT NULL DEFAULT now(),
    "url" character varying,
    "thumbnail_u_r_l" character varying,
    "filename" character varying,
    "mime_type" character varying,
    "filesize" numeric,
    "width" numeric,
    "height" numeric,
    "focal_x" numeric,
    "focal_y" numeric
);

CREATE TABLE IF NOT EXISTS "public"."navigation_items" (
    "id" integer NOT NULL DEFAULT nextval('navigation_items_id_seq'::regclass),
    "label" character varying NOT NULL,
    "href" character varying NOT NULL,
    "location" enum_navigation_items_location NOT NULL DEFAULT 'navbar'::enum_navigation_items_location,
    "group_label" character varying,
    "order" numeric DEFAULT 0,
    "is_active" boolean DEFAULT true,
    "opens_in_new_tab" boolean DEFAULT false,
    "admin_only" boolean DEFAULT false,
    "updated_at" timestamp(3) with time zone NOT NULL DEFAULT now(),
    "created_at" timestamp(3) with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "public"."news" (
    "id" integer NOT NULL DEFAULT nextval('news_id_seq'::regclass),
    "title" character varying NOT NULL,
    "slug" character varying NOT NULL,
    "excerpt" character varying NOT NULL,
    "content" jsonb NOT NULL,
    "cover_image_id" integer,
    "category" character varying NOT NULL,
    "author_id" integer,
    "published_at" timestamp(3) with time zone,
    "status" enum_news_status NOT NULL DEFAULT 'draft'::enum_news_status,
    "featured" boolean DEFAULT false,
    "seo_title" character varying,
    "seo_description" character varying,
    "updated_at" timestamp(3) with time zone NOT NULL DEFAULT now(),
    "created_at" timestamp(3) with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "public"."opinions" (
    "id" integer NOT NULL DEFAULT nextval('opinions_id_seq'::regclass),
    "title" character varying NOT NULL,
    "slug" character varying NOT NULL,
    "author_name" character varying NOT NULL,
    "author_photo_id" integer,
    "author_prodi" character varying,
    "author_status" character varying,
    "excerpt" character varying NOT NULL,
    "content" jsonb NOT NULL,
    "cover_image_id" integer,
    "category" character varying,
    "published_at" timestamp(3) with time zone,
    "status" enum_opinions_status NOT NULL DEFAULT 'draft'::enum_opinions_status,
    "updated_at" timestamp(3) with time zone NOT NULL DEFAULT now(),
    "created_at" timestamp(3) with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "public"."organization_structure" (
    "id" integer NOT NULL DEFAULT nextval('organization_structure_id_seq'::regclass),
    "name" character varying NOT NULL,
    "position" character varying NOT NULL,
    "department" character varying,
    "photo_id" integer,
    "description" character varying,
    "order" numeric DEFAULT 0,
    "period" character varying,
    "instagram" character varying,
    "updated_at" timestamp(3) with time zone NOT NULL DEFAULT now(),
    "created_at" timestamp(3) with time zone NOT NULL DEFAULT now(),
    "bidang" enum_organization_structure_bidang,
    "role_level" enum_organization_structure_role_level
);

CREATE TABLE IF NOT EXISTS "public"."pages" (
    "id" integer NOT NULL DEFAULT nextval('pages_id_seq'::regclass),
    "title" character varying NOT NULL,
    "slug" character varying NOT NULL,
    "excerpt" character varying,
    "content" jsonb,
    "status" enum_pages_status NOT NULL DEFAULT 'draft'::enum_pages_status,
    "seo_title" character varying,
    "seo_description" character varying,
    "updated_at" timestamp(3) with time zone NOT NULL DEFAULT now(),
    "created_at" timestamp(3) with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "public"."payload_kv" (
    "id" integer NOT NULL DEFAULT nextval('payload_kv_id_seq'::regclass),
    "key" character varying NOT NULL,
    "data" jsonb NOT NULL
);

CREATE TABLE IF NOT EXISTS "public"."payload_locked_documents" (
    "id" integer NOT NULL DEFAULT nextval('payload_locked_documents_id_seq'::regclass),
    "global_slug" character varying,
    "updated_at" timestamp(3) with time zone NOT NULL DEFAULT now(),
    "created_at" timestamp(3) with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "public"."payload_locked_documents_rels" (
    "id" integer NOT NULL DEFAULT nextval('payload_locked_documents_rels_id_seq'::regclass),
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" character varying NOT NULL,
    "users_id" integer,
    "media_id" integer,
    "site_settings_id" integer,
    "navigation_items_id" integer,
    "pages_id" integer,
    "news_id" integer,
    "events_id" integer,
    "opinions_id" integer,
    "gallery_id" integer,
    "documents_id" integer,
    "cadres_id" integer,
    "lk1_registrations_id" integer,
    "organization_structure_id" integer,
    "former_chairpersons_id" integer,
    "advocacy_reports_id" integer,
    "announcements_id" integer,
    "programs_id" integer,
    "banners_id" integer,
    "contact_messages_id" integer,
    "audit_logs_id" integer
);

CREATE TABLE IF NOT EXISTS "public"."payload_migrations" (
    "id" integer NOT NULL DEFAULT nextval('payload_migrations_id_seq'::regclass),
    "name" character varying,
    "batch" numeric,
    "updated_at" timestamp(3) with time zone NOT NULL DEFAULT now(),
    "created_at" timestamp(3) with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "public"."payload_preferences" (
    "id" integer NOT NULL DEFAULT nextval('payload_preferences_id_seq'::regclass),
    "key" character varying,
    "value" jsonb,
    "updated_at" timestamp(3) with time zone NOT NULL DEFAULT now(),
    "created_at" timestamp(3) with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "public"."payload_preferences_rels" (
    "id" integer NOT NULL DEFAULT nextval('payload_preferences_rels_id_seq'::regclass),
    "order" integer,
    "parent_id" integer NOT NULL,
    "path" character varying NOT NULL,
    "users_id" integer
);

CREATE TABLE IF NOT EXISTS "public"."programs" (
    "id" integer NOT NULL DEFAULT nextval('programs_id_seq'::regclass),
    "title" character varying NOT NULL,
    "slug" character varying NOT NULL,
    "department" character varying,
    "description" character varying,
    "cover_image_id" integer,
    "is_active" boolean DEFAULT true,
    "order" numeric DEFAULT 0,
    "updated_at" timestamp(3) with time zone NOT NULL DEFAULT now(),
    "created_at" timestamp(3) with time zone NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS "public"."site_settings" (
    "id" integer NOT NULL DEFAULT nextval('site_settings_id_seq'::regclass),
    "site_name" character varying NOT NULL,
    "site_description" character varying,
    "logo_id" integer,
    "small_logo_id" integer,
    "active_period" character varying,
    "organization_name" character varying,
    "branch_name" character varying,
    "university_name" character varying,
    "address" character varying,
    "email" character varying,
    "phone" character varying,
    "whatsapp" character varying,
    "instagram" character varying,
    "tiktok" character varying,
    "youtube" character varying,
    "google_maps_embed" character varying,
    "footer_description" character varying,
    "tagline" character varying,
    "homepage_hero_badge" character varying DEFAULT 'Official Website'::character varying,
    "homepage_hero_title" character varying,
    "homepage_hero_subtitle" character varying,
    "homepage_hero_image_id" integer,
    "homepage_primary_cta_label" character varying DEFAULT 'Daftar LK-I'::character varying,
    "homepage_primary_cta_href" character varying DEFAULT 'https://pendaftaran-lk1-saintek.vercel.app/'::character varying,
    "homepage_secondary_cta_label" character varying DEFAULT 'Lihat Profil'::character varying,
    "homepage_secondary_cta_href" character varying DEFAULT '/profil'::character varying,
    "homepage_total_cadres" numeric,
    "homepage_total_alumni" numeric,
    "homepage_total_agenda" numeric,
    "homepage_total_publications" numeric,
    "homepage_total_documents" numeric,
    "feature_toggles_show_news" boolean DEFAULT true,
    "feature_toggles_show_agenda" boolean DEFAULT true,
    "feature_toggles_show_opinions" boolean DEFAULT true,
    "feature_toggles_show_gallery" boolean DEFAULT true,
    "feature_toggles_show_advocacy" boolean DEFAULT true,
    "feature_toggles_show_chat_widget" boolean DEFAULT true,
    "feature_toggles_open_l_k1_registration" boolean DEFAULT true,
    "updated_at" timestamp(3) with time zone NOT NULL DEFAULT now(),
    "created_at" timestamp(3) with time zone NOT NULL DEFAULT now(),
    "vision_mision_vision" character varying,
    "vision_mision_vision_description" character varying,
    "vision_mision_arah_gerak_quote" character varying,
    "vision_mision_arah_gerak_description" character varying,
    "vision_mision_tujuan_hmi" character varying
);

CREATE TABLE IF NOT EXISTS "public"."site_settings_vision_mision_missions" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" character varying NOT NULL,
    "title" character varying NOT NULL,
    "description" character varying NOT NULL
);

CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" integer NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "name" character varying NOT NULL,
    "is_active" boolean DEFAULT true,
    "updated_at" timestamp(3) with time zone NOT NULL DEFAULT now(),
    "created_at" timestamp(3) with time zone NOT NULL DEFAULT now(),
    "email" character varying NOT NULL,
    "reset_password_token" character varying,
    "reset_password_expiration" timestamp(3) with time zone,
    "salt" character varying,
    "hash" character varying,
    "login_attempts" numeric DEFAULT 0,
    "lock_until" timestamp(3) with time zone
);

CREATE TABLE IF NOT EXISTS "public"."users_roles" (
    "order" integer NOT NULL,
    "parent_id" integer NOT NULL,
    "value" enum_users_roles,
    "id" integer NOT NULL DEFAULT nextval('users_roles_id_seq'::regclass)
);

CREATE TABLE IF NOT EXISTS "public"."users_sessions" (
    "_order" integer NOT NULL,
    "_parent_id" integer NOT NULL,
    "id" character varying NOT NULL,
    "created_at" timestamp(3) with time zone,
    "expires_at" timestamp(3) with time zone NOT NULL
);

-- =====================================================================
-- Constraints (Primary Keys, Unique, Check)
-- =====================================================================

ALTER TABLE ONLY "public"."advocacy_reports" DROP CONSTRAINT IF EXISTS "advocacy_reports_pkey";
ALTER TABLE ONLY "public"."advocacy_reports" ADD CONSTRAINT "advocacy_reports_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "public"."advocacy_reports_follow_ups" DROP CONSTRAINT IF EXISTS "advocacy_reports_follow_ups_pkey";
ALTER TABLE ONLY "public"."advocacy_reports_follow_ups" ADD CONSTRAINT "advocacy_reports_follow_ups_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "public"."announcements" DROP CONSTRAINT IF EXISTS "announcements_pkey";
ALTER TABLE ONLY "public"."announcements" ADD CONSTRAINT "announcements_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "public"."audit_logs" DROP CONSTRAINT IF EXISTS "audit_logs_pkey";
ALTER TABLE ONLY "public"."audit_logs" ADD CONSTRAINT "audit_logs_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "public"."banners" DROP CONSTRAINT IF EXISTS "banners_pkey";
ALTER TABLE ONLY "public"."banners" ADD CONSTRAINT "banners_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "public"."cadres" DROP CONSTRAINT IF EXISTS "cadres_pkey";
ALTER TABLE ONLY "public"."cadres" ADD CONSTRAINT "cadres_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "public"."contact_messages" DROP CONSTRAINT IF EXISTS "contact_messages_pkey";
ALTER TABLE ONLY "public"."contact_messages" ADD CONSTRAINT "contact_messages_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "public"."documents" DROP CONSTRAINT IF EXISTS "documents_pkey";
ALTER TABLE ONLY "public"."documents" ADD CONSTRAINT "documents_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "public"."events" DROP CONSTRAINT IF EXISTS "events_pkey";
ALTER TABLE ONLY "public"."events" ADD CONSTRAINT "events_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "public"."events_rels" DROP CONSTRAINT IF EXISTS "events_rels_pkey";
ALTER TABLE ONLY "public"."events_rels" ADD CONSTRAINT "events_rels_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "public"."former_chairpersons" DROP CONSTRAINT IF EXISTS "former_chairpersons_pkey";
ALTER TABLE ONLY "public"."former_chairpersons" ADD CONSTRAINT "former_chairpersons_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "public"."gallery" DROP CONSTRAINT IF EXISTS "gallery_pkey";
ALTER TABLE ONLY "public"."gallery" ADD CONSTRAINT "gallery_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "public"."lk1_registrations" DROP CONSTRAINT IF EXISTS "lk1_registrations_pkey";
ALTER TABLE ONLY "public"."lk1_registrations" ADD CONSTRAINT "lk1_registrations_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "public"."lk1_registrations_interest_fields" DROP CONSTRAINT IF EXISTS "lk1_registrations_interest_fields_pkey";
ALTER TABLE ONLY "public"."lk1_registrations_interest_fields" ADD CONSTRAINT "lk1_registrations_interest_fields_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "public"."media" DROP CONSTRAINT IF EXISTS "media_pkey";
ALTER TABLE ONLY "public"."media" ADD CONSTRAINT "media_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "public"."navigation_items" DROP CONSTRAINT IF EXISTS "navigation_items_pkey";
ALTER TABLE ONLY "public"."navigation_items" ADD CONSTRAINT "navigation_items_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "public"."news" DROP CONSTRAINT IF EXISTS "news_pkey";
ALTER TABLE ONLY "public"."news" ADD CONSTRAINT "news_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "public"."opinions" DROP CONSTRAINT IF EXISTS "opinions_pkey";
ALTER TABLE ONLY "public"."opinions" ADD CONSTRAINT "opinions_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "public"."organization_structure" DROP CONSTRAINT IF EXISTS "organization_structure_pkey";
ALTER TABLE ONLY "public"."organization_structure" ADD CONSTRAINT "organization_structure_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "public"."pages" DROP CONSTRAINT IF EXISTS "pages_pkey";
ALTER TABLE ONLY "public"."pages" ADD CONSTRAINT "pages_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "public"."payload_kv" DROP CONSTRAINT IF EXISTS "payload_kv_pkey";
ALTER TABLE ONLY "public"."payload_kv" ADD CONSTRAINT "payload_kv_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "public"."payload_locked_documents" DROP CONSTRAINT IF EXISTS "payload_locked_documents_pkey";
ALTER TABLE ONLY "public"."payload_locked_documents" ADD CONSTRAINT "payload_locked_documents_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "public"."payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_pkey";
ALTER TABLE ONLY "public"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "public"."payload_migrations" DROP CONSTRAINT IF EXISTS "payload_migrations_pkey";
ALTER TABLE ONLY "public"."payload_migrations" ADD CONSTRAINT "payload_migrations_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "public"."payload_preferences" DROP CONSTRAINT IF EXISTS "payload_preferences_pkey";
ALTER TABLE ONLY "public"."payload_preferences" ADD CONSTRAINT "payload_preferences_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "public"."payload_preferences_rels" DROP CONSTRAINT IF EXISTS "payload_preferences_rels_pkey";
ALTER TABLE ONLY "public"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "public"."programs" DROP CONSTRAINT IF EXISTS "programs_pkey";
ALTER TABLE ONLY "public"."programs" ADD CONSTRAINT "programs_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "public"."site_settings" DROP CONSTRAINT IF EXISTS "site_settings_pkey";
ALTER TABLE ONLY "public"."site_settings" ADD CONSTRAINT "site_settings_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "public"."site_settings_vision_mision_missions" DROP CONSTRAINT IF EXISTS "site_settings_vision_mision_missions_pkey";
ALTER TABLE ONLY "public"."site_settings_vision_mision_missions" ADD CONSTRAINT "site_settings_vision_mision_missions_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "public"."users" DROP CONSTRAINT IF EXISTS "users_pkey";
ALTER TABLE ONLY "public"."users" ADD CONSTRAINT "users_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "public"."users_roles" DROP CONSTRAINT IF EXISTS "users_roles_pkey";
ALTER TABLE ONLY "public"."users_roles" ADD CONSTRAINT "users_roles_pkey" PRIMARY KEY (id);

ALTER TABLE ONLY "public"."users_sessions" DROP CONSTRAINT IF EXISTS "users_sessions_pkey";
ALTER TABLE ONLY "public"."users_sessions" ADD CONSTRAINT "users_sessions_pkey" PRIMARY KEY (id);

-- =====================================================================
-- Indexes
-- =====================================================================

CREATE INDEX IF NOT EXISTS advocacy_reports_created_at_idx ON advocacy_reports USING btree (created_at);
CREATE INDEX IF NOT EXISTS advocacy_reports_evidence_file_idx ON advocacy_reports USING btree (evidence_file_id);
CREATE INDEX IF NOT EXISTS advocacy_reports_handled_by_idx ON advocacy_reports USING btree (handled_by_id);
CREATE INDEX IF NOT EXISTS advocacy_reports_updated_at_idx ON advocacy_reports USING btree (updated_at);
CREATE INDEX IF NOT EXISTS advocacy_reports_follow_ups_handled_by_idx ON advocacy_reports_follow_ups USING btree (handled_by_id);
CREATE INDEX IF NOT EXISTS advocacy_reports_follow_ups_order_idx ON advocacy_reports_follow_ups USING btree (_order);
CREATE INDEX IF NOT EXISTS advocacy_reports_follow_ups_parent_id_idx ON advocacy_reports_follow_ups USING btree (_parent_id);
CREATE INDEX IF NOT EXISTS announcements_created_at_idx ON announcements USING btree (created_at);
CREATE UNIQUE INDEX IF NOT EXISTS announcements_slug_idx ON announcements USING btree (slug);
CREATE INDEX IF NOT EXISTS announcements_updated_at_idx ON announcements USING btree (updated_at);
CREATE INDEX IF NOT EXISTS audit_logs_created_at_idx ON audit_logs USING btree (created_at);
CREATE INDEX IF NOT EXISTS audit_logs_updated_at_idx ON audit_logs USING btree (updated_at);
CREATE INDEX IF NOT EXISTS audit_logs_user_idx ON audit_logs USING btree (user_id);
CREATE INDEX IF NOT EXISTS banners_created_at_idx ON banners USING btree (created_at);
CREATE INDEX IF NOT EXISTS banners_image_idx ON banners USING btree (image_id);
CREATE INDEX IF NOT EXISTS banners_updated_at_idx ON banners USING btree (updated_at);
CREATE INDEX IF NOT EXISTS cadres_created_at_idx ON cadres USING btree (created_at);
CREATE INDEX IF NOT EXISTS cadres_photo_idx ON cadres USING btree (photo_id);
CREATE INDEX IF NOT EXISTS cadres_updated_at_idx ON cadres USING btree (updated_at);
CREATE INDEX IF NOT EXISTS contact_messages_created_at_idx ON contact_messages USING btree (created_at);
CREATE INDEX IF NOT EXISTS contact_messages_handled_by_idx ON contact_messages USING btree (handled_by_id);
CREATE INDEX IF NOT EXISTS contact_messages_updated_at_idx ON contact_messages USING btree (updated_at);
CREATE INDEX IF NOT EXISTS documents_created_at_idx ON documents USING btree (created_at);
CREATE INDEX IF NOT EXISTS documents_file_idx ON documents USING btree (file_id);
CREATE INDEX IF NOT EXISTS documents_updated_at_idx ON documents USING btree (updated_at);
CREATE INDEX IF NOT EXISTS documents_uploaded_by_idx ON documents USING btree (uploaded_by_id);
CREATE INDEX IF NOT EXISTS events_cover_image_idx ON events USING btree (cover_image_id);
CREATE INDEX IF NOT EXISTS events_created_at_idx ON events USING btree (created_at);
CREATE UNIQUE INDEX IF NOT EXISTS events_slug_idx ON events USING btree (slug);
CREATE INDEX IF NOT EXISTS events_updated_at_idx ON events USING btree (updated_at);
CREATE INDEX IF NOT EXISTS events_rels_gallery_id_idx ON events_rels USING btree (gallery_id);
CREATE INDEX IF NOT EXISTS events_rels_order_idx ON events_rels USING btree ("order");
CREATE INDEX IF NOT EXISTS events_rels_parent_idx ON events_rels USING btree (parent_id);
CREATE INDEX IF NOT EXISTS events_rels_path_idx ON events_rels USING btree (path);
CREATE INDEX IF NOT EXISTS former_chairpersons_created_at_idx ON former_chairpersons USING btree (created_at);
CREATE INDEX IF NOT EXISTS former_chairpersons_photo_idx ON former_chairpersons USING btree (photo_id);
CREATE INDEX IF NOT EXISTS former_chairpersons_updated_at_idx ON former_chairpersons USING btree (updated_at);
CREATE INDEX IF NOT EXISTS gallery_created_at_idx ON gallery USING btree (created_at);
CREATE INDEX IF NOT EXISTS gallery_image_idx ON gallery USING btree (image_id);
CREATE INDEX IF NOT EXISTS gallery_updated_at_idx ON gallery USING btree (updated_at);
CREATE INDEX IF NOT EXISTS lk1_registrations_created_at_idx ON lk1_registrations USING btree (created_at);
CREATE INDEX IF NOT EXISTS lk1_registrations_payment_proof_idx ON lk1_registrations USING btree (payment_proof_id);
CREATE INDEX IF NOT EXISTS lk1_registrations_payment_verified_by_idx ON lk1_registrations USING btree (payment_verified_by_id);
CREATE UNIQUE INDEX IF NOT EXISTS lk1_registrations_registration_code_idx ON lk1_registrations USING btree (registration_code);
CREATE INDEX IF NOT EXISTS lk1_registrations_updated_at_idx ON lk1_registrations USING btree (updated_at);
CREATE INDEX IF NOT EXISTS lk1_registrations_verified_by_idx ON lk1_registrations USING btree (verified_by_id);
CREATE INDEX IF NOT EXISTS lk1_registrations_interest_fields_order_idx ON lk1_registrations_interest_fields USING btree ("order");
CREATE INDEX IF NOT EXISTS lk1_registrations_interest_fields_parent_idx ON lk1_registrations_interest_fields USING btree (parent_id);
CREATE INDEX IF NOT EXISTS media_created_at_idx ON media USING btree (created_at);
CREATE UNIQUE INDEX IF NOT EXISTS media_filename_idx ON media USING btree (filename);
CREATE INDEX IF NOT EXISTS media_updated_at_idx ON media USING btree (updated_at);
CREATE INDEX IF NOT EXISTS navigation_items_created_at_idx ON navigation_items USING btree (created_at);
CREATE INDEX IF NOT EXISTS navigation_items_updated_at_idx ON navigation_items USING btree (updated_at);
CREATE INDEX IF NOT EXISTS news_author_idx ON news USING btree (author_id);
CREATE INDEX IF NOT EXISTS news_cover_image_idx ON news USING btree (cover_image_id);
CREATE INDEX IF NOT EXISTS news_created_at_idx ON news USING btree (created_at);
CREATE UNIQUE INDEX IF NOT EXISTS news_slug_idx ON news USING btree (slug);
CREATE INDEX IF NOT EXISTS news_updated_at_idx ON news USING btree (updated_at);
CREATE INDEX IF NOT EXISTS opinions_author_photo_idx ON opinions USING btree (author_photo_id);
CREATE INDEX IF NOT EXISTS opinions_cover_image_idx ON opinions USING btree (cover_image_id);
CREATE INDEX IF NOT EXISTS opinions_created_at_idx ON opinions USING btree (created_at);
CREATE UNIQUE INDEX IF NOT EXISTS opinions_slug_idx ON opinions USING btree (slug);
CREATE INDEX IF NOT EXISTS opinions_updated_at_idx ON opinions USING btree (updated_at);
CREATE INDEX IF NOT EXISTS organization_structure_created_at_idx ON organization_structure USING btree (created_at);
CREATE INDEX IF NOT EXISTS organization_structure_photo_idx ON organization_structure USING btree (photo_id);
CREATE INDEX IF NOT EXISTS organization_structure_updated_at_idx ON organization_structure USING btree (updated_at);
CREATE INDEX IF NOT EXISTS pages_created_at_idx ON pages USING btree (created_at);
CREATE UNIQUE INDEX IF NOT EXISTS pages_slug_idx ON pages USING btree (slug);
CREATE INDEX IF NOT EXISTS pages_updated_at_idx ON pages USING btree (updated_at);
CREATE UNIQUE INDEX IF NOT EXISTS payload_kv_key_idx ON payload_kv USING btree (key);
CREATE INDEX IF NOT EXISTS payload_locked_documents_created_at_idx ON payload_locked_documents USING btree (created_at);
CREATE INDEX IF NOT EXISTS payload_locked_documents_global_slug_idx ON payload_locked_documents USING btree (global_slug);
CREATE INDEX IF NOT EXISTS payload_locked_documents_updated_at_idx ON payload_locked_documents USING btree (updated_at);
CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_advocacy_reports_id_idx ON payload_locked_documents_rels USING btree (advocacy_reports_id);
CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_announcements_id_idx ON payload_locked_documents_rels USING btree (announcements_id);
CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_audit_logs_id_idx ON payload_locked_documents_rels USING btree (audit_logs_id);
CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_banners_id_idx ON payload_locked_documents_rels USING btree (banners_id);
CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_cadres_id_idx ON payload_locked_documents_rels USING btree (cadres_id);
CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_contact_messages_id_idx ON payload_locked_documents_rels USING btree (contact_messages_id);
CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_documents_id_idx ON payload_locked_documents_rels USING btree (documents_id);
CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_events_id_idx ON payload_locked_documents_rels USING btree (events_id);
CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_former_chairpersons_id_idx ON payload_locked_documents_rels USING btree (former_chairpersons_id);
CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_gallery_id_idx ON payload_locked_documents_rels USING btree (gallery_id);
CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_lk1_registrations_id_idx ON payload_locked_documents_rels USING btree (lk1_registrations_id);
CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_media_id_idx ON payload_locked_documents_rels USING btree (media_id);
CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_navigation_items_id_idx ON payload_locked_documents_rels USING btree (navigation_items_id);
CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_news_id_idx ON payload_locked_documents_rels USING btree (news_id);
CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_opinions_id_idx ON payload_locked_documents_rels USING btree (opinions_id);
CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_order_idx ON payload_locked_documents_rels USING btree ("order");
CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_organization_structure_id_idx ON payload_locked_documents_rels USING btree (organization_structure_id);
CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_pages_id_idx ON payload_locked_documents_rels USING btree (pages_id);
CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_parent_idx ON payload_locked_documents_rels USING btree (parent_id);
CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_path_idx ON payload_locked_documents_rels USING btree (path);
CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_programs_id_idx ON payload_locked_documents_rels USING btree (programs_id);
CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_site_settings_id_idx ON payload_locked_documents_rels USING btree (site_settings_id);
CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_users_id_idx ON payload_locked_documents_rels USING btree (users_id);
CREATE INDEX IF NOT EXISTS payload_migrations_created_at_idx ON payload_migrations USING btree (created_at);
CREATE INDEX IF NOT EXISTS payload_migrations_updated_at_idx ON payload_migrations USING btree (updated_at);
CREATE INDEX IF NOT EXISTS payload_preferences_created_at_idx ON payload_preferences USING btree (created_at);
CREATE INDEX IF NOT EXISTS payload_preferences_key_idx ON payload_preferences USING btree (key);
CREATE INDEX IF NOT EXISTS payload_preferences_updated_at_idx ON payload_preferences USING btree (updated_at);
CREATE INDEX IF NOT EXISTS payload_preferences_rels_order_idx ON payload_preferences_rels USING btree ("order");
CREATE INDEX IF NOT EXISTS payload_preferences_rels_parent_idx ON payload_preferences_rels USING btree (parent_id);
CREATE INDEX IF NOT EXISTS payload_preferences_rels_path_idx ON payload_preferences_rels USING btree (path);
CREATE INDEX IF NOT EXISTS payload_preferences_rels_users_id_idx ON payload_preferences_rels USING btree (users_id);
CREATE INDEX IF NOT EXISTS programs_cover_image_idx ON programs USING btree (cover_image_id);
CREATE INDEX IF NOT EXISTS programs_created_at_idx ON programs USING btree (created_at);
CREATE UNIQUE INDEX IF NOT EXISTS programs_slug_idx ON programs USING btree (slug);
CREATE INDEX IF NOT EXISTS programs_updated_at_idx ON programs USING btree (updated_at);
CREATE INDEX IF NOT EXISTS site_settings_created_at_idx ON site_settings USING btree (created_at);
CREATE INDEX IF NOT EXISTS site_settings_homepage_homepage_hero_image_idx ON site_settings USING btree (homepage_hero_image_id);
CREATE INDEX IF NOT EXISTS site_settings_logo_idx ON site_settings USING btree (logo_id);
CREATE INDEX IF NOT EXISTS site_settings_small_logo_idx ON site_settings USING btree (small_logo_id);
CREATE INDEX IF NOT EXISTS site_settings_updated_at_idx ON site_settings USING btree (updated_at);
CREATE INDEX IF NOT EXISTS site_settings_vision_mision_missions_order_idx ON site_settings_vision_mision_missions USING btree (_order);
CREATE INDEX IF NOT EXISTS site_settings_vision_mision_missions_parent_id_idx ON site_settings_vision_mision_missions USING btree (_parent_id);
CREATE INDEX IF NOT EXISTS users_created_at_idx ON users USING btree (created_at);
CREATE UNIQUE INDEX IF NOT EXISTS users_email_idx ON users USING btree (email);
CREATE INDEX IF NOT EXISTS users_updated_at_idx ON users USING btree (updated_at);
CREATE INDEX IF NOT EXISTS users_roles_order_idx ON users_roles USING btree ("order");
CREATE INDEX IF NOT EXISTS users_roles_parent_idx ON users_roles USING btree (parent_id);
CREATE INDEX IF NOT EXISTS users_sessions_order_idx ON users_sessions USING btree (_order);
CREATE INDEX IF NOT EXISTS users_sessions_parent_id_idx ON users_sessions USING btree (_parent_id);

-- =====================================================================
-- Data Inserts
-- =====================================================================

-- Data for "public"."advocacy_reports" (0 rows)

-- Data for "public"."advocacy_reports_follow_ups" (0 rows)

-- Data for "public"."announcements" (4 rows)
INSERT INTO "public"."announcements" ("id", "title", "slug", "excerpt", "content", "published_at", "status", "updated_at", "created_at") VALUES
  (1, 'Pendaftaran LK-I Gelombang Saintek Dibuka', 'pendaftaran-lk-i-gelombang-saintek-dibuka', 'Calon peserta dapat mengisi formulir online dan memantau status pendaftaran melalui kode pendaftaran.', NULL, '2026-10-16T15:01:29.572Z', 'published', '2026-10-16T15:01:29.818Z', '2026-10-16T15:01:29.818Z'),
  (2, 'Pemutakhiran Database Kader Periode 2025-2026', 'pemutakhiran-database-kader-periode-2025-2026', 'Kader diminta memperbarui data dasar melalui sekretariat agar arsip organisasi tetap akurat.', NULL, '2026-10-16T15:01:31.135Z', 'published', '2026-10-16T15:01:31.401Z', '2026-10-16T15:01:31.401Z'),
  (3, 'Kanal Advokasi PTKP Mulai Diaktifkan', 'kanal-advokasi-ptkp-mulai-diaktifkan', 'Mahasiswa dapat menyampaikan aspirasi akademik, fasilitas, dan administrasi melalui form advokasi.', NULL, '2026-10-16T15:01:32.944Z', 'published', '2026-10-16T15:01:33.211Z', '2026-10-16T15:01:33.211Z'),
  (4, 'Unggah Dokumentasi Kegiatan ke Galeri Komisariat', 'unggah-dokumentasi-kegiatan-ke-galeri-komisariat', 'Bidang media membuka pengumpulan foto dan video kegiatan untuk arsip digital komisariat.', NULL, '2026-10-16T15:01:34.607Z', 'archived', '2026-10-16T15:01:34.927Z', '2026-10-16T15:01:34.927Z');

-- Data for "public"."audit_logs" (0 rows)

-- Data for "public"."banners" (0 rows)

-- Data for "public"."cadres" (508 rows)
INSERT INTO "public"."cadres" ("id", "full_name", "nickname", "gender", "university", "faculty", "study_program", "nim", "batch_year", "cadre_status", "phone_private", "email_private", "address_private", "photo_id", "is_public", "notes_private", "updated_at", "created_at", "training_batch") VALUES
  (1, 'Aisyah Nurhaliza', NULL, NULL, NULL, NULL, 'Teknik Informatika', NULL, '2022', 'Pengurus', NULL, NULL, NULL, NULL, TRUE, NULL, '2026-10-16T15:00:27.571Z', '2026-10-16T15:00:27.571Z', NULL),
  (2, 'Muhammad Farhan', NULL, NULL, NULL, NULL, 'Matematika', NULL, '2021', 'LK-II', NULL, NULL, NULL, NULL, TRUE, NULL, '2026-10-16T15:00:29.061Z', '2026-10-16T15:00:29.060Z', NULL),
  (3, 'Salsabila Putri', NULL, NULL, NULL, NULL, 'Fisika', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, NULL, '2026-10-16T15:00:30.558Z', '2026-10-16T15:00:30.558Z', NULL),
  (4, 'Rizky Ramadhan', NULL, NULL, NULL, NULL, 'Kimia', NULL, '2024', 'Anggota Muda', NULL, NULL, NULL, NULL, TRUE, NULL, '2026-10-16T15:00:32.173Z', '2026-10-16T15:00:32.173Z', NULL),
  (5, 'Maya Lestari', NULL, NULL, NULL, NULL, 'Biologi', NULL, '2022', 'Pengurus', NULL, NULL, NULL, NULL, TRUE, NULL, '2026-10-16T15:00:33.672Z', '2026-10-16T15:00:33.672Z', NULL),
  (6, 'Ilham Saputra', NULL, NULL, NULL, NULL, 'Teknik Elektro', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, NULL, '2026-10-16T15:00:35.169Z', '2026-10-16T15:00:35.169Z', NULL),
  (7, 'Nadia Zahra', NULL, NULL, NULL, NULL, 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, NULL, '2026-10-16T15:00:36.674Z', '2026-10-16T15:00:36.674Z', NULL),
  (8, 'Arif Fadillah', NULL, NULL, NULL, NULL, 'Kimia', NULL, '2021', 'LK-II', NULL, NULL, NULL, NULL, TRUE, NULL, '2026-10-16T15:00:38.346Z', '2026-10-16T15:00:38.346Z', NULL),
  (9, 'Hana Maulida', NULL, NULL, NULL, NULL, 'Agroteknologi', NULL, '2022', 'Pengurus', NULL, NULL, NULL, NULL, TRUE, NULL, '2026-10-16T15:00:39.844Z', '2026-10-16T15:00:39.843Z', NULL),
  (10, 'Dimas Pratama', NULL, NULL, NULL, NULL, 'Matematika', NULL, '2019', 'Alumni', NULL, NULL, NULL, NULL, TRUE, NULL, '2026-10-16T15:00:41.345Z', '2026-10-16T15:00:41.345Z', NULL),
  (11, 'Citra Amalia', NULL, NULL, NULL, NULL, 'Biologi', NULL, '2020', 'LK-III', NULL, NULL, NULL, NULL, TRUE, NULL, '2026-10-16T15:00:42.939Z', '2026-10-16T15:00:42.939Z', NULL),
  (12, 'Fajar Nugraha', NULL, NULL, NULL, NULL, 'Fisika', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, NULL, '2026-10-16T15:00:44.953Z', '2026-10-16T15:00:44.953Z', NULL),
  (13, 'Luthfi Hakim', NULL, NULL, NULL, NULL, 'Teknik Informatika', NULL, '2025', 'Anggota Muda', NULL, NULL, NULL, NULL, TRUE, NULL, '2026-10-16T15:00:46.649Z', '2026-10-16T15:00:46.649Z', NULL),
  (14, 'Dea Kartika', NULL, NULL, NULL, NULL, 'Agroteknologi', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, NULL, '2026-10-16T15:00:48.135Z', '2026-10-16T15:00:48.135Z', NULL),
  (15, 'Bayu Aditya', NULL, NULL, NULL, NULL, 'Teknik Elektro', NULL, '2022', 'Pengurus', NULL, NULL, NULL, NULL, TRUE, NULL, '2026-10-16T15:00:49.638Z', '2026-10-16T15:00:49.638Z', NULL),
  (16, 'Siti Rahmah', NULL, NULL, NULL, NULL, 'Matematika', NULL, '2021', 'LK-II', NULL, NULL, NULL, NULL, TRUE, NULL, '2026-10-16T15:00:51.231Z', '2026-10-16T15:00:51.231Z', NULL),
  (17, 'Yoga Firmansyah', NULL, NULL, NULL, NULL, 'Fisika', NULL, '2018', 'Alumni', NULL, NULL, NULL, NULL, TRUE, NULL, '2026-10-16T15:00:52.909Z', '2026-10-16T15:00:52.909Z', NULL),
  (18, 'Anisa Fitri', NULL, NULL, NULL, NULL, 'Kimia', NULL, '2022', 'Pengurus', NULL, NULL, NULL, NULL, TRUE, NULL, '2026-10-16T15:00:54.475Z', '2026-10-16T15:00:54.475Z', NULL),
  (19, 'Fikri Maulana', NULL, NULL, NULL, NULL, 'Biologi', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, NULL, '2026-10-16T15:00:55.959Z', '2026-10-16T15:00:55.959Z', NULL),
  (20, 'Rara Sekar', NULL, NULL, NULL, NULL, 'Teknik Informatika', NULL, '2020', 'LK-III', NULL, NULL, NULL, NULL, TRUE, NULL, '2026-10-16T15:00:57.505Z', '2026-10-16T15:00:57.505Z', NULL),
  (21, 'Adhit N', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:06.575Z', '2026-10-16T15:58:06.575Z', 'Destiny'),
  (22, 'Adit', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:06.824Z', '2026-10-16T15:58:06.824Z', 'Destiny'),
  (23, 'Aditya Rizky fadhilah', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:07.076Z', '2026-10-16T15:58:07.076Z', 'Destiny'),
  (24, 'Ahmad Syarifudin', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:07.322Z', '2026-10-16T15:58:07.322Z', 'Destiny'),
  (25, 'Asep', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:07.567Z', '2026-10-16T15:58:07.567Z', 'Destiny'),
  (26, 'Ayi Asma Fauziah', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:07.812Z', '2026-10-16T15:58:07.812Z', 'Destiny'),
  (27, 'Bayu Tamimi', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:08.141Z', '2026-10-16T15:58:08.141Z', 'Destiny'),
  (28, 'Bintang Puja rahayu', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Matematika', NULL, '2018', 'LK-I', NULL, NULL, 'Garut', NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:08.387Z', '2026-10-16T15:58:08.387Z', 'Destiny'),
  (29, 'Dadan Firmansyah Saputra', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, 'Dsn Bunut 2, RT 02 RW 03', NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:08.632Z', '2026-10-16T15:58:08.632Z', 'Destiny'),
  (30, 'Dadan Taufik P', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, 'Sumedang, Bandung', NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:08.877Z', '2026-10-16T15:58:08.877Z', 'Destiny'),
  (31, 'Dewina Nur aeni', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Matematika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:09.123Z', '2026-10-16T15:58:09.123Z', 'Destiny'),
  (32, 'Dina', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:09.375Z', '2026-10-16T15:58:09.375Z', 'Destiny'),
  (33, 'Dinda Meysya Rochma', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:09.620Z', '2026-10-16T15:58:09.620Z', 'Destiny'),
  (34, 'Elok Puspitasari', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Matematika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:09.869Z', '2026-10-16T15:58:09.869Z', 'Destiny'),
  (35, 'Fahriza Ardiansyah', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:10.116Z', '2026-10-16T15:58:10.116Z', 'Destiny'),
  (36, 'Fajar Ramadhan', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:10.366Z', '2026-10-16T15:58:10.366Z', 'Destiny'),
  (37, 'Farabi', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:10.615Z', '2026-10-16T15:58:10.615Z', 'Destiny'),
  (38, 'Fikri Fauzan', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:10.860Z', '2026-10-16T15:58:10.860Z', 'Destiny'),
  (39, 'Hasbi', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:11.104Z', '2026-10-16T15:58:11.104Z', 'Destiny'),
  (40, 'Heri Hermawan', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, 'Cicalengka, Bandung', NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:11.350Z', '2026-10-16T15:58:11.350Z', 'Destiny'),
  (41, 'Herlangga', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:11.595Z', '2026-10-16T15:58:11.595Z', 'Destiny'),
  (42, 'Herlia Widi', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Matematika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:11.847Z', '2026-10-16T15:58:11.847Z', 'Destiny'),
  (43, 'Ilham Akbar', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Elektro', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:12.096Z', '2026-10-16T15:58:12.096Z', 'Destiny'),
  (44, 'Iqbal Ahmad Haikal', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:12.340Z', '2026-10-16T15:58:12.340Z', 'Destiny'),
  (45, 'Kurniawn P', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:12.587Z', '2026-10-16T15:58:12.587Z', 'Destiny'),
  (46, 'Lutfi M fasya', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:12.838Z', '2026-10-16T15:58:12.838Z', 'Destiny'),
  (47, 'M Azka Khowarizmi', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:13.083Z', '2026-10-16T15:58:13.083Z', 'Destiny'),
  (48, 'M Dzikri Mauludil Huda', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, 'Garut', NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:13.337Z', '2026-10-16T15:58:13.337Z', 'Destiny'),
  (49, 'M Fattah', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, 'Majalaya, Bandung', NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:13.585Z', '2026-10-16T15:58:13.585Z', 'Destiny'),
  (50, 'M Isra Raksa Yuga', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:13.838Z', '2026-10-16T15:58:13.838Z', 'Destiny');
INSERT INTO "public"."cadres" ("id", "full_name", "nickname", "gender", "university", "faculty", "study_program", "nim", "batch_year", "cadre_status", "phone_private", "email_private", "address_private", "photo_id", "is_public", "notes_private", "updated_at", "created_at", "training_batch") VALUES
  (51, 'M Pandu Justika A', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:14.141Z', '2026-10-16T15:58:14.141Z', 'Destiny'),
  (52, 'Meli Yonita', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:14.394Z', '2026-10-16T15:58:14.394Z', 'Destiny'),
  (53, 'Nurlaela Solihah', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Syariah dan Hukum', 'Ekonomi Syariah', NULL, '2018', 'LK-I', NULL, NULL, 'BANDUNG', NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:14.646Z', '2026-10-16T15:58:14.646Z', 'Destiny'),
  (54, 'Putri Leony', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Farmasi', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:14.891Z', '2026-10-16T15:58:14.891Z', 'Destiny'),
  (55, 'Rizky', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:15.143Z', '2026-10-16T15:58:15.143Z', 'Destiny'),
  (56, 'Sahrul Yudiawan', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:15.402Z', '2026-10-16T15:58:15.402Z', 'Destiny'),
  (57, 'salman Alfarisy', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:15.654Z', '2026-10-16T15:58:15.654Z', 'Destiny'),
  (58, 'Taufik Ramadhan', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:15.917Z', '2026-10-16T15:58:15.917Z', 'Destiny'),
  (59, 'Tegar Tri Sawali', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:16.160Z', '2026-10-16T15:58:16.160Z', 'Destiny'),
  (60, 'Verawati Prakoso', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Fisika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:16.416Z', '2026-10-16T15:58:16.416Z', 'Destiny'),
  (61, 'Wita Dewi Lestari', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:16.662Z', '2026-10-16T15:58:16.662Z', 'Destiny'),
  (62, 'Yulisa Dinda Nirmala', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Manajemen Pendidikan Islam', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:16.921Z', '2026-10-16T15:58:16.921Z', 'Destiny'),
  (63, 'Zian Abdul Patah', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Syariah dan Hukum', 'Ekonomi Syariah', NULL, '2018', 'LK-I', NULL, NULL, 'Malangbong, Garut', NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:17.165Z', '2026-10-16T15:58:17.165Z', 'Destiny'),
  (64, 'Zian Abdul Patah', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Fisika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Destiny (2018)', '2026-10-16T15:58:17.413Z', '2026-10-16T15:58:17.413Z', 'Destiny'),
  (65, 'Fahrul', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Sisedan (2018)', '2026-10-16T15:58:17.658Z', '2026-10-16T15:58:17.658Z', 'Sisedan'),
  (66, 'Faris Asyraf', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Sisedan (2018)', '2026-10-16T15:58:17.903Z', '2026-10-16T15:58:17.903Z', 'Sisedan'),
  (67, 'Fauzi Rizki Utama', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Sisedan (2018)', '2026-10-16T15:58:18.150Z', '2026-10-16T15:58:18.150Z', 'Sisedan'),
  (68, 'Fikry dzulfikar rasyid', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Sisedan (2018)', '2026-10-16T15:58:18.406Z', '2026-10-16T15:58:18.406Z', 'Sisedan'),
  (69, 'Fitra Nanda Nugraha', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Sisedan (2018)', '2026-10-16T15:58:18.653Z', '2026-10-16T15:58:18.653Z', 'Sisedan'),
  (70, 'Gina Nurfauziah', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Manajemen Pendidikan Islam', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Sisedan (2018)', '2026-10-16T15:58:18.899Z', '2026-10-16T15:58:18.899Z', 'Sisedan'),
  (71, 'Hanggitya Raharjo', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, 'GBI, BANDUNG', NULL, TRUE, 'Kader LK-1 Angkatan Sisedan (2018)', '2026-10-16T15:58:19.145Z', '2026-10-16T15:58:19.145Z', 'Sisedan'),
  (72, 'Kurotul Aeni', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, 'TANGERANG', NULL, TRUE, 'Kader LK-1 Angkatan Sisedan (2018)', '2026-10-16T15:58:19.390Z', '2026-10-16T15:58:19.390Z', 'Sisedan'),
  (73, 'Lisa Zulfiana', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2018', 'LK-I', NULL, NULL, 'TANGERANG', NULL, TRUE, 'Kader LK-1 Angkatan Sisedan (2018)', '2026-10-16T15:58:19.636Z', '2026-10-16T15:58:19.636Z', 'Sisedan'),
  (74, 'M fahrur Radzi', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, 'PURWAKARTA', NULL, TRUE, 'Kader LK-1 Angkatan Sisedan (2018)', '2026-10-16T15:58:19.879Z', '2026-10-16T15:58:19.879Z', 'Sisedan'),
  (75, 'M Irsyad Faruq Al Husaeni', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Sisedan (2018)', '2026-10-16T15:58:20.125Z', '2026-10-16T15:58:20.125Z', 'Sisedan'),
  (76, 'M rifqi efendi', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Sisedan (2018)', '2026-10-16T15:58:20.370Z', '2026-10-16T15:58:20.370Z', 'Sisedan'),
  (77, 'Maulana', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Matematika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Sisedan (2018)', '2026-10-16T15:58:20.616Z', '2026-10-16T15:58:20.616Z', 'Sisedan'),
  (78, 'Moh Buhkoiro Alwi', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Manajemen Pendidikan Islam', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Sisedan (2018)', '2026-10-16T15:58:20.862Z', '2026-10-16T15:58:20.862Z', 'Sisedan'),
  (79, 'Nabhan Rizqullah', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, 'BANDUNG', NULL, TRUE, 'Kader LK-1 Angkatan Sisedan (2018)', '2026-10-16T15:58:21.179Z', '2026-10-16T15:58:21.179Z', 'Sisedan'),
  (80, 'Puji lestari', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Manajemen Pendidikan Islam', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Sisedan (2018)', '2026-10-16T15:58:21.426Z', '2026-10-16T15:58:21.426Z', 'Sisedan'),
  (81, 'Sella Qiri Nur Handayani', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Manajemen Pendidikan Islam', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Sisedan (2018)', '2026-10-16T15:58:21.671Z', '2026-10-16T15:58:21.671Z', 'Sisedan'),
  (82, 'wulan Maulikhotin', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Manajemen Pendidikan Islam', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Sisedan (2018)', '2026-10-16T15:58:21.916Z', '2026-10-16T15:58:21.916Z', 'Sisedan'),
  (83, 'Abdullah Ubaid Salim', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, 'CIPADUNG, BANDUNG', NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:22.161Z', '2026-10-16T15:58:22.161Z', 'Tugu Retak'),
  (84, 'Adriansyah Sebastian Farel', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2019', 'LK-I', NULL, NULL, 'GARUT', NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:22.408Z', '2026-10-16T15:58:22.408Z', 'Tugu Retak'),
  (85, 'Afiqah Quratu Aini', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Fisika', NULL, '2019', 'LK-I', NULL, NULL, 'Pangandaran', NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:22.664Z', '2026-10-16T15:58:22.664Z', 'Tugu Retak'),
  (86, 'Agam Muhammad Hafidz', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, 'KAB. BANDUNG BARAT', NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:22.912Z', '2026-10-16T15:58:22.912Z', 'Tugu Retak'),
  (87, 'Ahmad Nawawi', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:23.172Z', '2026-10-16T15:58:23.172Z', 'Tugu Retak'),
  (88, 'Akbar Khadafi', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:23.418Z', '2026-10-16T15:58:23.418Z', 'Tugu Retak'),
  (89, 'Alfian Bisyri', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:23.663Z', '2026-10-16T15:58:23.663Z', 'Tugu Retak'),
  (90, 'Alifia Rahmawati', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:23.911Z', '2026-10-16T15:58:23.911Z', 'Tugu Retak'),
  (91, 'Dani Muhammad Ramdani', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, 'CIPANAS, GARUT', NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:24.160Z', '2026-10-16T15:58:24.160Z', 'Tugu Retak'),
  (92, 'Dede Ilham Farhanul Hakim', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2019', 'LK-I', NULL, NULL, 'GARUT', NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:24.407Z', '2026-10-16T15:58:24.407Z', 'Tugu Retak'),
  (93, 'Difa Andika', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, 'BANDUNG', NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:24.653Z', '2026-10-16T15:58:24.653Z', 'Tugu Retak'),
  (94, 'Dio Rakasiwi', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, 'TANGERANG', NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:24.897Z', '2026-10-16T15:58:24.897Z', 'Tugu Retak'),
  (95, 'Erizal Ernan Hafidz', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:25.142Z', '2026-10-16T15:58:25.142Z', 'Tugu Retak'),
  (96, 'Faisal Arief', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, 'CIKAJANG, GARUT', NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:25.394Z', '2026-10-16T15:58:25.394Z', 'Tugu Retak'),
  (97, 'Fakhri Ramadhan', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2019', 'LK-I', NULL, NULL, 'TASIKMALAYA', NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:25.638Z', '2026-10-16T15:58:25.638Z', 'Tugu Retak'),
  (98, 'Farhan Wildan Muharram', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2019', 'LK-I', NULL, NULL, 'TAROGONG KIDUL', NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:25.882Z', '2026-10-16T15:58:25.882Z', 'Tugu Retak'),
  (99, 'Faruq Zulfikar', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2019', 'LK-I', NULL, NULL, 'MAJALENGKA', NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:26.128Z', '2026-10-16T15:58:26.128Z', 'Tugu Retak'),
  (100, 'Feeza Ashelia Zakia Ameliee', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:26.379Z', '2026-10-16T15:58:26.379Z', 'Tugu Retak');
INSERT INTO "public"."cadres" ("id", "full_name", "nickname", "gender", "university", "faculty", "study_program", "nim", "batch_year", "cadre_status", "phone_private", "email_private", "address_private", "photo_id", "is_public", "notes_private", "updated_at", "created_at", "training_batch") VALUES
  (101, 'Fikri Andi Asri', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2019', 'LK-I', NULL, NULL, 'MEDAN', NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:26.625Z', '2026-10-16T15:58:26.625Z', 'Tugu Retak'),
  (102, 'Irvan Ferdiansyah', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:26.870Z', '2026-10-16T15:58:26.870Z', 'Tugu Retak'),
  (103, 'Lustiana', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, 'BANDUNG', NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:27.120Z', '2026-10-16T15:58:27.120Z', 'Tugu Retak'),
  (104, 'Lutfi Raynaldi', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:27.366Z', '2026-10-16T15:58:27.366Z', 'Tugu Retak'),
  (105, 'M Hamdan', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Elektro', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:27.621Z', '2026-10-16T15:58:27.621Z', 'Tugu Retak'),
  (106, 'Mikail Nurwahid', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Matematika', NULL, '2019', 'LK-I', NULL, NULL, 'MAJALAYA, BANDUNG', NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:27.869Z', '2026-10-16T15:58:27.869Z', 'Tugu Retak'),
  (107, 'Mohamad Rifqy Gymnastiar', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2019', 'LK-I', NULL, NULL, 'PANYILEUKAN, BANDUNG', NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:28.113Z', '2026-10-16T15:58:28.113Z', 'Tugu Retak'),
  (108, 'Mu’min Ikhwan Nulloh', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2019', 'LK-I', NULL, NULL, 'MAJALAYA, BANDUNG', NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:28.358Z', '2026-10-16T15:58:28.358Z', 'Tugu Retak'),
  (109, 'Muchlis Kurnawan', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2019', 'LK-I', NULL, NULL, 'MAJALENGKA', NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:28.601Z', '2026-10-16T15:58:28.601Z', 'Tugu Retak'),
  (110, 'Muhamad Irsyad Salam', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:28.848Z', '2026-10-16T15:58:28.848Z', 'Tugu Retak'),
  (111, 'Muhammad Naufal Ramadhan', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:29.099Z', '2026-10-16T15:58:29.099Z', 'Tugu Retak'),
  (112, 'Muhammad Robi', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, 'TASIKMALAYA', NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:29.342Z', '2026-10-16T15:58:29.342Z', 'Tugu Retak'),
  (113, 'N Hani Rahma', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Matematika', NULL, '2019', 'LK-I', NULL, NULL, 'MAJALAYA, BANDUNG', NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:29.591Z', '2026-10-16T15:58:29.591Z', 'Tugu Retak'),
  (114, 'Nada Salsabila', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2019', 'LK-I', NULL, NULL, 'Cinunuk Kab. Bandung', NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:29.842Z', '2026-10-16T15:58:29.842Z', 'Tugu Retak'),
  (115, 'Nolis Nurmala Sari', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Manajemen Keuangan Syariah', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:30.092Z', '2026-10-16T15:58:30.092Z', 'Tugu Retak'),
  (116, 'Nurulia Putri Fatimah Azzahra', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2019', 'LK-I', NULL, NULL, 'SAMARANG, GARUT', NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:30.342Z', '2026-10-16T15:58:30.342Z', 'Tugu Retak'),
  (117, 'Pondra Santosa Sablye', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:30.586Z', '2026-10-16T15:58:30.586Z', 'Tugu Retak'),
  (118, 'Rafli Rakha Pratama', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, 'CIANJUR', NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:30.831Z', '2026-10-16T15:58:30.831Z', 'Tugu Retak'),
  (119, 'Rahmat Agung Munggaran', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:31.081Z', '2026-10-16T15:58:31.081Z', 'Tugu Retak'),
  (120, 'Rahmi Aulia', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:31.325Z', '2026-10-16T15:58:31.325Z', 'Tugu Retak'),
  (121, 'Ratih Khaira Widia', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2019', 'LK-I', NULL, NULL, 'BANDUNG', NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:31.573Z', '2026-10-16T15:58:31.573Z', 'Tugu Retak'),
  (122, 'Ridho Ginanjar', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:31.819Z', '2026-10-16T15:58:31.819Z', 'Tugu Retak'),
  (123, 'Riki Kurniawan', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2019', 'LK-I', NULL, NULL, 'LEMBANG, BANDUNG', NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:32.065Z', '2026-10-16T15:58:32.065Z', 'Tugu Retak'),
  (124, 'Rinda Santiadi Supriadi', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Manajemen Keuangan Syariah', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:32.308Z', '2026-10-16T15:58:32.308Z', 'Tugu Retak'),
  (125, 'Risti Rahmawati', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:32.556Z', '2026-10-16T15:58:32.556Z', 'Tugu Retak'),
  (126, 'Rizal Setiawan', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, 'CIPARAY, BANDUNG', NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:32.799Z', '2026-10-16T15:58:32.799Z', 'Tugu Retak'),
  (127, 'Salma S', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:33.042Z', '2026-10-16T15:58:33.042Z', 'Tugu Retak'),
  (128, 'Shandy Wahyudi', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, 'UJUNG BERUNG', NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:33.286Z', '2026-10-16T15:58:33.286Z', 'Tugu Retak'),
  (129, 'Shopi Novi Ranti', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2019', 'LK-I', NULL, NULL, 'UJUNG BERUNG', NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:33.529Z', '2026-10-16T15:58:33.529Z', 'Tugu Retak'),
  (130, 'Wafa Fatimah Purrwakarta', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:33.773Z', '2026-10-16T15:58:33.773Z', 'Tugu Retak'),
  (131, 'Yusuf Firdaus', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Tugu Retak (2019)', '2026-10-16T15:58:34.019Z', '2026-10-16T15:58:34.019Z', 'Tugu Retak'),
  (132, 'Abshar Fathur Rochman Nurizal CICALENGKA', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2020)', '2026-10-16T15:58:34.265Z', '2026-10-16T15:58:34.265Z', 'Anarco'),
  (133, 'Adia Wardana', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Syariah dan Hukum', 'Muamalah', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2020)', '2026-10-16T15:58:34.507Z', '2026-10-16T15:58:34.507Z', 'Anarco'),
  (134, 'Adinda Martina', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2019)', '2026-10-16T15:58:34.763Z', '2026-10-16T15:58:34.763Z', 'Anarco'),
  (135, 'Afifah Wahyuni', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2019)', '2026-10-16T15:58:35.009Z', '2026-10-16T15:58:35.009Z', 'Anarco'),
  (136, 'Akhdan Firdaus', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, 'BANDUNG', NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2019)', '2026-10-16T15:58:35.253Z', '2026-10-16T15:58:35.253Z', 'Anarco'),
  (137, 'Alfi Malika Putri', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2020', 'LK-I', NULL, NULL, 'BEKASI', NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2020)', '2026-10-16T15:58:35.501Z', '2026-10-16T15:58:35.501Z', 'Anarco'),
  (138, 'Ana Lu''lu Qolbiah', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2020', 'LK-I', NULL, NULL, 'BEKASI', NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2020)', '2026-10-16T15:58:35.745Z', '2026-10-16T15:58:35.745Z', 'Anarco'),
  (139, 'Arumsari', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2020)', '2026-10-16T15:58:35.990Z', '2026-10-16T15:58:35.990Z', 'Anarco'),
  (140, 'Ashab Abdul Hakim', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2020', 'LK-I', NULL, NULL, 'MAJALAYA, BANDUNG', NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2020)', '2026-10-16T15:58:36.235Z', '2026-10-16T15:58:36.235Z', 'Anarco'),
  (141, 'Catur Rangga Aji', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Elektro', NULL, '2019', 'LK-I', NULL, NULL, 'JAKARTA', NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2019)', '2026-10-16T15:58:36.479Z', '2026-10-16T15:58:36.479Z', 'Anarco'),
  (142, 'Dede Kartika Sari', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2020)', '2026-10-16T15:58:36.725Z', '2026-10-16T15:58:36.725Z', 'Anarco'),
  (143, 'Deni Aulia', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Ilmu Sosial dan Ilmu Politik', 'Ilmu Politik', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2020)', '2026-10-16T15:58:36.967Z', '2026-10-16T15:58:36.967Z', 'Anarco'),
  (144, 'Eneng Siti Aisyah', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2020)', '2026-10-16T15:58:37.213Z', '2026-10-16T15:58:37.213Z', 'Anarco'),
  (145, 'Erika Seftiani', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2020', 'LK-I', NULL, NULL, 'BEKASI', NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2020)', '2026-10-16T15:58:37.458Z', '2026-10-16T15:58:37.458Z', 'Anarco'),
  (146, 'Ervin Yanuar F', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Ilmu Sosial dan Ilmu Politik', 'Ilmu Politik', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2019)', '2026-10-16T15:58:37.701Z', '2026-10-16T15:58:37.701Z', 'Anarco'),
  (147, 'Fahmi Fathurrahiman', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Elektro', NULL, '2019', 'LK-I', NULL, NULL, 'CIPADUNG, BANDUNG', NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2019)', '2026-10-16T15:58:37.946Z', '2026-10-16T15:58:37.946Z', 'Anarco'),
  (148, 'Farhan Abdillah', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, 'GARUT', NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2019)', '2026-10-16T15:58:38.190Z', '2026-10-16T15:58:38.190Z', 'Anarco'),
  (149, 'Fery Wijayanto', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Dakwah dan Komunikasi', 'Pengembangan Masyarakat Islam', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2019)', '2026-10-16T15:58:38.435Z', '2026-10-16T15:58:38.435Z', 'Anarco'),
  (150, 'Fikri Sidkil Arifin', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Fisika', NULL, '2020', 'LK-I', NULL, NULL, 'GARUT', NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2020)', '2026-10-16T15:58:38.742Z', '2026-10-16T15:58:38.742Z', 'Anarco');
INSERT INTO "public"."cadres" ("id", "full_name", "nickname", "gender", "university", "faculty", "study_program", "nim", "batch_year", "cadre_status", "phone_private", "email_private", "address_private", "photo_id", "is_public", "notes_private", "updated_at", "created_at", "training_batch") VALUES
  (151, 'Friska Azkia', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2020', 'LK-I', NULL, NULL, 'BANDUNG', NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2020)', '2026-10-16T15:58:38.987Z', '2026-10-16T15:58:38.987Z', 'Anarco'),
  (152, 'Hendra Yanuari Noer Ahmaillah', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, 'CIANJUR', NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2018)', '2026-10-16T15:58:39.230Z', '2026-10-16T15:58:39.230Z', 'Anarco'),
  (153, 'Ichwan Kurniawan', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2020)', '2026-10-16T15:58:39.474Z', '2026-10-16T15:58:39.474Z', 'Anarco'),
  (154, 'Imam Jaenuri', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Matematika', NULL, '2019', 'LK-I', NULL, NULL, 'BEKASI', NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2019)', '2026-10-16T15:58:39.717Z', '2026-10-16T15:58:39.717Z', 'Anarco'),
  (155, 'Intan Opialisti', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Fisika', NULL, '2020', 'LK-I', NULL, NULL, 'SUKABUMI', NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2020)', '2026-10-16T15:58:39.960Z', '2026-10-16T15:58:39.960Z', 'Anarco'),
  (156, 'Ipa Nurlatipah', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2020)', '2026-10-16T15:58:40.207Z', '2026-10-16T15:58:40.207Z', 'Anarco'),
  (157, 'Iqbal Abdul Aziz A', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, 'LIMBANGAN, GARUT', NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2019)', '2026-10-16T15:58:40.455Z', '2026-10-16T15:58:40.455Z', 'Anarco'),
  (158, 'Irvan Falasifah', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2019)', '2026-10-16T15:58:40.706Z', '2026-10-16T15:58:40.706Z', 'Anarco'),
  (159, 'Melati Putri Juliyanti', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2020', 'LK-I', NULL, NULL, 'BEKASI', NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2020)', '2026-10-16T15:58:40.951Z', '2026-10-16T15:58:40.951Z', 'Anarco'),
  (160, 'Mohamad Fadlika Ramadhan', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, 'BOJONG SOANG', NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2019)', '2026-10-16T15:58:41.195Z', '2026-10-16T15:58:41.195Z', 'Anarco'),
  (161, 'Muhamad Farhan', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2020)', '2026-10-16T15:58:41.438Z', '2026-10-16T15:58:41.438Z', 'Anarco'),
  (162, 'Muhamad Renaldi', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2020)', '2026-10-16T15:58:41.684Z', '2026-10-16T15:58:41.684Z', 'Anarco'),
  (163, 'Muhammad Dhuha Fikri', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2020)', '2026-10-16T15:58:41.930Z', '2026-10-16T15:58:41.930Z', 'Anarco'),
  (164, 'Muhammad Fajar Sodiq', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2020)', '2026-10-16T15:58:42.174Z', '2026-10-16T15:58:42.174Z', 'Anarco'),
  (165, 'Muhammad Faisal Muslim', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2019)', '2026-10-16T15:58:42.418Z', '2026-10-16T15:58:42.418Z', 'Anarco'),
  (166, 'Muhammad Renaldi P', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2020)', '2026-10-16T15:58:42.664Z', '2026-10-16T15:58:42.664Z', 'Anarco'),
  (167, 'Mukhamad Fahri Ramadan', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2019', 'LK-I', NULL, NULL, 'SUKABUMI', NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2019)', '2026-10-16T15:58:42.909Z', '2026-10-16T15:58:42.909Z', 'Anarco'),
  (168, 'Pahaerul Muttaqin', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, 'CIKAJANG, GARUT', NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2019)', '2026-10-16T15:58:43.155Z', '2026-10-16T15:58:43.155Z', 'Anarco'),
  (169, 'Putra Dimas Rustandi', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Dakwah dan Komunikasi', 'Jurnalistik', NULL, '2020', 'LK-I', NULL, NULL, 'TASIKMALAYA', NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2020)', '2026-10-16T15:58:43.401Z', '2026-10-16T15:58:43.401Z', 'Anarco'),
  (170, 'Rangga Rijlul', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Elektro', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2020)', '2026-10-16T15:58:43.645Z', '2026-10-16T15:58:43.645Z', 'Anarco'),
  (171, 'Rayra Gumilar', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2019', 'LK-I', NULL, NULL, 'GARUT', NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2019)', '2026-10-16T15:58:43.892Z', '2026-10-16T15:58:43.892Z', 'Anarco'),
  (172, 'Ripki Ahmad Baihaki', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2019', 'LK-I', NULL, NULL, 'GARUT', NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2019)', '2026-10-16T15:58:44.136Z', '2026-10-16T15:58:44.136Z', 'Anarco'),
  (173, 'Rizal Arif', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, 'TASIKMALAYA', NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2019)', '2026-10-16T15:58:44.385Z', '2026-10-16T15:58:44.385Z', 'Anarco'),
  (174, 'Saddam Alfarezi', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2020', 'LK-I', NULL, NULL, 'JAKARTA', NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2020)', '2026-10-16T15:58:44.630Z', '2026-10-16T15:58:44.630Z', 'Anarco'),
  (175, 'Septiara Putri', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2020)', '2026-10-16T15:58:44.875Z', '2026-10-16T15:58:44.875Z', 'Anarco'),
  (176, 'Sindi Novitasari', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Fisika', NULL, '2020', 'LK-I', NULL, NULL, 'BANDUNG', NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2020)', '2026-10-16T15:58:45.118Z', '2026-10-16T15:58:45.118Z', 'Anarco'),
  (177, 'Vega Tiara Intena', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2020', 'LK-I', NULL, NULL, 'TASIKMALAYA', NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2020)', '2026-10-16T15:58:45.361Z', '2026-10-16T15:58:45.361Z', 'Anarco'),
  (178, 'Waqyu Setiadi CILEUNYI', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, 'BANDUNG', NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2019)', '2026-10-16T15:58:45.613Z', '2026-10-16T15:58:45.613Z', 'Anarco'),
  (179, 'Yayah Rahmawati', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2020)', '2026-10-16T15:58:45.863Z', '2026-10-16T15:58:45.863Z', 'Anarco'),
  (180, 'Zidane Maulidan Syarif', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2018)', '2026-10-16T15:58:46.110Z', '2026-10-16T15:58:46.110Z', 'Anarco'),
  (181, 'Muhamad Rizki Racmawan', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Anarco (2018)', '2026-10-16T15:58:46.355Z', '2026-10-16T15:58:46.355Z', 'Anarco'),
  (182, 'AGHIL ALFHAUZI APRILIANSYAH', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Elektro', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2020)', '2026-10-16T15:58:46.597Z', '2026-10-16T15:58:46.597Z', 'Kudase'),
  (183, 'ANISA NURHASANAH', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2020', 'LK-I', NULL, NULL, 'CIANJUR', NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2020)', '2026-10-16T15:58:46.841Z', '2026-10-16T15:58:46.841Z', 'Kudase'),
  (184, 'ANUGRAH MAIMUN NAWAWI', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2019', 'LK-I', NULL, NULL, 'KAB. BANDUNG BARAT', NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2019)', '2026-10-16T15:58:47.089Z', '2026-10-16T15:58:47.089Z', 'Kudase'),
  (185, 'DEA MAYLITA NURUL EKA PUSPA', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2020)', '2026-10-16T15:58:47.335Z', '2026-10-16T15:58:47.335Z', 'Kudase'),
  (186, 'DETI PERMATA SARI', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2020)', '2026-10-16T15:58:47.583Z', '2026-10-16T15:58:47.583Z', 'Kudase'),
  (187, 'ERUS RUSDIANTO', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Dakwah dan Komunikasi', 'Manajemen Dakwah', NULL, '2020', 'LK-I', NULL, NULL, 'BANTEN', NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2020)', '2026-10-16T15:58:47.828Z', '2026-10-16T15:58:47.828Z', 'Kudase'),
  (188, 'FADIAH KHOIRUNNISA', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2021', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2021)', '2026-10-16T15:58:48.074Z', '2026-10-16T15:58:48.074Z', 'Kudase'),
  (189, 'FAHMINAH AZIZAH', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Dakwah dan Komunikasi', 'Komunikasi Penyiaran Islam', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2019)', '2026-10-16T15:58:48.323Z', '2026-10-16T15:58:48.323Z', 'Kudase'),
  (190, 'FAHRIZ DIMASQY', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2019)', '2026-10-16T15:58:48.568Z', '2026-10-16T15:58:48.568Z', 'Kudase'),
  (191, 'FAISAL ISLAMI CICALENGKA', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Elektro', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2020)', '2026-10-16T15:58:48.813Z', '2026-10-16T15:58:48.813Z', 'Kudase'),
  (192, 'FAKHRI HUSAINI', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Elektro', NULL, '2019', 'LK-I', NULL, NULL, 'GARUT', NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2019)', '2026-10-16T15:58:49.057Z', '2026-10-16T15:58:49.057Z', 'Kudase'),
  (193, 'FALA SULTAN ZACKY , KBB', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2021', 'LK-I', NULL, NULL, 'PADALARANG', NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2021)', '2026-10-16T15:58:49.305Z', '2026-10-16T15:58:49.305Z', 'Kudase'),
  (194, 'FRIZKI PUTRA DILALAH', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Matematika', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2020)', '2026-10-16T15:58:49.550Z', '2026-10-16T15:58:49.550Z', 'Kudase'),
  (195, 'HANA KURNIA S', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2019)', '2026-10-16T15:58:49.797Z', '2026-10-16T15:58:49.797Z', 'Kudase'),
  (196, 'HERNA NOVI KURNIANTI', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2020', 'LK-I', NULL, NULL, 'UJUNG BERUNG', NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2020)', '2026-10-16T15:58:50.043Z', '2026-10-16T15:58:50.043Z', 'Kudase'),
  (197, 'IMAM FIRDAUS', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, 'SUMEDANG', NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2019)', '2026-10-16T15:58:50.285Z', '2026-10-16T15:58:50.285Z', 'Kudase'),
  (198, 'ISMALIA IFTHARI', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2019)', '2026-10-16T15:58:50.543Z', '2026-10-16T15:58:50.543Z', 'Kudase'),
  (199, 'IWAN', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2020', 'LK-I', NULL, NULL, 'MAJALAYA, BANDUNG', NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2020)', '2026-10-16T15:58:50.786Z', '2026-10-16T15:58:50.786Z', 'Kudase'),
  (200, 'JENI NUR SAIDAH', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2021', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2021)', '2026-10-16T15:58:51.031Z', '2026-10-16T15:58:51.031Z', 'Kudase');
INSERT INTO "public"."cadres" ("id", "full_name", "nickname", "gender", "university", "faculty", "study_program", "nim", "batch_year", "cadre_status", "phone_private", "email_private", "address_private", "photo_id", "is_public", "notes_private", "updated_at", "created_at", "training_batch") VALUES
  (201, 'MAHFUDZ HASBI', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2020)', '2026-10-16T15:58:51.277Z', '2026-10-16T15:58:51.277Z', 'Kudase'),
  (202, 'MATINA YUFIYA AHDI', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2020)', '2026-10-16T15:58:51.526Z', '2026-10-16T15:58:51.526Z', 'Kudase'),
  (203, 'MUHAMMAD DWIKI SEPTIANTO', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2020)', '2026-10-16T15:58:51.774Z', '2026-10-16T15:58:51.774Z', 'Kudase'),
  (204, 'MUHAMMAD REYNALDI BAIHAQI', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2019', 'LK-I', NULL, NULL, 'BEKASI', NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2019)', '2026-10-16T15:58:52.028Z', '2026-10-16T15:58:52.028Z', 'Kudase'),
  (205, 'MUHAMMAD RIHAP FIRDAUS', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2021', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2021)', '2026-10-16T15:58:52.283Z', '2026-10-16T15:58:52.283Z', 'Kudase'),
  (206, 'MUHAMMAD RIZAL', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Ushuluddin', 'Aqidah dan Filsafat Islam', NULL, '2020', 'LK-I', NULL, NULL, 'BOJONG SOANG', NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2020)', '2026-10-16T15:58:52.528Z', '2026-10-16T15:58:52.528Z', 'Kudase'),
  (207, 'MUHAMMAD RIZKI MPS', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2020', 'LK-I', NULL, NULL, 'PURWAKARTA', NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2020)', '2026-10-16T15:58:52.772Z', '2026-10-16T15:58:52.772Z', 'Kudase'),
  (208, 'MUHAMMAD RIZKI PRATAMA', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2019', 'LK-I', NULL, NULL, 'CIKARANG, BEKASI', NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2019)', '2026-10-16T15:58:53.026Z', '2026-10-16T15:58:53.026Z', 'Kudase'),
  (209, 'MUHAMMAD ZAHIDY SYAWAL', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2020', 'LK-I', NULL, NULL, 'UJUNG BERUNG', NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2020)', '2026-10-16T15:58:53.272Z', '2026-10-16T15:58:53.272Z', 'Kudase'),
  (210, 'MUHAMMAD ZIYAD', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2020', 'LK-I', NULL, NULL, 'BANDUNG', NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2020)', '2026-10-16T15:58:53.514Z', '2026-10-16T15:58:53.514Z', 'Kudase'),
  (211, 'MUNA MUMTAZAH', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2020)', '2026-10-16T15:58:53.759Z', '2026-10-16T15:58:53.759Z', 'Kudase'),
  (212, 'NAFISAH PUTRI SABILLAH', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2021', 'LK-I', NULL, NULL, 'ARCAMANIK, BANDUNG', NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2021)', '2026-10-16T15:58:54.003Z', '2026-10-16T15:58:54.003Z', 'Kudase'),
  (213, 'NASHRI LUTHFIYAH', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2018', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2018)', '2026-10-16T15:58:54.248Z', '2026-10-16T15:58:54.248Z', 'Kudase'),
  (214, 'NENI PRISTIANI', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2020)', '2026-10-16T15:58:54.494Z', '2026-10-16T15:58:54.494Z', 'Kudase'),
  (215, 'NISA HAMIDAH', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2021', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2021)', '2026-10-16T15:58:54.738Z', '2026-10-16T15:58:54.738Z', 'Kudase'),
  (216, 'NISA KARTIKA', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2021', 'LK-I', NULL, NULL, 'MALANGBONG, GARUT', NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2021)', '2026-10-16T15:58:54.982Z', '2026-10-16T15:58:54.982Z', 'Kudase'),
  (217, 'NOVIA NURYANTI', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Ushuluddin', 'Studi Agama-Agama', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2020)', '2026-10-16T15:58:55.230Z', '2026-10-16T15:58:55.230Z', 'Kudase'),
  (218, 'PASYA ANTEN WIDURI', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2020)', '2026-10-16T15:58:55.476Z', '2026-10-16T15:58:55.476Z', 'Kudase'),
  (219, 'RAYHAN TSAURY', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2020', 'LK-I', NULL, NULL, 'CIKAJANG, GARUT', NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2020)', '2026-10-16T15:58:55.723Z', '2026-10-16T15:58:55.723Z', 'Kudase'),
  (220, 'RAYSA ADDINIYAH', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Matematika', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2020)', '2026-10-16T15:58:55.967Z', '2026-10-16T15:58:55.967Z', 'Kudase'),
  (221, 'RESKI YUNUS FAJRIANTO', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Matematika', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2020)', '2026-10-16T15:58:56.215Z', '2026-10-16T15:58:56.215Z', 'Kudase'),
  (222, 'REZA ANGGI RIZKIA', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Elektro', NULL, '2019', 'LK-I', NULL, NULL, 'CIPADUNG, BANDUNG', NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2019)', '2026-10-16T15:58:56.459Z', '2026-10-16T15:58:56.459Z', 'Kudase'),
  (223, 'REZA SASTRA ATMAJA', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Pariwisata', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2020)', '2026-10-16T15:58:56.709Z', '2026-10-16T15:58:56.709Z', 'Kudase'),
  (224, 'RIFQI LUTFAN PADL', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2020', 'LK-I', NULL, NULL, 'SAMARANG, GARUT', NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2020)', '2026-10-16T15:58:56.951Z', '2026-10-16T15:58:56.951Z', 'Kudase'),
  (225, 'RIJKI', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2020)', '2026-10-16T15:58:57.197Z', '2026-10-16T15:58:57.197Z', 'Kudase'),
  (226, 'RIZKA RAMADHANI ALMI', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2021', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2021)', '2026-10-16T15:58:57.441Z', '2026-10-16T15:58:57.441Z', 'Kudase'),
  (227, 'SA''ADATI PUTRI NURUL', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2020)', '2026-10-16T15:58:57.690Z', '2026-10-16T15:58:57.690Z', 'Kudase'),
  (228, 'SHIFA NURAINI', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2021', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2021)', '2026-10-16T15:58:57.935Z', '2026-10-16T15:58:57.935Z', 'Kudase'),
  (229, 'SINTA SARI', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Matematika', NULL, '2020', 'LK-I', NULL, NULL, 'SUBANG', NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2020)', '2026-10-16T15:58:58.177Z', '2026-10-16T15:58:58.177Z', 'Kudase'),
  (230, 'SITI HARDIANTI NURHUDA', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2019', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2019)', '2026-10-16T15:58:58.528Z', '2026-10-16T15:58:58.528Z', 'Kudase'),
  (231, 'TIA MUTIARA', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2020)', '2026-10-16T15:58:58.876Z', '2026-10-16T15:58:58.876Z', 'Kudase'),
  (232, 'WILDAN SOPHAL JAMIL', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2021', 'LK-I', NULL, NULL, 'MAJALENGKA', NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2021)', '2026-10-16T15:58:59.118Z', '2026-10-16T15:58:59.118Z', 'Kudase'),
  (233, 'YANDIAN', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2021', 'LK-I', NULL, NULL, 'CIPADUNG, BANDUNG', NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2021)', '2026-10-16T15:58:59.361Z', '2026-10-16T15:58:59.361Z', 'Kudase'),
  (234, 'ZUHAD HARKASY AL-HIKAM', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2021', 'LK-I', NULL, NULL, 'PANYILEUKAN, BANDUNG', NULL, TRUE, 'Kader LK-1 Angkatan Kudase (2021)', '2026-10-16T15:58:59.605Z', '2026-10-16T15:58:59.605Z', 'Kudase'),
  (235, 'Abdullah Azzam', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2021', 'LK-I', NULL, NULL, 'Bekasi', NULL, TRUE, 'Kader LK-1 Angkatan Buram (2021)', '2026-10-16T15:58:59.850Z', '2026-10-16T15:58:59.850Z', 'Buram'),
  (236, 'Adi Ridwan', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Syariah dan Hukum', 'Perbandingan Mazhab', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Buram (2020)', '2026-10-16T15:59:00.097Z', '2026-10-16T15:59:00.097Z', 'Buram'),
  (237, 'Akmal Hibatullah', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2021', 'LK-I', NULL, NULL, 'Bogor', NULL, TRUE, 'Kader LK-1 Angkatan Buram (2021)', '2026-10-16T15:59:00.344Z', '2026-10-16T15:59:00.344Z', 'Buram'),
  (238, 'Ansyarullah', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2021', 'LK-I', NULL, NULL, 'Kediri', NULL, TRUE, 'Kader LK-1 Angkatan Buram (2021)', '2026-10-16T15:59:00.590Z', '2026-10-16T15:59:00.590Z', 'Buram'),
  (239, 'Alifah Putri Yogyantoro', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2021', 'LK-I', NULL, NULL, 'Arcamanik, Bandung', NULL, TRUE, 'Kader LK-1 Angkatan Buram (2021)', '2026-10-16T15:59:00.833Z', '2026-10-16T15:59:00.833Z', 'Buram'),
  (240, 'Ari Haliansyah Harahap', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Syariah dan Hukum', 'Perbandingan Mazhab', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Buram (2020)', '2026-10-16T15:59:01.076Z', '2026-10-16T15:59:01.076Z', 'Buram'),
  (241, 'Azalia Fatimah Dinah', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2022', 'LK-I', NULL, NULL, 'Bandung', NULL, TRUE, 'Kader LK-1 Angkatan Buram (2022)', '2026-10-16T15:59:01.324Z', '2026-10-16T15:59:01.324Z', 'Buram'),
  (242, 'Azkia Nisa', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2021', 'LK-I', NULL, NULL, 'Jakarta', NULL, TRUE, 'Kader LK-1 Angkatan Buram (2021)', '2026-10-16T15:59:01.580Z', '2026-10-16T15:59:01.580Z', 'Buram'),
  (243, 'Dandi Maulana Faizulhaq', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'UPI', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Buram (2020)', '2026-10-16T15:59:01.855Z', '2026-10-16T15:59:01.855Z', 'Buram'),
  (244, 'Dani Ramdani', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2021', 'LK-I', NULL, NULL, 'Tarogong Kidul, Gar', NULL, TRUE, 'Kader LK-1 Angkatan Buram (2021)', '2026-10-16T15:59:02.106Z', '2026-10-16T15:59:02.106Z', 'Buram'),
  (245, 'Erika Fitriyanti', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Ilmu Sosial dan Ilmu Politik', 'Administrasi Publik', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Buram (2020)', '2026-10-16T15:59:02.351Z', '2026-10-16T15:59:02.351Z', 'Buram'),
  (246, 'Fadli Abdul Muta''ali', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2021', 'LK-I', NULL, NULL, 'Bandung', NULL, TRUE, 'Kader LK-1 Angkatan Buram (2021)', '2026-10-16T15:59:02.606Z', '2026-10-16T15:59:02.606Z', 'Buram'),
  (247, 'Fahri Taiufiq', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Dakwah dan Komunikasi', 'Manajemen Dakwah', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Buram (2020)', '2026-10-16T15:59:02.989Z', '2026-10-16T15:59:02.989Z', 'Buram'),
  (248, 'Ilma Nurul Aulia', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Syariah dan Hukum', 'Perbandingan Mazhab', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Buram (2020)', '2026-10-16T15:59:03.366Z', '2026-10-16T15:59:03.366Z', 'Buram'),
  (249, 'M Fajar Septian', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Buram (2020)', '2026-10-16T15:59:03.611Z', '2026-10-16T15:59:03.611Z', 'Buram'),
  (250, 'Muhammad Subhan S', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2020', 'LK-I', NULL, NULL, 'Garut', NULL, TRUE, 'Kader LK-1 Angkatan Buram (2020)', '2026-10-16T15:59:03.854Z', '2026-10-16T15:59:03.854Z', 'Buram');
INSERT INTO "public"."cadres" ("id", "full_name", "nickname", "gender", "university", "faculty", "study_program", "nim", "batch_year", "cadre_status", "phone_private", "email_private", "address_private", "photo_id", "is_public", "notes_private", "updated_at", "created_at", "training_batch") VALUES
  (251, 'Mukhtar Ghulam Halim', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2021', 'LK-I', NULL, NULL, 'Cinunuk Kab. Bandu', NULL, TRUE, 'Kader LK-1 Angkatan Buram (2021)', '2026-10-16T15:59:04.177Z', '2026-10-16T15:59:04.177Z', 'Buram'),
  (252, 'Nugraha Adi Sulistyo', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2020', 'LK-I', NULL, NULL, 'Bandung', NULL, TRUE, 'Kader LK-1 Angkatan Buram (2020)', '2026-10-16T15:59:04.430Z', '2026-10-16T15:59:04.430Z', 'Buram'),
  (253, 'Nur Alfiyah', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Dakwah dan Komunikasi', 'Manajemen Dakwah', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Buram (2020)', '2026-10-16T15:59:04.673Z', '2026-10-16T15:59:04.673Z', 'Buram'),
  (254, 'Sandy Setiawan', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2021', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Buram (2021)', '2026-10-16T15:59:04.922Z', '2026-10-16T15:59:04.922Z', 'Buram'),
  (255, 'Silmi Mawarni', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2021', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Buram (2021)', '2026-10-16T15:59:05.167Z', '2026-10-16T15:59:05.167Z', 'Buram'),
  (256, 'Siti Sopiah', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2021', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Buram (2021)', '2026-10-16T15:59:05.413Z', '2026-10-16T15:59:05.413Z', 'Buram'),
  (257, 'Sopiroh Jainah', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Syariah dan Hukum', 'Perbandingan Mazhab', NULL, '2020', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Buram (2020)', '2026-10-16T15:59:05.658Z', '2026-10-16T15:59:05.658Z', 'Buram'),
  (258, 'Suci Awalliah', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2020', 'LK-I', NULL, NULL, 'Sukabumi', NULL, TRUE, 'Kader LK-1 Angkatan Buram (2020)', '2026-10-16T15:59:05.905Z', '2026-10-16T15:59:05.905Z', 'Buram'),
  (259, 'Abdul Azid', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2022', 'LK-I', NULL, NULL, 'Tasikmalaya', NULL, TRUE, 'Kader LK-1 Angkatan Bringka (2022)', '2026-10-16T15:59:06.156Z', '2026-10-16T15:59:06.156Z', 'Bringka'),
  (260, 'Alena Mansika', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Matematika', NULL, '2021', 'LK-I', NULL, NULL, 'Sukabumi', NULL, TRUE, 'Kader LK-1 Angkatan Bringka (2021)', '2026-10-16T15:59:06.399Z', '2026-10-16T15:59:06.399Z', 'Bringka'),
  (261, 'Arman Ardiyansyah', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2022', 'LK-I', NULL, NULL, 'Garut', NULL, TRUE, 'Kader LK-1 Angkatan Bringka (2022)', '2026-10-16T15:59:06.646Z', '2026-10-16T15:59:06.646Z', 'Bringka'),
  (262, 'Demitri Mahayana', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2022', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Bringka (2022)', '2026-10-16T15:59:06.898Z', '2026-10-16T15:59:06.898Z', 'Bringka'),
  (263, 'Febryo Fibonacci Amadeo', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2022', 'LK-I', NULL, NULL, 'Bandung', NULL, TRUE, 'Kader LK-1 Angkatan Bringka (2022)', '2026-10-16T15:59:07.143Z', '2026-10-16T15:59:07.143Z', 'Bringka'),
  (264, 'Hilman Maulana', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2023', 'LK-I', NULL, NULL, 'Tasikmalaya', NULL, TRUE, 'Kader LK-1 Angkatan Bringka (2023)', '2026-10-16T15:59:07.387Z', '2026-10-16T15:59:07.387Z', 'Bringka'),
  (265, 'Ilham Maulana Syahidan', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2021', 'LK-I', NULL, NULL, 'Kopo, Bandung', NULL, TRUE, 'Kader LK-1 Angkatan Bringka (2021)', '2026-10-16T15:59:07.632Z', '2026-10-16T15:59:07.632Z', 'Bringka'),
  (266, 'Miftah Sidiq Amrullah', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2021', 'LK-I', NULL, NULL, 'Kab. Bandung', NULL, TRUE, 'Kader LK-1 Angkatan Bringka (2021)', '2026-10-16T15:59:07.877Z', '2026-10-16T15:59:07.877Z', 'Bringka'),
  (267, 'Mohammad Fariz Affissi', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Ushuluddin', 'Sejarah Peradaban Islam', NULL, '2021', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Bringka (2021)', '2026-10-16T15:59:08.122Z', '2026-10-16T15:59:08.122Z', 'Bringka'),
  (268, 'Muhamad Rafi Fauzan', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2022', 'LK-I', NULL, NULL, 'Gedebage, Bandung', NULL, TRUE, 'Kader LK-1 Angkatan Bringka (2022)', '2026-10-16T15:59:08.366Z', '2026-10-16T15:59:08.366Z', 'Bringka'),
  (269, 'Aril Alfa Rizki', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2022', 'LK-I', NULL, NULL, 'Karawang', NULL, TRUE, 'Kader LK-1 Angkatan Bringka (2022)', '2026-10-16T15:59:08.619Z', '2026-10-16T15:59:08.619Z', 'Bringka'),
  (270, 'M. Naufal Rancaekek', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2022', 'LK-I', NULL, NULL, 'Kab. Bandung', NULL, TRUE, 'Kader LK-1 Angkatan Bringka (2022)', '2026-10-16T15:59:08.864Z', '2026-10-16T15:59:08.864Z', 'Bringka'),
  (271, 'M. Rahadian Alif', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Ushuluddin', 'Sejarah Peradaban Islam', NULL, '2021', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Bringka (2021)', '2026-10-16T15:59:09.110Z', '2026-10-16T15:59:09.110Z', 'Bringka'),
  (272, 'Nabila Nur''arifah', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2022', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Bringka (2022)', '2026-10-16T15:59:09.484Z', '2026-10-16T15:59:09.484Z', 'Bringka'),
  (273, 'Nathania Rahadatul ''Aisy', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2022', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Bringka (2022)', '2026-10-16T15:59:09.730Z', '2026-10-16T15:59:09.730Z', 'Bringka'),
  (274, 'Neng Sri Mulyani', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2022', 'LK-I', NULL, NULL, 'Subang', NULL, TRUE, 'Kader LK-1 Angkatan Bringka (2022)', '2026-10-16T15:59:09.975Z', '2026-10-16T15:59:09.975Z', 'Bringka'),
  (275, 'Reski Firmansyah', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2021', 'LK-I', NULL, NULL, 'Dago, Bandung', NULL, TRUE, 'Kader LK-1 Angkatan Bringka (2021)', '2026-10-16T15:59:10.221Z', '2026-10-16T15:59:10.221Z', 'Bringka'),
  (276, 'Rizky Kustia G Rancaekek', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2021', 'LK-I', NULL, NULL, 'Kab. Bandung', NULL, TRUE, 'Kader LK-1 Angkatan Bringka (2021)', '2026-10-16T15:59:10.496Z', '2026-10-16T15:59:10.496Z', 'Bringka'),
  (277, 'Romi Patria Sanjaya', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Matematika', NULL, '2022', 'LK-I', NULL, NULL, 'Purwakarta', NULL, TRUE, 'Kader LK-1 Angkatan Bringka (2022)', '2026-10-16T15:59:10.764Z', '2026-10-16T15:59:10.764Z', 'Bringka'),
  (278, 'Salsabila Wirdian', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2022', 'LK-I', NULL, NULL, 'Bekasi', NULL, TRUE, 'Kader LK-1 Angkatan Bringka (2022)', '2026-10-16T15:59:11.020Z', '2026-10-16T15:59:11.020Z', 'Bringka'),
  (279, 'Rusyadatun Nazwa', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2022', 'LK-I', NULL, NULL, 'Bekasi', NULL, TRUE, 'Kader LK-1 Angkatan Bringka (2022)', '2026-10-16T15:59:11.314Z', '2026-10-16T15:59:11.314Z', 'Bringka'),
  (280, 'Yani Anggraeni Safitri Majalaya', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2021', 'LK-I', NULL, NULL, 'Kab. Bandung', NULL, TRUE, 'Kader LK-1 Angkatan Bringka (2021)', '2026-10-16T15:59:11.568Z', '2026-10-16T15:59:11.568Z', 'Bringka'),
  (281, 'Hilmi Robbani Alfarisi', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2022', 'LK-I', NULL, NULL, 'Bogor', NULL, TRUE, 'Kader LK-1 Angkatan Bringka (2022)', '2026-10-16T15:59:11.810Z', '2026-10-16T15:59:11.810Z', 'Bringka'),
  (282, 'Raihan Syihab Aufa', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2022', 'LK-I', NULL, NULL, 'Cianjur', NULL, TRUE, 'Kader LK-1 Angkatan Bringka (2022)', '2026-10-16T15:59:12.055Z', '2026-10-16T15:59:12.055Z', 'Bringka'),
  (283, 'Zahra Aulia Rahma', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2022', 'LK-I', NULL, NULL, 'Subang', NULL, TRUE, 'Kader LK-1 Angkatan Bringka (2022)', '2026-10-16T15:59:12.299Z', '2026-10-16T15:59:12.299Z', 'Bringka'),
  (284, 'Agus Rizky Ramdhani Rancaekek', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2023', 'LK-I', NULL, NULL, 'Kab. Bandung', NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2023)', '2026-10-16T15:59:12.545Z', '2026-10-16T15:59:12.545Z', 'Ampau'),
  (285, 'Arti Aulya Apriliani', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Pendidikan Islam Anak Usia Dini', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2023)', '2026-10-16T15:59:12.790Z', '2026-10-16T15:59:12.790Z', 'Ampau'),
  (286, 'Arifin Izhar', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2023', 'LK-I', NULL, NULL, 'Cikutra, Bandung', NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2023)', '2026-10-16T15:59:13.037Z', '2026-10-16T15:59:13.037Z', 'Ampau'),
  (287, 'Attar Abdullah', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Syariah dan Hukum', 'Muamalah', NULL, '2022', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2022)', '2026-10-16T15:59:13.282Z', '2026-10-16T15:59:13.282Z', 'Ampau'),
  (288, 'Athaya Mutmainah', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2022', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2022)', '2026-10-16T15:59:14.023Z', '2026-10-16T15:59:14.023Z', 'Ampau'),
  (289, 'Devi Novia Sari Majalaya', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2022', 'LK-I', NULL, NULL, 'Kab. Bandung', NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2022)', '2026-10-16T15:59:14.277Z', '2026-10-16T15:59:14.277Z', 'Ampau'),
  (290, 'Dimas Thariq Susanto', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2021', 'LK-I', NULL, NULL, 'Cimahi', NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2021)', '2026-10-16T15:59:14.520Z', '2026-10-16T15:59:14.520Z', 'Ampau'),
  (291, 'Dini Nurawaliyawati', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2023', 'LK-I', NULL, NULL, 'Subang', NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2023)', '2026-10-16T15:59:14.765Z', '2026-10-16T15:59:14.765Z', 'Ampau'),
  (292, 'Evandika Nazwansyah', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2021', 'LK-I', NULL, NULL, 'Banjarmasin, Kalimantan', NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2021)', '2026-10-16T15:59:15.007Z', '2026-10-16T15:59:15.007Z', 'Ampau'),
  (293, 'Fadhilah Syabrina', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Syariah dan Hukum', 'Muamalah', NULL, '2022', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2022)', '2026-10-16T15:59:15.252Z', '2026-10-16T15:59:15.252Z', 'Ampau'),
  (294, 'Fajar Aprilliansyah', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Matematika', NULL, '2022', 'LK-I', NULL, NULL, 'Kab. Bandung', NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2022)', '2026-10-16T15:59:15.498Z', '2026-10-16T15:59:15.498Z', 'Ampau'),
  (295, 'Fathin Dhiya Amani', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2022', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2022)', '2026-10-16T15:59:15.745Z', '2026-10-16T15:59:15.745Z', 'Ampau'),
  (296, 'Ahmad fauzi N', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2022', 'LK-I', NULL, NULL, 'Sukawening, Garut', NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2022)', '2026-10-16T15:59:15.995Z', '2026-10-16T15:59:15.995Z', 'Ampau'),
  (297, 'Fauzan Ansori', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Syariah dan Hukum', 'Ilmu Hadits', NULL, '2022', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2022)', '2026-10-16T15:59:16.240Z', '2026-10-16T15:59:16.240Z', 'Ampau'),
  (298, 'Feby Nurul Asri M', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2022', 'LK-I', NULL, NULL, 'Garut', NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2022)', '2026-10-16T15:59:16.524Z', '2026-10-16T15:59:16.524Z', 'Ampau'),
  (299, 'Fikri Muhamad Fauzi', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Syariah dan Hukum', 'Hukum Keluarga', NULL, '2021', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2021)', '2026-10-16T15:59:16.770Z', '2026-10-16T15:59:16.770Z', 'Ampau'),
  (300, 'Irza Arrifqy Rasyid Lubis', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Syariah dan Hukum', 'Hukum Keluarga', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2023)', '2026-10-16T15:59:17.026Z', '2026-10-16T15:59:17.026Z', 'Ampau');
INSERT INTO "public"."cadres" ("id", "full_name", "nickname", "gender", "university", "faculty", "study_program", "nim", "batch_year", "cadre_status", "phone_private", "email_private", "address_private", "photo_id", "is_public", "notes_private", "updated_at", "created_at", "training_batch") VALUES
  (301, 'Jihan Hasna Humaira', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Syariah dan Hukum', 'Muamalah', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2023)', '2026-10-16T15:59:17.271Z', '2026-10-16T15:59:17.271Z', 'Ampau'),
  (302, 'Kaisa Alya Nur Adilah', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Syariah dan Hukum', 'Muamalah', NULL, '2022', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2022)', '2026-10-16T15:59:17.515Z', '2026-10-16T15:59:17.515Z', 'Ampau'),
  (303, 'Muhammad Paiq', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2022', 'LK-I', NULL, NULL, 'Subang', NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2022)', '2026-10-16T15:59:17.759Z', '2026-10-16T15:59:17.759Z', 'Ampau'),
  (304, 'M Hazmi Aqila', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2023', 'LK-I', NULL, NULL, 'Cianjur', NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2023)', '2026-10-16T15:59:18.005Z', '2026-10-16T15:59:18.005Z', 'Ampau'),
  (305, 'Mochammad Ikbal Fatoni Soreang', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2022', 'LK-I', NULL, NULL, 'Kab. Bandung', NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2022)', '2026-10-16T15:59:18.248Z', '2026-10-16T15:59:18.248Z', 'Ampau'),
  (306, 'Muhamad Yazid Zinky Arisona', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2023', 'LK-I', NULL, NULL, 'Kendari', NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2023)', '2026-10-16T15:59:18.493Z', '2026-10-16T15:59:18.493Z', 'Ampau'),
  (307, 'Muhammad Haikal Harahap Sumatera Utara', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Dakwah dan Komunikasi', 'Komunikasi Penyiaran Islam', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2023)', '2026-10-16T15:59:18.775Z', '2026-10-16T15:59:18.775Z', 'Ampau'),
  (308, 'Mullah Muhammad Usamah', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Dakwah dan Komunikasi', 'Komunikasi Penyiaran Islam', NULL, '2022', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2022)', '2026-10-16T15:59:19.020Z', '2026-10-16T15:59:19.020Z', 'Ampau'),
  (309, 'Nanda Febri Saputra', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Dakwah dan Komunikasi', 'Komunikasi Penyiaran Islam', NULL, '2022', 'LK-I', NULL, NULL, 'Riau', NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2022)', '2026-10-16T15:59:19.272Z', '2026-10-16T15:59:19.272Z', 'Ampau'),
  (310, 'Pilar Ilham Pernanda', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2023', 'LK-I', NULL, NULL, 'Tangerang', NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2023)', '2026-10-16T15:59:19.521Z', '2026-10-16T15:59:19.521Z', 'Ampau'),
  (311, 'Putri Nabila Sumatera Barat', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Dakwah dan Komunikasi', 'Jurnalistik', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2023)', '2026-10-16T15:59:19.906Z', '2026-10-16T15:59:19.906Z', 'Ampau'),
  (312, 'Rani Handayani', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Manajemen Pendidikan Islam', NULL, '2021', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2021)', '2026-10-16T15:59:20.151Z', '2026-10-16T15:59:20.151Z', 'Ampau'),
  (313, 'Rifqi Nafi Izzuddin', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2023', 'LK-I', NULL, NULL, 'Bogor', NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2023)', '2026-10-16T15:59:20.395Z', '2026-10-16T15:59:20.395Z', 'Ampau'),
  (314, 'Riris Dewi Sopiah', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Pendidikan Islam Anak Usia Dini', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2023)', '2026-10-16T15:59:20.638Z', '2026-10-16T15:59:20.638Z', 'Ampau'),
  (315, 'Rizki Syukur', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2023', 'LK-I', NULL, NULL, 'Margahayu, Bandung', NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2023)', '2026-10-16T15:59:20.901Z', '2026-10-16T15:59:20.901Z', 'Ampau'),
  (316, 'Rofi Andalous', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Matematika', NULL, '2023', 'LK-I', NULL, NULL, 'Garut', NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2023)', '2026-10-16T15:59:21.144Z', '2026-10-16T15:59:21.144Z', 'Ampau'),
  (317, 'Salsabila Usman', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2022', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2022)', '2026-10-16T15:59:21.388Z', '2026-10-16T15:59:21.388Z', 'Ampau'),
  (318, 'Satria Agung', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2023', 'LK-I', NULL, NULL, 'Pelabuhan Ratu, Cianjur', NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2023)', '2026-10-16T15:59:21.633Z', '2026-10-16T15:59:21.633Z', 'Ampau'),
  (319, 'Shifa Mutiara Cahaya Putri', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Pendidikan Islam Anak Usia Dini', NULL, '2021', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2021)', '2026-10-16T15:59:21.880Z', '2026-10-16T15:59:21.880Z', 'Ampau'),
  (320, 'Silfani Andiniyati', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2022', 'LK-I', NULL, NULL, 'Kiaracondong, Bandung', NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2022)', '2026-10-16T15:59:22.125Z', '2026-10-16T15:59:22.125Z', 'Ampau'),
  (321, 'Siti Nurjanah', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Syariah dan Hukum', 'Hukum Keluarga', NULL, '2021', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2021)', '2026-10-16T15:59:22.371Z', '2026-10-16T15:59:22.371Z', 'Ampau'),
  (322, 'Fawwaz Fadel Rahman', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2023', 'LK-I', NULL, NULL, 'Kopo, Bandung', NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2023)', '2026-10-16T15:59:22.619Z', '2026-10-16T15:59:22.619Z', 'Ampau'),
  (323, 'Muhammad Raihan Musyaffa', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Syariah dan Hukum', 'Hukum Keluarga', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Ampau (2023)', '2026-10-16T15:59:22.866Z', '2026-10-16T15:59:22.866Z', 'Ampau'),
  (324, 'Abizar Al Ghifari', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:23.111Z', '2026-10-16T15:59:23.111Z', 'Zoton'),
  (325, 'Acep Achman', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:23.366Z', '2026-10-16T15:59:23.366Z', 'Zoton'),
  (326, 'Achmad kamal thuuluzzaman', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:23.664Z', '2026-10-16T15:59:23.664Z', 'Zoton'),
  (327, 'Addy Maulana Alfarisi', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2023)', '2026-10-16T15:59:23.945Z', '2026-10-16T15:59:23.945Z', 'Zoton'),
  (328, 'Akhmad naufal Al Rafsanjani', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:24.267Z', '2026-10-16T15:59:24.267Z', 'Zoton'),
  (329, 'Aghnia Nurul Fadila', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2022', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2022)', '2026-10-16T15:59:24.511Z', '2026-10-16T15:59:24.511Z', 'Zoton'),
  (330, 'Al-Fasya Aulia Syahda', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:24.776Z', '2026-10-16T15:59:24.776Z', 'Zoton'),
  (331, 'Alia Nurrohmah', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:25.147Z', '2026-10-16T15:59:25.147Z', 'Zoton'),
  (332, 'Alya Nur Hanifah', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:25.393Z', '2026-10-16T15:59:25.393Z', 'Zoton'),
  (333, 'Alya Nurul Lathifah', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:25.642Z', '2026-10-16T15:59:25.642Z', 'Zoton'),
  (334, 'Arib Abdullah Mufti', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:25.905Z', '2026-10-16T15:59:25.905Z', 'Zoton'),
  (335, 'Ariel Al Farizi', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2022', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2022)', '2026-10-16T15:59:26.153Z', '2026-10-16T15:59:26.153Z', 'Zoton'),
  (336, 'Assyira Gapuraning Rahayu', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:26.398Z', '2026-10-16T15:59:26.398Z', 'Zoton'),
  (337, 'Aulia Rahmah', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:26.646Z', '2026-10-16T15:59:26.646Z', 'Zoton'),
  (338, 'Awaludin Firdaus', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2023)', '2026-10-16T15:59:26.891Z', '2026-10-16T15:59:26.891Z', 'Zoton'),
  (339, 'Azzahra Nurkamila', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2023)', '2026-10-16T15:59:27.136Z', '2026-10-16T15:59:27.136Z', 'Zoton'),
  (340, 'Cinta Dzikirna Sabella', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2023)', '2026-10-16T15:59:27.385Z', '2026-10-16T15:59:27.385Z', 'Zoton'),
  (341, 'Fadllan Naufal Rahman', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:27.646Z', '2026-10-16T15:59:27.646Z', 'Zoton'),
  (342, 'Fahad Muhammad Alfarizi', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:27.890Z', '2026-10-16T15:59:27.890Z', 'Zoton'),
  (343, 'Farkhah Sabilla', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:28.134Z', '2026-10-16T15:59:28.134Z', 'Zoton'),
  (344, 'Frizky Leydailan', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:28.384Z', '2026-10-16T15:59:28.384Z', 'Zoton'),
  (345, 'Geisa Rusalviani Azzahra', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Pendidikan Agama Islam', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:28.630Z', '2026-10-16T15:59:28.630Z', 'Zoton'),
  (346, 'Gozi Hasbiyallah', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2023)', '2026-10-16T15:59:28.874Z', '2026-10-16T15:59:28.874Z', 'Zoton'),
  (347, 'Habidb Zikri', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:29.118Z', '2026-10-16T15:59:29.118Z', 'Zoton'),
  (348, 'Hana Siti Latifah', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:29.362Z', '2026-10-16T15:59:29.362Z', 'Zoton'),
  (349, 'Hussain Karbala', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:29.607Z', '2026-10-16T15:59:29.607Z', 'Zoton'),
  (350, 'Iklima Nur Aulia', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2023)', '2026-10-16T15:59:29.886Z', '2026-10-16T15:59:29.886Z', 'Zoton');
INSERT INTO "public"."cadres" ("id", "full_name", "nickname", "gender", "university", "faculty", "study_program", "nim", "batch_year", "cadre_status", "phone_private", "email_private", "address_private", "photo_id", "is_public", "notes_private", "updated_at", "created_at", "training_batch") VALUES
  (351, 'Iqbal Firdaus', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Ilmu Sosial dan Ilmu Politik', 'Manajemen', NULL, '2022', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2022)', '2026-10-16T15:59:30.131Z', '2026-10-16T15:59:30.131Z', 'Zoton'),
  (352, 'Irgi Muhammad Fadll', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:30.376Z', '2026-10-16T15:59:30.376Z', 'Zoton'),
  (353, 'Lala Sri Yulia Sandasih', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:30.620Z', '2026-10-16T15:59:30.620Z', 'Zoton'),
  (354, 'Linda Jahira', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:30.864Z', '2026-10-16T15:59:30.864Z', 'Zoton'),
  (355, 'Luthfi hana fadiah', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2022', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2022)', '2026-10-16T15:59:31.107Z', '2026-10-16T15:59:31.107Z', 'Zoton'),
  (356, 'M Ilham Maulana Sugandi', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:31.354Z', '2026-10-16T15:59:31.354Z', 'Zoton'),
  (357, 'Melvi Amanda Wardani', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:31.601Z', '2026-10-16T15:59:31.601Z', 'Zoton'),
  (358, 'Mhd. Khoirul Anwar', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:31.846Z', '2026-10-16T15:59:31.846Z', 'Zoton'),
  (359, 'Mia Padilah', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:32.090Z', '2026-10-16T15:59:32.090Z', 'Zoton'),
  (360, 'Mohammad Naza Fadily', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:32.337Z', '2026-10-16T15:59:32.337Z', 'Zoton'),
  (361, 'Muhamad Abdan Syakuro', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2023)', '2026-10-16T15:59:32.584Z', '2026-10-16T15:59:32.584Z', 'Zoton'),
  (362, 'Muhammad Arkan Sulaeman', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2023)', '2026-10-16T15:59:32.841Z', '2026-10-16T15:59:32.841Z', 'Zoton'),
  (363, 'Muhamad Ilham Akbar P', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:33.087Z', '2026-10-16T15:59:33.087Z', 'Zoton'),
  (364, 'Muhamad Mubiar Ramadana', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2022', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2022)', '2026-10-16T15:59:33.329Z', '2026-10-16T15:59:33.329Z', 'Zoton'),
  (365, 'Muhamad Syam Jane Raffael', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:33.594Z', '2026-10-16T15:59:33.594Z', 'Zoton'),
  (366, 'Muhammad Abdilah Baihaqi', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:33.842Z', '2026-10-16T15:59:33.842Z', 'Zoton'),
  (367, 'Muhammad Ali Khadim', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:34.087Z', '2026-10-16T15:59:34.087Z', 'Zoton'),
  (368, 'Muhammad Haidar Alkamil', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:34.336Z', '2026-10-16T15:59:34.336Z', 'Zoton'),
  (369, 'Muhammad Humam Adzkia', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2022', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2022)', '2026-10-16T15:59:34.582Z', '2026-10-16T15:59:34.582Z', 'Zoton'),
  (370, 'Muhammad Irsyad sidik', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2023)', '2026-10-16T15:59:34.827Z', '2026-10-16T15:59:34.827Z', 'Zoton'),
  (371, 'Muhammad Mustafidh Amna', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:35.070Z', '2026-10-16T15:59:35.070Z', 'Zoton'),
  (372, 'Muhammad Qeisya El Barra', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:35.315Z', '2026-10-16T15:59:35.315Z', 'Zoton'),
  (373, 'Mutiara Najwa', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:35.559Z', '2026-10-16T15:59:35.559Z', 'Zoton'),
  (374, 'Nabila Nur Rahma', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2023)', '2026-10-16T15:59:35.804Z', '2026-10-16T15:59:35.804Z', 'Zoton'),
  (375, 'Naufal Fatih Hanif', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:36.055Z', '2026-10-16T15:59:36.055Z', 'Zoton'),
  (376, 'Nazwa Putri Fadilah', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:36.316Z', '2026-10-16T15:59:36.316Z', 'Zoton'),
  (377, 'Nayla Mutmainah', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:36.560Z', '2026-10-16T15:59:36.560Z', 'Zoton'),
  (378, 'Neng Mariya Ulfa', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:36.802Z', '2026-10-16T15:59:36.802Z', 'Zoton'),
  (379, 'Raden Elfa Shafira', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:37.046Z', '2026-10-16T15:59:37.046Z', 'Zoton'),
  (380, 'Rahayu Dwiyanti', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Dakwah dan Komunikasi', 'Jurnalistik', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:37.312Z', '2026-10-16T15:59:37.312Z', 'Zoton'),
  (381, 'Raisya Husni Destiani', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:37.558Z', '2026-10-16T15:59:37.558Z', 'Zoton'),
  (382, 'Ramadhani Win Armedal', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:37.801Z', '2026-10-16T15:59:37.801Z', 'Zoton'),
  (383, 'Rasifa Nabila', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:38.044Z', '2026-10-16T15:59:38.044Z', 'Zoton'),
  (384, 'Rasyid Firmansyah', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:38.287Z', '2026-10-16T15:59:38.287Z', 'Zoton'),
  (385, 'Refina Meydinahawa', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:38.551Z', '2026-10-16T15:59:38.551Z', 'Zoton'),
  (386, 'Rewaldi Pramana Putra', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:38.796Z', '2026-10-16T15:59:38.796Z', 'Zoton'),
  (387, 'Ridwan Abdul Muqis', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Dakwah dan Komunikasi', 'Manajemen Dakwah', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:39.058Z', '2026-10-16T15:59:39.058Z', 'Zoton'),
  (388, 'Rifqi taufik a', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2022', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2022)', '2026-10-16T15:59:39.306Z', '2026-10-16T15:59:39.306Z', 'Zoton'),
  (389, 'Rifqy Muhamad Ibrahim', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:39.550Z', '2026-10-16T15:59:39.550Z', 'Zoton'),
  (390, 'Riswan Setiawan Putra', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:39.803Z', '2026-10-16T15:59:39.803Z', 'Zoton'),
  (391, 'Rizki Nurul Huda', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:40.062Z', '2026-10-16T15:59:40.062Z', 'Zoton'),
  (392, 'Syukrudin', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:40.313Z', '2026-10-16T15:59:40.313Z', 'Zoton'),
  (393, 'Rozzan izzaz ramadhani', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:40.577Z', '2026-10-16T15:59:40.577Z', 'Zoton'),
  (394, 'Sania Permatasari', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2022', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2022)', '2026-10-16T15:59:40.821Z', '2026-10-16T15:59:40.821Z', 'Zoton'),
  (395, 'Shifa Ayumi', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:41.071Z', '2026-10-16T15:59:41.071Z', 'Zoton'),
  (396, 'Shindy Aqryani', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:41.318Z', '2026-10-16T15:59:41.318Z', 'Zoton'),
  (397, 'Siti Kastria Ahmad', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:41.563Z', '2026-10-16T15:59:41.563Z', 'Zoton'),
  (398, 'Syahdan abdurrofi', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2023)', '2026-10-16T15:59:41.875Z', '2026-10-16T15:59:41.875Z', 'Zoton'),
  (399, 'Syahrul Adriansyah', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:42.121Z', '2026-10-16T15:59:42.121Z', 'Zoton'),
  (400, 'Winky Gunsan Subarkah', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:42.367Z', '2026-10-16T15:59:42.367Z', 'Zoton');
INSERT INTO "public"."cadres" ("id", "full_name", "nickname", "gender", "university", "faculty", "study_program", "nim", "batch_year", "cadre_status", "phone_private", "email_private", "address_private", "photo_id", "is_public", "notes_private", "updated_at", "created_at", "training_batch") VALUES
  (401, 'Yolanda Fatikha Mi''raj', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:42.609Z', '2026-10-16T15:59:42.609Z', 'Zoton'),
  (402, 'Yosmia', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:42.868Z', '2026-10-16T15:59:42.868Z', 'Zoton'),
  (403, 'Yuni Susanti', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:43.120Z', '2026-10-16T15:59:43.120Z', 'Zoton'),
  (404, 'Zainab Nurmutmainah', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:43.366Z', '2026-10-16T15:59:43.366Z', 'Zoton'),
  (405, 'Ziyadul Quwwah Ahmad Yasin', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:43.620Z', '2026-10-16T15:59:43.620Z', 'Zoton'),
  (406, 'Zulfah maulida rahmah', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:43.865Z', '2026-10-16T15:59:43.865Z', 'Zoton'),
  (407, 'Arya Fauzan', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:44.115Z', '2026-10-16T15:59:44.115Z', 'Zoton'),
  (408, 'Putri Suci', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:44.370Z', '2026-10-16T15:59:44.370Z', 'Zoton'),
  (409, 'Salma Rahmah', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:44.615Z', '2026-10-16T15:59:44.615Z', 'Zoton'),
  (410, 'Maulana Ridwan', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:44.863Z', '2026-10-16T15:59:44.863Z', 'Zoton'),
  (411, 'Ilmi Fauziyah', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:45.109Z', '2026-10-16T15:59:45.109Z', 'Zoton'),
  (412, 'M. Ridan', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:45.492Z', '2026-10-16T15:59:45.492Z', 'Zoton'),
  (413, 'Doni Saputra', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:45.743Z', '2026-10-16T15:59:45.743Z', 'Zoton'),
  (414, 'Fahrul Rizal', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:45.988Z', '2026-10-16T15:59:45.988Z', 'Zoton'),
  (415, 'Ahsani Taqwim', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:46.233Z', '2026-10-16T15:59:46.233Z', 'Zoton'),
  (416, 'Annisa Nurhaliza', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:46.478Z', '2026-10-16T15:59:46.478Z', 'Zoton'),
  (417, 'Pipit Fatmawati', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:46.725Z', '2026-10-16T15:59:46.725Z', 'Zoton'),
  (418, 'Rahma Aqil', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2024)', '2026-10-16T15:59:46.970Z', '2026-10-16T15:59:46.970Z', 'Zoton'),
  (419, 'Najwa Khoerussyifa', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2023)', '2026-10-16T15:59:47.215Z', '2026-10-16T15:59:47.215Z', 'Zoton'),
  (420, 'Faisal Arifin', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2023)', '2026-10-16T15:59:47.460Z', '2026-10-16T15:59:47.460Z', 'Zoton'),
  (421, 'Sopia Eka', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2023)', '2026-10-16T15:59:47.706Z', '2026-10-16T15:59:47.706Z', 'Zoton'),
  (422, 'Rifatul aliyah', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2023)', '2026-10-16T15:59:47.952Z', '2026-10-16T15:59:47.952Z', 'Zoton'),
  (423, 'Anshel Aymar', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2023)', '2026-10-16T15:59:48.198Z', '2026-10-16T15:59:48.198Z', 'Zoton'),
  (424, 'Jadwa Najib', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2023)', '2026-10-16T15:59:48.443Z', '2026-10-16T15:59:48.443Z', 'Zoton'),
  (425, 'Rahma Aulia', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2023)', '2026-10-16T15:59:48.688Z', '2026-10-16T15:59:48.688Z', 'Zoton'),
  (426, 'Tia Maharani', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2023)', '2026-10-16T15:59:48.997Z', '2026-10-16T15:59:48.997Z', 'Zoton'),
  (427, 'Naylah Nur Sopa', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2023)', '2026-10-16T15:59:49.244Z', '2026-10-16T15:59:49.244Z', 'Zoton'),
  (428, 'Karina Kania', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Zoton (2023)', '2026-10-16T15:59:49.490Z', '2026-10-16T15:59:49.490Z', 'Zoton'),
  (429, 'Amalia Yulianti', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Otekan (2024)', '2026-10-16T15:59:49.736Z', '2026-10-16T15:59:49.736Z', 'Otekan'),
  (430, 'Abhinaya Al Rabbai', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Otekan (2024)', '2026-10-16T15:59:49.982Z', '2026-10-16T15:59:49.982Z', 'Otekan'),
  (431, 'Ahmad Haifa Mushaffa', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Otekan (2024)', '2026-10-16T15:59:50.227Z', '2026-10-16T15:59:50.227Z', 'Otekan'),
  (432, 'Annisa Nur Syalwa', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Otekan (2024)', '2026-10-16T15:59:50.502Z', '2026-10-16T15:59:50.502Z', 'Otekan'),
  (433, 'Ariq Musyaffa', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Otekan (2024)', '2026-10-16T15:59:50.863Z', '2026-10-16T15:59:50.863Z', 'Otekan'),
  (434, 'Aulia Rahmah', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Otekan (2024)', '2026-10-16T15:59:51.107Z', '2026-10-16T15:59:51.107Z', 'Otekan'),
  (435, 'Bagas Anugrah', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Otekan (2024)', '2026-10-16T15:59:51.384Z', '2026-10-16T15:59:51.384Z', 'Otekan'),
  (436, 'Baidhowi Al Huseini Hakiki', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Otekan (2024)', '2026-10-16T15:59:51.645Z', '2026-10-16T15:59:51.645Z', 'Otekan'),
  (437, 'Chiko fauzan abhipraya', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Otekan (2024)', '2026-10-16T15:59:51.893Z', '2026-10-16T15:59:51.893Z', 'Otekan'),
  (438, 'Dicki Ramadan', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Otekan (2024)', '2026-10-16T15:59:52.141Z', '2026-10-16T15:59:52.141Z', 'Otekan'),
  (439, 'Diki Aminuloh', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Otekan (2024)', '2026-10-16T15:59:52.390Z', '2026-10-16T15:59:52.390Z', 'Otekan'),
  (440, 'Fadli Ramdhani', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Otekan (2024)', '2026-10-16T15:59:52.638Z', '2026-10-16T15:59:52.638Z', 'Otekan'),
  (441, 'Galih Saefurrohman', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Elektro', NULL, '2021', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Otekan (2021)', '2026-10-16T15:59:52.905Z', '2026-10-16T15:59:52.905Z', 'Otekan'),
  (442, 'Isma Sabrina', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Otekan (2024)', '2026-10-16T15:59:53.173Z', '2026-10-16T15:59:53.173Z', 'Otekan'),
  (443, 'Muhammad Shalih Fauzan', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Otekan (2024)', '2026-10-16T15:59:53.423Z', '2026-10-16T15:59:53.423Z', 'Otekan'),
  (444, 'Muhammad Yasir Royyan', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Otekan (2024)', '2026-10-16T15:59:53.667Z', '2026-10-16T15:59:53.667Z', 'Otekan'),
  (445, 'Nabila Fransiska', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Agroteknologi', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Otekan (2024)', '2026-10-16T15:59:53.910Z', '2026-10-16T15:59:53.910Z', 'Otekan'),
  (446, 'Nabila Ogawa', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Otekan (2024)', '2026-10-16T15:59:54.178Z', '2026-10-16T15:59:54.178Z', 'Otekan'),
  (447, 'Najwa diyana syakir', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Otekan (2024)', '2026-10-16T15:59:54.424Z', '2026-10-16T15:59:54.424Z', 'Otekan'),
  (448, 'Rita Sri Astuti', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Otekan (2024)', '2026-10-16T15:59:54.670Z', '2026-10-16T15:59:54.670Z', 'Otekan'),
  (449, 'Tessa Rahayu', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Otekan (2023)', '2026-10-16T15:59:54.922Z', '2026-10-16T15:59:54.922Z', 'Otekan'),
  (450, 'Zahrani Rahma Aulia', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Otekan (2024)', '2026-10-16T15:59:55.175Z', '2026-10-16T15:59:55.175Z', 'Otekan');
INSERT INTO "public"."cadres" ("id", "full_name", "nickname", "gender", "university", "faculty", "study_program", "nim", "batch_year", "cadre_status", "phone_private", "email_private", "address_private", "photo_id", "is_public", "notes_private", "updated_at", "created_at", "training_batch") VALUES
  (451, 'Annisa Silmi', NULL, 'Perempuan', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2022', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Otekan (2022)', '2026-10-16T15:59:55.434Z', '2026-10-16T15:59:55.434Z', 'Otekan'),
  (452, 'Haipa Ahmad Musyaffa', NULL, 'Laki-laki', 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2023', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Otekan (2023)', '2026-10-16T15:59:55.690Z', '2026-10-16T15:59:55.690Z', 'Otekan'),
  (453, 'Agna Lutfa Muchtariz', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan INCHATER (2024)', '2026-10-16T15:59:55.944Z', '2026-10-16T15:59:55.944Z', 'INCHATER'),
  (454, 'Fikri Ahmad Ramdani', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan INCHATER (2024)', '2026-10-16T15:59:56.361Z', '2026-10-16T15:59:56.361Z', 'INCHATER'),
  (455, 'Himawan Rusdiyana Kusnadi', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan INCHATER (2024)', '2026-10-16T15:59:56.610Z', '2026-10-16T15:59:56.610Z', 'INCHATER'),
  (456, 'Ilham Fathurrahman', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan INCHATER (2024)', '2026-10-16T15:59:56.929Z', '2026-10-16T15:59:56.929Z', 'INCHATER'),
  (457, 'M Badru Tamam', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan INCHATER (2024)', '2026-10-16T15:59:57.173Z', '2026-10-16T15:59:57.173Z', 'INCHATER'),
  (458, 'M Caesar Rayvha Ui Haque', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan INCHATER (2024)', '2026-10-16T15:59:57.419Z', '2026-10-16T15:59:57.419Z', 'INCHATER'),
  (459, 'M Dzikri Alhamdi', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan INCHATER (2024)', '2026-10-16T15:59:57.664Z', '2026-10-16T15:59:57.664Z', 'INCHATER'),
  (460, 'Muhammad Akhsan Mufid As Syadzalis', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan INCHATER (2024)', '2026-10-16T15:59:57.911Z', '2026-10-16T15:59:57.911Z', 'INCHATER'),
  (461, 'Muhammad Ali Khadim', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan INCHATER (2024)', '2026-10-16T15:59:58.159Z', '2026-10-16T15:59:58.159Z', 'INCHATER'),
  (462, 'Muhammad Farel Ramdhani Galand', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan INCHATER (2024)', '2026-10-16T15:59:58.402Z', '2026-10-16T15:59:58.402Z', 'INCHATER'),
  (463, 'Muhammad Irdan', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan INCHATER (2024)', '2026-10-16T15:59:58.654Z', '2026-10-16T15:59:58.654Z', 'INCHATER'),
  (464, 'Muhammad Ridhan Fairuszy', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan INCHATER (2024)', '2026-10-16T15:59:58.900Z', '2026-10-16T15:59:58.900Z', 'INCHATER'),
  (465, 'Nabila Safawani', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan INCHATER (2024)', '2026-10-16T15:59:59.362Z', '2026-10-16T15:59:59.362Z', 'INCHATER'),
  (466, 'Nalla Nitya Nathania', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan INCHATER (2024)', '2026-10-16T15:59:59.609Z', '2026-10-16T15:59:59.609Z', 'INCHATER'),
  (467, 'Nazwa Haqyra Harahap', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan INCHATER (2024)', '2026-10-16T15:59:59.853Z', '2026-10-16T15:59:59.853Z', 'INCHATER'),
  (468, 'Niswah Nayla Tsurayya', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan INCHATER (2024)', '2026-10-16T16:00:00.099Z', '2026-10-16T16:00:00.099Z', 'INCHATER'),
  (469, 'Nur Fadhillah Khairunnisa', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan INCHATER (2024)', '2026-10-16T16:00:00.348Z', '2026-10-16T16:00:00.348Z', 'INCHATER'),
  (470, 'Rahmawati Nauli', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan INCHATER (2024)', '2026-10-16T16:00:00.592Z', '2026-10-16T16:00:00.592Z', 'INCHATER'),
  (471, 'Raihan Fadhila', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan INCHATER (2024)', '2026-10-16T16:00:00.836Z', '2026-10-16T16:00:00.836Z', 'INCHATER'),
  (472, 'Rasyad Ali Ridlo', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan INCHATER (2024)', '2026-10-16T16:00:01.081Z', '2026-10-16T16:00:01.081Z', 'INCHATER'),
  (473, 'Rifa Rusida Sabila', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan INCHATER (2024)', '2026-10-16T16:00:01.377Z', '2026-10-16T16:00:01.377Z', 'INCHATER'),
  (474, 'Shalsa Febry Hasanah', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan INCHATER (2024)', '2026-10-16T16:00:01.780Z', '2026-10-16T16:00:01.780Z', 'INCHATER'),
  (475, 'Tiara Suci Clarissa', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan INCHATER (2024)', '2026-10-16T16:00:02.027Z', '2026-10-16T16:00:02.027Z', 'INCHATER'),
  (476, 'Wildan Ahmad Fauzan', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan INCHATER (2024)', '2026-10-16T16:00:02.280Z', '2026-10-16T16:00:02.280Z', 'INCHATER'),
  (477, 'Syakira Ardellia', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan INCHATER (2024)', '2026-10-16T16:00:02.525Z', '2026-10-16T16:00:02.525Z', 'INCHATER'),
  (478, 'Fahry Rizki', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan INCHATER (2024)', '2026-10-16T16:00:02.771Z', '2026-10-16T16:00:02.771Z', 'INCHATER'),
  (479, 'M. Irsyad', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2024', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan INCHATER (2024)', '2026-10-16T16:00:03.014Z', '2026-10-16T16:00:03.014Z', 'INCHATER'),
  (480, 'Ade Lukmanul Hakim', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Syariah dan Hukum', 'Hukum Keluarga', NULL, '2025', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Aksara Bhakti (2025)', '2026-10-16T16:00:03.272Z', '2026-10-16T16:00:03.272Z', 'Aksara Bhakti'),
  (481, 'Adni Maulana Abdul Syukur', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Matematika', NULL, '2025', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Aksara Bhakti (2025)', '2026-10-16T16:00:03.527Z', '2026-10-16T16:00:03.527Z', 'Aksara Bhakti'),
  (482, 'Ahmad Munawar Fauzi', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2025', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Aksara Bhakti (2025)', '2026-10-16T16:00:03.782Z', '2026-10-16T16:00:03.782Z', 'Aksara Bhakti'),
  (483, 'Akhyar Thohiruddin', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Matematika', NULL, '2025', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Aksara Bhakti (2025)', '2026-10-16T16:00:04.029Z', '2026-10-16T16:00:04.029Z', 'Aksara Bhakti'),
  (484, 'Ali Asghar Kamil', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2025', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Aksara Bhakti (2025)', '2026-10-16T16:00:04.272Z', '2026-10-16T16:00:04.272Z', 'Aksara Bhakti'),
  (485, 'M Farhan Rabbani', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2025', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Aksara Bhakti (2025)', '2026-10-16T16:00:04.515Z', '2026-10-16T16:00:04.515Z', 'Aksara Bhakti'),
  (486, 'Asmi Salma', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Tarbiyah dan Keguruan', 'Tadris Bahasa Indonesia', NULL, '2025', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Aksara Bhakti (2025)', '2026-10-16T16:00:04.915Z', '2026-10-16T16:00:04.915Z', 'Aksara Bhakti'),
  (487, 'Azis Panji Gumilang', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2025', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Aksara Bhakti (2025)', '2026-10-16T16:00:05.160Z', '2026-10-16T16:00:05.160Z', 'Aksara Bhakti'),
  (488, 'Bagas Anugrah', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Kimia', NULL, '2025', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Aksara Bhakti (2025)', '2026-10-16T16:00:05.481Z', '2026-10-16T16:00:05.481Z', 'Aksara Bhakti'),
  (489, 'Fawwaz ihsannulloh', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2025', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Aksara Bhakti (2025)', '2026-10-16T16:00:05.731Z', '2026-10-16T16:00:05.731Z', 'Aksara Bhakti'),
  (490, 'Hasya Dafin Muaffi Mulya Sugandi', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2025', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Aksara Bhakti (2025)', '2026-10-16T16:00:05.978Z', '2026-10-16T16:00:05.978Z', 'Aksara Bhakti'),
  (491, 'Ilham Raz Rayyan', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Fisika', NULL, '2025', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Aksara Bhakti (2025)', '2026-10-16T16:00:06.226Z', '2026-10-16T16:00:06.226Z', 'Aksara Bhakti'),
  (492, 'Kemal Muhammad Zaki', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2025', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Aksara Bhakti (2025)', '2026-10-16T16:00:06.473Z', '2026-10-16T16:00:06.473Z', 'Aksara Bhakti'),
  (493, 'Lungguh Naadir Kautsar', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Matematika', NULL, '2025', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Aksara Bhakti (2025)', '2026-10-16T16:00:06.756Z', '2026-10-16T16:00:06.756Z', 'Aksara Bhakti'),
  (494, 'Mochamad Hafiiz Maulana', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Pendidikan Agama Islam', NULL, '2025', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Aksara Bhakti (2025)', '2026-10-16T16:00:07.373Z', '2026-10-16T16:00:07.373Z', 'Aksara Bhakti'),
  (495, 'Mochamad Rifky Madani Mulyana', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2025', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Aksara Bhakti (2025)', '2026-10-16T16:00:07.988Z', '2026-10-16T16:00:07.988Z', 'Aksara Bhakti'),
  (496, 'Muhamad Bilal Habiburrahman', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2025', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Aksara Bhakti (2025)', '2026-10-16T16:00:08.754Z', '2026-10-16T16:00:08.754Z', 'Aksara Bhakti'),
  (497, 'Muhamad Isfahani Fadhil Rahman', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Hukum Tata Negara', NULL, '2025', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Aksara Bhakti (2025)', '2026-10-16T16:00:09.076Z', '2026-10-16T16:00:09.076Z', 'Aksara Bhakti'),
  (498, 'Muhammad halif Zaidhan', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Fisika', NULL, '2025', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Aksara Bhakti (2025)', '2026-10-16T16:00:09.440Z', '2026-10-16T16:00:09.440Z', 'Aksara Bhakti'),
  (499, 'Muhammad Rifqi Fauzan T', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2025', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Aksara Bhakti (2025)', '2026-10-16T16:00:09.696Z', '2026-10-16T16:00:09.696Z', 'Aksara Bhakti'),
  (500, 'Muhammad Rifqi Ramdhani', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Matematika', NULL, '2025', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Aksara Bhakti (2025)', '2026-10-16T16:00:09.945Z', '2026-10-16T16:00:09.945Z', 'Aksara Bhakti');
INSERT INTO "public"."cadres" ("id", "full_name", "nickname", "gender", "university", "faculty", "study_program", "nim", "batch_year", "cadre_status", "phone_private", "email_private", "address_private", "photo_id", "is_public", "notes_private", "updated_at", "created_at", "training_batch") VALUES
  (501, 'Naufal Luthfi Fakhruddin', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2025', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Aksara Bhakti (2025)', '2026-10-16T16:00:10.191Z', '2026-10-16T16:00:10.191Z', 'Aksara Bhakti'),
  (502, 'Naufal Syafiq Nurramdan Supriadi', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2025', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Aksara Bhakti (2025)', '2026-10-16T16:00:10.450Z', '2026-10-16T16:00:10.450Z', 'Aksara Bhakti'),
  (503, 'Rasya Restu Mahesya', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2025', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Aksara Bhakti (2025)', '2026-10-16T16:00:10.718Z', '2026-10-16T16:00:10.718Z', 'Aksara Bhakti'),
  (504, 'Rizkia Nuari Fujiana', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2025', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Aksara Bhakti (2025)', '2026-10-16T16:00:10.993Z', '2026-10-16T16:00:10.993Z', 'Aksara Bhakti'),
  (505, 'Salsabila Ramadani', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2025', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Aksara Bhakti (2025)', '2026-10-16T16:00:11.279Z', '2026-10-16T16:00:11.279Z', 'Aksara Bhakti'),
  (506, 'Zeva Cannavaro Alfaruq', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Fisika', NULL, '2025', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Aksara Bhakti (2025)', '2026-10-16T16:00:12.353Z', '2026-10-16T16:00:12.353Z', 'Aksara Bhakti'),
  (507, 'Syamil Muttaqin Farid', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Teknik Informatika', NULL, '2025', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Aksara Bhakti (2025)', '2026-10-16T16:00:14.258Z', '2026-10-16T16:00:14.258Z', 'Aksara Bhakti'),
  (508, 'Hesti Sri Wahyuni', NULL, NULL, 'UIN Sunan Gunung Djati Bandung', 'Fakultas Sains dan Teknologi', 'Biologi', NULL, '2025', 'LK-I', NULL, NULL, NULL, NULL, TRUE, 'Kader LK-1 Angkatan Aksara Bhakti (2025)', '2026-10-16T16:00:14.599Z', '2026-10-16T16:00:14.599Z', 'Aksara Bhakti');

-- Data for "public"."contact_messages" (0 rows)

-- Data for "public"."documents" (0 rows)

-- Data for "public"."events" (5 rows)
INSERT INTO "public"."events" ("id", "title", "slug", "excerpt", "description", "date", "start_time", "end_time", "location", "cover_image_id", "status", "registration_link", "is_published", "featured", "seo_title", "seo_description", "updated_at", "created_at") VALUES
  (1, 'Latihan Kader I Gelombang Saintek', 'latihan-kader-i-gelombang-saintek', 'Basic Training LK-I untuk calon kader HMI Komisariat Sains dan Teknologi.', NULL, '2026-06-27T17:00:00.000Z', '08.00 WIB', '17.00 WIB', 'Kampus UIN Sunan Gunung Djati Bandung', NULL, 'upcoming', 'https://pendaftaran-lk1-saintek.vercel.app/', TRUE, FALSE, NULL, NULL, '2026-10-16T14:59:50.598Z', '2026-10-16T14:59:50.597Z'),
  (2, 'Kajian Konstitusi HMI', 'kajian-konstitusi-hmi', 'Kajian rutin untuk membaca Nilai Dasar Perjuangan dan pedoman organisasi.', NULL, '2026-06-27T17:00:00.000Z', '19.30 WIB', '21.30 WIB', 'Sekretariat Komisariat', NULL, 'upcoming', NULL, TRUE, FALSE, NULL, NULL, '2026-10-16T14:59:52.095Z', '2026-10-16T14:59:52.095Z'),
  (3, 'Kelas Media dan Publikasi Kader', 'kelas-media-dan-publikasi-kader', 'Pelatihan penulisan berita, dokumentasi, dan desain publikasi organisasi.', NULL, '2026-06-27T17:00:00.000Z', '16.00 WIB', '18.00 WIB', 'Ruang Diskusi Saintek', NULL, 'ongoing', NULL, TRUE, FALSE, NULL, NULL, '2026-10-16T14:59:53.786Z', '2026-10-16T14:59:53.786Z'),
  (4, 'Bakti Sosial dan Literasi Digital', 'bakti-sosial-literasi-digital', 'Pengabdian kader melalui edukasi literasi digital dan pendampingan masyarakat.', NULL, '2026-06-27T17:00:00.000Z', '09.00 WIB', '14.00 WIB', 'Kabupaten Bandung', NULL, 'done', NULL, TRUE, FALSE, NULL, NULL, '2026-10-16T14:59:55.575Z', '2026-10-16T14:59:55.575Z'),
  (5, 'Sekolah Administrasi Komisariat', 'sekolah-administrasi-komisariat', 'Kelas teknis pengarsipan surat, notulensi, database kader, dan tata kelola dokumen.', NULL, '2026-06-27T17:00:00.000Z', '13.00 WIB', '16.00 WIB', 'Sekretariat Komisariat', NULL, 'upcoming', NULL, TRUE, FALSE, NULL, NULL, '2026-10-16T14:59:57.073Z', '2026-10-16T14:59:57.073Z');

-- Data for "public"."events_rels" (0 rows)

-- Data for "public"."former_chairpersons" (10 rows)
INSERT INTO "public"."former_chairpersons" ("id", "name", "photo_id", "period", "quote", "description", "order", "updated_at", "created_at") VALUES
  (1, 'Ahmad Fauzi', NULL, '2016-2017', 'Kaderisasi adalah napas panjang organisasi.', 'Menguatkan tradisi follow up dan forum diskusi dasar.', '1', '2026-10-16T15:01:12.273Z', '2026-10-16T15:01:12.273Z'),
  (2, 'Rina Marlina', NULL, '2017-2018', 'Administrasi rapi membuat perjuangan mudah diwariskan.', 'Memulai pengarsipan surat dan dokumen komisariat secara lebih tertata.', '2', '2026-10-16T15:01:13.801Z', '2026-10-16T15:01:13.801Z'),
  (3, 'Dede Firmansyah', NULL, '2018-2019', 'Ilmu harus turun menjadi pengabdian.', 'Mengembangkan program pengabdian masyarakat lintas prodi.', '3', '2026-10-16T15:01:15.308Z', '2026-10-16T15:01:15.308Z'),
  (4, 'Nur Aulia', NULL, '2019-2020', 'Kampus adalah ruang belajar keberpihakan.', 'Memperkuat kanal advokasi dan kajian isu kemahasiswaan.', '4', '2026-10-16T15:01:16.830Z', '2026-10-16T15:01:16.830Z'),
  (5, 'Reza Ramadhan', NULL, '2020-2021', 'Digitalisasi adalah alat, nilai tetap kompas.', 'Mendorong adaptasi kegiatan organisasi pada masa pembelajaran daring.', '5', '2026-10-16T15:01:18.340Z', '2026-10-16T15:01:18.340Z'),
  (6, 'Fitri Handayani', NULL, '2021-2022', 'HMI tumbuh dari kader yang tekun belajar.', 'Membuka kelas literasi dan penulisan kader.', '6', '2026-10-16T15:01:19.903Z', '2026-10-16T15:01:19.903Z'),
  (7, 'Gilang Prakoso', NULL, '2022-2023', 'Periode boleh selesai, pengabdian tetap berjalan.', 'Menghubungkan jejaring alumni dengan pengurus aktif.', '7', '2026-10-16T15:01:21.682Z', '2026-10-16T15:01:21.682Z'),
  (8, 'Siti Khadijah', NULL, '2023-2024', 'Bahagia HMI, berjayalah Indonesia.', 'Memperkuat kaderisasi kolaboratif dengan komisariat lain.', '8', '2026-10-16T15:01:23.337Z', '2026-10-16T15:01:23.337Z'),
  (9, 'Iqbal Maulana', NULL, '2024-2025', 'Data kader adalah amanah yang harus dijaga.', 'Memulai inisiatif database kader dan sistem pendaftaran digital.', '9', '2026-10-16T15:01:25.538Z', '2026-10-16T15:01:25.538Z'),
  (10, 'Aisyah Nurhaliza', NULL, '2025-2026', 'Bergerak dari tradisi, berinovasi untuk peradaban.', 'Mengembangkan Rumah Digital HMI Saintek sebagai pusat informasi dan layanan.', '10', '2026-10-16T15:01:28.057Z', '2026-10-16T15:01:28.057Z');

-- Data for "public"."gallery" (2 rows)
INSERT INTO "public"."gallery" ("id", "title", "description", "category", "image_id", "video_url", "date", "is_published", "updated_at", "created_at") VALUES
  (13, 'Apresiasi Kader Sekolah Instruktur', NULL, 'Dokumentasi Kegiatan', 3, NULL, NULL, TRUE, '2026-10-16T16:16:26.754Z', '2026-10-16T16:16:26.754Z'),
  (14, 'Di Atas Daun Pisang, Keluarga Dirawat', 'Ngaliwet bukan sekadar tradisi makan bersama, melainkan ruang sederhana untuk merawat solidaritas, membangun kesadaran kolektif, dan mempererat hubungan antarkader.

Di tengah hidangan yang dibagi, terdapat percakapan yang menghubungkan gagasan, perbedaan yang membuka ruang pemikiran, serta kebersamaan yang menumbuhkan rasa tanggung jawab. Sebab, kaderisasi tidak hanya tumbuh melalui forum formal dan diskusi intelektual, tetapi juga melalui interaksi yang mengajarkan arti saling mendengar, menghargai, dan bergerak bersama.

Dari kebersamaan, Keluarga dirawat. Dari dialog, pemikiran dipertajam. Dan dari solidaritas, langkah perubahan menemukan pijakannya.', 'Kegiatan HMI', 5, NULL, '2026-10-18T12:00:00.000Z', TRUE, '2026-10-21T03:56:57.966Z', '2026-10-21T03:30:10.332Z');

-- Data for "public"."lk1_registrations" (0 rows)

-- Data for "public"."lk1_registrations_interest_fields" (0 rows)

-- Data for "public"."media" (7 rows)
INSERT INTO "public"."media" ("id", "alt", "caption", "updated_at", "created_at", "url", "thumbnail_u_r_l", "filename", "mime_type", "filesize", "width", "height", "focal_x", "focal_y") VALUES
  (1, 'Hazmi', NULL, '2026-10-16T15:09:22.069Z', '2026-10-16T15:09:22.069Z', '/api/media/file/hazmi.png', NULL, 'hazmi.png', 'image/png', '1260579', '1080', '1350', '50', '50'),
  (2, 'Satria', NULL, '2026-10-16T15:53:47.194Z', '2026-10-16T15:53:47.194Z', '/api/media/file/WhatsApp%20Image%202026-10-16%20at%2022.50.53.jpeg', NULL, 'WhatsApp Image 2026-10-16 at 22.50.53.jpeg', 'image/jpeg', '669268', '1755', '2340', '50', '50'),
  (3, 'ApresiasiKader', NULL, '2026-10-16T16:16:21.326Z', '2026-10-16T16:16:21.326Z', '/api/media/file/Akhirnya%20Wisuda!!!%20(6).png', NULL, 'Akhirnya Wisuda!!! (6).png', 'image/png', '1500120', '1080', '1350', '50', '50'),
  (4, 'Ngaliwet', NULL, '2026-10-21T03:54:05.209Z', '2026-10-21T03:30:01.446Z', '/api/media/file/ngaliwet.jpeg', NULL, 'ngaliwet.jpeg', 'image/jpeg', '233966', '1600', '1200', '50', '50'),
  (5, 'NgaliwetDay', NULL, '2026-10-21T03:56:53.807Z', '2026-10-21T03:56:53.806Z', '/api/media/file/ngaliwet-1.jpeg', NULL, 'ngaliwet-1.jpeg', 'image/jpeg', '233966', '1600', '1200', '50', '50'),
  (6, 'hilmanmaulana', NULL, '2026-10-21T04:03:25.969Z', '2026-10-21T04:03:25.969Z', '/api/media/file/121221.png', NULL, '121221.png', 'image/png', '301415', '655', '782', '50', '50'),
  (7, 'header1', NULL, '2026-10-21T04:05:48.197Z', '2026-10-21T04:05:48.195Z', '/api/media/file/photo-1517048676732-d65bc937f952.avif', NULL, 'photo-1517048676732-d65bc937f952.avif', 'image/avif', '32336', '1170', '780', '50', '50');

-- Data for "public"."navigation_items" (0 rows)

-- Data for "public"."news" (6 rows)
INSERT INTO "public"."news" ("id", "title", "slug", "excerpt", "content", "cover_image_id", "category", "author_id", "published_at", "status", "featured", "seo_title", "seo_description", "updated_at", "created_at") VALUES
  (1, 'Saintek Menggelar Diskusi Kaderisasi Berbasis Riset', 'diskusi-kaderisasi-berbasis-riset', 'Forum mingguan kader membahas cara memperkuat tradisi intelektual, riset kampus, dan pengabdian sosial berbasis keilmuan.', '{"root":{"type":"root","format":"","indent":0,"version":1,"children":[{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"text":"HMI Komisariat Sains dan Teknologi menggelar diskusi kaderisasi berbasis riset sebagai ruang latihan membaca persoalan kampus secara lebih metodis.","type":"text","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"text":"Forum ini menekankan pentingnya kader HMI untuk tidak berhenti pada slogan. Setiap gagasan perlu diuji melalui data, bacaan, dan pengalaman sosial yang dekat dengan kehidupan mahasiswa.","type":"text","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"text":"Pengurus berharap agenda rutin ini menjadi pintu masuk untuk membangun budaya menulis, berdiskusi, dan mengabdi secara lebih tertata.","type":"text","version":1}],"direction":"ltr"}],"direction":"ltr"}}'::jsonb, NULL, 'Kaderisasi', NULL, '2026-10-16T14:59:40.768Z', 'published', FALSE, NULL, NULL, '2026-10-16T14:59:41.025Z', '2026-10-16T14:59:41.024Z'),
  (2, 'Rapat Kerja Komisariat Menetapkan Agenda Satu Periode', 'rapat-kerja-komisariat', 'Pengurus merumuskan prioritas program kaderisasi, advokasi, media, dan tata kelola administrasi komisariat.', '{"root":{"type":"root","format":"","indent":0,"version":1,"children":[{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"text":"Rapat kerja komisariat menjadi forum konsolidasi awal untuk menyusun arah gerak pengurus selama satu periode.","type":"text","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"text":"Agenda yang dibahas meliputi penguatan database kader, pendaftaran LK-I online, pengarsipan dokumen, kanal advokasi, dan peningkatan kualitas publikasi digital.","type":"text","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"text":"Setiap bidang diarahkan untuk bekerja dengan target yang terukur tanpa meninggalkan nilai dasar perkaderan HMI.","type":"text","version":1}],"direction":"ltr"}],"direction":"ltr"}}'::jsonb, NULL, 'Organisasi', NULL, '2026-10-16T14:59:42.296Z', 'published', FALSE, NULL, NULL, '2026-10-16T14:59:42.545Z', '2026-10-16T14:59:42.544Z'),
  (3, 'Pengurus Membuka Kanal Aspirasi Mahasiswa Saintek', 'kanal-aspirasi-mahasiswa-saintek', 'Layanan advokasi disiapkan untuk menghimpun aspirasi akademik, fasilitas kampus, dan isu kemahasiswaan.', '{"root":{"type":"root","format":"","indent":0,"version":1,"children":[{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"text":"Bidang PTKP membuka kanal aspirasi mahasiswa sebagai komitmen pengurus untuk mendengar isu akademik, fasilitas, administrasi, dan ruang belajar mahasiswa.","type":"text","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"text":"Laporan yang masuk akan dipilah berdasarkan urgensi dan ditindaklanjuti melalui komunikasi kelembagaan yang sesuai.","type":"text","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"text":"Identitas pelapor dapat dijaga rahasia agar mahasiswa merasa aman menyampaikan aspirasi secara bertanggung jawab.","type":"text","version":1}],"direction":"ltr"}],"direction":"ltr"}}'::jsonb, NULL, 'PTKP', NULL, '2026-10-16T14:59:43.796Z', 'published', FALSE, NULL, NULL, '2026-10-16T14:59:44.046Z', '2026-10-16T14:59:44.046Z'),
  (4, 'Kelas Media Melatih Kader Mengelola Publikasi Organisasi', 'kelas-media-publikasi-organisasi', 'Kader belajar menulis rilis, mengelola dokumentasi kegiatan, dan menjaga bahasa publik organisasi agar tetap rapi.', '{"root":{"type":"root","format":"","indent":0,"version":1,"children":[{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"text":"Kelas media diselenggarakan untuk memperkuat kemampuan kader dalam menulis, mendokumentasikan kegiatan, dan mengelola kanal digital komisariat.","type":"text","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"text":"Materi pelatihan mencakup dasar penulisan berita, pengarsipan foto, desain publikasi, dan etika komunikasi organisasi.","type":"text","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"text":"Kegiatan ini menjadi bagian dari ikhtiar transformasi digital agar kerja-kerja komisariat terdokumentasi dengan baik.","type":"text","version":1}],"direction":"ltr"}],"direction":"ltr"}}'::jsonb, NULL, 'Media', NULL, '2026-10-16T14:59:45.516Z', 'published', FALSE, NULL, NULL, '2026-10-16T14:59:45.802Z', '2026-10-16T14:59:45.802Z'),
  (5, 'Kajian Konstitusi Menguatkan Pemahaman Dasar Organisasi', 'kajian-konstitusi-hmi', 'Kajian konstitusi mengajak kader memahami nilai, struktur, dan pedoman organisasi sebagai fondasi bergerak.', '{"root":{"type":"root","format":"","indent":0,"version":1,"children":[{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"text":"Kajian konstitusi menjadi ruang pembacaan ulang terhadap pedoman organisasi, tujuan HMI, dan tugas kader dalam kehidupan kampus.","type":"text","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"text":"Kader diajak memahami konstitusi bukan hanya sebagai dokumen formal, tetapi sebagai kompas etis dalam mengambil keputusan organisasi.","type":"text","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"text":"Forum ini akan dilanjutkan dengan diskusi tematik agar pemahaman konstitusi semakin dekat dengan praktik kepengurusan.","type":"text","version":1}],"direction":"ltr"}],"direction":"ltr"}}'::jsonb, NULL, 'Keilmuan', NULL, '2026-10-16T14:59:47.066Z', 'published', FALSE, NULL, NULL, '2026-10-16T14:59:47.313Z', '2026-10-16T14:59:47.313Z'),
  (6, 'Pengabdian Literasi Digital Dijalankan Bersama Warga', 'pengabdian-literasi-digital', 'Kader Saintek mengadakan pengabdian literasi digital sederhana untuk membantu warga mengenal keamanan data dasar.', '{"root":{"type":"root","format":"","indent":0,"version":1,"children":[{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"text":"Kader HMI Saintek melaksanakan pengabdian literasi digital bersama warga sebagai bentuk penerjemahan ilmu ke ruang sosial.","type":"text","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"text":"Materi yang dibawakan meliputi keamanan akun, penggunaan perangkat secara bijak, dan cara mengenali informasi palsu.","type":"text","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"text":"Program ini akan dikembangkan menjadi agenda berkala bersama komunitas lokal dan lembaga kampus.","type":"text","version":1}],"direction":"ltr"}],"direction":"ltr"}}'::jsonb, NULL, 'Pengabdian', NULL, '2026-10-16T14:59:48.565Z', 'published', FALSE, NULL, NULL, '2026-10-16T14:59:48.809Z', '2026-10-16T14:59:48.809Z');

-- Data for "public"."opinions" (2 rows)
INSERT INTO "public"."opinions" ("id", "title", "slug", "author_name", "author_photo_id", "author_prodi", "author_status", "excerpt", "content", "cover_image_id", "category", "published_at", "status", "updated_at", "created_at") VALUES
  (6, 'Administrasi Sebagai Etika Merawat Amanah', 'administrasi-sebagai-etika-merawat-amanah', 'Hana Maulida', NULL, 'Agroteknologi', 'Sekretaris', 'Administrasi yang rapi adalah cara sederhana organisasi menjaga ingatan dan tanggung jawab.', '{"root":{"type":"root","format":"","indent":0,"version":1,"children":[{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"text":"Administrasi sering dianggap pekerjaan teknis, padahal di dalamnya ada etika menjaga amanah organisasi.","type":"text","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"text":"Surat, notulensi, database, dan dokumen kegiatan adalah ingatan kolektif yang membantu pengurus berikutnya bergerak lebih baik.","type":"text","version":1}],"direction":"ltr"},{"type":"paragraph","format":"","indent":0,"version":1,"children":[{"text":"Digitalisasi administrasi menjadi penting agar arsip komisariat tidak hilang bersama pergantian periode.","type":"text","version":1}],"direction":"ltr"}],"direction":"ltr"}}'::jsonb, NULL, 'Organisasi', '2026-10-16T15:00:06.614Z', 'published', '2026-10-16T15:00:06.861Z', '2026-10-16T15:00:06.861Z'),
  (7, 'Kader HMI di Era Digital: Antara Literasi, Ideologi, dan Aksi Nyata', 'kader-hmi-di-era-digital-antara-literasi-ideologi-dan-aksi-nyata', 'Hilman Maulana', 6, 'Teknik Informatika', 'Kader HMI', 'Di tengah derasnya arus informasi dan perkembangan teknologi, kader HMI dituntut untuk tidak sekadar menjadi pengguna digital, tetapi juga menjadi insan akademis yang kritis, berintegritas, dan mampu menghadirkan solusi. Tantangannya bukan hanya menguasai teknologi, melainkan menjaga nilai, menguji kebenaran informasi, dan mengubah pengetahuan menjadi aksi nyata.', '{"root":{"type":"root","format":"","indent":0,"version":1,"children":[{"tag":"h2","type":"heading","format":"","indent":0,"version":1,"children":[{"mode":"normal","text":"Kader HMI di Era Digital: Antara Literasi, Ideologi, dan Aksi Nyata","type":"text","style":"","detail":0,"format":1,"version":1}],"direction":null},{"type":"paragraph","format":"justify","indent":1,"version":1,"children":[{"mode":"normal","text":"Kita hidup di zaman ketika informasi bergerak lebih cepat daripada kemampuan manusia untuk memahaminya. Setiap hari, media sosial dipenuhi berbagai opini, perdebatan, potongan informasi, hingga narasi yang membentuk cara masyarakat melihat realitas. Teknologi digital telah membuka ruang pengetahuan yang luas, tetapi pada saat yang sama menghadirkan tantangan baru: bagaimana membedakan fakta dari manipulasi, pemikiran dari sekadar opini, serta keberanian bersuara dari tindakan yang benar-benar membawa perubahan.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":null,"textStyle":"","textFormat":0},{"type":"paragraph","format":"justify","indent":1,"version":1,"children":[{"mode":"normal","text":"Bagi kader Himpunan Mahasiswa Islam (HMI), situasi ini bukan sekadar perubahan zaman yang harus diikuti. Ia merupakan ruang refleksi tentang bagaimana nilai-nilai keislaman, keilmuan, dan keindonesiaan tetap diaktualisasikan di tengah perkembangan teknologi.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":null,"textStyle":"","textFormat":0},{"type":"paragraph","format":"justify","indent":1,"version":1,"children":[{"mode":"normal","text":"Hari ini, menyampaikan pendapat dapat dilakukan hanya dengan beberapa ketukan layar. Isu sosial, ekonomi, pendidikan, dan politik dapat tersebar dalam hitungan detik. Namun, kemudahan menyampaikan pendapat tidak selalu diikuti oleh kedalaman pemahaman.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":null,"textStyle":"","textFormat":0},{"type":"paragraph","format":"justify","indent":1,"version":1,"children":[{"mode":"normal","text":"Kader yang kritis tidak seharusnya berhenti pada membagikan unggahan, mengikuti tren, atau terlibat dalam perdebatan tanpa dasar yang kuat. Sikap kritis membutuhkan proses: membaca, memeriksa sumber, memahami konteks, membandingkan perspektif, dan menyusun argumentasi berdasarkan pengetahuan.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":null,"textStyle":"","textFormat":0},{"type":"paragraph","format":"justify","indent":1,"version":1,"children":[{"mode":"normal","text":"Media sosial dapat menjadi ruang pendidikan publik, tetapi juga dapat berubah menjadi ruang reproduksi prasangka ketika digunakan tanpa tanggung jawab intelektual. Karena itu, kehadiran kader di ruang digital seharusnya tidak diukur semata-mata dari jumlah pengikut atau ramainya perdebatan, melainkan dari kualitas gagasan dan manfaat yang dihasilkan.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":null,"textStyle":"","textFormat":0},{"type":"paragraph","format":"justify","indent":0,"version":1,"children":[],"direction":null,"textStyle":"","textFormat":0},{"tag":"h2","type":"heading","format":"","indent":0,"version":1,"children":[{"mode":"normal","text":"Literasi Digital sebagai Tanggung Jawab Intelektual","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":null},{"type":"paragraph","format":"","indent":0,"version":1,"children":[],"direction":null,"textStyle":"","textFormat":0},{"type":"paragraph","format":"justify","indent":1,"version":1,"children":[{"mode":"normal","text":"Menjadi kader di era digital berarti memiliki tanggung jawab untuk memahami bagaimana informasi diproduksi, disebarkan, dan dikonsumsi. Kemampuan menggunakan teknologi saja tidak cukup. Literasi digital juga mencakup kecakapan memverifikasi informasi, memahami bias, menjaga privasi, serta menyadari dampak dari setiap tindakan di ruang digital.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":null,"textStyle":"","textFormat":0},{"type":"paragraph","format":"justify","indent":1,"version":1,"children":[{"mode":"normal","text":"Ketika sebuah informasi viral, pertanyaan pertama bukanlah seberapa cepat kita dapat menyebarkannya, melainkan seberapa jauh kita telah memeriksa kebenarannya. Ketika sebuah isu memancing emosi, tugas intelektual bukan memperkeruh suasana, tetapi mengurai persoalan dan mencari duduk perkaranya.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":null,"textStyle":"","textFormat":0},{"type":"paragraph","format":"justify","indent":1,"version":1,"children":[{"mode":"normal","text":"Di sinilah tradisi intelektual kader diuji. Membaca harus melampaui judul. Berdiskusi harus melampaui ego. Kritik harus melampaui kemarahan. Sebab, keberanian mengemukakan pendapat akan kehilangan maknanya apabila tidak disertai kesediaan untuk menguji pendapat sendiri.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":null,"textStyle":"","textFormat":0},{"type":"paragraph","format":"justify","indent":1,"version":1,"children":[{"mode":"normal","text":"Kaderisasi tidak berhenti pada penguasaan istilah, hafalan materi, atau kemampuan mengulang gagasan yang pernah disampaikan dalam forum. Nilai-nilai perjuangan perlu dipahami, dipertanyakan secara bertanggung jawab, dan diwujudkan dalam tindakan yang relevan dengan persoalan masyarakat.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":null,"textStyle":"","textFormat":0},{"type":"paragraph","format":"justify","indent":1,"version":1,"children":[{"mode":"normal","text":"Di tengah perubahan teknologi, komitmen terhadap nilai keislaman, keilmuan, dan keindonesiaan dapat tercermin melalui cara kader memperlakukan orang lain, menyikapi perbedaan, menggunakan pengetahuan, serta merespons ketidakadilan. Ideologi menjadi bermakna ketika mampu membimbing tindakan, bukan hanya menghiasi pidato dan tulisan.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":null,"textStyle":"","textFormat":0},{"type":"paragraph","format":"justify","indent":1,"version":1,"children":[{"mode":"normal","text":"Teknologi boleh berubah, medium perjuangan boleh berkembang, tetapi integritas tetap menjadi fondasi. Kader perlu terbuka terhadap pengetahuan baru tanpa kehilangan kemampuan untuk menilai secara kritis. Sikap terbuka bukan berarti menerima segala sesuatu tanpa pertimbangan, sebagaimana menjaga prinsip bukan berarti menutup diri dari perkembangan zaman.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":null,"textStyle":"","textFormat":0},{"type":"paragraph","format":"justify","indent":0,"version":1,"children":[],"direction":null,"textStyle":"","textFormat":0},{"tag":"h2","type":"heading","format":"","indent":0,"version":1,"children":[{"mode":"normal","text":"Dari Konsumen Teknologi Menjadi Pencipta Solusi","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":null},{"type":"paragraph","format":"","indent":1,"version":1,"children":[{"mode":"normal","text":"Tantangan berikutnya adalah bagaimana kader tidak hanya menjadi konsumen teknologi, tetapi turut menggunakannya untuk menjawab kebutuhan nyata. Kemampuan digital dapat diarahkan untuk mengembangkan pendidikan, memperkuat administrasi organisasi, mengelola pengetahuan, membangun ruang diskusi, dan menyelesaikan persoalan di lingkungan sekitar.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":null,"textStyle":"","textFormat":0},{"type":"paragraph","format":"","indent":1,"version":1,"children":[{"mode":"normal","text":"Kader yang mempelajari teknologi informasi, misalnya, dapat mengembangkan sistem pengarsipan digital bagi komisariat, membuat platform pembelajaran, mengolah data untuk memahami persoalan sosial, atau merancang aplikasi sederhana yang membantu masyarakat. Kader dari disiplin ilmu lain juga dapat berkontribusi melalui riset, desain komunikasi, pendidikan publik, dan pengembangan gagasan berbasis data.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":null,"textStyle":"","textFormat":0},{"type":"paragraph","format":"","indent":1,"version":1,"children":[{"mode":"normal","text":"Aksi digital tidak harus selalu berupa proyek besar. Dokumentasi organisasi yang tertata, publikasi edukatif yang dapat dipertanggungjawabkan, dan ruang belajar yang terbuka merupakan langkah konkret yang dapat dimulai dari lingkungan terdekat.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":null,"textStyle":"","textFormat":0},{"type":"paragraph","format":"","indent":1,"version":1,"children":[{"mode":"normal","text":"Teknologi pada akhirnya hanyalah alat. Nilai penggunaannya ditentukan oleh tujuan, cara, dan dampak yang dihasilkan.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":null,"textStyle":"","textFormat":0},{"type":"paragraph","format":"justify","indent":1,"version":1,"children":[{"mode":"normal","text":"Perkembangan kecerdasan buatan atau artificial intelligence (AI) juga menghadirkan peluang sekaligus tanggung jawab baru. AI dapat membantu kader mencari inspirasi, menyusun kerangka tulisan, menganalisis data, dan mempermudah pekerjaan organisasi. Namun, ketergantungan tanpa evaluasi dapat membuat proses belajar kehilangan kedalaman.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":null,"textStyle":"","textFormat":0},{"type":"paragraph","format":"justify","indent":1,"version":1,"children":[{"mode":"normal","text":"Menggunakan AI bukan berarti menyerahkan seluruh proses berpikir kepadanya. Setiap hasil tetap perlu diperiksa, sumber perlu diverifikasi, dan keputusan harus dibuat dengan pertimbangan manusia yang bertanggung jawab. Dalam konteks akademik, kejujuran intelektual tetap harus dijaga dengan mengikuti aturan yang berlaku.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":null,"textStyle":"","textFormat":0},{"type":"paragraph","format":"justify","indent":1,"version":1,"children":[{"mode":"normal","text":"Kader perlu mengembangkan kemampuan yang tidak berhenti pada penggunaan alat, tetapi mencakup kemampuan merumuskan persoalan, menilai hasil, mempertanyakan asumsi, dan menentukan apakah sebuah solusi benar-benar bermanfaat. Di tengah teknologi yang semakin canggih, kemampuan berpikir mandiri justru semakin penting.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":null,"textStyle":"","textFormat":0},{"type":"paragraph","format":"justify","indent":0,"version":1,"children":[],"direction":null,"textStyle":"","textFormat":0},{"tag":"h2","type":"heading","format":"","indent":0,"version":1,"children":[{"mode":"normal","text":"Menghidupkan Kaderisasi di Ruang Digital","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":null},{"type":"paragraph","format":"justify","indent":1,"version":1,"children":[{"mode":"normal","text":"Ruang digital juga dapat memperluas proses kaderisasi. Diskusi tidak harus selalu menunggu pertemuan tatap muka. Kajian dapat didokumentasikan, hasil penelitian dapat dibagikan, perpustakaan digital dapat dikembangkan, dan pengetahuan kader dapat diwariskan kepada generasi berikutnya.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":null,"textStyle":"","textFormat":0},{"type":"paragraph","format":"justify","indent":1,"version":1,"children":[{"mode":"normal","text":"Namun, digitalisasi tidak seharusnya menghilangkan kedalaman interaksi manusia. Pertemuan langsung tetap penting untuk membangun kepercayaan, memahami konteks, dan merawat solidaritas. Tantangannya bukan mengganti seluruh proses kaderisasi dengan teknologi, melainkan memanfaatkan teknologi untuk memperkuat proses tersebut.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":null,"textStyle":"","textFormat":0},{"type":"paragraph","format":"justify","indent":1,"version":1,"children":[{"mode":"normal","text":"Organisasi yang mampu mengelola pengetahuan secara baik tidak harus selalu memulai dari nol setiap kali terjadi pergantian kepengurusan. Gagasan, pengalaman, evaluasi, dan dokumentasi dapat menjadi ingatan kolektif yang terus dikembangkan.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":null,"textStyle":"","textFormat":0},{"type":"paragraph","format":"justify","indent":1,"version":1,"children":[{"mode":"normal","text":"Dengan demikian, teknologi bukan hanya sarana komunikasi, tetapi juga sarana menjaga kesinambungan pengetahuan dan perjuangan organisasi.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":null,"textStyle":"","textFormat":0},{"type":"paragraph","format":"justify","indent":1,"version":1,"children":[{"mode":"normal","text":"Era digital menuntut kader HMI untuk terus belajar, beradaptasi, dan mengembangkan kemampuan. Namun, adaptasi tidak cukup dimaknai sebagai kemampuan mengikuti tren teknologi. Adaptasi juga berarti keberanian mengevaluasi cara berpikir, memperbaiki pola kerja organisasi, dan merumuskan kontribusi yang sesuai dengan kebutuhan masyarakat.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":null,"textStyle":"","textFormat":0},{"type":"paragraph","format":"justify","indent":1,"version":1,"children":[{"mode":"normal","text":"Kader yang relevan dengan zaman adalah kader yang mampu mempertemukan pengetahuan dengan tindakan, nilai dengan tanggung jawab, serta teknologi dengan kemanusiaan. Ia tidak sekadar hadir dalam percakapan digital, tetapi berusaha membuat percakapan tersebut lebih bermakna.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":null,"textStyle":"","textFormat":0},{"type":"paragraph","format":"justify","indent":1,"version":1,"children":[{"mode":"normal","text":"Pada akhirnya, pertanyaan penting bagi kader bukan hanya seberapa jauh kita menguasai teknologi, melainkan untuk apa pengetahuan dan kemampuan itu digunakan.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":null,"textStyle":"","textFormat":0},{"type":"paragraph","format":"justify","indent":1,"version":1,"children":[{"mode":"normal","text":"Sebab, menjadi kader bukan tentang siapa yang paling cepat mengikuti perubahan, tetapi siapa yang mampu memahami perubahan, mengambil sikap secara bertanggung jawab, dan menghadirkan manfaat nyata bagi masyarakat.","type":"text","style":"","detail":0,"format":0,"version":1}],"direction":null,"textStyle":"","textFormat":0}],"direction":null}}'::jsonb, 7, 'Gagasan HMI', '2026-10-21T12:00:00.000Z', 'published', '2026-10-21T04:13:16.208Z', '2026-10-21T04:06:07.898Z');

-- Data for "public"."organization_structure" (15 rows)
INSERT INTO "public"."organization_structure" ("id", "name", "position", "department", "photo_id", "description", "order", "period", "instagram", "updated_at", "created_at", "bidang", "role_level") VALUES
  (27, 'Hana Maulida', 'Sekretaris Umum', 'Presidium BPH', NULL, 'Pengendali sentral tata kelola administrasi, kearsipan persuratan, notulensi ketetapan, dan pemutakhiran basis data kader komisariat.', '2', '2025-2026', '@hanamaulida', '2026-10-16T15:36:19.716Z', '2026-10-16T15:36:19.716Z', 'bph_sekum', 'sekum_bendum'),
  (28, 'Bayu Aditya', 'Bendahara Umum', 'Presidium BPH', NULL, 'Pengelola perbendaharaan, transparansi arus kas, distribusi anggaran program kerja, serta akuntabilitas iuran anggota komisariat.', '3', '2025-2026', '@bayuaditya', '2026-10-16T15:36:19.968Z', '2026-10-16T15:36:19.968Z', 'bph_bendum', 'sekum_bendum'),
  (29, 'Maya Lestari', 'Ketua Bidang PPPA', 'Bidang PPPA', NULL, 'Memimpin siklus kaderisasi formal HMI, mengawal pelaksanaan LK-1, pendampingan follow-up, serta riset mutu pembinaan anggota.', '4', '2025-2026', '@mayalestari', '2026-10-16T15:36:20.221Z', '2026-10-16T15:36:20.221Z', 'pppa', 'kabid'),
  (30, 'Rizky Ramadhan', 'Wasekum Bidang PPPA', 'Bidang PPPA', NULL, 'Mengadministrasikan database kader baru, presensi follow-up, berkas sertifikasi kader, dan modul kurikulum perkaderan.', '5', '2025-2026', '@rizkyramadhan', '2026-10-16T15:36:20.470Z', '2026-10-16T15:36:20.470Z', 'pppa', 'wasekum'),
  (31, 'Anisa Fitri', 'Koordinator Litbang & Keilmuan', 'Bidang PPPA', NULL, 'Merancang kurikulum bacaan kader, riset evaluasi pengkaderan, serta menyelenggarakan majelis diskusi Nilai Dasar Perjuangan (NDP).', '6', '2025-2026', '@anisafitri', '2026-10-16T15:36:20.722Z', '2026-10-16T15:36:20.722Z', 'pppa', 'departemen'),
  (32, 'Muhammad Farhan', 'Ketua Bidang PTKP', 'Bidang PTKP', NULL, 'Mengawal dinamika kampus, memimpin advokasi hak-hak mahasiswa saintek, kajian isu sosial-politik, dan koordinasi lintas lembaga kemahasiswaan.', '7', '2025-2026', '@mfarhan', '2026-10-16T15:36:20.975Z', '2026-10-16T15:36:20.975Z', 'ptkp', 'kabid'),
  (33, 'Dimas Pratama', 'Wasekum Bidang PTKP', 'Bidang PTKP', NULL, 'Mengelola administrasi persuratan audiensi advokasi kampus, dokumentasi berkas aspirasi, dan relasi organisasi kemitraan.', '8', '2025-2026', '@dimaspratama', '2026-10-16T15:36:21.226Z', '2026-10-16T15:36:21.226Z', 'ptkp', 'wasekum'),
  (34, 'Ilham Saputra', 'Koordinator Advokasi & Pengabdian', 'Bidang PTKP', NULL, 'Mengoperasikan layanan helpdesk aspirasi mahasiswa dan mengoordinasikan aksi kepedulian sosial kemasyarakatan kader.', '9', '2025-2026', '@ilhamsaputra', '2026-10-16T15:36:21.477Z', '2026-10-16T15:36:21.477Z', 'ptkp', 'departemen'),
  (35, 'Fajar Nugraha', 'Ketua Bidang KPP', 'Bidang KPP', NULL, 'Mengembangkan ekosistem technopreneurship kader, pelatihan keprofesian sains & teknologi, serta kemandirian ekonomi komisariat.', '10', '2025-2026', '@fajarnugraha', '2026-10-16T15:36:21.728Z', '2026-10-16T15:36:21.728Z', 'kpp', 'kabid'),
  (36, 'Yoga Firmansyah', 'Wasekum Bidang KPP', 'Bidang KPP', NULL, 'Mencatat inventarisasi aset usaha mandiri, pembukuan unit bisnis komisariat, dan administrasi kerja sama profesional.', '11', '2025-2026', '@yogafirmansyah', '2026-10-16T15:36:21.980Z', '2026-10-16T15:36:21.980Z', 'kpp', 'wasekum'),
  (37, 'Luthfi Hakim', 'Koordinator Inovasi & Sains Terapan', 'Bidang KPP', NULL, 'Memfasilitasi inkubasi startup teknologi, pelatihan hidroponik modern, dan workshop digital tools saintifik.', '12', '2025-2026', '@luthfihakim', '2026-10-16T15:36:22.373Z', '2026-10-16T15:36:22.373Z', 'kpp', 'departemen'),
  (38, 'Salsabila Putri', 'Ketua Bidang PP / Ketua KOHATI', 'Bidang PP / KOHATI', NULL, 'Memimpin Korps HMI-Wati komisariat, mengakselerasi kepemimpinan intelektual muslimah, dan memperkuat pembinaan karakter HMI-Wati.', '13', '2025-2026', '@salsabilaputri', '2026-10-16T15:36:22.687Z', '2026-10-16T15:36:22.687Z', 'kohati', 'kabid'),
  (39, 'Citra Amalia', 'Wasekum Bidang PP / Sekretaris KOHATI', 'Bidang PP / KOHATI', NULL, 'Mengelola administrasi persuratan khusus KOHATI, database HMI-Wati aktif, dan dokumentasi agenda keperempuanan.', '14', '2025-2026', '@citraamalia', '2026-10-16T15:36:22.938Z', '2026-10-16T15:36:22.938Z', 'kohati', 'wasekum'),
  (40, 'Dea Kartika', 'Bendahara KOHATI', 'Bidang PP / KOHATI', NULL, 'Mengelola keuangan dan kas kegiatan KOHATI serta menginisiasi program penggalangan dana kreatif keperempuanan.', '15', '2025-2026', '@deakartika', '2026-10-16T15:36:23.189Z', '2026-10-16T15:36:23.189Z', 'kohati', 'bendum_kohati'),
  (41, 'Satria Agung Pramudita', 'Ketua Umum Komisariat', 'BPH ', 2, NULL, '1', '2026-2027', '@stria_prmdta', '2026-10-16T15:54:40.373Z', '2026-10-16T15:53:57.135Z', 'bph_ketum', 'ketum');

-- Data for "public"."pages" (0 rows)

-- Data for "public"."payload_kv" (0 rows)

-- Data for "public"."payload_locked_documents" (0 rows)

-- Data for "public"."payload_locked_documents_rels" (0 rows)

-- Data for "public"."payload_migrations" (1 rows)
INSERT INTO "public"."payload_migrations" ("id", "name", "batch", "updated_at", "created_at") VALUES
  (1, 'dev', '-1', '2026-10-21T03:49:22.070Z', '2026-10-16T14:59:34.306Z');

-- Data for "public"."payload_preferences" (10 rows)
INSERT INTO "public"."payload_preferences" ("id", "key", "value", "updated_at", "created_at") VALUES
  (1, 'collection-organization-structure', '{"limit":10,"editViewType":"default"}'::jsonb, '2026-10-16T15:36:03.096Z', '2026-10-16T15:04:19.807Z'),
  (2, 'collection-media', '{"editViewType":"default"}'::jsonb, '2026-10-16T15:09:01.470Z', '2026-10-16T15:05:06.130Z'),
  (3, 'collection-site-settings', '{}'::jsonb, '2026-10-16T15:42:36.657Z', '2026-10-16T15:42:36.657Z'),
  (4, 'collection-navigation-items', '{}'::jsonb, '2026-10-16T15:42:40.352Z', '2026-10-16T15:42:40.352Z'),
  (5, 'collection-pages', '{}'::jsonb, '2026-10-16T15:42:43.175Z', '2026-10-16T15:42:43.174Z'),
  (6, 'collection-gallery', '{"limit":10,"editViewType":"default"}'::jsonb, '2026-10-16T16:12:25.292Z', '2026-10-16T16:11:40.258Z'),
  (7, 'collection-programs', '{}'::jsonb, '2026-10-21T04:00:02.663Z', '2026-10-21T04:00:02.658Z'),
  (8, 'collection-banners', '{}'::jsonb, '2026-10-21T04:00:04.548Z', '2026-10-21T04:00:04.548Z'),
  (9, 'collection-opinions', '{"limit":10}'::jsonb, '2026-10-21T04:00:16.220Z', '2026-10-21T04:00:06.790Z'),
  (10, 'collection-announcements', '{}'::jsonb, '2026-10-21T04:02:45.969Z', '2026-10-21T04:02:45.969Z');

-- Data for "public"."payload_preferences_rels" (14 rows)
INSERT INTO "public"."payload_preferences_rels" ("id", "order", "parent_id", "path", "users_id") VALUES
  (4, NULL, 2, 'user', 1),
  (5, NULL, 1, 'user', 1),
  (6, NULL, 1, 'user', 1),
  (7, NULL, 1, 'user', 1),
  (8, NULL, 1, 'user', 1),
  (9, NULL, 1, 'user', 1),
  (10, NULL, 3, 'user', 1),
  (11, NULL, 4, 'user', 1),
  (12, NULL, 5, 'user', 1),
  (16, NULL, 6, 'user', 1),
  (17, NULL, 7, 'user', 1),
  (18, NULL, 8, 'user', 1),
  (20, NULL, 9, 'user', 1),
  (21, NULL, 10, 'user', 1);

-- Data for "public"."programs" (0 rows)

-- Data for "public"."site_settings" (1 rows)
INSERT INTO "public"."site_settings" ("id", "site_name", "site_description", "logo_id", "small_logo_id", "active_period", "organization_name", "branch_name", "university_name", "address", "email", "phone", "whatsapp", "instagram", "tiktok", "youtube", "google_maps_embed", "footer_description", "tagline", "homepage_hero_badge", "homepage_hero_title", "homepage_hero_subtitle", "homepage_hero_image_id", "homepage_primary_cta_label", "homepage_primary_cta_href", "homepage_secondary_cta_label", "homepage_secondary_cta_href", "homepage_total_cadres", "homepage_total_alumni", "homepage_total_agenda", "homepage_total_publications", "homepage_total_documents", "feature_toggles_show_news", "feature_toggles_show_agenda", "feature_toggles_show_opinions", "feature_toggles_show_gallery", "feature_toggles_show_advocacy", "feature_toggles_show_chat_widget", "feature_toggles_open_l_k1_registration", "updated_at", "created_at", "vision_mision_vision", "vision_mision_vision_description", "vision_mision_arah_gerak_quote", "vision_mision_arah_gerak_description", "vision_mision_tujuan_hmi") VALUES
  (1, 'Rumah Digital HMI Komisariat Sains dan Teknologi', 'Ruang kolaborasi intelektual, kaderisasi, pengabdian, dan transformasi digital kader HMI Komisariat Sains dan Teknologi.', NULL, NULL, 'Periode 2025-2026', 'HMI Komisariat Sains dan Teknologi', 'Cabang Kabupaten Bandung', 'UIN Sunan Gunung Djati Bandung', 'Sekretariat HMI Komisariat Sains dan Teknologi, Bandung', 'komt.saintek@gmail.com', '+62 87-8277-18245', '6287827718245', '@hmisaintek.cakaba', NULL, NULL, NULL, 'Terbinanya insan akademis, pencipta, pengabdi yang bernafaskan Islam.', 'Ruang kolaborasi intelektual, kaderisasi, pengabdian, dan transformasi digital kader HMI Komisariat Sains dan Teknologi.', 'Official Website', 'HMI Komisariat Sains dan Teknologi', 'Ruang kolaborasi intelektual, kaderisasi, pengabdian, dan transformasi digital kader HMI Komisariat Sains dan Teknologi.', NULL, 'Daftar LK-I', 'https://pendaftaran-lk1-saintek.vercel.app/', 'Lihat Profil Komisariat', '/profil', '508', '180', '24', '96', '32', TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, '2026-10-16T16:00:15.814Z', '2026-10-16T14:59:39.333Z', 'Terwujudnya HMI Komisariat Sains dan Teknologi UIN Sunan Gunung Djati Bandung sebagai pusat kaderisasi yang unggul, progresif, dan berintegritas dalam mencetak insan akademis, pencipta, pengabdi yang bernafaskan Islam serta mampu mengintegrasikan nilai-nilai keislaman, keilmuan, dan teknologi untuk memberikan kontribusi nyata bagi kemajuan umat, bangsa, dan peradaban.', 'Visi tersebut menjadi landasan bagi seluruh aktivitas organisasi dalam membangun kader yang tidak hanya memiliki kemampuan akademik yang baik, tetapi juga memiliki karakter kepemimpinan, kemampuan berpikir kritis, semangat kolaborasi, serta kepedulian terhadap persoalan sosial dan kemasyarakatan.', '“Yakin Usaha Sampai (YAKUSA) menjadi motivasi pengabdian tiada henti, menyatukan keislaman, keilmuan, dan keorganisasian.”', 'Himpunan Mahasiswa Islam (HMI) Komisariat Sains dan Teknologi UIN Sunan Gunung Djati Bandung merupakan organisasi kader yang berkomitmen membentuk insan akademis, pencipta, pengabdi, dan muslim yang bernafaskan Islam serta bertanggung jawab atas terwujudnya masyarakat adil makmur yang diridhai Allah SWT.

Sebagai bagian dari lingkungan akademik yang berorientasi pada pengembangan ilmu pengetahuan dan teknologi, komisariat hadir untuk menjadi ruang pembelajaran, pengembangan karakter, dan penguatan kepemimpinan bagi seluruh kader. Setiap aktivitas yang dilaksanakan tidak hanya bertujuan meningkatkan kapasitas intelektual, tetapi juga menanamkan nilai-nilai keislaman, integritas, profesionalisme, dan semangat pengabdian kepada masyarakat.

Dengan semangat “Yakin Usaha Sampai”, HMI Komisariat Sains dan Teknologi berupaya menjadi organisasi yang adaptif terhadap perkembangan zaman tanpa meninggalkan identitas keislaman dan nilai-nilai perjuangan HMI.', 'Terbinanya Insan Akademis, Pencipta, Pengabdi yang Bernafaskan Islam dan Bertanggung Jawab atas Terwujudnya Masyarakat Adil Makmur yang Diridhai Allah SWT.');

-- Data for "public"."site_settings_vision_mision_missions" (7 rows)
INSERT INTO "public"."site_settings_vision_mision_missions" ("_order", "_parent_id", "id", "title", "description") VALUES
  (1, 1, 'misi_1', 'Memperkuat sistem kaderisasi yang berkelanjutan', 'Mengembangkan proses kaderisasi yang sistematis, terarah, dan berlandaskan nilai-nilai keislaman serta prinsip dasar perjuangan HMI guna melahirkan kader yang memiliki integritas, loyalitas organisasi, dan semangat perjuangan yang tinggi.'),
  (2, 1, 'misi_2', 'Membangun budaya intelektual di lingkungan komisariat', 'Mendorong tumbuhnya tradisi diskusi, kajian ilmiah, penelitian, literasi, dan pengembangan keilmuan sebagai bentuk aktualisasi mahasiswa dalam menghadapi tantangan perkembangan sains dan teknologi.'),
  (3, 1, 'misi_3', 'Mengembangkan kualitas sumber daya kader', 'Memberikan ruang bagi kader untuk meningkatkan kemampuan akademik, kepemimpinan, komunikasi, manajemen organisasi, serta kemampuan berpikir kritis dan analitis sehingga mampu menjadi pribadi yang kompeten dan adaptif.'),
  (4, 1, 'misi_4', 'Mengintegrasikan nilai Islam dengan ilmu pengetahuan dan teknologi', 'Menjadikan ajaran Islam sebagai landasan moral dan etika dalam pengembangan ilmu pengetahuan, inovasi teknologi, serta setiap bentuk aktivitas organisasi sehingga menghasilkan kemajuan yang membawa kemaslahatan bagi masyarakat.'),
  (5, 1, 'misi_5', 'Menumbuhkan jiwa kepemimpinan dan tanggung jawab sosial', 'Mencetak kader yang mampu menjadi pemimpin yang amanah, visioner, dan memiliki kepedulian terhadap persoalan umat, lingkungan kampus, serta masyarakat melalui berbagai kegiatan advokasi, pengabdian, dan pemberdayaan.'),
  (6, 1, 'misi_6', 'Mendorong kolaborasi dan inovasi organisasi', 'Membangun budaya organisasi yang terbuka, profesional, kolaboratif, serta mampu memanfaatkan teknologi informasi untuk meningkatkan efektivitas pelayanan, komunikasi, dan pengembangan organisasi.'),
  (7, 1, 'misi_7', 'Meningkatkan kontribusi nyata kepada masyarakat', 'Mengoptimalkan potensi kader dalam bidang pendidikan, penelitian, sosial, lingkungan, dan teknologi melalui program-program yang memberikan dampak positif dan berkelanjutan bagi masyarakat.');

-- Data for "public"."users" (1 rows)
INSERT INTO "public"."users" ("id", "name", "is_active", "updated_at", "created_at", "email", "reset_password_token", "reset_password_expiration", "salt", "hash", "login_attempts", "lock_until") VALUES
  (1, 'Super Admin HMI', TRUE, '2026-10-16T14:59:37.431Z', '2026-10-16T14:59:37.426Z', 'admin@hmisaintek.org', NULL, NULL, 'b7f44951f73f5d843357c72e0a272018d802f3809f9845587ffdb97c792b5754', '6644c0d02a5145d69c156904ecd60fd3c03b214e7d17198963d4ad8f6f2f5989cb1739bd362d1761235ede626fe939ab47a5c3af1768f0f28449c0abe815d9e66822ff55f159d7b7c830e2ae19567bfcb751fb52f0d9c67a38b71b6385c5b096918fd2bf6ecd093d3c0951019db6ba5b7911cfb331a36da610ac35fb336c06c46aa6769d5977aeaf5366064f91e1109d64676663fa7644731e399cf8467b46ca1040bd289abf426d486bc8253938bb5b8754cb8bb590d68af692287dc54073fc80844c6200efe2738aa81d94579166bdaee335428fe6535a5d73adb51b01950b7f6569f28c04865d5816f54e94aff388c728fda11342e5095cf9403efef6568bf0b7517d721d2e6ee83d74f8ab839a3a27b1bc7da42020dbfc9b33557803d7264564cba1fdf45c2606c9d614e7231378f4d614a924277d50e3dd1babb4ccb9c63355c30e0cf1ee87cac9bc338b74210b59e4fb40bbcd89279b6076c058a732d6d3e6885212293ce0444b177c8d86f3da75765c02e2a4935513cf96317d69fc32bdefe9d0381d07d1a8327bc446b91119fb560365163af8e5845be2968c8aa40c7cc33c961028a13ddd5b5c75a4686c98959075e8db61b6de2f8f61fa245a46d369771fe4d76cfdb9dfe96c70653e28ab60e6e726eefd6a127d73ae294efa0c8ddb94c6b7084be11e344bfc2bc8678a8cd173c2a350620344589ad3f1f499f539', '0', NULL);

-- Data for "public"."users_roles" (1 rows)
INSERT INTO "public"."users_roles" ("order", "parent_id", "value", "id") VALUES
  (1, 1, 'super_admin', 8);

-- Data for "public"."users_sessions" (3 rows)
INSERT INTO "public"."users_sessions" ("_order", "_parent_id", "id", "created_at", "expires_at") VALUES
  (1, 1, '79e4e6c8-3d5b-40d0-8b55-1c71c3e36f1f', '2026-10-21T03:23:24.534Z', '2026-10-21T05:23:24.534Z'),
  (2, 1, 'a4a6ab7f-56d5-48b9-b073-bbcb931ea378', '2026-10-21T03:33:34.737Z', '2026-10-21T05:33:34.737Z'),
  (3, 1, '9378119b-618b-4228-93fb-61ba9e8af501', '2026-10-21T03:33:59.574Z', '2026-10-21T05:33:59.574Z');

-- =====================================================================
-- Foreign Key Constraints
-- =====================================================================

ALTER TABLE ONLY "public"."advocacy_reports" DROP CONSTRAINT IF EXISTS "advocacy_reports_evidence_file_id_media_id_fk";
ALTER TABLE ONLY "public"."advocacy_reports" ADD CONSTRAINT "advocacy_reports_evidence_file_id_media_id_fk" FOREIGN KEY (evidence_file_id) REFERENCES media(id) ON DELETE SET NULL;

ALTER TABLE ONLY "public"."advocacy_reports" DROP CONSTRAINT IF EXISTS "advocacy_reports_handled_by_id_users_id_fk";
ALTER TABLE ONLY "public"."advocacy_reports" ADD CONSTRAINT "advocacy_reports_handled_by_id_users_id_fk" FOREIGN KEY (handled_by_id) REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE ONLY "public"."advocacy_reports_follow_ups" DROP CONSTRAINT IF EXISTS "advocacy_reports_follow_ups_handled_by_id_users_id_fk";
ALTER TABLE ONLY "public"."advocacy_reports_follow_ups" ADD CONSTRAINT "advocacy_reports_follow_ups_handled_by_id_users_id_fk" FOREIGN KEY (handled_by_id) REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE ONLY "public"."advocacy_reports_follow_ups" DROP CONSTRAINT IF EXISTS "advocacy_reports_follow_ups_parent_id_fk";
ALTER TABLE ONLY "public"."advocacy_reports_follow_ups" ADD CONSTRAINT "advocacy_reports_follow_ups_parent_id_fk" FOREIGN KEY (_parent_id) REFERENCES advocacy_reports(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."audit_logs" DROP CONSTRAINT IF EXISTS "audit_logs_user_id_users_id_fk";
ALTER TABLE ONLY "public"."audit_logs" ADD CONSTRAINT "audit_logs_user_id_users_id_fk" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE ONLY "public"."banners" DROP CONSTRAINT IF EXISTS "banners_image_id_media_id_fk";
ALTER TABLE ONLY "public"."banners" ADD CONSTRAINT "banners_image_id_media_id_fk" FOREIGN KEY (image_id) REFERENCES media(id) ON DELETE SET NULL;

ALTER TABLE ONLY "public"."cadres" DROP CONSTRAINT IF EXISTS "cadres_photo_id_media_id_fk";
ALTER TABLE ONLY "public"."cadres" ADD CONSTRAINT "cadres_photo_id_media_id_fk" FOREIGN KEY (photo_id) REFERENCES media(id) ON DELETE SET NULL;

ALTER TABLE ONLY "public"."contact_messages" DROP CONSTRAINT IF EXISTS "contact_messages_handled_by_id_users_id_fk";
ALTER TABLE ONLY "public"."contact_messages" ADD CONSTRAINT "contact_messages_handled_by_id_users_id_fk" FOREIGN KEY (handled_by_id) REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE ONLY "public"."documents" DROP CONSTRAINT IF EXISTS "documents_file_id_media_id_fk";
ALTER TABLE ONLY "public"."documents" ADD CONSTRAINT "documents_file_id_media_id_fk" FOREIGN KEY (file_id) REFERENCES media(id) ON DELETE SET NULL;

ALTER TABLE ONLY "public"."documents" DROP CONSTRAINT IF EXISTS "documents_uploaded_by_id_users_id_fk";
ALTER TABLE ONLY "public"."documents" ADD CONSTRAINT "documents_uploaded_by_id_users_id_fk" FOREIGN KEY (uploaded_by_id) REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE ONLY "public"."events" DROP CONSTRAINT IF EXISTS "events_cover_image_id_media_id_fk";
ALTER TABLE ONLY "public"."events" ADD CONSTRAINT "events_cover_image_id_media_id_fk" FOREIGN KEY (cover_image_id) REFERENCES media(id) ON DELETE SET NULL;

ALTER TABLE ONLY "public"."events_rels" DROP CONSTRAINT IF EXISTS "events_rels_gallery_fk";
ALTER TABLE ONLY "public"."events_rels" ADD CONSTRAINT "events_rels_gallery_fk" FOREIGN KEY (gallery_id) REFERENCES gallery(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."events_rels" DROP CONSTRAINT IF EXISTS "events_rels_parent_fk";
ALTER TABLE ONLY "public"."events_rels" ADD CONSTRAINT "events_rels_parent_fk" FOREIGN KEY (parent_id) REFERENCES events(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."former_chairpersons" DROP CONSTRAINT IF EXISTS "former_chairpersons_photo_id_media_id_fk";
ALTER TABLE ONLY "public"."former_chairpersons" ADD CONSTRAINT "former_chairpersons_photo_id_media_id_fk" FOREIGN KEY (photo_id) REFERENCES media(id) ON DELETE SET NULL;

ALTER TABLE ONLY "public"."gallery" DROP CONSTRAINT IF EXISTS "gallery_image_id_media_id_fk";
ALTER TABLE ONLY "public"."gallery" ADD CONSTRAINT "gallery_image_id_media_id_fk" FOREIGN KEY (image_id) REFERENCES media(id) ON DELETE SET NULL;

ALTER TABLE ONLY "public"."lk1_registrations" DROP CONSTRAINT IF EXISTS "lk1_registrations_payment_proof_id_media_id_fk";
ALTER TABLE ONLY "public"."lk1_registrations" ADD CONSTRAINT "lk1_registrations_payment_proof_id_media_id_fk" FOREIGN KEY (payment_proof_id) REFERENCES media(id) ON DELETE SET NULL;

ALTER TABLE ONLY "public"."lk1_registrations" DROP CONSTRAINT IF EXISTS "lk1_registrations_payment_verified_by_id_users_id_fk";
ALTER TABLE ONLY "public"."lk1_registrations" ADD CONSTRAINT "lk1_registrations_payment_verified_by_id_users_id_fk" FOREIGN KEY (payment_verified_by_id) REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE ONLY "public"."lk1_registrations" DROP CONSTRAINT IF EXISTS "lk1_registrations_verified_by_id_users_id_fk";
ALTER TABLE ONLY "public"."lk1_registrations" ADD CONSTRAINT "lk1_registrations_verified_by_id_users_id_fk" FOREIGN KEY (verified_by_id) REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE ONLY "public"."lk1_registrations_interest_fields" DROP CONSTRAINT IF EXISTS "lk1_registrations_interest_fields_parent_fk";
ALTER TABLE ONLY "public"."lk1_registrations_interest_fields" ADD CONSTRAINT "lk1_registrations_interest_fields_parent_fk" FOREIGN KEY (parent_id) REFERENCES lk1_registrations(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."news" DROP CONSTRAINT IF EXISTS "news_author_id_users_id_fk";
ALTER TABLE ONLY "public"."news" ADD CONSTRAINT "news_author_id_users_id_fk" FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL;

ALTER TABLE ONLY "public"."news" DROP CONSTRAINT IF EXISTS "news_cover_image_id_media_id_fk";
ALTER TABLE ONLY "public"."news" ADD CONSTRAINT "news_cover_image_id_media_id_fk" FOREIGN KEY (cover_image_id) REFERENCES media(id) ON DELETE SET NULL;

ALTER TABLE ONLY "public"."opinions" DROP CONSTRAINT IF EXISTS "opinions_author_photo_id_media_id_fk";
ALTER TABLE ONLY "public"."opinions" ADD CONSTRAINT "opinions_author_photo_id_media_id_fk" FOREIGN KEY (author_photo_id) REFERENCES media(id) ON DELETE SET NULL;

ALTER TABLE ONLY "public"."opinions" DROP CONSTRAINT IF EXISTS "opinions_cover_image_id_media_id_fk";
ALTER TABLE ONLY "public"."opinions" ADD CONSTRAINT "opinions_cover_image_id_media_id_fk" FOREIGN KEY (cover_image_id) REFERENCES media(id) ON DELETE SET NULL;

ALTER TABLE ONLY "public"."organization_structure" DROP CONSTRAINT IF EXISTS "organization_structure_photo_id_media_id_fk";
ALTER TABLE ONLY "public"."organization_structure" ADD CONSTRAINT "organization_structure_photo_id_media_id_fk" FOREIGN KEY (photo_id) REFERENCES media(id) ON DELETE SET NULL;

ALTER TABLE ONLY "public"."payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_advocacy_reports_fk";
ALTER TABLE ONLY "public"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_advocacy_reports_fk" FOREIGN KEY (advocacy_reports_id) REFERENCES advocacy_reports(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_announcements_fk";
ALTER TABLE ONLY "public"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_announcements_fk" FOREIGN KEY (announcements_id) REFERENCES announcements(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_audit_logs_fk";
ALTER TABLE ONLY "public"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_audit_logs_fk" FOREIGN KEY (audit_logs_id) REFERENCES audit_logs(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_banners_fk";
ALTER TABLE ONLY "public"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_banners_fk" FOREIGN KEY (banners_id) REFERENCES banners(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_cadres_fk";
ALTER TABLE ONLY "public"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_cadres_fk" FOREIGN KEY (cadres_id) REFERENCES cadres(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_contact_messages_fk";
ALTER TABLE ONLY "public"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contact_messages_fk" FOREIGN KEY (contact_messages_id) REFERENCES contact_messages(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_documents_fk";
ALTER TABLE ONLY "public"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_documents_fk" FOREIGN KEY (documents_id) REFERENCES documents(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_events_fk";
ALTER TABLE ONLY "public"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY (events_id) REFERENCES events(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_former_chairpersons_fk";
ALTER TABLE ONLY "public"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_former_chairpersons_fk" FOREIGN KEY (former_chairpersons_id) REFERENCES former_chairpersons(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_gallery_fk";
ALTER TABLE ONLY "public"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_gallery_fk" FOREIGN KEY (gallery_id) REFERENCES gallery(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_lk1_registrations_fk";
ALTER TABLE ONLY "public"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_lk1_registrations_fk" FOREIGN KEY (lk1_registrations_id) REFERENCES lk1_registrations(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_media_fk";
ALTER TABLE ONLY "public"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY (media_id) REFERENCES media(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_navigation_items_fk";
ALTER TABLE ONLY "public"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_navigation_items_fk" FOREIGN KEY (navigation_items_id) REFERENCES navigation_items(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_news_fk";
ALTER TABLE ONLY "public"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY (news_id) REFERENCES news(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_opinions_fk";
ALTER TABLE ONLY "public"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_opinions_fk" FOREIGN KEY (opinions_id) REFERENCES opinions(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_organization_structure_fk";
ALTER TABLE ONLY "public"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_organization_structure_fk" FOREIGN KEY (organization_structure_id) REFERENCES organization_structure(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_pages_fk";
ALTER TABLE ONLY "public"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pages_fk" FOREIGN KEY (pages_id) REFERENCES pages(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_parent_fk";
ALTER TABLE ONLY "public"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY (parent_id) REFERENCES payload_locked_documents(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_programs_fk";
ALTER TABLE ONLY "public"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_programs_fk" FOREIGN KEY (programs_id) REFERENCES programs(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_site_settings_fk";
ALTER TABLE ONLY "public"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_site_settings_fk" FOREIGN KEY (site_settings_id) REFERENCES site_settings(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_users_fk";
ALTER TABLE ONLY "public"."payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."payload_preferences_rels" DROP CONSTRAINT IF EXISTS "payload_preferences_rels_parent_fk";
ALTER TABLE ONLY "public"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY (parent_id) REFERENCES payload_preferences(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."payload_preferences_rels" DROP CONSTRAINT IF EXISTS "payload_preferences_rels_users_fk";
ALTER TABLE ONLY "public"."payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY (users_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."programs" DROP CONSTRAINT IF EXISTS "programs_cover_image_id_media_id_fk";
ALTER TABLE ONLY "public"."programs" ADD CONSTRAINT "programs_cover_image_id_media_id_fk" FOREIGN KEY (cover_image_id) REFERENCES media(id) ON DELETE SET NULL;

ALTER TABLE ONLY "public"."site_settings" DROP CONSTRAINT IF EXISTS "site_settings_homepage_hero_image_id_media_id_fk";
ALTER TABLE ONLY "public"."site_settings" ADD CONSTRAINT "site_settings_homepage_hero_image_id_media_id_fk" FOREIGN KEY (homepage_hero_image_id) REFERENCES media(id) ON DELETE SET NULL;

ALTER TABLE ONLY "public"."site_settings" DROP CONSTRAINT IF EXISTS "site_settings_logo_id_media_id_fk";
ALTER TABLE ONLY "public"."site_settings" ADD CONSTRAINT "site_settings_logo_id_media_id_fk" FOREIGN KEY (logo_id) REFERENCES media(id) ON DELETE SET NULL;

ALTER TABLE ONLY "public"."site_settings" DROP CONSTRAINT IF EXISTS "site_settings_small_logo_id_media_id_fk";
ALTER TABLE ONLY "public"."site_settings" ADD CONSTRAINT "site_settings_small_logo_id_media_id_fk" FOREIGN KEY (small_logo_id) REFERENCES media(id) ON DELETE SET NULL;

ALTER TABLE ONLY "public"."site_settings_vision_mision_missions" DROP CONSTRAINT IF EXISTS "site_settings_vision_mision_missions_parent_id_fk";
ALTER TABLE ONLY "public"."site_settings_vision_mision_missions" ADD CONSTRAINT "site_settings_vision_mision_missions_parent_id_fk" FOREIGN KEY (_parent_id) REFERENCES site_settings(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."users_roles" DROP CONSTRAINT IF EXISTS "users_roles_parent_fk";
ALTER TABLE ONLY "public"."users_roles" ADD CONSTRAINT "users_roles_parent_fk" FOREIGN KEY (parent_id) REFERENCES users(id) ON DELETE CASCADE;

ALTER TABLE ONLY "public"."users_sessions" DROP CONSTRAINT IF EXISTS "users_sessions_parent_id_fk";
ALTER TABLE ONLY "public"."users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY (_parent_id) REFERENCES users(id) ON DELETE CASCADE;

-- =====================================================================
-- Sequence Current Values
-- =====================================================================

SELECT pg_catalog.setval('public."advocacy_reports_id_seq"', 1, false);
SELECT pg_catalog.setval('public."announcements_id_seq"', 4, true);
SELECT pg_catalog.setval('public."audit_logs_id_seq"', 1, false);
SELECT pg_catalog.setval('public."banners_id_seq"', 1, false);
SELECT pg_catalog.setval('public."cadres_id_seq"', 508, true);
SELECT pg_catalog.setval('public."contact_messages_id_seq"', 1, false);
SELECT pg_catalog.setval('public."documents_id_seq"', 1, false);
SELECT pg_catalog.setval('public."events_id_seq"', 5, true);
SELECT pg_catalog.setval('public."events_rels_id_seq"', 1, false);
SELECT pg_catalog.setval('public."former_chairpersons_id_seq"', 10, true);
SELECT pg_catalog.setval('public."gallery_id_seq"', 14, true);
SELECT pg_catalog.setval('public."lk1_registrations_id_seq"', 1, false);
SELECT pg_catalog.setval('public."lk1_registrations_interest_fields_id_seq"', 1, false);
SELECT pg_catalog.setval('public."media_id_seq"', 7, true);
SELECT pg_catalog.setval('public."navigation_items_id_seq"', 1, false);
SELECT pg_catalog.setval('public."news_id_seq"', 6, true);
SELECT pg_catalog.setval('public."opinions_id_seq"', 7, true);
SELECT pg_catalog.setval('public."organization_structure_id_seq"', 41, true);
SELECT pg_catalog.setval('public."pages_id_seq"', 1, false);
SELECT pg_catalog.setval('public."payload_kv_id_seq"', 1, false);
SELECT pg_catalog.setval('public."payload_locked_documents_id_seq"', 13, true);
SELECT pg_catalog.setval('public."payload_locked_documents_rels_id_seq"', 26, true);
SELECT pg_catalog.setval('public."payload_migrations_id_seq"', 1, true);
SELECT pg_catalog.setval('public."payload_preferences_id_seq"', 10, true);
SELECT pg_catalog.setval('public."payload_preferences_rels_id_seq"', 21, true);
SELECT pg_catalog.setval('public."programs_id_seq"', 1, false);
SELECT pg_catalog.setval('public."site_settings_id_seq"', 1, true);
SELECT pg_catalog.setval('public."users_id_seq"', 1, true);
SELECT pg_catalog.setval('public."users_roles_id_seq"', 8, true);
