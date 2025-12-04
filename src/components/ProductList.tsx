import { Avatar } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IconSearch, IconEdit, IconTrash } from "@tabler/icons-react";

export default function ProductList() {
     

  const ProductData = [
    {
      img: "AB",
      name: "Piston Ring Set",
      cylinderType: "4-Cylinder Diesel",
      partno: "SPR-4C-001",
      category: "Engine",
      price: "$2450",
      status: "Active",
    },
    {
      img: "CN",
      name: "Oil Filter Assembly",
      cylinderType: "6-Cylinder Diesel",
      partno: "SOF-6C-002",
      category: "Engine",
      price: "$890",
      status: "Active",
    },
    {
      img: "CN",
      name: "Oil Filter Assembly",
      cylinderType: "6-Cylinder Diesel",
      partno: "SOF-6C-002",
      category: "Engine",
      price: "$890",
      status: "Active",
    },
    {
      img: "CN",
      name: "Oil Filter Assembly",
      cylinderType: "6-Cylinder Diesel",
      partno: "SOF-6C-002",
      category: "Engine",
      price: "$890",
      status: "Active",
    },
    {
      img: "CN",
      name: "Oil Filter Assembly",
      cylinderType: "6-Cylinder Diesel",
      partno: "SOF-6C-002",
      category: "Engine",
      price: "$890",
      status: "Active",
    },
    {
      img: "CN",
      name: "Oil Filter Assembly",
      cylinderType: "6-Cylinder Diesel",
      partno: "SOF-6C-002",
      category: "Engine",
      price: "$890",
      status: "Active",
    },
    {
      img: "CN",
      name: "Oil Filter Assembly",
      cylinderType: "6-Cylinder Diesel",
      partno: "SOF-6C-002",
      category: "Engine",
      price: "$890",
      status: "Active",
    },
    {
      img: "CN",
      name: "Oil Filter Assembly",
      cylinderType: "6-Cylinder Diesel",
      partno: "SOF-6C-002",
      category: "Engine",
      price: "$890",
      status: "Active",
    },
  ];

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
            {ProductData.map((data, index) => (
              <TableRow key={index} className="hover:bg-gray-50 text-gray-700">
                <TableCell>
                  <div className="flex items-center  gap-3">
                    <Avatar className="w-8 h-8 flex justify-center items-center">
                      {data.img}
                    </Avatar>
                    <div>
                      <div className="font-medium">{data.name}</div>
                      <div className="text-gray-500 text-xs">
                        {data.cylinderType}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{data.partno}</TableCell>
                <TableCell>{data.category}</TableCell>
                <TableCell>{data.price}</TableCell>
                <TableCell>
                  <span className="bg-sky-600 text-white px-2 text-xs rounded-full">
                    {data.status}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end gap-3">
                    <IconEdit
                      size={20}
                      className="text-gray-500 cursor-pointer"
                    />
                    <IconTrash
                      size={20}
                      className="text-gray-500 cursor-pointer"
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
