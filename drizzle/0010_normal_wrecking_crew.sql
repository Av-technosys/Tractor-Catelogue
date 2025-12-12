ALTER TABLE "products" ALTER COLUMN "product_name" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "engine_type" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "engine_type" SET NOT NULL;