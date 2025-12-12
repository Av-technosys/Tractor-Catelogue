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
import { IconArrowLeft } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { useParams, useRouter } from "next/navigation";

const Page = () => {
  const { id } = useParams();
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

  // 🟢 New State: Success Popup
  const [showSuccess, setShowSuccess] = useState(false);

  const categories = [           // get data from api
    "Engine Parts",
    "Transmission Parts",
    "Body Parts",
    "Electrical Parts",
    "Steering",
    "Brakes",
    "Hydraulic",
    "Others",
  ];

  const engineCategories = [   // text field
    "4-Cylinder Diesel",
    "6-Cylinder Diesel",
    "8-Cylinder Diesel",
    "4-Cylinder Petrol",
    "Universal",
  ];

  const metalCategories = [  // text field
    "Steel",
    "Aluminium",
    "Brass",
    "Plastic/Glass",
    "Ceramic",
    "Steel/Organic",
  ];

  // Fetch product
  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products?id=${id}`);
        const json = await res.json();

        if (json.success && json.data) {
          const p = json.data;

          setProductName(p.productName || "");
          setEngineType(p.engineType || "");
          setScottPartNo(p.scottPartNo || "");
          setOePartNo(p.oePartNo || "");
          setPieces(String(p.pieces || ""));
          setMetalType(p.metalType || "");
          setStdClassification(p.stdClassification || "");
          setPrice(String(p.price || ""));
          setCategory(p.category || "");
          setDescription(p.description || "");
          setImageUrl(p.imageUrl || "");
          setIsActive(p.isActive ?? true);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchProduct();
  }, [id]);

  // UPDATE product
  const handleSubmit = async () => {
    if (!id) return;

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
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        // 🟢 Show success popup instead of redirect
        setShowSuccess(true);
      }
    } catch (error) {
      console.error("Update error:", error);
    }

    setLoading(false);
  };

  // OK Button → Close popup + redirect
  const handleSuccessClose = () => {
    setShowSuccess(false);
    router.push("/admin/product");
  };

  return (
    <div className="bg-gray-100 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 bg-white shadow-sm p-5">
        <Link href={"/admin/product"}>
          <Button className="hover:bg-sky-600 hover:text-white bg-transparent text-black">
            <IconArrowLeft size={22} />
          </Button>
        </Link>

        <h1 className="text-2xl font-semibold">Edit Product</h1>
      </div>

      <div className="p-15 max-sm:p-10 max-md:overflow-x-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Basic Information</CardTitle>
            <CardDescription>Update product details</CardDescription>
          </CardHeader>

          <CardContent>
            <form className="grid gap-6">
              <div className="flex flex-col gap-2">
                <Label>Product Name</Label>
                <Input
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  className="bg-gray-50"
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
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Engine Type</Label>
                  <Select value={engineType} onValueChange={setEngineType}>
                    <SelectTrigger className="w-full bg-gray-50">
                      <SelectValue placeholder="Select engine type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {engineCategories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-6">
                <div className="flex flex-col gap-2">
                  <Label>SCOTT Part No.</Label>
                  <Input
                    value={scottPartNo}
                    onChange={(e) => setScottPartNo(e.target.value)}
                    className="bg-gray-50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <Label>OE Part No.</Label>
                  <Input
                    value={oePartNo}
                    onChange={(e) => setOePartNo(e.target.value)}
                    className="bg-gray-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 max-sm:grid-cols-1 gap-6">
                <div className="flex flex-col gap-2">
                  <Label>Number of Pieces</Label>
                  <Input
                    value={pieces}
                    onChange={(e) => setPieces(e.target.value)}
                    className="bg-gray-50"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label>Metal Type</Label>
                  <Select value={metalType} onValueChange={setMetalType}>
                    <SelectTrigger className="w-full bg-gray-50">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {metalCategories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex flex-col gap-2">
                  <Label>STD</Label>
                  <Input
                    value={stdClassification}
                    onChange={(e) => setStdClassification(e.target.value)}
                    className="bg-gray-50"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Label>Price ($)</Label>
                <Input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-gray-50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label>Description</Label>
                <Textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="bg-gray-50"
                />
              </div>
            </form>
          </CardContent>
        </Card>

        <Card className="border rounded-xl shadow-sm mt-10">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">
              Product Status
            </CardTitle>
            <div className="flex items-center justify-between">
              <CardDescription>
                Make this product visible in the catalog
              </CardDescription>
              <Switch
                checked={isActive}
                onCheckedChange={setIsActive}
                className="mr-4 data-[state=checked]:bg-sky-600"
              />
            </div>
          </CardHeader>
        </Card>

        <div className="flex gap-4 mt-10">
          <Button
            className="bg-sky-600 hover:bg-sky-500 w-[80%] py-5"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Product"}
          </Button>

          <Link href="/admin/product" className="w-[15%]">
            <Button className="w-full bg-transparent text-black border hover:bg-sky-600 hover:text-white py-5">
              Cancel
            </Button>
          </Link>
        </div>
      </div>

      {/* 🟢 SUCCESS POPUP */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 shadow-xl text-center w-[90%] max-w-sm">
            <h2 className="text-xl font-semibold text-green-600">
              Product Updated
            </h2>
            <p className="text-gray-600 mt-2">
              Product has been updated successfully!
            </p>

            <button
              onClick={handleSuccessClose}
              className="mt-5 bg-sky-600 text-white px-5 py-2 rounded-lg hover:bg-sky-500"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
