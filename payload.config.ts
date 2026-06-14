import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import sharp from "sharp";
import { fileURLToPath } from "url";
import { collections } from "./collections";
import { payloadEndpoints } from "./lib/payload-endpoints";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const parsedDatabaseConnectionTimeout = Number(
  process.env.DATABASE_CONNECTION_TIMEOUT_MS
);
const databaseConnectionTimeoutMs = Number.isFinite(
  parsedDatabaseConnectionTimeout
)
  ? parsedDatabaseConnectionTimeout
  : 5000;

export default buildConfig({
  admin: {
    user: "users",
    suppressHydrationWarning: true,
    components: {
      beforeDashboard: [
        "./components/admin/hmi-admin-dashboard#HmiAdminDashboard",
      ],
      views: {
        controlCenter: {
          Component: "./components/admin/hmi-control-center#HmiControlCenter",
          path: "/control-center",
          meta: {
            title: "Control Center | HMI Saintek CMS",
          },
        },
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
      importMapFile: path.resolve(dirname, "app/(payload)/admin/importMap.js"),
    },
    meta: {
      titleSuffix: " | HMI Saintek CMS",
    },
  },
  collections,
  db: postgresAdapter({
    push: process.env.PAYLOAD_DB_PUSH === "true",
    pool: {
      connectionString:
        process.env.DATABASE_URL ??
        "postgresql://postgres:postgres@localhost:5432/hmi",
      connectionTimeoutMillis: databaseConnectionTimeoutMs,
      ssl: process.env.DATABASE_URL?.includes("supabase")
        ? { rejectUnauthorized: false }
        : undefined,
    },
  }),
  editor: lexicalEditor(),
  endpoints: payloadEndpoints,
  graphQL: {
    disablePlaygroundInProduction: true,
  },
  routes: {
    admin: "/admin",
    api: "/api",
    graphQL: "/api/graphql",
    graphQLPlayground: "/api/graphql-playground",
  },
  secret:
    process.env.PAYLOAD_SECRET ??
    "development-only-change-this-payload-secret-hmi-saintek",
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});
