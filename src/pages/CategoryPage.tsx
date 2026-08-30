import { useParams } from "react-router-dom";
import { ProductShowcase } from "../components/product";
import type { Product } from "../types";

export function CategoryPage({
  products,
  onAddToCart,
}: {
  products: Product[];
  onAddToCart: (p: Product) => void;
}) {
  const { categoryName } = useParams<{ categoryName: string }>();
  const decodedCategory = decodeURIComponent(categoryName || "");

  const filtered = products.filter((item) => item.category === decodedCategory);

  if (filtered.length === 0) {
    return (
      <p className="text-slate-500 text-center py-10 font-medium">
        No products found in "{decodedCategory}"
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800 capitalize">
        {decodedCategory}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filtered.map((product) => (
          <ProductShowcase
            key={product.id}
            {...product}
            onAddToCart={() => onAddToCart(product)}
          />
        ))}
      </div>
    </div>
  );
}
