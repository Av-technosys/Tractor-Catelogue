import { NextResponse } from "next/server";
import { db } from "@/src/db/client";
import { categories } from "@/src/db/schema";
import { eq } from "drizzle-orm";

type UpdateCategoryBody = {
  categoryName: string;
  description: string;
  isActive: boolean;
};
export async function PUT(req: Request) {

  try {
    const { searchParams } = new URL(req.url);
    const id = Number(searchParams.get("id"));
    const body: UpdateCategoryBody = await req.json();

    const updated = await db
      .update(categories) 
      .set({
        categoryName: body.categoryName,
        description: body.description,
        isActive: body.isActive,
      })
      .where(eq(categories.id, id))
      .returning();

    return NextResponse.json({ success: true, data: updated[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
