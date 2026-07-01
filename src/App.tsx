import { useEffect, useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { ProductShowcase } from "./components/product";
import { ProductsInCarts } from "./components/productInCart";
import "./index.css";
import { fetchProducts } from "./services/api";
import type { Product, ProductInCart } from "./types";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [cart, setCart] = useState<ProductInCart[]>(() => {
    const saved = localStorage.getItem("my_cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("my_cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        console.error(err);
        setError("error");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const ClearCart = () => {
    setCart([]);
  };

  const AddItemToCart = (product: Product) => {
    const newItem: ProductInCart = {
      id: product.id,
      name: product.title,
      price: product.price,
      description: product.description,
      image: product.image,
    };
    setCart([...cart, newItem]);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-6">
          <NavLink to="/" className="flex-shrink-0 hover:opacity-80 transition">
            <img
              src="/logo.png"
              width={150}
              height={40}
              alt="Logo"
              className="object-contain"
            />
          </NavLink>

          <div className="flex flex-1 max-w-xl">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="w-full px-4 py-2 border border-slate-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <button className="bg-blue-800 text-white px-6 py-2 rounded-r-lg hover:bg-blue-900 transition font-medium">
              Search
            </button>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <button className="text-slate-600 hover:text-blue-600 font-medium transition">
              Sign in
            </button>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-800"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`
              }
            >
              🛒 Cart ({cart.length})
            </NavLink>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <Routes>
          <Route
            path="/"
            element={
              <div className="space-y-6">
                <h1 className="text-2xl font-bold text-slate-800">
                  Recommended by customers
                </h1>

                {loading && <p className="text-slate-500">Loading</p>}
                {error && <p className="text-red-500">Error</p>}

                {!loading && !error && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((item) => (
                      <ProductShowcase
                        key={item.id}
                        {...item}
                        onAddToCart={() => AddItemToCart(item)}
                      />
                    ))}
                  </div>
                )}
              </div>
            }
          />

          <Route
            path="/cart"
            element={
              <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-3xl font-bold text-slate-800">
                    Order in process
                  </h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2 space-y-4">
                    {cart.length === 0 ? (
                      <p className="text-slate-500">Your Cart Is Empty</p>
                    ) : (
                      cart.map((item, index) => (
                        <ProductsInCarts
                          id={item.id}
                          key={index}
                          name={item.name}
                          price={item.price}
                          description={item.description}
                          image={item.image}
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
                        {`${cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0).toFixed(2)} $`}
                      </p>
                    </div>

                    <button className="w-full bg-blue-800 text-white py-3 rounded-xl hover:bg-blue-900 transition font-bold text-lg cursor-pointer mb-3">
                      Order
                    </button>

                    {cart.length > 0 && (
                      <button
                        onClick={ClearCart}
                        className="w-full cursor-pointer text-center text-sm font-medium text-red-500 hover:text-red-700 hover:bg-red-50 py-2 rounded-xl transition"
                      >
                        🗑️ Clear Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
