import { useEffect, useState } from "react";
import { NavLink, Route, Routes, useParams } from "react-router-dom";
import { BANNERS, promotions } from "./arrays";
import { Footer } from "./components/Footer";
import { ProductShowcase } from "./components/Product";
import { ProductsInCarts } from "./components/ProductInCart";
import { ProductPage } from "./components/ProductPage";
import { Promotion } from "./components/Promotions";
import "./index.css";
import { fetchProducts } from "./services/api";
import type { Product, ProductInCart } from "./types";

function SearchResultsPage({
  products,
  onAddToCart,
}: {
  products: Product[];
  onAddToCart: (p: Product) => void;
}) {
  const { searchValue } = useParams<{ searchValue: string }>();

  const filtered = products.filter((item) =>
    item.title.toLowerCase().includes((searchValue || "").toLowerCase()),
  );

  if (filtered.length === 0) {
    return (
      <p className="text-slate-500 text-center py-10">
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

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentPosition, setCurrentPosition] = useState(0);

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

  const recommendedlist = [...products]
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 8);

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === BANNERS.length - 1 ? 0 : prev + 1));
  };

  const maxScroll = promotions.length * 154 - 1100;

  const moveRight = () => {
    setCurrentPosition((prev) => {
      const next = prev + 1240;
      return next > maxScroll ? maxScroll : next;
    });
  };

  const moveLeft = () => {
    setCurrentPosition((prev) => {
      const next = prev - 1240;
      return next > 0 ? 0 : next;
    });
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? BANNERS.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
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
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="What are you looking for?"
              className="w-full px-4 py-2 border border-slate-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            />
            <NavLink to={`/search/${encodeURIComponent(searchValue)}`}>
              <button className="bg-blue-800 text-white cursor-pointer px-6 py-2 rounded-r-lg hover:bg-blue-900 transition font-medium">
                Search
              </button>
            </NavLink>
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

      <main className="max-w-7xl mx-auto px-4 py-8 flex-grow w-full">
        <Routes>
          <Route
            path="/"
            element={
              <div className="space-y-10">
                <div className="relative w-full h-[300px] md:h-[400px] bg-slate-200 rounded-2xl overflow-hidden shadow-md group">
                  <div
                    className="flex h-full transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {BANNERS.map((banner) => (
                      <div
                        key={banner.id}
                        className="w-full h-full flex-shrink-0 relative"
                      >
                        <img
                          src={banner.image}
                          alt={banner.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6 md:p-12">
                          <h2 className="text-white text-xl md:text-3xl font-bold max-w-xl">
                            {banner.title}
                          </h2>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-3 rounded-full shadow-md transition opacity-0 group-hover:opacity-100 cursor-pointer hidden sm:block z-10"
                  >
                    ❮
                  </button>

                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-3 rounded-full shadow-md transition opacity-0 group-hover:opacity-100 cursor-pointer hidden sm:block z-10"
                  >
                    ❯
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                    {BANNERS.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`cursor-pointer w-3 h-3 rounded-full transition-all ${
                          currentSlide === index
                            ? "bg-white w-6"
                            : "bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-slate-800">
                      Promotions!
                    </h2>
                    <button className="text-blue-800 hover:text-blue-950 text-sm font-semibold transition">
                      See all ❯
                    </button>
                  </div>

                  <div className="w-full overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-200 relative group">
                    <div
                      className="flex gap-6 transition-transform duration-500 ease-out"
                      style={{ transform: `translateX(-${currentPosition}px)` }}
                    >
                      {promotions.map((promotion) => (
                        <Promotion
                          key={promotion.id}
                          title={promotion.title}
                          image={promotion.image}
                        />
                      ))}
                    </div>

                    {currentPosition > 0 && (
                      <button
                        onClick={moveLeft}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 w-11 h-11 rounded-full shadow-md border border-slate-200 flex items-center justify-center hover:scale-105 transition cursor-pointer z-10"
                      >
                        ❮
                      </button>
                    )}

                    <button
                      onClick={moveRight}
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 w-11 h-11 rounded-full shadow-md border border-slate-200 flex items-center justify-center hover:scale-105 transition cursor-pointer z-10"
                    >
                      ❯
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  <h1 className="text-2xl font-bold text-slate-800">
                    Recommended by customers
                  </h1>

                  {loading && <p className="text-slate-500">Loading</p>}
                  {error && <p className="text-red-500">Error</p>}

                  {!loading && !error && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {recommendedlist.map((item) => (
                        <ProductShowcase
                          key={item.id}
                          {...item}
                          onAddToCart={() => AddItemToCart(item)}
                        />
                      ))}
                    </div>
                  )}
                </div>
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
          <Route
            path="/:category/:title"
            element={
              <ProductPage products={products} onAddToCart={AddItemToCart} />
            }
          />
          <Route
            path="/search/:searchValue"
            element={
              <SearchResultsPage
                products={products}
                onAddToCart={AddItemToCart}
              />
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
