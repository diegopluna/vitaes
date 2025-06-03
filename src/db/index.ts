import { env } from "@/env/server";
import { drizzle as neon } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export const db = neon(env.DATABASE_URL, { schema });
