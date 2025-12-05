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
import { useState } from "react";
import CategoryPopup from "@/src/components/CategoryPopup";

const categories = [
  {
    name: "Engine Parts",
    desc: "High-quality engine components including pistons, gaskets, and filters",
    status: true,
  },
  {
    name: "Transmission Parts",
    desc: "Gears, clutches, and transmission assemblies for smooth operation",
    status: true,
  },
  {
    name: "Body Parts",
    desc: "Exterior and interior body components and panels",
    status: true,
  },
  {
    name: "Electrical Parts",
    desc: "Batteries, alternators, starters, and wiring harnesses",
    status: true,
  },
  {
    name: "Steering",
    desc: "Steering wheels, columns, and power steering components",
    status: true,
  },
  {
    name: "Brakes",
    desc: "Brake pads, rotors, calipers, and brake fluid",
    status: true,
  },
  {
    name: "Hydraulic",
    desc: "Hydraulic pumps, cylinders, hoses, and fittings",
    status: true,
  },
  {
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
        {open && <CategoryPopup open={open} onClose={() => setOpen(false)} />}
      </div>
      <div className="px-8 py-4  bg-gray-100">
        <div className="p-1 px-4  mt-6 bg-white rounded-xl">
          <h2 className="text-2xl font-semibold mb-6 mt-6">
            All Categories ({categories.length})
          </h2>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-500">Sr. no.</TableHead>
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
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-gray-600 ">{item.desc}</TableCell>
                  <TableCell>
                    <Switch className="data-[state=checked]:bg-sky-600" />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-row justify-center gap-2 ">
                      <Button
                        onClick={() => setOpen(true)}
                        className="bg-transparent hover:bg-sky-600 text-gray-400 hover:text-white"
                      >
                        <IconPencil size={18} />
                      </Button>

                      <Button className="bg-transparent hover:bg-sky-600">
                        {" "}
                        <IconTrash
                          size={18}
                          className="text-red-400 cursor-pointer"
                        />
                      </Button>
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
