import {
    pgTable,
    serial,
    text,
    integer,
    timestamp,
    index,
    primaryKey,
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

// Role Management Tables
export const roles = pgTable("roles", {
    id: serial("id").primaryKey(),
    name: text("name").notNull().unique(),
    description: text("description"),
    portal: text("portal").notNull(), // 'admin', 'management', 'client'
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
});

export const modules = pgTable("modules", {
    id: serial("id").primaryKey(),
    name: text("name").notNull().unique(),
    description: text("description"),
});

export const permissions = pgTable("permissions", {
    id: serial("id").primaryKey(),
    name: text("name").notNull().unique(), // 'VIEW', 'EDIT', 'DELETE'
});

export const rolePermissions = pgTable(
    "role_permissions",
    {
        roleId: integer("role_id")
            .notNull()
            .references(() => roles.id, { onDelete: "cascade" }),
        moduleId: integer("module_id")
            .notNull()
            .references(() => modules.id, { onDelete: "cascade" }),
        permissionId: integer("permission_id")
            .notNull()
            .references(() => permissions.id, { onDelete: "cascade" }),
    },
    (t) => [
        primaryKey({ columns: [t.roleId, t.moduleId, t.permissionId] }),
        index("role_permissions_role_idx").on(t.roleId),
        index("role_permissions_module_idx").on(t.moduleId),
    ],
);

export const userRoles = pgTable(
    "user_roles",
    {
        userId: integer("user_id")
            .notNull()
            .references(() => users.id, { onDelete: "cascade" }),
        roleId: integer("role_id")
            .notNull()
            .references(() => roles.id, { onDelete: "cascade" }),
    },
    (t) => [
        primaryKey({ columns: [t.userId, t.roleId] }),
        index("user_roles_user_idx").on(t.userId),
    ],
);

export const projects = pgTable(
    "projects",
    {
        id: serial("id").primaryKey(),
        code: text("code").notNull().unique(),
        title: text("title").notNull(),
        clientName: text("client_name").notNull(),
        category: text("category").notNull(),
        priority: text("priority").notNull(),
        status: text("status").notNull().default("HEALTHY"),
        budgetUsd: integer("budget_usd").notNull().default(0),
        progressPercent: integer("progress_percent").notNull().default(0),
        startDate: timestamp("start_date", { withTimezone: false }).notNull(),
        dueDate: timestamp("due_date", { withTimezone: false }).notNull(),
        createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    },
    (t) => [
        index("projects_status_idx").on(t.status),
        index("projects_created_at_idx").on(t.createdAt),
    ],
);

export const projectDetails = pgTable(
    "project_details",
    {
        projectId: integer("project_id")
            .primaryKey()
            .references(() => projects.id, { onDelete: "cascade" }),
        description: text("description").notNull().default(""),
    },
);

export const projectPhases = pgTable(
    "project_phases",
    {
        id: serial("id").primaryKey(),
        projectId: integer("project_id")
            .notNull()
            .references(() => projects.id, { onDelete: "cascade" }),
        name: text("name").notNull(),
        position: integer("position").notNull(),
        status: text("status").notNull().default("pending"),
    },
    (t) => [index("project_phases_project_idx").on(t.projectId)],
);

export const projectTasks = pgTable(
    "project_tasks",
    {
        id: serial("id").primaryKey(),
        projectId: integer("project_id")
            .notNull()
            .references(() => projects.id, { onDelete: "cascade" }),
        lane: text("lane").notNull(),
        title: text("title").notNull(),
        priority: text("priority").notNull(),
        description: text("description").notNull().default(""),
        color: text("color").notNull().default("#4ecdc4"),
        dueDate: timestamp("due_date", { withTimezone: false }),
        machine: text("machine"),
        alert: text("alert"),
        position: integer("position").notNull().default(0),
    },
    (t) => [index("project_tasks_project_idx").on(t.projectId)],
);

export const projectAuditLogs = pgTable(
    "project_audit_logs",
    {
        id: serial("id").primaryKey(),
        projectId: integer("project_id")
            .notNull()
            .references(() => projects.id, { onDelete: "cascade" }),
        eventType: text("event_type").notNull(),
        message: text("message").notNull(),
        actor: text("actor").notNull().default("system"),
        createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    },
    (t) => [index("project_audit_logs_project_idx").on(t.projectId)],
);
