import { db } from "@/src/db/client";
import { products, productImages } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import ImageKit from "imagekit";

export async function PUT(req: Request, { params }) {
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
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }) {
  try {
    const resolvedParams = await params;
    const productId = resolvedParams.id;

    if (!productId) {
      return NextResponse.json(
        { success: false, error: "Product ID is missing" },
        { status: 400 }
      );
    }
    // Initialize ImageKit with server-side credentials
    const imagekit = new ImageKit({
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
    });

    // Run deletions inside a transaction
    const result = await db.transaction(async (tx) => {
      // 1) fetch images for this product
      const images = await tx
        .select()
        .from(productImages)
        .where(eq(productImages.productId, Number(productId)));

      // 2) delete files from ImageKit (best-effort)
      for (const img of images) {
        try {
          if (img.fileId) {
              // imagekit.deleteFile supports promise
              await imagekit.deleteFile(img.fileId);
          }
        } catch (err) {
          console.error("ImageKit delete error for fileId", img.fileId, err);
        }
      }

      // 3) delete product images rows
      await tx
        .delete(productImages)
        .where(eq(productImages.productId, Number(productId)));

      // 4) delete product
      const deleted = await tx
        .delete(products)
        .where(eq(products.id, Number(productId)))
        .returning();

      return deleted;
    });

    if (!result || result.length === 0) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result[0] });
  } catch (error) {
    console.error("Product Delete Error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
