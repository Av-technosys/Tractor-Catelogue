import { db } from "@/src/db/client";
import { products } from "@/src/db/schema";
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

  const categoryProducts = await db
    .select()
    .from(products)
    .where(eq(products.categoryId, categoryId));

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
            <Card key={item.id} className="rounded-xl overflow-hidden">
              <CardHeader className="p-0">
                <div className="flex justify-center">
                  <Image
                    src={item.imageUrl ?? "/placeholder.png"}
                    alt={item.productName}
                    width={300}
                    height={200}
                    className="object-cover"
                  />
                </div>
              </CardHeader>

              <CardContent className="p-4">
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
