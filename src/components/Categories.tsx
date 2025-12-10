"use client";
import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  IconEngine,
  IconSettings,
  IconBox,
  IconBolt,
  IconSteeringWheel,
  IconCircleDot,
  IconDroplet,
  IconDots,
} from "@tabler/icons-react";

type Category = {
  id: number;
  categoryName: string;
  isActive: boolean;
};

const iconMap = {
  engine: IconEngine,
  transmission: IconSettings,
  body: IconBox,
  electrical: IconBolt,
  steering: IconSteeringWheel,
  brakes: IconCircleDot,
  hydraulic: IconDroplet,
  others: IconDots,
};

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const json = await res.json();
      setCategories(json.data || []);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories
          .filter((cat) => cat.isActive)
          .map((cat, idx) => {
            const key = cat.categoryName?.toLowerCase();
            const Icon = iconMap[key] || IconDots;

            return (
              <Card
                key={idx}
                className="group flex flex-col items-center justify-center text-center 
                transition border border-transparent hover:border-blue-500 hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center transition group-hover:bg-blue-600">
                  <Icon size={25} className="text-blue-600 transition group-hover:text-white" />
                </div>

                <CardHeader className="w-full flex flex-col items-center">
                  <CardTitle className="font-semibold text-center">
                    {cat.categoryName}
                  </CardTitle>
                </CardHeader>

                <CardContent className="text-gray-500">Active</CardContent>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default Categories;
