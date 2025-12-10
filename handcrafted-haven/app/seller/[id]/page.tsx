import { notFound } from "next/navigation";
import Image from "next/image";
import { getSellerById } from "@/lib/data";
import { SellerProductList } from "./_components/seller-product-list";
import Link from "next/link";
import { auth } from "@/auth"; 

type SellerPageProps = {
    params: Promise<{ id: string }>;
};

export default async function SellerPage({ params }: SellerPageProps) {
    const { id } = await params;

    // Fetch seller info
    const seller = await getSellerById(id);
    if (!seller) {
        notFound();
    }

    // Get logged-in user session
    const session = await auth();
    const loggedInUser = session?.user;

    return (
        <main className="max-w-5xl mx-auto px-4 py-8">

            {/* Seller Header */}
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

                <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-900">{seller.name}</h1>
                    <p className="mt-2 text-sm text-gray-500">{seller.email}</p>

                    {seller.bio && (
                        <p className="mt-4 text-base text-gray-700 max-w-xl">
                            {seller.bio}
                        </p>
                    )}

                    {loggedInUser?.id === seller.id && (
                        <div className="mt-5">
                            <Link
                                href={`/seller/${seller.id}/profile`}
                                className="inline-block px-4 py-2 rounded-md bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition"
                            >
                                Edit Profile
                            </Link>
                        </div>
                    )}
                </div>
            </section>

            {/* Product List */}
            <SellerProductList sellerId={seller.id} sellerName={seller.name} />
        </main>
    );
}
