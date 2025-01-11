ALTER TABLE "posts" ALTER COLUMN "updatedAt" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "posts" ALTER COLUMN "updatedAt" DROP NOT NULL;