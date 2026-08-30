import { useParams } from "react-router-dom";
import { ProductShowcase } from "../components/product";
import type { Product } from "../types";

export function SearchResultsPage({
  products,
  onAddToCart,
}: {
  products: Product[];
  onAddToCart: (p: Product) => void;
}) {
  const { searchValue } = useParams<{ searchValue: string }>();

  if (!searchValue || searchValue.trim() === "") {
    return (
      <p className="text-slate-500 text-center py-10 font-medium">
        Please enter something in the search bar to find products.
      </p>
    );
  }

  const filtered = products.filter((item) =>
    item.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  if (filtered.length === 0) {
    return (
      <p className="text-slate-500 text-center py-10 font-medium">
        No products found for "{searchValue}"
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {filtered.map((product) => (
        <ProductShowcase
          key={product.id}
          {...product}
          onAddToCart={() => onAddToCart(product)}
        />
      ))}
    </div>
  );
}
