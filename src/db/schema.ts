import { pgTable, serial, text, integer, varchar } from "drizzle-orm/pg-core";

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
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  categoryName: varchar("category_name", { length: 255 }).notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
});
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  passwordHash: text("password_hash").notNull(),
});
