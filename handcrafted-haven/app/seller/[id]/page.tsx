import { notFound } from "next/navigation";
import Image from "next/image";
import { getSellerById, getProducts } from "@/lib/data";
import { ProductCard } from "@/app/products/_components/product-card";
import { Avatar } from "@/app/components/Avatar";

type SellerPageProps = {
    params: Promise<{ id: string }>;
};

export default async function SellerPage({ params }: SellerPageProps) {
    const { id } = await params;

    const seller = await getSellerById(id);
    if (!seller) {
        notFound();
    }

    const allProducts = await getProducts();
    const sellerProducts = allProducts.filter(
        (product) => product.sellerId === seller.id
    );

    return (
        <main className="max-w-5xl mx-auto px-4 py-8">
            <section className="flex flex-col md:flex-row gap-6 items-start">
                <div className="w-32 h-32 md:w-40 md:h-40 relative rounded-full overflow-hidden bg-gray-200">
                    {seller.profileImageUrl ? (
                        <Image
                            src={seller.profileImageUrl}
                            alt={seller.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                            No Image
                        </div>
                    )}
                </div>

                <div>
                    <h1 className="text-3xl font-bold text-gray-900">{seller.name}</h1>
                    <p className="mt-2 text-sm text-gray-500">{seller.email}</p>
                    {seller.bio && (
                        <p className="mt-4 text-base text-gray-700 max-w-xl">{seller.bio}</p>
                    )}
                </div>
            </section>

            <section className="mt-10">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                    Products by {seller.name}
                </h2>

                {sellerProducts.length === 0 ? (
                    <p className="text-gray-600">This seller has no products yet D:</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sellerProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
