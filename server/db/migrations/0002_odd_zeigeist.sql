ALTER TABLE "resume" ADD COLUMN "user_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "resume" ADD COLUMN "resume_data" json NOT NULL;--> statement-breakpoint
ALTER TABLE "resume" ADD CONSTRAINT "resume_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;