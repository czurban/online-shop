import { ProductsInCarts } from "../components/productInCart";
import type { ProductInCart } from "../types";

export function CartPage({
  cart,
  totalPrice,
  onRemove,
  onChangeQuantity,
  onClear,
}: {
  cart: ProductInCart[];
  totalPrice: number;
  onRemove: (id: number) => void;
  onChangeQuantity: (id: number, delta: number) => void;
  onClear: () => void;
}) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-slate-800">Order in process</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {cart.length === 0 ? (
            <p className="text-slate-500">Your Cart Is Empty</p>
          ) : (
            cart.map((item) => (
              <ProductsInCarts
                key={item.id}
                {...item}
                onRemove={onRemove}
                onChangeQuantity={onChangeQuantity}
              />
            ))
          )}
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-fit sticky top-24 flex flex-col">
          <div className="flex justify-between text-slate-600 mb-6">
            <p>Delivery</p>
            <p className="text-green-600 font-medium">Free</p>
          </div>

          <div className="border-t border-slate-100 pt-4 mb-6 flex justify-between items-center">
            <p className="font-bold text-lg">Summary</p>
            <p className="font-bold text-2xl text-slate-900">
              {`${totalPrice.toFixed(2)} $`}
            </p>
          </div>

          <button
            disabled={cart.length === 0}
            className="w-full bg-blue-800 text-white py-3 rounded-xl hover:bg-blue-900 transition font-bold text-lg cursor-pointer mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Order
          </button>

          {cart.length > 0 && (
            <button
              onClick={onClear}
              className="w-full cursor-pointer text-center text-sm font-medium text-red-500 hover:text-red-700 hover:bg-red-50 py-2 rounded-xl transition"
            >
              Clear Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
