import { db } from "@/src/db/client";
import { products } from "@/src/db/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";


export default async function CategoryPage(props: { params: Promise<{ id: string }> }) {
    const { id } = await props.params;   // 🔥 unwrap the promise

    const categoryId = Number(id);

    const categoryProducts = await db
        .select()
        .from(products)
        .where(eq(products.categoryId, categoryId));

    return (
        <div>
            <h1 className="text-3xl font-bold">Products in Category</h1>

            {categoryProducts.length === 0 && <p>No products in this category.</p>}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {categoryProducts.map((product) => (
                    <div key={product.id} className="border rounded p-4 shadow">
                        <h3>{product.productName}</h3>
                        <a href={`/product/${product.id}`} className="text-blue-600 underline">
                            View Details
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}
