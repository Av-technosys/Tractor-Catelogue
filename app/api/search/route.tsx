import { NextResponse } from "next/server";
import { db } from "@/src/db/client";
import { products, categories } from "@/src/db/schema";
import { ilike } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  if (!q) {
    return NextResponse.json({ products: [], categories: [] });
  }

  const foundProducts = await db
    .select({
      id: products.id,
      name: products.productName,
    })
    .from(products)
    .where(ilike(products.productName, `%${q}%`))
    .limit(5);

  const foundCategories = await db
    .select({
      id: categories.id,
      name: categories.categoryName,
    })
    .from(categories)
    .where(ilike(categories.categoryName, `%${q}%`))
    .limit(5);

  return NextResponse.json({
    products: foundProducts,
    categories: foundCategories,
  });
}
