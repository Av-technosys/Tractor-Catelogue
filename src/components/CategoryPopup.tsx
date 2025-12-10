"use client";

import { useEffect, useState, startTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

type Category = {
  id: number;
  categoryName: string;
  description: string;
  isActive: boolean;
};

interface CategoryPopupProps {
  open: boolean;
  onClose: () => void;
  refresh: () => void;
  editData: Category | null;
}

const CategoryPopup: React.FC<CategoryPopupProps> = ({
  open,
  onClose,
  refresh,
  editData,
}) => {
  const isEdit = !!editData;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);

  // SUCCESS POPUP STATE
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    startTransition(() => {
      if (isEdit && editData) {
        setName(editData.categoryName);
        setDescription(editData.description || "");
        setIsActive(editData.isActive);
      } else {
        setName("");
        setDescription("");
        setIsActive(true);
      }
    });
  }, [editData, isEdit]);

  if (!open) return null;

  const handleSubmit = async () => {
    setLoading(true);

    const payload = {
      categoryName: name,
      description,
      isActive,
    };

    const url = isEdit
      ? `/api/categories/${editData!.id}`
      : `/api/categories`;

    const method = isEdit ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMessage(
          isEdit
            ? "Category Updated Successfully!"
            : "Category Created Successfully!"
        );

        setShowSuccess(true); // SUCCESS POPUP OPEN
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
    <>
      {/* MAIN POPUP */}
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
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>

            <Button className="bg-sky-600" onClick={handleSubmit}>
              {loading ? "Saving..." : isEdit ? "Save Changes" : "Create"}
            </Button>
          </div>
        </div>
      </div>

      {/* SUCCESS POPUP */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[60]">
          <div className="bg-white p-6 rounded-lg shadow-xl w-72 text-center">
            <p className="text-lg font-semibold mb-4">{successMessage}</p>

            <Button
              onClick={() => {
                setShowSuccess(false); // SUCCESS POPUP CLOSE
                onClose();             // MAIN POPUP CLOSE
                refresh();             // TABLE REFRESH
              }}
              className="bg-sky-600 w-full"
            >
              OK
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default CategoryPopup;
