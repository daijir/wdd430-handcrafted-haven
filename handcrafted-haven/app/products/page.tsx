import { getProducts } from "@/app/lib/data";
import ProductCatalog from "./_components/product-catalog";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-8">
        Products
      </h1>
      <a 
          href="/login" 
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600 text-align-right mb-4 inline-block"
      >
          login
      </a>
          
        
      <ProductCatalog products={products} />
    </main>
  );
}
