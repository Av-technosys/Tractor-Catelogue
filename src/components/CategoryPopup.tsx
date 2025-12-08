"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

const CategoryPopup = ({ open, onClose, refresh, editData }) => {
  if (!open) return null;

  const isEdit = !!editData;

  // Form States
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  // Prefill values if editing
  useEffect(() => {
    if (isEdit) {
      setName(editData.categoryName);
      setDescription(editData.description || "");
      setIsActive(editData.isActive);
    } else {
      setName("");
      setDescription("");
      setIsActive(true);
    }
  }, [editData]);

  const handleSubmit = async () => {
    setLoading(true);

    const payload = {
      categoryName: name,
      description,
      isActive,
    };

    const url = isEdit
      ? `/api/categories/${editData.id}`
      : `/api/categories`;

    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        alert(isEdit ? "Category Updated!" : "Category Created!");
        onClose();
        refresh();
      } else {
        alert("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-[80vh] max-sm:w-3/4">

        <h2 className="text-xl font-semibold">
          {isEdit ? "Edit Category" : "Add Category"}
        </h2>
        <p className="text-gray-600 mb-6">
          {isEdit ? "Update this category." : "Create a new product category."}
        </p>

        <div className="space-y-2 mb-4">
          <label className="font-medium">Category Name</label>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="space-y-2 mb-4">
          <label className="font-medium">Description</label>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between mb-6">
          <label className="font-medium">Active</label>
          <Switch checked={isActive} onCheckedChange={setIsActive} />
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button className="bg-sky-600" onClick={handleSubmit}>
            {loading ? "Saving..." : isEdit ? "Save Changes" : "Create"}
          </Button>
        </div>

      </div>
    </div>
  );
};

export default CategoryPopup;
