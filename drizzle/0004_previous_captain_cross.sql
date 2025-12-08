ALTER TABLE "categories" ADD COLUMN "icon" varchar(100) NOT NULL DEFAULT 'Box';--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "is_active" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "categories" ADD COLUMN "created_at" timestamp DEFAULT now();