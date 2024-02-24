import { NeonQueryFunction, neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql: NeonQueryFunction<boolean, boolean> = neon(process.env.NEON_DATABASE_URL! as string);
const db = drizzle(sql);

export default db;