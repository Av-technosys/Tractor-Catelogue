"use client";

import React from "react";
import Link from "next/link";
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
 
//mene slug wali functionality add ki 

const categories = [
  { title: "Engine Parts", slug: "engine", count: 45, icon: IconEngine },
  { title: "Transmission Parts", slug: "transmission", count: 32, icon: IconSettings },
  { title: "Body Parts", slug: "body", count: 28, icon: IconBox },
  { title: "Electrical Parts", slug: "electrical", count: 38, icon: IconBolt },
  { title: "Steering", slug: "steering", count: 22, icon: IconSteeringWheel },
  { title: "Brakes", slug: "brakes", count: 19, icon: IconCircleDot },
  { title: "Hydraulic", slug: "hydraulic", count: 26, icon: IconDroplet },
  { title: "Others", slug: "others", count: 15, icon: IconDots },
];

const Categories = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;

          return (
            <Link key={idx} href={`/products?category=${cat.slug}`}>
              <Card
                className="
                  group flex flex-col items-center justify-center text-center 
                  transition border border-transparent cursor-pointer
                  hover:border-blue-500 hover:shadow-md
                "
              >
                {/* Icon Box */}
                <div
                  className="
                    w-12 h-12 rounded-full bg-blue-50 
                    flex items-center justify-center transition 
                    group-hover:bg-blue-600
                  "
                >
                  <Icon
                    size={25}
                    className="text-blue-600 transition group-hover:text-white"
                  />
                </div>

                <CardHeader className="w-full flex flex-col items-center justify-center">
                  <CardTitle className="font-semibold text-center">
                    {cat.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="text-gray-500">
                  {cat.count} Products
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Categories;
