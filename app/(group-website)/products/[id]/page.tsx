"use client";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  IconShare,
  IconMessage,
  IconArrowLeft,
  IconLink,
} from "@tabler/icons-react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

type ProductImage = {
  id: number;
  filePath: string;
};

type Product = {
  id: number;
  productName: string;
  engineType?: string;
  scottPartNo?: string | number;
  oePartNo?: string | number;
  pieces?: number;
  metalType?: string;
  stdClassification?: string;
  description?: string;
  price?: number;
  isActive?: boolean;
  images: ProductImage[];
};

export default function Page() {
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  const getImageUrl = (path: string) => {
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;

    return `https://ik.imagekit.io/y3ypqdyxmq/${cleanPath}`;
  };

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/products?id=${id}`);
      const data = await res.json();

      let prod = null as Product | null;
      if (data?.data) {
        if (Array.isArray(data.data)) {
          prod =
            data.data.find((p: Product) => String(p.id) === String(id)) || null;
        } else {
          prod = data.data;
        }
      }

      if (prod) {
        setProduct({
          ...prod,
          images: prod.images || [],
        });
        if (prod.images && prod.images.length > 0) {
          setActiveImage(prod.images[0].filePath);
        }
      }
    };

    fetchData();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const specs = [
    { label: "Engine Type", value: product.engineType },
    { label: "SCOTT Part No.", value: product.scottPartNo },
    { label: "OE Part No.", value: product.oePartNo },
    { label: "Number of Pieces", value: product.pieces },
    { label: "Metal Type", value: product.metalType },
    { label: "STD", value: product.stdClassification },
  ];

  return (
    <>
      <div className="w-full bg-gray-100 border-b p-4 mb-6">
        <Button
          onClick={() => router.push("/products")}
          className="flex rounded-lg p-2 items-center gap-2 hover:bg-sky-600 bg-sky-600 hover:text-white"
        >
          <span className="text-xl">
            <IconArrowLeft />
          </span>
          <span className="text-sm font-medium">Back to Products</span>
        </Button>
      </div>
      <div className="w-full max-w-7xl mx-auto">
        <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="relative rounded-2xl bg-gray-100 w-full h-76 md:h-9/12">
              <Image
                src={
                  activeImage
                    ? getImageUrl(activeImage)
                    : product.images && product.images.length
                    ? getImageUrl(product.images[0].filePath)
                    : "/1.jpg"
                }
                alt="Product"
                fill
                className="object-cover rounded-2xl"
              />
            </div>

            <div className="flex gap-3 mt-4 flex-wrap">
              {product.images.map((img) => (
                <Image
                  width={300}
                  height={300}
                  key={img.id}
                  src={getImageUrl(img.filePath)}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                    activeImage === img.filePath
                      ? "border-sky-600"
                      : "border-gray-300"
                  }`}
                  onClick={() => setActiveImage(img.filePath)}
                  alt="Thumbnail"
                />
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-4xl font-bold">{product.productName}</h1>

            <div className="flex items-center gap-4 mt-3">
              <p className="text-3xl font-semibold text-sky-600">
                ₹ {product.price}
              </p>

              {product.isActive ? (
                <Badge className="bg-sky-600 text-white px-3 py-1 rounded-md">
                  In Stock
                </Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            <div className="border rounded-2xl mt-6 p-6">
              <h3 className="text-lg font-semibold mb-4">
                Product Specifications
              </h3>

              <Table>
                <TableBody>
                  {specs.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-gray-500">
                        <div className="flex justify-between w-full">
                          <span>{item.label}</span>
                          <span className="font-semibold text-black">
                            {item.value}
                          </span>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="mt-8">
              <h3 className="font-semibold text-lg">Description</h3>
              <p className="text-gray-500 mt-3">{product.description}</p>
            </div>

            <div className="flex items-center gap-4 mt-8">
              <Link href="/contact">
                <Button className="bg-sky-600 hover:bg-sky-700 flex-1 py-5 rounded-xl">
                  <IconMessage size={18} className="mr-2" />
                  Contact for Quote
                </Button>
              </Link>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center gap-2 rounded-xl px-5 py-5 border-gray-300 hover:bg-sky-600 hover:text-white"
                  >
                    <IconShare size={18} />
                    Share
                  </Button>
                </PopoverTrigger>

                <PopoverContent className="w-60 p-4 rounded-xl shadow-lg">
                  <p className="font-semibold mb-3">Share this product</p>

                  <div
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `${window.location.origin}/products/${id}`
                      );

                      toast("Link copied successfully", {
                        description: "Product Url Copy Successfull",
                      });
                    }}
                    className="flex items-center gap-3 py-2 cursor-pointer hover:bg-sky-600 hover:text-white rounded-lg px-2"
                  >
                    <IconLink size={20} />
                    <span>Copy Link</span>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
