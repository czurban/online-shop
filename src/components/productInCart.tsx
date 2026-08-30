import type { ProductInCart } from "../types";

interface Props extends ProductInCart {
  onRemove: (id: number) => void;
  onChangeQuantity: (id: number, delta: number) => void;
}

export const ProductsInCarts = ({
  id,
  price,
  name,
  description,
  image,
  quantity,
  onRemove,
  onChangeQuantity,
}: Props) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex gap-4 items-center">
      <div className="w-20 h-20 bg-slate-100 rounded-lg shrink-0 flex items-center justify-center p-2">
        <img src={image} alt={name} className="w-full h-full object-contain" />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-slate-800 line-clamp-1">{name}</h3>
        <p className="text-slate-500 text-sm line-clamp-2">{description}</p>

        <div className="flex items-center gap-3 mt-3">
          <button
            onClick={() => onChangeQuantity(id, -1)}
            aria-label="Decrease quantity"
            className="w-7 h-7 rounded-full border border-slate-300 text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            −
          </button>
          <span className="font-medium text-slate-800 w-4 text-center">
            {quantity}
          </span>
          <button
            onClick={() => onChangeQuantity(id, 1)}
            aria-label="Increase quantity"
            className="w-7 h-7 rounded-full border border-slate-300 text-slate-600 hover:bg-slate-100 transition cursor-pointer"
          >
            +
          </button>

          <button
            onClick={() => onRemove(id)}
            className="ml-4 text-sm text-red-500 hover:text-red-700 transition cursor-pointer"
          >
            Remove
          </button>
        </div>
      </div>

      <p className="font-bold whitespace-nowrap text-slate-900 ml-auto">
        {(price * quantity).toFixed(2)} $
      </p>
    </div>
  );
};
