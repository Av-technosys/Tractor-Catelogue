"use client";
import { Avatar } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconSearch, IconEdit, IconTrash } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Product = {
  id: number;
  productName: string;
  engineType: string;
  scottPartNo: string;
  category: string;
  price: number;
  isActive: boolean;
};

export default function ProductList() {
  const [productData, setProductData] = useState<Product[]>([]);


  // Fetch products from DB



  const getProductData = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProductData(data.data);
    } catch (error) {
      console.log("error fetching products", error);
    }
  };

  useEffect(() => {
  const fetchData = async () => {
    await getProductData();
  };

  fetchData();
}, []);

 const router = useRouter();

  // delete product

  const deleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        alert("✅ Product deleted");
        getProductData();
      } else {
        alert(" Delete failed");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 px-6 overflow-x-auto">
      <div className="flex items-center px-3 py-2 rounded-md gap-2 border mb-4">
        <IconSearch size={20} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search products..."
          className="bg-transparent focus:outline-none text-gray-600 w-full"
        />
      </div>
      <div className="border rounded-lg bg-white overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-gray-50 ">
              <TableHead className="text-gray-400">Product</TableHead>
              <TableHead className="text-gray-400">SCOTT Part No.</TableHead>
              <TableHead className="text-gray-400">Category</TableHead>
              <TableHead className="text-gray-400">Price</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-right text-gray-400">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productData.map((value, index) => (
              <TableRow key={index} className="hover:bg-gray-50 text-gray-700">
                <TableCell>
                  <div className="flex items-center  gap-3">
                    <Avatar className="w-8 h-8 flex justify-center items-center">
                      {value.productName?.charAt(0)}
                    </Avatar>
                    <div>
                      <div className="font-medium">{value.productName}</div>
                      <div className="text-gray-500 text-xs">
                        {value.engineType}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{value.scottPartNo}</TableCell>
                <TableCell>{value.category}</TableCell>
                <TableCell>{value.price}</TableCell>
                <TableCell>
                  <span className="">
                    <Switch
                      className="data-[state=checked]:bg-sky-600"
                      checked={value.isActive}
                    />
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-3">
                    <IconEdit
                      size={20}
                      className="text-gray-500 cursor-pointer"
                      onClick={() => router.push(`/admin/product/${value.id}`)}
                    />
                    <IconTrash
                      size={20}
                      className="text-gray-500 cursor-pointer"
                      onClick={() => deleteProduct(value.id)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
