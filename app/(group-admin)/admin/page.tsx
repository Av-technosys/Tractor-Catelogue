"use client"
import React, { useEffect, useState } from "react";
import DashboardGrid from "@/src/components/Dashboard-Grid";
import DashboardRecentProducts from "@/src/components/Dashboard-Recent-Products";
import DashboardCategoriesOverview from "@/src/components/Dashboard-Categories-Overview";
interface Product {
  id: number;
  productName: string;
  scottPartNo?: string;
  price?: number;
  image?: string;
}

export default function Page() {
  const [productData, setProductData] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Product[]>([]);
   useEffect(() => {
  const fetchAllData = async () => {
    try {
      const [resProducts, resCategories] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/categories"),
      ]);

      const productsJson = await resProducts.json();
      const categoriesJson = await resCategories.json();

      setProductData(productsJson?.data || []);
      setCategories(categoriesJson?.data || []);

      console.log("Products:", productsJson);
      console.log("Categories:", categoriesJson);

    } catch (error) {
      console.log("Error fetching dashboard data:", error);
    }
  };

  fetchAllData();
}, []);
  return (
    <div className="bg-gray-100 ">
      <div className="bg-white shadow-sm p-5">
        <h1 className="text-2xl font-bold">Dashboard</h1>
      </div>

      <div className="p-4 space-y-1">
        <p className="font-semibold">Welcome back!</p>
        <p className="text-gray-500">
          Here what happening with your store today.
        </p>
      </div>
      <DashboardGrid totalProducts={productData.length}  totalCategories={categories.length}/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
       <DashboardRecentProducts productData={productData}/>
      <DashboardCategoriesOverview  categories={categories}
          productData={productData} />
      </div>
    </div>
  );
}
