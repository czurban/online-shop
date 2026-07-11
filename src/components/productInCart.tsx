import type { ProductInCart } from "../types";

export const ProductsInCarts = ({
  price,
  name,
  description,
  image,
}: ProductInCart) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-4 items-center">
      <div className="w-20 h-20 bg-slate-100 rounded-lg shrink-0 flex items-center justify-center p-2">
        <img src={image} alt={name} className="w-full h-full object-contain" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-slate-800 line-clamp-1">{name}</h3>
        <p className="text-slate-500 text-sm line-clamp-2">{description}</p>
      </div>
      <p className="font-bold whitespace-nowrap text-slate-900 ml-auto">
        {price} $
      </p>
    </div>
  );
};
