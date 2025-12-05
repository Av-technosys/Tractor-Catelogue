import { Button } from "@/components/ui/button";
import ProductList from "@/src/components/ProductList";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="bg-gray-100 max-w-7xl mx-auto  ">
      <div className="flex justify-between bg-white shadow-sm p-5">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href={"/admin/product/new"}>
        <Button className="bg-sky-600 pointer-events-none text-xs">
          {" "}
          <IconPlus />
          Add Product
        </Button></Link>
      </div>
      <ProductList />
    </div>
  );
};

export default page;
