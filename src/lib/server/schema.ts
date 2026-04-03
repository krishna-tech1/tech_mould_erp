import {
    pgEnum,
    pgTable,
    serial,
    text,
    integer,
    timestamp,
    index,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    role: text("role").notNull(),
    passwordHash: text("password_hash").notNull(),
});

export const sessions = pgTable(
    "sessions",
    {
        token: text("token").primaryKey(),
        userId: integer("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
    },
    (t) => [index("sessions_user_id_idx").on(t.userId)],
);
