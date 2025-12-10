import { NextResponse } from "next/server";
import { db } from "@/src/db/client";
import { products } from "@/src/db/schema";
import { asc, eq } from "drizzle-orm";

// CREATE PRODUCT

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newProduct = await db
      .insert(products)
      .values({
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
        isActive: body.isActive
      })
      .returning();

    return NextResponse.json({ success: true, data: newProduct[0] });
  } catch (error) {
    console.error("PRODUCT POST ERROR:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

// GET ALL PRODUCTS
// export async function GET() {
//   try {
//     const data = await db.select().from(products);
//     return NextResponse.json({ success: true, data });
//   } catch (error) {
//     console.error("PRODUCT GET ERROR:", error);
//     return NextResponse.json({ success: false, error }, { status: 500 });
//   } 
// }


// final working 

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (id) {
      const data = await db
        .select()
        .from(products)
        .orderBy(asc(products.productName))
        .where(eq(products.id, Number(id)));

      return NextResponse.json({ success: true, data: data[0] });
    }

    const data = await db.select().from(products);
    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error("PRODUCT GET ERROR:", error);
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

