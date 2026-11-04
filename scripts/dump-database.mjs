/**
 * scripts/dump-database.mjs
 * 
 * Tool to dump the entire PostgreSQL database configured in .env (or .env.local)
 * into a complete, self-contained, and valid .sql backup file.
 */

import fs from 'fs';
import path from 'path';
import pg from 'pg';
import dotenv from 'dotenv';

// Load .env then fallback to .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
if (!process.env.DATABASE_URL && !process.env.DATABASE_URL_UNPOOLED) {
  dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });
}

const connectionString = process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL;

if (!connectionString) {
  console.error('Error: No DATABASE_URL or DATABASE_URL_UNPOOLED found in .env / .env.local');
  process.exit(1);
}

const client = new pg.Client({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

function formatSqlValue(val, colType = '') {
  if (val === null || val === undefined) {
    return 'NULL';
  }
  if (typeof val === 'boolean') {
    return val ? 'TRUE' : 'FALSE';
  }
  if (typeof val === 'number') {
    return Number.isFinite(val) ? val.toString() : 'NULL';
  }
  if (val instanceof Date) {
    return `'${val.toISOString()}'`;
  }
  if (Buffer.isBuffer(val)) {
    return `E'\\\\x${val.toString('hex')}'`;
  }
  if (typeof val === 'object') {
    const jsonStr = JSON.stringify(val);
    const escaped = jsonStr.replace(/'/g, "''");
    return `'${escaped}'::jsonb`;
  }
  if (typeof val === 'string') {
    // If it's a known jsonb column
    if (colType === 'jsonb') {
      const escaped = val.replace(/'/g, "''");
      return `'${escaped}'::jsonb`;
    }
    const escaped = val.replace(/'/g, "''");
    return `'${escaped}'`;
  }
  return `'${String(val).replace(/'/g, "''")}'`;
}

async function dump() {
  console.log('Connecting to database...');
  await client.connect();
  console.log('Connected successfully!');

  const versionRes = await client.query('SELECT version();');
  const serverVersion = versionRes.rows[0].version;

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '');
  const outputFileName = `backup_database_${dateStr}.sql`;
  const outputPath = path.resolve(process.cwd(), outputFileName);

  const lines = [];
  const add = (line = '') => lines.push(line);

  // 1. Header
  add(`-- =====================================================================`);
  add(`-- PostgreSQL Database Backup`);
  add(`-- Export Date: ${now.toISOString()}`);
  add(`-- Server Version: ${serverVersion}`);
  add(`-- Target File: ${outputFileName}`);
  add(`-- =====================================================================\n`);

  add(`SET statement_timeout = 0;`);
  add(`SET lock_timeout = 0;`);
  add(`SET idle_in_transaction_session_timeout = 0;`);
  add(`SET client_encoding = 'UTF8';`);
  add(`SET standard_conforming_strings = on;`);
  add(`SELECT pg_catalog.set_config('search_path', '', false);`);
  add(`SET check_function_bodies = false;`);
  add(`SET xmloption = content;`);
  add(`SET client_min_messages = warning;`);
  add(`SET row_security = off;\n`);

  add(`-- Ensure public schema exists`);
  add(`CREATE SCHEMA IF NOT EXISTS "public";\n`);

  // 2. Custom Types / ENUMs
  console.log('Exporting custom enum types...');
  add(`-- =====================================================================`);
  add(`-- Custom ENUM Types`);
  add(`-- =====================================================================\n`);

  const typesRes = await client.query(`
    SELECT t.typname, e.enumlabel
    FROM pg_type t
    JOIN pg_enum e ON t.oid = e.enumtypid
    JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
    WHERE n.nspname = 'public'
    ORDER BY t.typname, e.enumsortorder;
  `);

  const enumsMap = new Map();
  for (const row of typesRes.rows) {
    if (!enumsMap.has(row.typname)) {
      enumsMap.set(row.typname, []);
    }
    enumsMap.get(row.typname).push(row.enumlabel);
  }

  for (const [typname, values] of enumsMap.entries()) {
    const enumVals = values.map(v => `'${v.replace(/'/g, "''")}'`).join(', ');
    add(`DO $$ BEGIN`);
    add(`  CREATE TYPE "public"."${typname}" AS ENUM (${enumVals});`);
    add(`EXCEPTION`);
    add(`  WHEN duplicate_object THEN NULL;`);
    add(`END $$;\n`);
  }

  // 3. Sequences
  console.log('Exporting sequences...');
  add(`-- =====================================================================`);
  add(`-- Sequences`);
  add(`-- =====================================================================\n`);

  const seqsRes = await client.query(`
    SELECT sequence_name, data_type, start_value, minimum_value, maximum_value, increment, cycle_option
    FROM information_schema.sequences
    WHERE sequence_schema = 'public'
    ORDER BY sequence_name;
  `);

  for (const seq of seqsRes.rows) {
    add(`CREATE SEQUENCE IF NOT EXISTS "public"."${seq.sequence_name}"`);
    add(`  START WITH ${seq.start_value}`);
    add(`  INCREMENT BY ${seq.increment}`);
    add(`  MINVALUE ${seq.minimum_value}`);
    add(`  MAXVALUE ${seq.maximum_value}`);
    add(`  CACHE 1;`);
  }
  add('');

  // 4. Tables
  console.log('Exporting tables schema...');
  add(`-- =====================================================================`);
  add(`-- Tables Schema`);
  add(`-- =====================================================================\n`);

  const tablesRes = await client.query(`
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_schema = 'public' AND table_type = 'BASE TABLE'
    ORDER BY table_name;
  `);

  const tableNames = tablesRes.rows.map(r => r.table_name);
  const tableColumnsMap = new Map();

  for (const tableName of tableNames) {
    const colsRes = await client.query(`
      SELECT
        a.attname AS column_name,
        format_type(a.atttypid, a.atttypmod) AS formatted_type,
        a.attnotnull AS is_not_null,
        pg_get_expr(d.adbin, d.adrelid) AS default_value
      FROM pg_class c
      JOIN pg_namespace n ON n.oid = c.relnamespace
      JOIN pg_attribute a ON a.attrelid = c.oid
      LEFT JOIN pg_attrdef d ON d.adrelid = a.attrelid AND d.adnum = a.attnum
      WHERE n.nspname = 'public'
        AND c.relname = $1
        AND a.attnum > 0
        AND NOT a.attisdropped
      ORDER BY a.attnum;
    `, [tableName]);

    tableColumnsMap.set(tableName, colsRes.rows);

    add(`CREATE TABLE IF NOT EXISTS "public"."${tableName}" (`);
    const colDefs = colsRes.rows.map((col) => {
      let def = `    "${col.column_name}" ${col.formatted_type}`;
      if (col.is_not_null) {
        def += ' NOT NULL';
      }
      if (col.default_value) {
        def += ` DEFAULT ${col.default_value}`;
      }
      return def;
    });
    add(colDefs.join(',\n'));
    add(`);\n`);
  }

  // 5. Primary Key & Unique & Check Constraints
  console.log('Exporting primary keys and constraints...');
  add(`-- =====================================================================`);
  add(`-- Constraints (Primary Keys, Unique, Check)`);
  add(`-- =====================================================================\n`);

  const constraintsRes = await client.query(`
    SELECT
      c.conname,
      c.contype,
      t.relname AS table_name,
      pg_get_constraintdef(c.oid, true) AS def
    FROM pg_constraint c
    JOIN pg_class t ON t.oid = c.conrelid
    JOIN pg_namespace n ON n.oid = c.connamespace
    WHERE n.nspname = 'public' AND c.contype IN ('p', 'u', 'c')
    ORDER BY c.contype, t.relname, c.conname;
  `);

  for (const con of constraintsRes.rows) {
    add(`ALTER TABLE ONLY "public"."${con.table_name}" DROP CONSTRAINT IF EXISTS "${con.conname}";`);
    add(`ALTER TABLE ONLY "public"."${con.table_name}" ADD CONSTRAINT "${con.conname}" ${con.def};\n`);
  }

  // 6. Standalone Indexes
  console.log('Exporting indexes...');
  add(`-- =====================================================================`);
  add(`-- Indexes`);
  add(`-- =====================================================================\n`);

  const indexesRes = await client.query(`
    SELECT
      i.relname AS index_name,
      t.relname AS table_name,
      pg_get_indexdef(ix.indexrelid, 0, true) AS index_def
    FROM pg_index ix
    JOIN pg_class i ON i.oid = ix.indexrelid
    JOIN pg_class t ON t.oid = ix.indrelid
    JOIN pg_namespace n ON n.oid = t.relnamespace
    LEFT JOIN pg_constraint c ON c.conindid = ix.indexrelid
    WHERE n.nspname = 'public' AND c.conname IS NULL
    ORDER BY t.relname, i.relname;
  `);

  for (const idx of indexesRes.rows) {
    let def = idx.index_def.trim();
    if (!def.endsWith(';')) def += ';';
    def = def.replace(/^CREATE (UNIQUE )?INDEX /, 'CREATE $1INDEX IF NOT EXISTS ');
    add(def);
  }
  add('');

  // 7. Table Data
  console.log('Exporting table data...');
  add(`-- =====================================================================`);
  add(`-- Data Inserts`);
  add(`-- =====================================================================\n`);

  for (const tableName of tableNames) {
    const cols = tableColumnsMap.get(tableName);
    const colNames = cols.map(c => `"${c.column_name}"`).join(', ');

    const rowsRes = await client.query(`SELECT * FROM "public"."${tableName}" ORDER BY 1 ASC;`);
    const rowCount = rowsRes.rows.length;

    add(`-- Data for "public"."${tableName}" (${rowCount} rows)`);

    if (rowCount > 0) {
      const batchSize = 50;
      for (let i = 0; i < rowCount; i += batchSize) {
        const batch = rowsRes.rows.slice(i, i + batchSize);
        const valueTuples = batch.map(row => {
          const formattedVals = cols.map(col => {
            const val = row[col.column_name];
            return formatSqlValue(val, col.formatted_type);
          });
          return `  (${formattedVals.join(', ')})`;
        });

        add(`INSERT INTO "public"."${tableName}" (${colNames}) VALUES`);
        add(valueTuples.join(',\n') + ';');
      }
      console.log(`  - ${tableName}: exported ${rowCount} rows`);
    } else {
      console.log(`  - ${tableName}: 0 rows (skipped)`);
    }
    add('');
  }

  // 8. Foreign Key Constraints (after data is inserted!)
  console.log('Exporting foreign key constraints...');
  add(`-- =====================================================================`);
  add(`-- Foreign Key Constraints`);
  add(`-- =====================================================================\n`);

  const fkRes = await client.query(`
    SELECT
      c.conname,
      t.relname AS table_name,
      pg_get_constraintdef(c.oid, true) AS def
    FROM pg_constraint c
    JOIN pg_class t ON t.oid = c.conrelid
    JOIN pg_namespace n ON n.oid = c.connamespace
    WHERE n.nspname = 'public' AND c.contype = 'f'
    ORDER BY t.relname, c.conname;
  `);

  for (const fk of fkRes.rows) {
    add(`ALTER TABLE ONLY "public"."${fk.table_name}" DROP CONSTRAINT IF EXISTS "${fk.conname}";`);
    add(`ALTER TABLE ONLY "public"."${fk.table_name}" ADD CONSTRAINT "${fk.conname}" ${fk.def};\n`);
  }

  // 9. Sequence Values (setval)
  console.log('Exporting sequence values...');
  add(`-- =====================================================================`);
  add(`-- Sequence Current Values`);
  add(`-- =====================================================================\n`);

  for (const seq of seqsRes.rows) {
    try {
      const valRes = await client.query(`SELECT last_value, is_called FROM "public"."${seq.sequence_name}"`);
      const { last_value, is_called } = valRes.rows[0];
      add(`SELECT pg_catalog.setval('public."${seq.sequence_name}"', ${last_value}, ${is_called ? 'true' : 'false'});`);
    } catch (e) {
      console.warn(`Warning reading sequence ${seq.sequence_name}:`, e.message);
    }
  }
  add('');

  // 10. Write File
  fs.writeFileSync(outputPath, lines.join('\n'), 'utf8');

  // Also write a copy to a standard fixed name backup.sql
  const fixedBackupPath = path.resolve(process.cwd(), 'database_backup.sql');
  fs.writeFileSync(fixedBackupPath, lines.join('\n'), 'utf8');

  const stats = fs.statSync(outputPath);
  console.log(`\n======================================================`);
  console.log(` Backup complete!`);
  console.log(` File created: ${outputFileName} (${(stats.size / 1024).toFixed(2)} KB)`);
  console.log(` Also copied: database_backup.sql`);
  console.log(` Location: ${outputPath}`);
  console.log(`======================================================`);

  await client.end();
}

dump().catch(err => {
  console.error('Error during dump:', err);
  process.exit(1);
});