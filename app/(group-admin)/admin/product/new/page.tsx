import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IconArrowLeft, IconUpload } from "@tabler/icons-react";
import React from "react";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";

const page = () => {
  return (
    <div className="bg-gray-100 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 bg-white shadow-sm p-5">
        <Link href={"/admin/product"}>
          {" "}
          <Button className="hover:bg-sky-600 hover:text-white bg-transparent text-black ">
            {" "}
            <IconArrowLeft size={22} />
          </Button>{" "}
        </Link>
        <h1 className="text-2xl font-semibold">Add New Products</h1>
      </div>

      <div className="p-15 max-sm:p-10 max-md:overflow-x-auto">
        <Card className=" ">
          <CardHeader>
            <CardTitle className="text-2xl">Basic Information</CardTitle>
            <CardDescription>Enter the product details</CardDescription>
          </CardHeader>

          <CardContent>
            <form className="grid gap-6">
              <div className="flex flex-col  gap-2">
                <Label>Product Name</Label>
                <Input
                  className="bg-gray-50"
                  placeholder="e.g., Piston Ring Set"
                />
              </div>
              <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-6">
                <div className="flex flex-col  gap-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger className="w-full bg-gray-50">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="text">Engine Parts</SelectItem>
                        <SelectItem value="text">Transmission Parts</SelectItem>
                        <SelectItem value="text">Body Parts</SelectItem>
                        <SelectItem value="text">Electrical Parts</SelectItem>
                        <SelectItem value="text">Steering</SelectItem>
                        <SelectItem value="text">Brakes</SelectItem>
                        <SelectItem value="text">Hydraulic</SelectItem>
                        <SelectItem value="text">Others</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Engine Type</Label>
                  <Select>
                    <SelectTrigger className="w-full bg-gray-50">
                      <SelectValue placeholder="Select engine type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="text">Engine Parts</SelectItem>
                        <SelectItem value="text">Transmission Parts</SelectItem>
                        <SelectItem value="text">Body Parts</SelectItem>
                        <SelectItem value="text">Electrical Parts</SelectItem>
                        <SelectItem value="text">Steering</SelectItem>
                        <SelectItem value="text">Brakes</SelectItem>
                        <SelectItem value="text">Hydraulic</SelectItem>
                        <SelectItem value="text">Others</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-6">
                <div className="flex flex-col gap-2">
                  <Label>SCOTT Part No.</Label>
                  <Input
                    className="bg-gray-50"
                    placeholder="e.g., SPR-4C-001"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>OE Part No.</Label>
                  <Input
                    className="bg-gray-50"
                    placeholder="e.g., OE-89234567"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-6">
                <div className="flex flex-col gap-2">
                  <Label>Number of Pieces</Label>
                  <Input className="bg-gray-50" placeholder="1" />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Metal Type</Label>
                  <Select>
                    <SelectTrigger className="w-full bg-gray-50">
                      <SelectValue placeholder="Select type " />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="text">Cast Iron</SelectItem>
                        <SelectItem value="text">Steel</SelectItem>
                        <SelectItem value="text">Aluminium</SelectItem>
                        <SelectItem value="text">Electrical Parts</SelectItem>
                        <SelectItem value="text">Brass</SelectItem>
                        <SelectItem value="text">Plastic/Glass</SelectItem>
                        <SelectItem value="text">Ceramatic</SelectItem>
                        <SelectItem value="text">Steel/Organic</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>STD</Label>
                  <Input className="bg-gray-50" placeholder="Standard" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Price ($)</Label>
                <Input className="bg-gray-50" placeholder="0" />
              </div>
              <div className="flex flex-col gap-2">
                <Label>Description</Label>
                <Textarea
                  className="bg-gray-50"
                  placeholder="Enter product description..."
                />
              </div>
            </form>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>

        <Card className=" border rounded-xl shadow-sm mt-10 ">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Product Images
            </CardTitle>
            <CardDescription>
              Upload product images (multiple files supported)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed rounded-xl py-16 max-sm:px-7 max-sm:py-8 flex flex-col items-center justify-center 
          text-center"
            >
              <IconUpload
                size={35}
                className=" bg-gray-50 border p-1 rounded-full"
              />
              <p className="text-xl mt-6">Click to upload or drag and drop</p>
              <p className="text-md mt-3">PNG, JPG up to 10MB</p>

              <Button className="relative overflow-hidden mt-8 bg-transparent text-black hover:text-white border hover:bg-sky-600">
                Select Files
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className=" border rounded-xl shadow-sm mt-10 ">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Product Status
            </CardTitle>
            <div className="flex items-center justify-between">
              <p>
                <CardTitle className="text-xl text-gray-500 mt-4">
                  Active Status
                </CardTitle>
                <CardDescription>
                  Make this product visible in the catalog
                </CardDescription>
              </p>
              <Switch className="mr-4 data-[state=checked]:bg-sky-600 "></Switch>
            </div>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
        <div className="flex gap-4 mt-10  ">
          <Button className="bg-sky-600 hover:bg-sky-500 w-[80%] py-5 ">
            Create Product
          </Button>
        
          <Button className="text-black hover:bg-sky-600 hover:text-white bg-transparent w-[15%] py-5 border-2 border-gray-200">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default page;
