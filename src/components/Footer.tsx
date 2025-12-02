import React from "react";

const Footer = () => {
  return (
    <footer className="w-full border-t bg-white">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-600 text-white flex items-center justify-center rounded-xl text-xl font-semibold">
              S
            </div>
            <h1 className="text-2xl font-semibold">SCOTT Parts</h1>
          </div>
          <p className="text-gray-600 ">
            Premium quality tractor spare parts for all major brands and models.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-600">
            <li className="hover:text-gray-900 cursor-pointer">Categories</li>
            <li className="hover:text-gray-900 cursor-pointer">All Products</li>
            <li className="hover:text-gray-900 cursor-pointer">Search Parts</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Categories</h3>
          <ul className="space-y-2 text-gray-600">
            <li>Engine Parts</li>
            <li>Transmission</li>
            <li>Electrical</li>
            <li>Hydraulic</li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-2 text-gray-600">
            <li>Email: info@scottparts.com</li>
            <li>Phone: +1 (555) 123-4567</li>
            <li>Hours: Mon–Fri 9AM–6PM</li>
          </ul>
        </div>
      </div>
      <hr className="w-3/4 mx-auto" />
      <div className="text-center py-6  text-gray-500">
        © 2025 SCOTT Parts. All rights reserved. 
     

      </div>
    </footer>
  );
};

export default Footer;
