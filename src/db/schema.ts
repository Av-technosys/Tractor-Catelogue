import {
  pgTable,
  serial,
  text,
  integer,
  varchar,
  timestamp,
  boolean,
} from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),

  productName: varchar("product_name", { length: 255 }).notNull(),
  engineType: varchar("engine_type", { length: 100 }),
  scottPartNo: varchar("scott_part_no", { length: 100 }),
  oePartNo: varchar("oe_part_no", { length: 100 }),
  pieces: integer("pieces"),
  metalType: varchar("metal_type", { length: 100 }),
  stdClassification: varchar("std_classification", { length: 100 }),
  price: integer("price"),
  category: varchar("category", { length: 100 }),

  description: text("description"),
  imageUrl: text("image_url"),
});
// export const categories = pgTable("categories", {
//   id: serial("id").primaryKey(),
//   categoryName: varchar("category_name", { length: 255 }).notNull(),
//   description: text("description"),
//   imageUrl: text("image_url"),
// });

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  categoryName: varchar("category_name", { length: 255 }).notNull(),
  description: text("description"),
  isActive: boolean("is_active").notNull().default(true),
});
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).unique().notNull(),
  password: text("password"),
  confirm_password: text("confirm_password"),
  createdAt: timestamp("created_at").defaultNow(),
});
