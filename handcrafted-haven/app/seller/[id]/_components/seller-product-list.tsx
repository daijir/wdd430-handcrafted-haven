import { sql } from "@/lib/db";
import { ProductCard } from "@/app/products/_components/product-card";
import { AddProductButton } from "./add-product-button";

export async function SellerProductList({ sellerId, sellerName }: { sellerId: string, sellerName: string }) {
    const products = await sql`
        SELECT * FROM products WHERE seller_id = ${sellerId}
    `;

    // Map DB fields (snake_case) to Product type (camelCase)
    const sellerProducts = products.map((p: any) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        price: Number(p.price),
        category: p.category,
        sellerId: p.seller_id,
        imageUrl: p.image_url
    }));

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