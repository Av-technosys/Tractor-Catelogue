import { db } from "@/src/db/client";
import { products } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(req: Request, {params}) {
  try {
    const { id } = await params;  
    const body = await req.json();

    const updated = await db
      .update(products)
      .set({
        productName: body.productName,
        engineType: body.engineType,
        scottPartNo: body.scottPartNo,
        oePartNo: body.oePartNo,
        pieces: body.pieces,
        metalType: body.metalType,
        stdClassification: body.stdClassification,
        price: body.price,
        category: body.category,
        description: body.description,
        imageUrl: body.imageUrl,
        isActive: body.isActive,
      })
      .where(eq(products.id, id))  
      .returning();

    return NextResponse.json({
      success: true,
      data: updated[0],
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request, {params}) {
  try {
    const { id } = await params;  
    // const { searchParams } = new URL(req.url);
    // const id = Number(searchParams.get("id"));

    const deleted = await db
      .delete(products)
      .where(eq(products.id,id))
      .returning();

    return NextResponse.json({
      success: true,
      data: deleted[0],
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error },
      { status: 500 }
    );
  }
}