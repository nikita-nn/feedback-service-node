CREATE TYPE "public"."categoryEnum" AS ENUM('Status', 'Functional', 'Bug', 'UI', 'Performance', 'Default');--> statement-breakpoint
CREATE TYPE "public"."statusEnum" AS ENUM('Idea', 'Planned', 'In work', 'Completed', 'Started');--> statement-breakpoint
CREATE TABLE "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL,
	"category" "categoryEnum" DEFAULT 'Default' NOT NULL,
	"status" "statusEnum" DEFAULT 'Started' NOT NULL,
	"author_id" integer,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar NOT NULL,
	"avatar" varchar NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;