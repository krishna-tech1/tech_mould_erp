CREATE TABLE IF NOT EXISTS "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"portal" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "roles_name_unique" UNIQUE("name")
);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "modules" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	CONSTRAINT "modules_name_unique" UNIQUE("name")
);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "permissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "permissions_name_unique" UNIQUE("name")
);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "role_permissions" (
	"role_id" integer NOT NULL REFERENCES "public"."roles"("id") ON DELETE cascade,
	"module_id" integer NOT NULL REFERENCES "public"."modules"("id") ON DELETE cascade,
	"permission_id" integer NOT NULL REFERENCES "public"."permissions"("id") ON DELETE cascade,
	PRIMARY KEY("role_id", "module_id", "permission_id")
);
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "user_roles" (
	"user_id" integer NOT NULL REFERENCES "public"."users"("id") ON DELETE cascade,
	"role_id" integer NOT NULL REFERENCES "public"."roles"("id") ON DELETE cascade,
	PRIMARY KEY("user_id", "role_id")
);
--> statement-breakpoint

CREATE INDEX IF NOT EXISTS "role_permissions_role_idx" ON "role_permissions" USING btree ("role_id");
--> statement-breakpoint

CREATE INDEX IF NOT EXISTS "role_permissions_module_idx" ON "role_permissions" USING btree ("module_id");
--> statement-breakpoint

CREATE INDEX IF NOT EXISTS "user_roles_user_idx" ON "user_roles" USING btree ("user_id");
--> statement-breakpoint

INSERT INTO permissions (name)
VALUES ('VIEW'), ('EDIT'), ('DELETE')
ON CONFLICT (name) DO NOTHING;
--> statement-breakpoint

INSERT INTO modules (name, description)
VALUES
('Dashboard', 'Main overview of system metrics and real-time performance tracking.'),
('Operations & Analytics', 'Statistical breakdown of workshop operations and shop-floor efficiency.'),
('Inquiry & Quotation', 'Lead generation, pipeline management, and client price estimation.'),
('Projects & Workflow', 'Live manufacturing project tracking and milestone management.'),
('Design & Revision', 'Technical CAD drawings, visual assets, and design version control.'),
('Clients', 'Client management and corporate relationships.'),
('Communication', 'Project-based messaging and file sharing.'),
('Task Management', 'Task assignment and kanban workflow.'),
('Data Management', 'Data administration and system utilities.'),
('Reports', 'Business intelligence and analytics reports.'),
('Role Management', 'System access and permission configuration.'),
('Audit Log', 'System activity tracking and audit trail.')
ON CONFLICT (name) DO NOTHING;
--> statement-breakpoint

INSERT INTO roles (name, description, portal)
VALUES
('Admin', 'Full system access with all permissions', 'admin'),
('Management', 'Executive level access to key business functions', 'management'),
('Project Leader', 'Project management and team oversight', 'management'),
('Team Leader', 'Team coordination and task management', 'management'),
('Employee', 'Basic access to assigned tasks and projects', 'management'),
('Client', 'Client portal access to own projects', 'client')
ON CONFLICT (name) DO NOTHING;
--> statement-breakpoint

INSERT INTO role_permissions (role_id, module_id, permission_id)
SELECT r.id, m.id, p.id
FROM roles r
JOIN modules m ON true
JOIN permissions p ON true
WHERE r.name = 'Admin'
ON CONFLICT DO NOTHING;
