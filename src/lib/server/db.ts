import { neon } from "@neondatabase/serverless";
import postgres from "postgres";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzlePostgres } from "drizzle-orm/postgres-js";
import { env } from "$env/dynamic/private";

function createLocalPostgresClient(connectionString: string) {
    const url = new URL(connectionString);

    return postgres({
        host: url.hostname,
        port: url.port ? Number(url.port) : 5432,
        database: decodeURIComponent(url.pathname.replace(/^\//, "")),
        username: decodeURIComponent(url.username),
        password: decodeURIComponent(url.password),
    });
}

const databaseUrl = env.DATABASE_URL;

export const db = env.NEON_DATABASE_URL
    ? drizzleNeon(neon(env.NEON_DATABASE_URL))
    : drizzlePostgres(createLocalPostgresClient(databaseUrl ?? "postgresql://postgres:postgres@localhost:5432/postgres"));
