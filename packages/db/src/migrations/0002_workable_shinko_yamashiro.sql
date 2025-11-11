ALTER TABLE "resume" RENAME COLUMN "user_id" TO "user_email";--> statement-breakpoint
ALTER TABLE "resume" DROP CONSTRAINT "uk_resume_name_user_id";--> statement-breakpoint
ALTER TABLE "resume" DROP CONSTRAINT "resume_user_id_user_id_fk";
--> statement-breakpoint
DROP INDEX "idx_resume_user_id";--> statement-breakpoint
ALTER TABLE "resume" ADD CONSTRAINT "resume_user_email_user_email_fk" FOREIGN KEY ("user_email") REFERENCES "public"."user"("email") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_resume_user_email" ON "resume" USING btree ("user_email");--> statement-breakpoint
ALTER TABLE "resume" ADD CONSTRAINT "uk_resume_name_user_email" UNIQUE("name","user_email");