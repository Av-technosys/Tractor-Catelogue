"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Products from "@/src/components/Products";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
export default function Page() {
  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-10 ">
      <div className="text-center sm:text-left ">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
          All Products
        </h1>
        <p className="text-sm sm:text-base text-gray-500 mt-1">
          6 products found
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-10">
        <div className="col-span-12 md:col-span-4 lg:col-span-3 border rounded-xl p-5 h-fit">
          <Input
            placeholder="Search by part number, name..."
            className="mb-4"
          />
          <Select>
            <SelectTrigger className="w-full mb-3">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="engine">Engine</SelectItem>
              <SelectItem value="clutch">Clutch</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full mb-3">
              <SelectValue placeholder="Engine Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="diesel">Diesel</SelectItem>
              <SelectItem value="petrol">Petrol</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full mb-4">
              <SelectValue placeholder="Model" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="m1">Model 1</SelectItem>
              <SelectItem value="m2">Model 2</SelectItem>
            </SelectContent>
          </Select>
          <p className="text-sm text-gray-700 mb-2">Price Range: $0 - $10000</p>
          <Slider defaultValue={[50]} max={100} step={1} className="mb-4" />
          <Button variant="outline" className="w-full">
            Reset Filters
          </Button>
        </div>
        <div className="col-span-12 md:col-span-8 lg:col-span-9">
          <Products />
        </div>
      </div>
    </div>
  );
}
