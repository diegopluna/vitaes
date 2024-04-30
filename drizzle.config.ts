import type { Config } from "drizzle-kit";
// import * as dotenv from "dotenv";
// dotenv.config();

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.NEON_DATABASE_URL!,
  },
} satisfies Config;
