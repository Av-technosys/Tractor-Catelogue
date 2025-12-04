import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  IconCategory,
  IconCube,
  IconShare,
  IconUpload,
} from "@tabler/icons-react";
const DashboardGrid = () => {
  const stats = [
    {
      title: "Total Products",
      value: "6",
      desc: "Active in catalog",
      icon: IconCube,
    },
    {
      title: "Active Categories",
      value: "8",
      desc: "Product categories",
      icon: IconCategory,
    },
    {
      title: "Most Shared",
      value: "45",
      desc: "This month",
      icon: IconShare,
    },
    {
      title: "Recent Uploads",
      value: "12",
      desc: "Last 7 days",
      icon: IconUpload,
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
      {stats.map((item, i) => (
        <Card key={i} className="rounded-xl border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">
              {item.title}
            </CardTitle>
            <item.icon className="h-5 w-5 text-gray-400" />
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
