import { NextResponse } from "next/server";
import { db } from "@/src/db/client";
import { categories } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(req: Request, { params }: any) {
  try {
    const id = Number(params.id);
    const body = await req.json();

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
