"use client";
import React, { useEffect, useState, useCallback } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  productName: string;
  scottPartNo: number;
  oePartNo: number;
  metalType: string;
  imageUrl: string;
  price: number;
  isActive: boolean;
};

const Products = ({
  onCountChange,
  search,
}: {
  onCountChange: (count: number) => void;
  search: string;
}) => {
  const router = useRouter();
  const [productData, setProductData] = useState<Product[]>([]);

  const getProductData = useCallback(async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();

      const items: Product[] = data?.data || [];
      setProductData(items);

      return items;
    } catch (error) {
      console.log("error fetching products", error);
      return [];
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProductData();
      onCountChange(data.length);
    };

    fetchData();
  }, [getProductData, onCountChange]);

  const filteredProducts = productData.filter((item) => {
    const q = (search || "").toLowerCase();
    return (
      item.productName.toLowerCase().includes(q) ||
      item.scottPartNo.toString().includes(q) ||
      item.oePartNo.toString().includes(q)
    );
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {filteredProducts
          .filter((item) => item.isActive)
          .map((item) => (
            <Card key={item.id} className="rounded-xl overflow-hidden border">
              <CardHeader className="p-0">
                <div className="w-full flex items-center justify-center">
                  <Image
                    src={item.imageUrl}
                    alt={item.productName}
                    width={300}
                    height={200}
                    className="object-cover"
                  />
                </div>
              </CardHeader>

              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{item.productName}</h3>
                  <span className="text-sm bg-gray-100 px-3 py-1 rounded-full font-medium">
                    ₹{item.price}
                  </span>
                </div>

                <p className="text-gray-600 text-sm mt-1">
                  SCOTT: {item.scottPartNo}
                </p>
                <p className="text-gray-600 text-sm">OE: {item.oePartNo}</p>

                <p className="text-gray-500 text-sm mt-1">
                  {item.metalType} • {item.metalType}
                </p>

                <Button
                  onClick={() => router.push(`/products/${item.id}`)}
                  className="w-full mt-4 hover:bg-orange-400 hover:text-white"
                  variant="outline"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Products;
