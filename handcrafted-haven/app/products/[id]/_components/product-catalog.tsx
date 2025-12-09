"use client";

import { useState, useMemo, useEffect } from "react";
import { ProductCard } from "./product-card";
import type { Product } from "@/app/lib/definitions";

type ProductCatalogProps = {
  products: Product[];
};

const ProductCatalog = ({ products }: ProductCatalogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // "" means "All Categories"

  // calculate max price from products
  const maxPrice = useMemo(() => {
    if (products.length === 0) return 100;
    return Math.ceil(Math.max(...products.map((p) => p.price)));
  }, [products]);

  const [priceLimit, setPriceLimit] = useState(maxPrice);

  // reset price limit when maxPrice changes
  useEffect(() => {
    setPriceLimit(maxPrice);
  }, [maxPrice]);

  // generate unique categories from products
  const categories = useMemo(() => {
    return [...new Set(products.map((p) => p.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    let tempProducts = products;

    // filtering by category
    if (selectedCategory) {
      tempProducts = tempProducts.filter(
        (product) => product.category === selectedCategory
      );
    }

    // filtering by search term
    if (searchTerm) {
      tempProducts = tempProducts.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // filtering by price limit
    tempProducts = tempProducts.filter(
      (product) => product.price <= priceLimit
    );

    return tempProducts;
  }, [products, searchTerm, selectedCategory, priceLimit]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow max-w-sm p-2 border border-gray-300 rounded-md"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <div className="flex items-center gap-2 w-full max-w-sm">
          <input
            type="range"
            min={0}
            max={maxPrice}
            value={priceLimit}
            onChange={(e) => setPriceLimit(Number(e.target.value))}
            className="w-full"
          />
          <span className="text-sm text-gray-700 w-24 text-right">
            Up to ${priceLimit}
          </span>        </div>
      </div>
      <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;
