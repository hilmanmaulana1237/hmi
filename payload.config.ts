import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
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
const parsedDatabasePoolMax = Number(process.env.DATABASE_POOL_MAX);
const databasePoolMax =
  Number.isFinite(parsedDatabasePoolMax) && parsedDatabasePoolMax > 0
    ? parsedDatabasePoolMax
    : 1;

let databaseConnectionString =
  process.env.DATABASE_URL ??
  "postgresql://postgres:postgres@localhost:5432/hmi";

if (
  databaseConnectionString.includes("sslmode=require") &&
  !databaseConnectionString.includes("uselibpqcompat")
) {
  databaseConnectionString += databaseConnectionString.includes("?")
    ? "&uselibpqcompat=true"
    : "?uselibpqcompat=true";
}

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
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN,
    }),
  ],
  db: postgresAdapter({
    push: process.env.PAYLOAD_DB_PUSH === "true",
    pool: {
      connectionString: databaseConnectionString,
      connectionTimeoutMillis: databaseConnectionTimeoutMs,
      max: databasePoolMax,
      ssl:
        databaseConnectionString.includes("supabase") ||
        databaseConnectionString.includes("neon.tech") ||
        databaseConnectionString.includes("sslmode=require")
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
