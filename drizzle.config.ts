/// <reference types="node" />
import { defineConfig } from "drizzle-kit";

export default defineConfig({
    out: "./drizzle",
    schema: "./src/lib/server/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: process.env.NEON_DATABASE_URL || process.env.DATABASE_URL!,
    },
});
