"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IconSearch } from "@tabler/icons-react";
import Drawer from "./Drawer";
import { useRouter } from "next/navigation";


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

const Header = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const [results, setResults] = useState<SearchResults | null>(null);

  useEffect(() => {
  
    if (!query.trim()) {
      setResults(null);
      return;
    }

    const fetchData = async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error("Search failed");
        const data: SearchResults = await res.json();
        setResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults(null);
      }
    };


    fetchData();
  }, [query]);

  const handleRedirect = (url: string) => {
    router.push(url);
    setQuery("");
    setResults(null);
  };

  return (
    <>
   
      <header className="w-full bg-white shadow-sm max-sm:hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-4">

  
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                S
              </div>
              <h1 className="text-xl font-bold">SCOTT Parts</h1>
            </div>

            <nav className="flex items-center gap-8 font-semibold text-gray-600 ">
              <Link href="/" className="hover:text-sky-600">Home</Link>
              <Link href="/categories" className="hover:text-sky-600">Categories</Link>
              <Link href="/products" className="hover:text-sky-600">Products</Link>
            </nav>
          </div>

          <div className="relative w-40 sm:w-48 md:w-56 lg:w-72 xl:w-80">
            <div className="flex items-center bg-gray-100 px-4 py-2 rounded-full gap-2">
              <IconSearch size={20} className="text-gray-500" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search product or category"
                className="bg-transparent focus:outline-none w-full text-gray-600"
              />
            </div>

            {results && (results.categories?.length > 0 || results.products?.length > 0) && (
              <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-xl p-3 z-50 border border-gray-100">
                {results.categories && results.categories.length > 0 && (
                  <div className="mb-2">
                    <p className="px-3 text-xs text-gray-400 font-bold uppercase tracking-wider">
                      Categories
                    </p>
                    {results.categories.map((cat) => (
                      <div
                        key={cat.id}
                        onClick={() => handleRedirect(`/categories/${cat.id}`)}
                        className="px-3 py-2 cursor-pointer rounded-lg hover:bg-sky-50 text-gray-700 transition-colors"
                      >
                        {cat.name}
                      </div>
                    ))}
                  </div>
                )}

                {results.products && results.products.length > 0 && (
                  <div>
                    <p className="px-3 text-xs text-gray-400 font-bold uppercase tracking-wider mt-2">
                      Products
                    </p>
                    {results.products.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => handleRedirect(`/products/${prod.id}`)}
                        className="px-3 py-2 cursor-pointer rounded-lg hover:bg-sky-50 text-gray-700 transition-colors"
                      >
                        {prod.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

    
      <div className="sm:hidden">
        <Drawer />
      </div>
    </>
  );
};

export default Header;