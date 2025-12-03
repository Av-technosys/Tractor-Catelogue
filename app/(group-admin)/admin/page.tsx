import React from "react";
import DashboardGrid from "@/src/components/Dashboard-Grid";
import DashboardRecentProducts from "@/src/components/Dashboard-Recent-Products";
import DashboardCategoriesOverview from "@/src/components/Dashboard-Categories-Overview";

export default function Page() {
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
      <DashboardGrid/>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
       <DashboardRecentProducts/>
      <DashboardCategoriesOverview/>
      </div>
    </div>
  );
}
