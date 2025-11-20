import { getProducts } from "@/lib/data";
import ProductCatalog from "./_components/product-catalog";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
        Products
      </h1>
      <ProductCatalog products={products} />
    </main>
  );
}
