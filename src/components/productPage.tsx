import { useParams } from "react-router-dom";
import type { Product } from "../types";

export const ProductPage = ({
  products,
  onAddToCart,
}: {
  products: Product[];
  onAddToCart: (product: Product) => void;
}) => {
  const { category, title } = useParams();

  const product = products.find(
    (p) => p.category === category && p.title === title,
  );

  if (!product) {
    return (
      <div className="text-center py-20 text-xl font-bold text-slate-600">
        Product not found 😕
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 leading-tight">
        {product.title}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-center min-h-[400px]">
            <img
              src={product.image}
              alt={product.title}
              className="max-h-[380px] object-contain hover:scale-105 transition duration-300"
            />
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-3">
              Product description
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              {product.description}
            </p>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 space-y-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center gap-2 text-sm">
              <span className="flex items-center text-amber-500 font-semibold gap-0.5">
                {"⭐".repeat(Math.round(product.rating.rate || 5))}
                <span className="ml-1 text-slate-800">
                  {product.rating.rate}
                </span>
              </span>
              <span className="text-slate-400">
                ({product.rating.count} reviews)
              </span>
            </div>

            <hr className="border-slate-100" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Category:</span>
                <span className="font-medium text-slate-800 capitalize">
                  {product.category}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery:</span>
                <span className="text-green-600 font-semibold">
                  Free delivery
                </span>
              </div>
            </div>

            <hr className="border-slate-100" />

            <div className="space-y-1">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-slate-900">
                  {Math.floor(product.price)}
                </span>
                <span className="text-lg font-bold text-slate-900">
                  ,{((product.price % 1) * 100).toFixed(0).padStart(2, "0")} $
                </span>
              </div>
            </div>

            <button
              onClick={() => onAddToCart(product)}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-slate-900 py-3.5 rounded-xl font-bold text-lg shadow-sm hover:shadow transition active:scale-[0.98] cursor-pointer"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
