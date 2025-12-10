"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import ConfirmPopup from "@/src/components/Alert";
import CategoryPopup from "@/src/components/CategoryPopup";

type Category = {
  id: number;
  categoryName: string;
  description: string;
  isActive: boolean;
};

export default function CategoryTable() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [editData, setEditData] = useState<Category | null>(null);

  const getCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
    await getCategories();
  };
  fetchData();
  }, []);

  const deleteCategory = async (id) => {
    const res = await fetch(`/api/categories/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.success) {
      getCategories();
    }
  };

  return (
    <div className="bg-gray-100">
      <div className="flex justify-between bg-white shadow-sm p-5">
        <h1 className="text-2xl font-semibold">Categories</h1>

       
        <Button
          onClick={() => {
            setEditData(null); 
            setOpen(true);
          }}
          className="bg-sky-600 hover:bg-sky-600 text-xs"
        >
          <IconPlus /> Add Categories
        </Button>

        <CategoryPopup
          open={open}
          onClose={() => setOpen(false)}
          refresh={getCategories}
          editData={editData}
        />
      </div>

      <div className="px-8 py-4 bg-gray-100">
        <div className="p-1 px-4 bg-white mt-6 rounded-xl">
          <h2 className="text-2xl font-semibold mb-6 mt-6">
            All Categories ({categories.length})
          </h2>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sr. No.</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {categories.map((item: Category, index) => (
                <TableRow key={item.id}>
                  <TableCell>{index + 1}</TableCell>

                  <TableCell>{item.categoryName}</TableCell>

                  <TableCell className="text-gray-600">
                    {item.description}
                  </TableCell>

                  <TableCell>
                    <Switch checked={item.isActive} />
                  </TableCell>

                  <TableCell>
                    <div className="flex justify-end gap-2">

                     
                      <Button
                        onClick={() => {
                          setEditData(item);
                          setOpen(true);
                        }}
                        className="bg-transparent hover:bg-sky-600 text-gray-400 hover:text-white"
                      >
                        <IconPencil size={18} />
                      </Button>

                      
                      <ConfirmPopup
                        title="Are you sure you want to delete this category?"
                        alertTitle="Delete Category"
                        description="This action is permanent and cannot be recovered."
                        confirmText="Delete"
                        cancelText="Cancel"
                        onConfirm={() => deleteCategory(item.id)}
                      >
                        <button className="bg-transparent hover:bg-sky-600 p-1 rounded-md">
    <IconTrash
      size={18}
      className="text-red-400 cursor-pointer hover:text-white"
    />
  </button>
                      </ConfirmPopup>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </div>
      </div>
    </div>
  );
}
