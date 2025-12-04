import Categories from '@/src/components/Categories'
import React from 'react'
export default function page() {
  return (
    <div className="text-center bg-gray-50 mb-10">
     <div className="text-start mb-10 p-10 bg-gray-100">
        <h1 className="text-4xl font-bold">Product Categories</h1>
        <p className="text-gray-500 py-5 ">
          Browse our complete range of tractor spare parts organized by category
        </p>
      </div> <Categories/>
    </div>
  )
}
