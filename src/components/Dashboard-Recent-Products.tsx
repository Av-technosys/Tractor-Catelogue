import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Image from "next/image";
const DashboardRecentProducts = () => {
 const recentProducts = [
    {
      name: "Piston Ring Set",
      code: "SPR-4C-001",
      price: "$2450",
      image: "/1.jpg",
    },
    {
      name: "Oil Filter Assembly",
      code: "SOF-6C-002",
      price: "$890",
      image: "/1.jpg",
    },
    {
      name: "Clutch Plate",
      code: "SCP-UN-003",
      price: "$3200",
      image: "/1.jpg",
    },
    {
      name: "Alternator",
      code: "SAL-12V-004",
      price: "$5600",
      image: "/1.jpg",
    },
    {
      name: "Headlight Assembly",
      code: "SHA-UN-005",
      price: "$1850",
      image: "/1.jpg",
    },
  ];
  return (
     <Card className="p-5 shadow-sm border rounded-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Recent Products</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentProducts.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border-b pb-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-15  rounded-lg bg-gray-200 overflow-hidden">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={80}
                          height={1}
                          className="object-cover"
                        />
                      </div>
    
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">{item.code}</p>
                      </div>
                    </div>
    
                    <p className="font-semibold">{item.price}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
  );
};
export default DashboardRecentProducts;
