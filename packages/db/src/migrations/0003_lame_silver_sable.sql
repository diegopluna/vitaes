ALTER TABLE "resume" RENAME COLUMN "url" TO "slug";--> statement-breakpoint
ALTER TABLE "resume" DROP CONSTRAINT "resume_url_unique";--> statement-breakpoint
DROP INDEX "idx_resume_url";--> statement-breakpoint
CREATE INDEX "idx_resume_slug" ON "resume" USING btree ("slug");--> statement-breakpoint
ALTER TABLE "resume" ADD CONSTRAINT "resume_slug_unique" UNIQUE("slug");