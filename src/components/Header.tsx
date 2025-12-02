import Link from "next/link";
import React from "react";
import { IconSearch } from "@tabler/icons-react";
import Drawer from "./Drawer";




const Header = () => {
  return (
    <>
    <header className="w-full bg-white shadow-sm  max-sm:hidden">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4">

        {/* -------- LEFT SIDE (Logo + Navbar) -------- */}
        <div className="flex items-center gap-10">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
            <h1 className="text-xl font-bold">SCOTT Parts</h1>
          </div>

          {/* Navbar */}
          <nav className="flex items-center gap-8 font-semibold text-gray-600">
            <Link href="/" className="hover:text-black transition">Home</Link>
            <Link href="/Categories" className="hover:text-black transition">Categories</Link>
            <Link href="/Products" className="hover:text-black transition">Products</Link>
          </nav>

        </div>

    
        <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full w-60 gap-2">
          <IconSearch size={20} className="text-gray-500" />
          
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent focus:outline-none text-gray-600 w-full"
          />
        </div>
      
      </div>
   
    </header>
       <div
      className="md:hidden"><Drawer/></div>
      </>
  );
};

export default Header;
