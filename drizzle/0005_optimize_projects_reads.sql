ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "description" text DEFAULT '' NOT NULL;
--> statement-breakpoint
UPDATE "projects" p
SET "description" = d."description"
FROM "project_details" d
WHERE d."project_id" = p."id"
  AND COALESCE(p."description", '') = '';
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "projects_category_idx" ON "projects" USING btree ("category");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "projects_due_date_idx" ON "projects" USING btree ("due_date");
