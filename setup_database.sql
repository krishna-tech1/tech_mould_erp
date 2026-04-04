-- Create "ERP Project" database if it doesn't exist
CREATE DATABASE IF NOT EXISTS "ERP Project";

-- Create schema for role management (idempotent)
BEGIN;

-- Users table
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"role" text NOT NULL,
	"password_hash" text NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);

-- Sessions table
CREATE TABLE IF NOT EXISTS "sessions" (
	"token" text PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);

ALTER TABLE "sessions" ADD CONSTRAINT "sessions_user_id_users_id_fk" 
FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;

CREATE INDEX IF NOT EXISTS "sessions_user_id_idx" ON "sessions" USING btree ("user_id");

-- Roles table
CREATE TABLE IF NOT EXISTS "roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"portal" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	CONSTRAINT "roles_name_unique" UNIQUE("name")
);

-- Modules table
CREATE TABLE IF NOT EXISTS "modules" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	CONSTRAINT "modules_name_unique" UNIQUE("name")
);

-- Permissions table
CREATE TABLE IF NOT EXISTS "permissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	CONSTRAINT "permissions_name_unique" UNIQUE("name")
);

-- Role_permissions junction table
CREATE TABLE IF NOT EXISTS "role_permissions" (
	"role_id" integer NOT NULL,
	"module_id" integer NOT NULL,
	"permission_id" integer NOT NULL,
	PRIMARY KEY("role_id", "module_id", "permission_id")
);

ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_roles_id_fk" 
FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_module_id_modules_id_fk" 
FOREIGN KEY ("module_id") REFERENCES "public"."modules"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_permissions_id_fk" 
FOREIGN KEY ("permission_id") REFERENCES "public"."permissions"("id") ON DELETE cascade ON UPDATE no action;

CREATE INDEX IF NOT EXISTS "role_permissions_role_idx" ON "role_permissions" USING btree ("role_id");
CREATE INDEX IF NOT EXISTS "role_permissions_module_idx" ON "role_permissions" USING btree ("module_id");

-- User roles junction table
CREATE TABLE IF NOT EXISTS "user_roles" (
	"user_id" integer NOT NULL,
	"role_id" integer NOT NULL,
	PRIMARY KEY("user_id", "role_id")
);

ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_users_id_fk" 
FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;

ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_roles_id_fk" 
FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE cascade ON UPDATE no action;

CREATE INDEX IF NOT EXISTS "user_roles_user_idx" ON "user_roles" USING btree ("user_id");

-- Insert permissions if not exists
INSERT INTO permissions (name) VALUES ('VIEW') ON CONFLICT (name) DO NOTHING;
INSERT INTO permissions (name) VALUES ('EDIT') ON CONFLICT (name) DO NOTHING;
INSERT INTO permissions (name) VALUES ('DELETE') ON CONFLICT (name) DO NOTHING;

-- Insert modules if not exists
INSERT INTO modules (name, description) VALUES 
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

-- Insert default roles if not exists
INSERT INTO roles (name, description, portal) VALUES 
('Admin', 'Full system access with all permissions', 'admin'),
('Management', 'Executive level access to key business functions', 'management'),
('Project Leader', 'Project management and team oversight', 'management'),
('Team Leader', 'Team coordination and task management', 'management'),
('Employee', 'Basic access to assigned tasks and projects', 'management'),
('Client', 'Client portal access to own projects', 'client')
ON CONFLICT (name) DO NOTHING;

-- Grant Admin all permissions on all modules
INSERT INTO role_permissions (role_id, module_id, permission_id)
SELECT 
    (SELECT id FROM roles WHERE name = 'Admin'),
    m.id,
    p.id
FROM modules m, permissions p
ON CONFLICT (role_id, module_id, permission_id) DO NOTHING;

-- Grant basic permissions to Management roles
INSERT INTO role_permissions (role_id, module_id, permission_id) VALUES
-- Management role - VIEW, EDIT on most modules
((SELECT id FROM roles WHERE name = 'Management'), (SELECT id FROM modules WHERE name = 'Dashboard'), (SELECT id FROM permissions WHERE name = 'VIEW')),
((SELECT id FROM roles WHERE name = 'Management'), (SELECT id FROM modules WHERE name = 'Dashboard'), (SELECT id FROM permissions WHERE name = 'EDIT')),
((SELECT id FROM roles WHERE name = 'Management'), (SELECT id FROM modules WHERE name = 'Operations & Analytics'), (SELECT id FROM permissions WHERE name = 'VIEW')),
((SELECT id FROM roles WHERE name = 'Management'), (SELECT id FROM modules WHERE name = 'Operations & Analytics'), (SELECT id FROM permissions WHERE name = 'EDIT')),
((SELECT id FROM roles WHERE name = 'Management'), (SELECT id FROM modules WHERE name = 'Inquiry & Quotation'), (SELECT id FROM permissions WHERE name = 'VIEW')),
((SELECT id FROM roles WHERE name = 'Management'), (SELECT id FROM modules WHERE name = 'Inquiry & Quotation'), (SELECT id FROM permissions WHERE name = 'EDIT')),
((SELECT id FROM roles WHERE name = 'Management'), (SELECT id FROM modules WHERE name = 'Projects & Workflow'), (SELECT id FROM permissions WHERE name = 'VIEW')),
((SELECT id FROM roles WHERE name = 'Management'), (SELECT id FROM modules WHERE name = 'Projects & Workflow'), (SELECT id FROM permissions WHERE name = 'EDIT')),
((SELECT id FROM roles WHERE name = 'Management'), (SELECT id FROM modules WHERE name = 'Clients'), (SELECT id FROM permissions WHERE name = 'VIEW')),
((SELECT id FROM roles WHERE name = 'Management'), (SELECT id FROM modules WHERE name = 'Clients'), (SELECT id FROM permissions WHERE name = 'EDIT')),
((SELECT id FROM roles WHERE name = 'Management'), (SELECT id FROM modules WHERE name = 'Reports'), (SELECT id FROM permissions WHERE name = 'VIEW')),

-- Project Leader - VIEW and EDIT on Projects, Tasks, Communication
((SELECT id FROM roles WHERE name = 'Project Leader'), (SELECT id FROM modules WHERE name = 'Dashboard'), (SELECT id FROM permissions WHERE name = 'VIEW')),
((SELECT id FROM roles WHERE name = 'Project Leader'), (SELECT id FROM modules WHERE name = 'Projects & Workflow'), (SELECT id FROM permissions WHERE name = 'VIEW')),
((SELECT id FROM roles WHERE name = 'Project Leader'), (SELECT id FROM modules WHERE name = 'Projects & Workflow'), (SELECT id FROM permissions WHERE name = 'EDIT')),
((SELECT id FROM roles WHERE name = 'Project Leader'), (SELECT id FROM modules WHERE name = 'Task Management'), (SELECT id FROM permissions WHERE name = 'VIEW')),
((SELECT id FROM roles WHERE name = 'Project Leader'), (SELECT id FROM modules WHERE name = 'Task Management'), (SELECT id FROM permissions WHERE name = 'EDIT')),
((SELECT id FROM roles WHERE name = 'Project Leader'), (SELECT id FROM modules WHERE name = 'Communication'), (SELECT id FROM permissions WHERE name = 'VIEW')),
((SELECT id FROM roles WHERE name = 'Project Leader'), (SELECT id FROM modules WHERE name = 'Communication'), (SELECT id FROM permissions WHERE name = 'EDIT')),

-- Team Leader - VIEW and EDIT on Tasks and Communication
((SELECT id FROM roles WHERE name = 'Team Leader'), (SELECT id FROM modules WHERE name = 'Dashboard'), (SELECT id FROM permissions WHERE name = 'VIEW')),
((SELECT id FROM roles WHERE name = 'Team Leader'), (SELECT id FROM modules WHERE name = 'Task Management'), (SELECT id FROM permissions WHERE name = 'VIEW')),
((SELECT id FROM roles WHERE name = 'Team Leader'), (SELECT id FROM modules WHERE name = 'Task Management'), (SELECT id FROM permissions WHERE name = 'EDIT')),
((SELECT id FROM roles WHERE name = 'Team Leader'), (SELECT id FROM modules WHERE name = 'Communication'), (SELECT id FROM permissions WHERE name = 'VIEW')),
((SELECT id FROM roles WHERE name = 'Team Leader'), (SELECT id FROM modules WHERE name = 'Communication'), (SELECT id FROM permissions WHERE name = 'EDIT')),

-- Employee - VIEW only on most modules
((SELECT id FROM roles WHERE name = 'Employee'), (SELECT id FROM modules WHERE name = 'Dashboard'), (SELECT id FROM permissions WHERE name = 'VIEW')),
((SELECT id FROM roles WHERE name = 'Employee'), (SELECT id FROM modules WHERE name = 'Projects & Workflow'), (SELECT id FROM permissions WHERE name = 'VIEW')),
((SELECT id FROM roles WHERE name = 'Employee'), (SELECT id FROM modules WHERE name = 'Task Management'), (SELECT id FROM permissions WHERE name = 'VIEW')),
((SELECT id FROM roles WHERE name = 'Employee'), (SELECT id FROM modules WHERE name = 'Task Management'), (SELECT id FROM permissions WHERE name = 'EDIT')),
((SELECT id FROM roles WHERE name = 'Employee'), (SELECT id FROM modules WHERE name = 'Communication'), (SELECT id FROM permissions WHERE name = 'VIEW')),

-- Client - VIEW only on their own projects
((SELECT id FROM roles WHERE name = 'Client'), (SELECT id FROM modules WHERE name = 'Dashboard'), (SELECT id FROM permissions WHERE name = 'VIEW')),
((SELECT id FROM roles WHERE name = 'Client'), (SELECT id FROM modules WHERE name = 'Projects & Workflow'), (SELECT id FROM permissions WHERE name = 'VIEW')),
((SELECT id FROM roles WHERE name = 'Client'), (SELECT id FROM modules WHERE name = 'Communication'), (SELECT id FROM permissions WHERE name = 'VIEW'))
ON CONFLICT (role_id, module_id, permission_id) DO NOTHING;

COMMIT;

-- Display roles and permissions
SELECT 'ROLES:' as Info;
SELECT id, name, portal FROM roles;

SELECT '' as Info;
SELECT 'PERMISSIONS:' as Info;
SELECT id, name FROM permissions;

SELECT '' as Info;
SELECT 'MODULES:' as Info;
SELECT id, name FROM modules LIMIT 5;

SELECT '' as Info;
SELECT 'ROLE_PERMISSIONS (Sample):' as Info;
SELECT rp.role_id, r.name as role_name, rp.module_id, m.name as module_name, p.name as permission
FROM role_permissions rp
JOIN roles r ON rp.role_id = r.id
JOIN modules m ON rp.module_id = m.id
JOIN permissions p ON rp.permission_id = p.id
LIMIT 10;

-- Connection successful message
SELECT 'DATABASE SETUP COMPLETE ✅' as Status;
