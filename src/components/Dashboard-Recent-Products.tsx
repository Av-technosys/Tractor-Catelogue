"use client"
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface Product {
  id: number;
  productName: string;
  scottPartNo?: string;
  price?: number;
  image?: string;
}

const DashboardRecentProducts = () => {
  const [productData, setProductData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        setProductData(data?.data || []);
      } catch (error) {
        console.log("error fetching products", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Card className="p-5 shadow-sm border rounded-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Recent Products</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {productData.slice(-5).map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b pb-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-20 h-16 rounded-lg bg-gray-200 overflow-hidden">
                <Image
                  src={item.image || "/no-image.jpg"}   // ✅ FIXED
                  alt={item.productName}
                  width={80}
                  height={60}
                  className="object-cover"
                />
              </div>

              <div>
                <p className="font-medium">{item.productName}</p>

                <p className="text-sm text-gray-500">
                  {item.scottPartNo && `Scott No: ${item.scottPartNo}`}
                </p>
              </div>
            </div>

            <p className="font-semibold">
              {item.price ? `₹${item.price}` : "—"}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DashboardRecentProducts;
