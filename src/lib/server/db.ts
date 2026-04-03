import { neon } from "@neondatabase/serverless";
import postgres from "postgres";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import { DATABASE_URL, NEON_DATABASE_URL } from "$env/static/private";

export const db = NEON_DATABASE_URL
    ? drizzleNeon(neon(NEON_DATABASE_URL))
    : drizzlePostgres(postgres(DATABASE_URL));
