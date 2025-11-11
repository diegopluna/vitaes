CREATE TABLE "resume" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"user_id" text NOT NULL,
	"data" json,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"is_public" boolean DEFAULT false NOT NULL,
	"url" text NOT NULL,
	CONSTRAINT "resume_url_unique" UNIQUE("url"),
	CONSTRAINT "uk_resume_name_user_id" UNIQUE("name","user_id")
);
--> statement-breakpoint
ALTER TABLE "resume" ADD CONSTRAINT "resume_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_resume_user_id" ON "resume" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_resume_url" ON "resume" USING btree ("url");