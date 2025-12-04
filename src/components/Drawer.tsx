import React from "react";
import Link from "next/link";
import { IconMenu2 } from "@tabler/icons-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet";

const Drawer = () => {
  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
          S
        </div>

        <Sheet>
          <SheetTrigger>
            <div className="w-10 h-10  flex items-center justify-center">
              <IconMenu2 size={20} />
            </div>
          </SheetTrigger>

          <SheetContent side="right" className="p-5">

           
            <SheetHeader>
              <SheetTitle></SheetTitle>
              <SheetDescription >
              </SheetDescription>
            </SheetHeader>


            <div className=" flex flex-col gap-5">
              <Link href="/" className="text-lg font-semibold">
                Home
              </Link>

              <Link href="/categories" className="text-lg text-gray-500">
                Categories
              </Link>

              <Link href="/products" className="text-lg text-gray-500">
                Products
              </Link>
            </div>

          </SheetContent>
        </Sheet>

      </div>
    </header>
  );
};

export default Drawer;
