"use client";

import { AuthProvider } from "@/app/_context/auth-context";
import { ProductProvider, useProducts } from "@/app/_context/product-context";
import { getProducts } from "@/lib/data";
import { useEffect, ReactNode } from "react";

// Inner component to handle data initialization
function DataInitializer({ children }: { children: ReactNode }) {
    const { setInitialProducts } = useProducts();

    useEffect(() => {
        const loadData = async () => {
            const products = await getProducts();
            setInitialProducts(products);
        };
        loadData();
    }, [setInitialProducts]);

    return <>{children}</>;
}

export function Providers({ children }: { children: ReactNode }) {
    return (
        <AuthProvider>
            <ProductProvider>
                <DataInitializer>
                    {children}
                </DataInitializer>
            </ProductProvider>
        </AuthProvider>
    );
}
