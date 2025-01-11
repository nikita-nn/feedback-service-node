CREATE TABLE "votes" (
	"id" serial NOT NULL,
	"postId" integer,
	"userId" integer
);
--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_postId_posts_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "votes" ADD CONSTRAINT "votes_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;