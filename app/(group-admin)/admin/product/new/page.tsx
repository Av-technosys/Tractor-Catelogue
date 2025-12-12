"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";
type Category = {
  id: number;
  categoryName: string;
};
const Page = () => {
  const router = useRouter();

  const [productName, setProductName] = useState("");
  const [engineType, setEngineType] = useState("");
  const [scottPartNo, setScottPartNo] = useState("");
  const [oePartNo, setOePartNo] = useState("");
  const [pieces, setPieces] = useState("");
  const [metalType, setMetalType] = useState("");
  const [stdClassification, setStdClassification] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string[]>([]);

  const handleSubmit = async () => {
    setLoading(true);

    const payload = {
      productName,
      engineType,
      scottPartNo,
      oePartNo,
      pieces: Number(pieces),
      metalType,
      stdClassification,
      price: Number(price),
      category,
      description,
      imageUrl,
      isActive,
    };

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("api data", data);

      if (data.success) {
        setSuccessMessage(["Product Created", "Successfully!"]);
        setShowSuccess(true);
      }
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  // get api for categories
  const [categories, setCategories] = useState<Category[]>([]);
  useEffect(() => {
  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      setCategories(data.data);
      console.log("data", data);
    } catch (err) {
      console.error(err);
    }
  };


    fetchCategories();
  }, []);

  return (
    <div className="bg-gray-100 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 bg-white shadow-sm p-5">
        <Link href={"/admin/product"}>
          <Button className="hover:bg-sky-600 hover:text-white bg-transparent text-black">
            <IconArrowLeft size={22} />
          </Button>
        </Link>
        <h1 className="text-2xl font-semibold">Add New Product</h1>
      </div>

      <div className="p-15 max-sm:p-10 max-md:overflow-x-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Basic Information</CardTitle>
            <CardDescription>Enter the product details</CardDescription>
          </CardHeader>

          <CardContent>
            <form className="grid gap-6">
              <div className="flex flex-col gap-2">
                <Label>Engine Type Name</Label>
                <Input
                  className="bg-gray-50"
                  placeholder="e.g., Piston Ring Set"
                  value={engineType}
                  onChange={(e) => setEngineType(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-6">
                <div className="flex flex-col gap-2">
                  <Label>Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger className="w-full bg-gray-50">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={String(cat.id)}>
                            {cat.categoryName}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Product Name</Label>
                  <Input
                    className="bg-gray-50"
                    placeholder="e.g., EICHER TRACTOR"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-6">
                <div className="flex flex-col gap-2">
                  <Label>SCOTT Part No.</Label>
                  <Input
                    className="bg-gray-50"
                    placeholder="e.g., SPR-4C-001"
                    value={scottPartNo}
                    onChange={(e) => setScottPartNo(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>OE Part No.</Label>
                  <Input
                    className="bg-gray-50"
                    placeholder="e.g., OE-89234567"
                    value={oePartNo}
                    onChange={(e) => setOePartNo(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-6">
                <div className="flex flex-col gap-2">
                  <Label>Number of Pieces</Label>
                  <Input
                    className="bg-gray-50"
                    placeholder="1"
                    value={pieces}
                    onChange={(e) => setPieces(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Metal Type</Label>
                  <Input
                    className="bg-gray-50"
                    placeholder="e.g., steel"
                    value={metalType}
                    onChange={(e) => setMetalType(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>STD</Label>
                  <Input
                    className="bg-gray-50"
                    placeholder="Standard"
                    value={stdClassification}
                    onChange={(e) => setStdClassification(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Price ($)</Label>
                <Input
                  className="bg-gray-50"
                  placeholder="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Description</Label>
                <Textarea
                  className="bg-gray-50"
                  placeholder="Enter product description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="border rounded-xl shadow-sm mt-10">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Product Images
            </CardTitle>
            <CardDescription>Upload product images</CardDescription>
          </CardHeader>

          <CardContent>
            <div className="border-2 border-dashed rounded-xl py-16 max-sm:px-7 max-sm:py-8 flex flex-col items-center justify-center text-center">
              <IconUpload
                size={35}
                className="bg-gray-50 border p-1 rounded-full"
              />
              <p className="text-xl mt-6">Click to upload or drag and drop</p>
              <p className="text-md mt-3">PNG, JPG up to 10MB</p>

              <Button className="relative overflow-hidden mt-8 bg-transparent text-black hover:text-white border hover:bg-sky-600">
                Select Files
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => setImageUrl(e.target.files?.[0]?.name || "")}
                />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border rounded-xl shadow-sm mt-10">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Product Status
            </CardTitle>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl text-gray-500 mt-4">
                  Active Status
                </CardTitle>
                <CardDescription>Make this product visible</CardDescription>
              </div>
              <Switch
                className="mr-4 data-[state=checked]:bg-sky-600"
                checked={isActive}
                onCheckedChange={setIsActive}
              />
            </div>
          </CardHeader>
        </Card>

        <div className="flex gap-4 mt-10">
          <Button
            className="bg-sky-600 hover:bg-sky-500 w-[80%] py-5"
            onClick={handleSubmit}
          >
            {loading ? "Saving..." : "Create Product"}
          </Button>

          <Button className="text-black hover:bg-sky-600 hover:text-white bg-transparent w-[15%] py-5 border-2 border-gray-200">
            <Link href="/admin/product">Cancel</Link>
          </Button>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[999]">
          <div className="bg-white p-6 rounded-lg shadow-xl w-80 text-center">
            <div className="text-xl font-semibold mb-4 leading-tight">
              <p>{successMessage[0]}</p>
              <p>{successMessage[1]}</p>
            </div>

            <Button
              className="bg-sky-600 w-full"
              onClick={() => {
                setShowSuccess(false);
                router.push("/admin/product");
              }}
            >
              OK
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
