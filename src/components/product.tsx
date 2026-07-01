import type { Product } from "../types";

export const ProductShowcase = ({
  title,
  price,
  image,
  rating,
  onAddToCart,
}: Product & { onAddToCart: () => void }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition group flex flex-col justify-between h-full">
      <div>
        <div className="relative aspect-square bg-slate-100 rounded-xl mb-4 flex items-center justify-center text-slate-400 group-hover:bg-slate-200 transition p-4">
          <p className="absolute top-2 right-2 text-xs text-slate-600 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md border border-slate-200 flex items-center gap-1 shadow-sm z-10">
            ⭐
            <span className="font-semibold text-slate-800">{rating.rate}</span>
            <span className="text-slate-400">({rating.count})</span>
          </p>

          <img src={image} alt={title} className="max-h-32 object-contain" />
        </div>

        <h3 className="text-center font-semibold text-slate-800 mb-1 line-clamp-2 h-12">
          {title}
        </h3>

        <div className="flex items-center justify-center mb-4 mt-2">
          <p className="text-blue-600 font-bold text-lg">{price} $</p>
        </div>
      </div>

      <button
        onClick={onAddToCart}
        className="cursor-pointer w-full bg-slate-900 text-white py-2.5 rounded-xl hover:bg-slate-800 transition font-medium mt-auto"
      >
        In Cart
      </button>
    </div>
  );
};
