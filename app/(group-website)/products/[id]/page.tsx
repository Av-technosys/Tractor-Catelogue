
import React from "react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconShare, IconMessage, IconArrowLeft } from "@tabler/icons-react";
import Image from "next/image";


const productData = {
  title: "Piston Ring Set",
  price: 2450,
  stock: true,
  description:
    "High-quality piston ring set designed for 4-cylinder diesel engines. Manufactured from premium cast iron for superior durability and performance.",
  specs: [
    { label: "Engine Type", value: "4-Cylinder Diesel" },
    { label: "SCOTT Part No.", value: "SPR-4C-001" },
    { label: "OE Part No.", value: "OE-89234567" },
    { label: "Number of Pieces", value: "4" },
    { label: "Metal Type", value: "Cast Iron" },
    { label: "STD", value: "Standard" },
  ],
};

export default function Page() {
  return (
    <div className="w-full  ">
{/* TOP BACK BAR */}
<div className="w-full bg-gray-100 border-b p-4 mb-6">
  <button className="flex rounded-xl p-2 items-center gap-2  hover:bg-orange-400  hover:text-white">
    <span className="text-xl"><IconArrowLeft/></span>
    <span className="text-sm font-medium">Back to Products</span>
  </button>
</div>

      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-10 ">

       
       <div className="relative rounded-2xl bg-gray-100 w-full h-72 md:h-auto">
 <Image
  src="/1.jpg"
  alt="Product"
  fill
  className="object-cover rounded-2xl"
/>
</div>

        
        <div>
         
          <h1 className="text-4xl font-bold">{productData.title}</h1>

          {/* PRICE + STOCK */}
          <div className="flex items-center gap-4 mt-3">
            <p className="text-3xl font-semibold text-sky-600">
              ${productData.price}
            </p>

            {productData.stock ? (
              <Badge className="bg-sky-600 text-white  px-3 py-1 rounded-md">
                In Stock
              </Badge>
            ) : (
              <Badge variant="destructive">Out of Stock</Badge>
            )}
          </div>

          
          <div className="border rounded-2xl mt-6 p-6">
            <h3 className="text-lg font-semibold mb-4">Product Specifications</h3>

            <Table>
              <TableBody>
                {productData.specs.map((item, index) => (
                  <TableRow key={index}>
  <TableCell className="text-gray-500">
    <div className="flex justify-between w-full">
      <span>{item.label}</span>
      <span className="font-semibold text-black">{item.value}</span>
    </div>
  </TableCell>
</TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-8">
            <h3 className="font-semibold text-lg">Description</h3>
            <p className="text-gray-500 mt-3 ">
              {productData.description}
            </p>
          </div>

          {/* BUTTONS EXACT LIKE SCREENSHOT */}
          <div className="flex items-center gap-4 mt-8">

            {/* FULL WIDTH BUTTON */}
            <Button className="bg-sky-600 hover:bg-sky-700 flex-1 py-5 rounded-xl ">
              <IconMessage size={18} className="mr-2" />
              Contact for Quote
            </Button>

            {/* SHARE BUTTON */}
            <Button
              variant="outline"
              className="flex items-center gap-2 rounded-xl px-5 py-5 border-gray-300 hover:bg-orange-400 hover:text-white"
            >
              <IconShare size={18} />
              Share
            </Button>

          </div>

        </div>
      </div>
    </div>
  );
}
