import Image from "next/image";
import { notFound } from "next/navigation";
import { getProducts, getSellers } from "@/lib/data";
import type { Product, Seller } from "@/lib/definitions";
import Link from "next/link";

type ProductDetailPageProps = {
  params: Promise<{ id: string }>;
};

/**
 * Fetch a single product and its seller.
 * TODO Backend Team: Replace this mock lookup with real DB queries.
 *  - Example: const product = await db.product.findUnique({ where: { id } });
 *  - Also fetch seller via relation: product.seller
 */
async function getProductDetails(
  id: string
): Promise<{ product: Product; seller: Seller } | undefined> {
  const products = await getProducts();
  const product = products.find((product) => product.id === id);

  if (!product) {
    return undefined; // triggers 404 page
  }

  const sellers = await getSellers();
  const seller = sellers.find((s) => s.id === product.sellerId);

  /**
   * TODO Backend Team:
   * Enforce relational integrity in the database so invalid sellerId cannot occur.
   * If seller is missing, treat as invalid product data.
   */
  if (!seller) {
    return undefined;
  }

  return { product, seller };
}

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const { id } = await params;
  const details = await getProductDetails(id);

  if (!details) {
    notFound();
  }

  const { product, seller } = details;

  return (
    <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">

        {/* Product Image */}
        <div className="bg-gray-200 rounded-lg flex items-center justify-center">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={500}
            height={500}
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
            {product.name}
          </h1>

          <p className="mt-2 text-sm text-gray-500">{product.category}</p>

          {/* Seller Link */}
          <p className="mt-1 text-sm text-gray-500">
            Sold by:{" "}
            <Link
              href={`/seller/${seller.id}`}
              className="font-medium text-indigo-600 hover:underline"
            >
              {seller.name}
            </Link>
          </p>

          <p className="mt-4 text-3xl text-gray-900">${product.price}</p>

          <p className="mt-6 text-base text-gray-700">{product.description}</p>

          <div className="mt-8">
            <button className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
