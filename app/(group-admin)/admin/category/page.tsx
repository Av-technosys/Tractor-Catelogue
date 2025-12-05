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
import {
  IconEngine,
  IconSettings,
  IconBox,
  IconBolt,
  IconSteeringWheel,
  IconCircleDot,
  IconDroplet,
  IconDots,
} from "@tabler/icons-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const categories = [
  {
    icon: IconEngine,
    name: "Engine Parts",
    desc: "High-quality engine components including pistons, gaskets, and filters",
    status: true,
  },
  {
    icon: IconSettings,
    name: "Transmission Parts",
    desc: "Gears, clutches, and transmission assemblies for smooth operation",
    status: true,
  },
  {
    icon: IconBox,
    name: "Body Parts",
    desc: "Exterior and interior body components and panels",
    status: true,
  },
  {
    icon: IconBolt,
    name: "Electrical Parts",
    desc: "Batteries, alternators, starters, and wiring harnesses",
    status: true,
  },
  {
    icon: IconSteeringWheel,
    name: "Steering",
    desc: "Steering wheels, columns, and power steering components",
    status: true,
  },
  {
    icon: IconCircleDot,
    name: "Brakes",
    desc: "Brake pads, rotors, calipers, and brake fluid",
    status: true,
  },
  {
    icon: IconDroplet,
    name: "Hydraulic",
    desc: "Hydraulic pumps, cylinders, hoses, and fittings",
    status: true,
  },
  {
    icon: IconDots,
    name: "Others",
    desc: "Miscellaneous tractor parts and accessories",
    status: true,
  },
];

export default function CategoryTable() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-100 ">
      <div className="flex justify-between bg-white shadow-sm p-5">
        <h1 className="text-2xl font-semibold">Products</h1>

        <Button
          onClick={() => setOpen(!open)}
          className="bg-sky-600 hover:bg-sky-600 text-xs"
        >
          {" "}
          <IconPlus />
          Add Categories
        </Button>
        {open && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 overflow-y-auto">
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md max-h-screen overflow-y-auto">
              <h2 className="text-xl font-semibold">Add Category</h2>
              <p className="text-gray-600 mb-6">
                Create a new product category.
              </p>

              <div className="space-y-2 mb-4">
                <label className="font-medium">Category Name</label>
                <Input placeholder="e.g., Engine Parts" />
              </div>

              <div className="space-y-2 mb-4">
                <label className="font-medium">Icon</label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Icon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="box">
                      <IconSettings size={22} className="text-sky-600" />
                      Settings
                    </SelectItem>
                    <SelectItem value="settings">
                      <IconEngine size={22} className="text-sky-600" />
                      Engine
                    </SelectItem>
                    <SelectItem value="engine">
                      <IconDroplet size={22} className="text-sky-600" />
                      Hydraulic
                    </SelectItem>
                    <SelectItem value="bolt">
                      <IconBolt size={22} className="text-sky-600" />
                      Bolt
                    </SelectItem>
                  </SelectContent>
                </Select>
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
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button className="bg-sky-600">Create</Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="px-8 py-4  bg-gray-100">
        <div className="p-1 px-4  mt-6 bg-white rounded-xl">
          <h2 className="text-2xl font-semibold mb-6 mt-6">
            All Categories ({categories.length})
          </h2>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-500">Icon</TableHead>
                <TableHead className="text-gray-500">Name</TableHead>
                <TableHead className="text-gray-500">Description</TableHead>
                <TableHead className="text-gray-500">Status</TableHead>
                <TableHead className="text-right text-gray-500">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {categories.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center">
                      <item.icon size={22} className="text-sky-600" />
                    </div>
                  </TableCell>

                  <TableCell>{item.name}</TableCell>

                  <TableCell className="text-gray-600 ">{item.desc}</TableCell>

                  <TableCell>
                    <Switch className="data-[state=checked]:bg-sky-600" />
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-row justify-center gap-3 ">
                      <IconPencil
                        size={18}
                        className="text-gray-600 cursor-pointer"
                      />
                      <IconTrash
                        size={18}
                        className="text-red-400 cursor-pointer"
                      />
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
