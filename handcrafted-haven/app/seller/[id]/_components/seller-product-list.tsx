"use client";

import { useProducts } from "@/app/_context/product-context";
import { ProductCard } from "@/app/products/_components/product-card";
import { AddProductButton } from "./add-product-button";

export function SellerProductList({ sellerId, sellerName }: { sellerId: string, sellerName: string }) {
    const { products } = useProducts();

    const sellerProducts = products.filter(
        (product) => product.sellerId === sellerId
    );

    return (
        <section className="mt-10">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                    Products by {sellerName}
                </h2>
                <AddProductButton sellerId={sellerId} />
            </div>

            {sellerProducts.length === 0 ? (
                <p className="text-gray-600">This seller has no products yet.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {sellerProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </section>
    );
}
