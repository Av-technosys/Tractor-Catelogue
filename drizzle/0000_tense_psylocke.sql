CREATE TABLE "categories" (
	"id" serial PRIMARY KEY NOT NULL,
	"category_name" varchar(255) NOT NULL,
	"description" text,
	"image_url" text
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_name" varchar(255) NOT NULL,
	"engine_type" varchar(100),
	"scott_part_no" varchar(100),
	"oe_part_no" varchar(100),
	"pieces" integer,
	"metal_type" varchar(100),
	"std_classification" varchar(100),
	"price" integer,
	"category" varchar(100),
	"description" text,
	"image_url" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(100) NOT NULL,
	"email" varchar(255) NOT NULL,
	"password_hash" text NOT NULL
);
