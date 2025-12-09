"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "@/lib/definitions";

type ProductContextType = {
    products: Product[];
    addProduct: (product: Product) => void;
    setInitialProducts: (products: Product[]) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);

    const addProduct = (product: Product) => {
        setProducts((prev) => [...prev, product]);
    };

    // We allow setting initial products to hydration from server data if needed,
    // or we can just load them from the lib/data in the layout.
    // For simplicity, we'll initialize them in the wrapper if empty.
    const setInitialProducts = (initialProducts: Product[]) => {
        // Only set if empty to avoid overwriting state
        setProducts((prev) => prev.length === 0 ? initialProducts : prev);
    };

    return (
        <ProductContext.Provider value={{ products, addProduct, setInitialProducts }}>
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductContext);
    if (context === undefined) {
        throw new Error("useProducts must be used within a ProductProvider");
    }
    return context;
}
