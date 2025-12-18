import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { IconCategory, IconCube } from "@tabler/icons-react";
const DashboardGrid = ({
  totalProducts,
  totalCategories,
  activeCategoriesCount,
  activeProductCount,
}) => {
  const stats = [
    {
      title: "Total Products",
      value: totalProducts,
      desc: "catalogs",
      icon: IconCube,
    },
    {
      title: "Active Products",
      value: activeProductCount,
      desc: "Last 7 days",
      icon: IconCube,
    },
    {
      title: "Total Categories",
      value: totalCategories,
      desc: "Product categories",
      icon: IconCategory,
    },
    {
      title: "Active Categories",
      value: activeCategoriesCount,
      desc: "This month",
      icon: IconCategory,
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
      {stats.map((item, i) => (
        <Card key={i} className="rounded-xl border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <item.icon className="h-5 w-5 text-sky-600" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{item.value}</div>
            <p className="text-sm text-gray-500">{item.desc}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
export default DashboardGrid;
