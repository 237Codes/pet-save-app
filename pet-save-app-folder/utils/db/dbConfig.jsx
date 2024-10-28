// postgresql://neondb_owner:pd9LsYJXwZ4K@ep-quiet-king-a830o8wa.eastus2.azure.neon.tech/petsavedb?sslmode=require
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });
