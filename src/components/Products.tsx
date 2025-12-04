import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
const Products = () => {
  const items = [
    {
      name: "Piston Ring Set",
      scott: "SPR-4C-001",
      oe: "OE-89234567",
      material: "Cast Iron",
      grade: "Standard",
      price: "2450",
      img: "/Product.png",
    },
    {
      name: "Oil Filter Assembly",
      scott: "SOF-6C-002",
      oe: "OE-78923456",
      material: "Steel",
      grade: "Standard",
      price: "890",
      img: "/Product.png",
    },
    {
      name: "Clutch Plate",
      scott: "SCP-UN-003",
      oe: "OE-67812345",
      material: "Steel/Organic",
      grade: "Heavy Duty",
      price: "3200",
      img: "/Product.png",
    },
    {
      name: "Alternator",
      scott: "SAL-12V-004",
      oe: "OE-56701234",
      material: "Aluminum",
      grade: "Standard",
      price: "5600",
      img: "/Product.png",
    },
    {
      name: "Headlight Assembly",
      scott: "SHA-UN-005",
      oe: "OE-45690123",
      material: "Plastic/Glass",
      grade: "Standard",
      price: "1850",
      img: "/Product.png",
    },
    {
      name: "Brake Pad Set",
      scott: "SBP-UN-006",
      oe: "OE-34578012",
      material: "Ceramic",
      grade: "Premium",
      price: "2100",
      img: "/Product.png",
    },
  ];
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-0">
      {" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {items.map((item, index) => (
          <Card key={index} className="rounded-xl overflow-hidden border">
            <CardHeader className="p-0">
              <div className="w-full   flex items-center justify-center">
                <Image
                  src={item.img}
                  alt={item.name}
                  width={300}
                  height={300}
                  className="object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <span className="text-sm bg-gray-100 px-3 py-1 rounded-full font-medium">
                  ₹{item.price}
                </span>
              </div>
              <p className="text-gray-600 text-sm mt-1">SCOTT: {item.scott}</p>
              <p className="text-gray-600 text-sm">OE: {item.oe}</p>
              <p className="text-gray-500 text-sm mt-1">
                {item.material} • {item.grade}
              </p>
              <Button className="w-full mt-4 hover:bg-orange-400 hover:text-white " variant="outline">
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
