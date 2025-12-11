"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import Categories from "@/src/components/Categories";
import Products from "@/src/components/Products";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();
  return (
    <>
      <div
        className="relative w-full px-4 py-20 md:py-32 lg:py-40 flex items-center justify-center text-white"
        style={{
          backgroundImage: "url('/banner.png')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-blue-900/60"></div>
        <div className="relative w-full max-w-7xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-3 md:mb-4">
            Premium Tractor Spare Parts
          </h1>
          <p className="text-base md:text-xl lg:text-2xl mb-4 md:mb-6">
            Search by part number, name, or engine type
          </p>
          <div className="bg-white flex items-center rounded-full p-2 w-full max-w-3xl mx-auto">
            <IconSearch className="text-gray-500 ml-3" />
            <Input
              placeholder="Search by part number, name, or engine type..."
              className="border-none focus-visible:ring-0 text-black"
            />
          </div>
          <Button className="mt-5  bg-white text-black hover:bg-gray-300  md:px-12 py-4 md:py-6 text-base md:text-lg rounded-xl flex items-center gap-2 mx-auto">
            View Full Catalog <IconArrowRight />
          </Button>
        </div>
      </div>
      <div className="bg-gray-50 p-15  ">
        <div className="max-w-6xl mx-auto  ">
          <h1 className="text-2xl md:text-3xl font-bold text-center mb-2">
            Browse by Category
          </h1>
          <p className="text-center text-sm md:text-base text-gray-500 mb-5 ">
            Find the parts you need by category
          </p>
        </div>
        <Categories />
      </div>

      <div className="max-w-6xl mx-auto py-10 px-4 md:px-6 lg:px-0 flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Recently Added
          </h2>
          <p className="text-gray-500 text-sm md:text-base">
            Check out our latest products
          </p>
        </div>

        <Button
          onClick={() => router.push("/products")}
          className=" hover:bg-orange-400 hover:text-white "
          variant="outline"
        >
          View All
        </Button>
      </div>

      <Products onCountChange={() => {}} />
      {/* </div> */}
      <div className="w-full max-w-6xl mx-auto py-10 px-4 bg-gray-50">
        <div className="w-full rounded-3xl py-16 flex flex-col items-center justify-center text-center text-white bg-sky-600">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
            Can Find What You Looking For?
          </h1>
          <p className="text-sm sm:text-base md:text-lg mb-8 px-2">
            Contact us and we help you find the perfect part for your tractor
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center sm:gap-2 w-full max-sm:px-10">
            <Button className="bg-white text-sky-600 hover:bg-gray-300  py-5 px-9    rounded-xl ">
              Contact Us
            </Button>
            <Button className="bg-white text-sky-600 hover:bg-gray-300  py-5 px-5  rounded-xl  ">
              Browse Catalog
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
