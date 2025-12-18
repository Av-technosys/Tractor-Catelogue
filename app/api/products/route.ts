import { NextResponse } from "next/server";
import { db } from "@/src/db/client";
import { products, productImages } from "@/src/db/schema";
import { desc, eq } from "drizzle-orm";

// Types for API responses and inputs
type ImageInput = { filePath: string; fileId: string };
type ProductWithImages = {
  id: number;
  productName: string;
  engineType?: string;
  scottPartNo?: string | number;
  oePartNo?: string | number;
  pieces?: number;
  metalType?: string;
  stdClassification?: string;
  description?: string;
  price?: number;
  isActive?: boolean;
  images: { id: number; filePath: string }[];
};
type ProductSummary = {
  id: number;
  productName: string;
  scottPartNo?: string | number;
  oePartNo?: string | number;
  metalType?: string;
  price?: number;
  isActive?: boolean;
  images: { id: number; filePath: string }[];
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    await db.transaction(async (tx) => {
      // 1️⃣ Insert product
      const [product] = await tx
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
          categoryId: Number(body.categoryId),
          description: body.description,
          isActive: body.isActive,
        })
        .returning();

      // 2️⃣ Insert images (multiple)
      if (body.images?.length) {
        await tx.insert(productImages).values(
          body.images.map((img: ImageInput) => ({
            productId: product.id,
            filePath: img.filePath, // products/abc.png
            fileId: img.fileId, // ImageKit fileId
          }))
        );
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("PRODUCT POST ERROR:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

// export async function GET(req: Request) {
//   try {
//     const { searchParams } = new URL(req.url);
//     const id = searchParams.get("id");
//     if (id) {
//       const data = await db
//         .select()
//         .from(products)
//         .where(eq(products.id, Number(id)));

//       return NextResponse.json({ success: true, data: data[0] });
//     }

//     const data = await db.select().from(products).orderBy(desc(products));
//     return NextResponse.json({ success: true, data });
//   } catch (error) {
//     console.error("PRODUCT GET ERROR:", error);
//     return NextResponse.json({ success: false, error }, { status: 500 });
//   }
// }
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    // If id provided, return a single product with images
    if (id) {
      const rows = await db
        .select({
          productId: products.id,
          productName: products.productName,
          engineType: products.engineType,
          scottPartNo: products.scottPartNo,
          oePartNo: products.oePartNo,
          pieces: products.pieces,
          metalType: products.metalType,
          stdClassification: products.stdClassification,
          price: products.price,
          description: products.description,
          isActive: products.isActive,

          imageId: productImages.id,
          filePath: productImages.filePath,
        })
        .from(products)
        .leftJoin(productImages, eq(products.id, productImages.productId))
        .where(eq(products.id, Number(id)));

      if (!rows || rows.length === 0) {
        return NextResponse.json({ success: true, data: null });
      }

      const first = rows[0];
      const product: ProductWithImages = {
        id: first.productId,
        productName: first.productName,
        engineType: first.engineType ?? undefined,
        scottPartNo: first.scottPartNo ?? undefined,
        oePartNo: first.oePartNo ?? undefined,
        pieces: first.pieces ?? undefined,
        metalType: first.metalType ?? undefined,
        stdClassification: first.stdClassification ?? undefined,
        price: first.price ?? undefined,
        description: first.description ?? undefined,
        isActive: first.isActive ?? undefined,
        images: [],
      };

      for (const row of rows) {
        if (row.filePath && row.imageId) {
          product.images.push({ id: row.imageId, filePath: row.filePath });
        }
      }

      return NextResponse.json({ success: true, data: product });
    }

    // Otherwise return all products grouped with images
    const rows = await db
      .select({
        productId: products.id,
        productName: products.productName,
        scottPartNo: products.scottPartNo,
        oePartNo: products.oePartNo,
        metalType: products.metalType,
        price: products.price,
        isActive: products.isActive,

        imageId: productImages.id,
        filePath: productImages.filePath,
      })
      .from(products)
      .leftJoin(productImages, eq(products.id, productImages.productId))
      .orderBy(desc(products.id));

    const productMap = new Map<number, ProductSummary>();

    for (const row of rows) {
      if (!productMap.has(row.productId)) {
        productMap.set(row.productId, {
          id: row.productId,
          productName: row.productName,
          scottPartNo: row.scottPartNo ?? undefined,
          oePartNo: row.oePartNo ?? undefined,
          metalType: row.metalType ?? undefined,
          price: row.price ?? undefined,
          isActive: row.isActive ?? undefined,
          images: [],
        });
      }

      if (row.filePath && row.imageId) {
        const entry = productMap.get(row.productId)!;
        entry.images.push({ id: row.imageId, filePath: row.filePath });
      }
    }

    return NextResponse.json({
      success: true,
      data: Array.from(productMap.values()),
    });
  } catch (error) {
    console.error("PRODUCT GET ERROR:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
