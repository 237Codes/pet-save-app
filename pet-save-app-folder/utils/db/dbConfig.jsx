import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

// Create a new Neon instance with the connection string

const sql = neon(
    process.env.DATABASE_URL
);
export const db = drizzle(sql, { schema });   // Create and export a new Drizzle instance with the schema
