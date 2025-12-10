import { NextResponse } from "next/server";
import { db } from "@/src/db/client";
import { categories } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(req: Request, { params }) {
  try {
    
  
    const {id}= await params;
   
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

    return NextResponse.json({ success: true,data: updated[0] });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
export async function DELETE(req: Request, { params }) {
  try {
    const {id} = await params;

    const deleted = await db
      .delete(categories)
      .where(eq(categories.id, id))
      .returning();

    return NextResponse.json({
      success: true,
      message: "Category Deleted Successfully",
      data: deleted[0],
    });

  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}
