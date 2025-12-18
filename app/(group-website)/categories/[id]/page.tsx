import { db } from "@/src/db/client";
import { products, productImages } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import Image from "next/image";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default async function CategoryPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;
  const categoryId = Number(id);
  // Select products and left join product images, then group images per product
  const rows = await db
    .select({
      productId: products.id,
      productName: products.productName,
      scottPartNo: products.scottPartNo,
      oePartNo: products.oePartNo,
      price: products.price,
      isActive: products.isActive,
      metalType: products.metalType,
      imageId: productImages.id,
      filePath: productImages.filePath,
    })
    .from(products)
    .leftJoin(productImages, eq(products.id, productImages.productId))
    .where(eq(products.categoryId, categoryId));

  type CategoryProduct = {
    id: number;
    productName: string;
    scottPartNo?: string | number | null;
    oePartNo?: string | number | null;
    price?: number | null;
    isActive?: boolean | null;
    metalType?: string | null;
    images: { id: number; filePath: string }[];
  };

  const map = new Map<number, CategoryProduct>();
  for (const r of rows) {
    if (!map.has(r.productId)) {
      map.set(r.productId, {
        id: r.productId,
        productName: r.productName,
        scottPartNo: r.scottPartNo,
        oePartNo: r.oePartNo,
        price: r.price,
        isActive: r.isActive,
        metalType: r.metalType,
        images: [],
      });
    }

    if (r.filePath && r.imageId) {
      const p = map.get(r.productId);
      if (p) {
        p.images.push({ id: r.imageId, filePath: r.filePath });
      }
    }
  }

  const categoryProducts = Array.from(map.values());

  const getImageUrl = (path?: string | null) => {
    if (!path) return "/placeholder.png";
    const clean = path.startsWith("/") ? path.slice(1) : path;
    return `https://ik.imagekit.io/y3ypqdyxmq/${clean}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Products in Category</h1>

      {categoryProducts.length === 0 && (
        <p>No products in this category.</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryProducts
          .filter((item) => item.isActive)
          .map((item) => (
            <Card key={item.id} className="rounded-xl py-0 pb-4 px-0 overflow-hidden">
              <CardHeader className="p-0">
                <div className="flex justify-center">
                  <Image
                    src={
                      item.images && item.images.length
                        ? getImageUrl(item.images[0].filePath)
                        : "/placeholder.png"
                    }
                    alt={item.productName}
                    width={400}
                    height={200}
                    className="object-cover"
                  />
                </div>
              </CardHeader>

              <CardContent className="">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">
                    {item.productName}
                  </h3>
                  <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">
                    ₹{item.price}
                  </span>
                </div>

                <p className="text-sm text-gray-600 mt-1">
                  SCOTT: {item.scottPartNo}
                </p>
                <p className="text-sm text-gray-600">
                  OE: {item.oePartNo}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {item.metalType}
                </p>


                <Link href={`/products/${item.id}`}>
                  <Button
                    variant="outline"
                    className="w-full mt-4 hover:bg-orange-400 hover:text-white"
                  >
                    View Details
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}
