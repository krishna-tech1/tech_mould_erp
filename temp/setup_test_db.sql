-- Create schema for role management (idempotent)
BEGIN;

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
INSERT INTO roles (name, description) VALUES 
('Admin', 'Full system access with all permissions'),
('Management', 'Executive level access to key business functions'),
('Project Leader', 'Project management and team oversight'),
('Team Leader', 'Team coordination and task management'),
('Employee', 'Basic access to assigned tasks and projects'),
('Client', 'Client portal access to own projects')
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