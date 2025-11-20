import { getProducts } from "@/lib/data";
import ProductCatalog from "./products/_components/product-catalog";

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
        Handcrafted-Haven
      </h1>
      <ProductCatalog products={products} />
    </main>
  );
}