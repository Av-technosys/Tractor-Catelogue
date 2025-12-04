import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
const DashboardCategoriesOverview = () => {
 const categories = [
    { name: "Engine Parts", count: 45 },
    { name: "Transmission Parts", count: 32 },
    { name: "Body Parts", count: 28 },
    { name: "Electrical Parts", count: 38 },
    { name: "Steering", count: 22 },
  ];
  return (
     <Card className="p-5 shadow-sm border rounded-xl">
          <CardHeader>
            <CardTitle className="text-2xl">Categories Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {categories.map((cat, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-3"
              >
                <p className="font-medium">{cat.name}</p>
                <p className="text-gray-500">{cat.count} products</p>
              </div>
            ))}
          </CardContent>
        </Card>
  );
};
export default DashboardCategoriesOverview;
