import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
const DashboardCategoriesOverview = ({ categories, productData }) => {
  const categoriesWithCount = categories.map((cat) => {
    const count = productData.filter(
      (p) => p.categoryId === cat.id
    ).length;

    return {
      name: cat.categoryName,
      count,
    };
  });

  return (
    <Card className="p-5 shadow-sm border rounded-xl">
      <CardHeader>
        <CardTitle className="text-2xl">Categories Overview</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {categoriesWithCount.map((cat, index) => (
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
