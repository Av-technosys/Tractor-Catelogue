"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IconMenu2, IconSearch } from "@tabler/icons-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useRouter } from "next/navigation";

// --- TYPES DEFINITION ---
interface Category {
  id: string | number;
  name: string;
}

interface Product {
  id: string | number;
  name: string;
}

interface SearchResults {
  categories: Category[];
  products: Product[];
}

const Drawer = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResults | null>(null);

  useEffect(() => {
    // 1. If query is empty, reset results and stop
    // if (!query.trim()) {
    //   setResults(null);
    //   return;
    // }

    // 2. Use a flag to prevent setting state on an unmounted component
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data: SearchResults = await res.json();
        
        if (isMounted) {
          setResults(data);
        }
      } catch (error) {
        console.error("Search fetch error:", error);
        if (isMounted) setResults(null);
      }
    };

    fetchData();

    // 3. Cleanup function
    return () => {
      isMounted = false;
    };
  }, [query]);

  const handleRedirect = (url: string) => {
    router.push(url);
    setQuery("");
    setResults(null);
  };

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-3 py-3">
        
        {/* MOBILE VIEW */}
        <div className="flex items-center gap-2 sm:hidden">
          <div className="w-9 h-9 bg-sky-600 rounded-full flex items-center justify-center text-white font-bold">
            S
          </div>

          <div className="relative flex-1">
            <div className="flex items-center bg-gray-100 px-3 py-2 rounded-full gap-2">
              <IconSearch size={16} className="text-gray-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="bg-transparent focus:outline-none w-full text-sm"
              />
            </div>

            {results && (
              <div className="absolute top-10 left-0 w-full bg-white shadow-lg rounded-xl p-3 z-50">
                {results.categories && results.categories.length > 0 && (
                  <>
                    <p className="text-xs text-gray-400 font-semibold">Categories</p>
                    {results.categories.map((cat) => (
                      <div
                        key={cat.id}
                        onClick={() => handleRedirect(`/categories/${cat.id}`)}
                        className="px-2 py-1 text-sm rounded hover:bg-gray-100 cursor-pointer text-gray-700"
                      >
                        {cat.name}
                      </div>
                    ))}
                  </>
                )}

                {results.products && results.products.length > 0 && (
                  <>
                    <p className="text-xs text-gray-400 font-semibold mt-2">Products</p>
                    {results.products.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => handleRedirect(`/products/${prod.id}`)}
                        className="px-2 py-1 text-sm rounded hover:bg-gray-100 cursor-pointer text-gray-700"
                      >
                        {prod.name}
                      </div>
                    ))}
                  </>
                )}
              </div>
            )}
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <button className="w-9 h-9 flex items-center justify-center">
                <IconMenu2 size={22} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="p-5">
              <SheetHeader />
              <div className="flex flex-col gap-5 mt-4">
                <Link href="/" className="text-lg font-semibold">Home</Link>
                <Link href="/categories" className="text-lg text-gray-500">Categories</Link>
                <Link href="/products" className="text-lg text-gray-500">Products</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* TABLET VIEW */}
        <div className="hidden sm:flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
              S
            </div>
            <Sheet>
              <SheetTrigger asChild>
                <button className="w-10 h-10 flex items-center justify-center">
                  <IconMenu2 size={22} />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="p-5">
                <SheetHeader />
                <div className="flex flex-col gap-5 mt-4">
                  <Link href="/" className="text-lg font-semibold">Home</Link>
                  <Link href="/categories" className="text-lg text-gray-500">Categories</Link>
                  <Link href="/products" className="text-lg text-gray-500">Products</Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="relative">
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full gap-2">
              <IconSearch size={18} className="text-gray-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search product or category"
                className="bg-transparent focus:outline-none w-full text-sm"
              />
            </div>
            
            {results && (results.categories?.length > 0 || results.products?.length > 0) && (
              <div className="absolute top-11 left-0 w-full bg-white shadow-lg rounded-xl p-3 z-50">
                 {results.categories?.map((cat) => (
                    <div key={cat.id} onClick={() => handleRedirect(`/categories/${cat.id}`)} className="px-2 py-1 text-sm rounded hover:bg-gray-100 cursor-pointer">{cat.name}</div>
                 ))}
                 {results.products?.map((prod) => (
                    <div key={prod.id} onClick={() => handleRedirect(`/products/${prod.id}`)} className="px-2 py-1 text-sm rounded hover:bg-gray-100 cursor-pointer">{prod.name}</div>
                 ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
};

export default Drawer;