"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
const CategoryPopup = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-8 rounded-xl shadow-xl  w-[80vh] max-sm:w-3/4 ">
        <h2 className="text-xl font-semibold">Add Category</h2>
        <p className="text-gray-600 mb-6">Create a new product category.</p>

        <div className="space-y-2 mb-4">
          <label className="font-medium">Category Name</label>
          <Input placeholder="e.g., Engine Parts" />
        </div>

        <div className="space-y-2 mb-4">
          <label className="font-medium">Description</label>
          <Textarea placeholder="Brief description of this category..." />
        </div>

        <div className="flex items-center justify-between mb-6">
          <label className="font-medium">Active</label>
          <Switch className="data-[state=checked]:bg-sky-600" />
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-sky-600 hover:bg-sky-600">Create</Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryPopup;
