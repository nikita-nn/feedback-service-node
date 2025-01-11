ALTER TYPE "public"."categoryEnum" ADD VALUE 'New' BEFORE 'Performance';--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "category" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "category" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "status" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "status" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "author_id" SET NOT NULL;