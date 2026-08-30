import { useEffect, useState } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import { accounts as initialAccounts } from "./arrays";
import { Footer } from "./components/Footer";
import { Layout } from "./components/Layout";
import { ProductPage } from "./components/productPage";
import { useCart } from "./hooks/useCart";
import "./index.css";
import { CartPage } from "./pages/CartPage";
import { CategoryPage } from "./pages/CategoryPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { SearchResultsPage } from "./pages/SearchResultsPage";
import { fetchProducts } from "./services/api";
import type { account, Product } from "./types";

function App() {
  const [isLogined, setIsLogined] = useState<boolean>(false);
  const [currentUsername, setCurrentUsername] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [allAccounts, setAllAccounts] = useState<account[]>(() => {
    const savedAccounts = localStorage.getItem("my_accounts");
    return savedAccounts ? JSON.parse(savedAccounts) : initialAccounts;
  });

  const {
    cart,
    addItemToCart,
    removeItemFromCart,
    changeQuantity,
    clearCart,
    totalPrice,
  } = useCart();

  useEffect(() => {
    localStorage.setItem("my_accounts", JSON.stringify(allAccounts));
  }, [allAccounts]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const data = await fetchProducts();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(
          err instanceof Error ? err.message : "Failed to load products",
        );
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const recommendedlist = [...products]
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 8);

  const categories = Array.from(new Set(products.map((p) => p.category)));

  function registerAccount(newAccount: account) {
    setAllAccounts((prev) => [...prev, newAccount]);
  }

  function handleLoginSuccess(username: string) {
    setIsLogined(true);
    setCurrentUsername(username);
  }

  function logout() {
    setIsLogined(false);
    setCurrentUsername("");
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col overflow-y-scroll relative">
      {isLogined ? (
        <div className="absolute top-4 right-4 md:right-8 z-50 flex items-center gap-3 bg-white/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm text-sm">
          <span className="text-slate-700 font-medium">{currentUsername}</span>
          <button
            onClick={logout}
            className="text-red-500 hover:text-red-700 font-medium transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="absolute top-4 right-4 md:right-8 z-50 flex items-center gap-2 bg-white/80 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-200 shadow-sm text-sm">
          <NavLink
            className="text-slate-600 hover:text-blue-600 font-medium transition"
            to="/login"
          >
            Sign in
          </NavLink>
          <p className="text-slate-300 shadow-none">/</p>
          <NavLink
            className="text-slate-600 hover:text-blue-600 font-medium transition"
            to="/registration"
          >
            Sign up
          </NavLink>
        </div>
      )}

      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between gap-6">
          <NavLink to="/" className="shrink-0 hover:opacity-80 transition">
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
            <NavLink
              to={
                searchValue.trim()
                  ? `/search/${encodeURIComponent(searchValue.trim())}`
                  : "/search"
              }
            >
              <button className="bg-blue-800 text-white cursor-pointer px-6 py-2 rounded-r-lg hover:bg-blue-900 transition font-medium">
                Search
              </button>
            </NavLink>
          </div>

          <div className="flex items-center shrink-0">
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
              🛒 Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
            </NavLink>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 grow w-full">
        <Routes>
          <Route element={<Layout categories={categories} />}>
            <Route
              path="/"
              element={
                <HomePage
                  recommendedlist={recommendedlist}
                  loading={loading}
                  error={error}
                  onAddToCart={addItemToCart}
                />
              }
            />
            <Route
              path="/search"
              element={
                <SearchResultsPage
                  products={products}
                  onAddToCart={addItemToCart}
                />
              }
            />
            <Route
              path="/search/:searchValue"
              element={
                <SearchResultsPage
                  products={products}
                  onAddToCart={addItemToCart}
                />
              }
            />
            <Route
              path="/category/:categoryName"
              element={
                <CategoryPage products={products} onAddToCart={addItemToCart} />
              }
            />
          </Route>

          <Route
            path="/:category/:title"
            element={
              <ProductPage products={products} onAddToCart={addItemToCart} />
            }
          />

          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                totalPrice={totalPrice}
                onRemove={removeItemFromCart}
                onChangeQuantity={changeQuantity}
                onClear={clearCart}
              />
            }
          />

          <Route
            path="registration"
            element={<RegisterPage onRegister={registerAccount} />}
          />

          <Route
            path="login"
            element={
              <LoginPage
                accounts={allAccounts}
                onLoginSuccess={handleLoginSuccess}
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
