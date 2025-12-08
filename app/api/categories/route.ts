import { NextResponse } from "next/server";
import { db } from "@/src/db/client";
import { categories } from "@/src/db/schema";

// CREATE CATEGORY
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newCategory = await db
      .insert(categories)
      .values({
        categoryName: body.categoryName,
        description: body.description,
        isActive: body.isActive,
      })
      .returning();

    return NextResponse.json({ success: true, data: newCategory[0] });
  } catch (error) {
    console.error("POST ERROR:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

// GET ALL CATEGORIES
export async function GET() {
  try {
    const data = await db.select().from(categories);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("GET ERROR:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
