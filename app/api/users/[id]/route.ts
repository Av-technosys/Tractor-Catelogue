import { db } from "@/src/db/client";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(req: Request, { params }) {
  try {
    const resolvedParams = await params;
    const id = resolvedParams.id;
    const body = await req.json();
    const updated = await db
      .update(users)
      .set({
        password: body.password,
      })
      .where(eq(users.id, id))
      .returning();
    return NextResponse.json({
      success: true,
      data: updated[0],
    });
  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, { params }) {
  try {
    const resolvedParams = await params;
    const userId = resolvedParams.id;
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "Missing ID" },
        { status: 400 }
      );
    }
    const deleted = await db
      .delete(users)
      .where(eq(users.id, userId))
      .returning();

    return NextResponse.json({
      success: true,
      data: deleted[0],
    });
  } catch (error) {
    console.error("Delete Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
