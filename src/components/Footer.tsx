import { NavLink } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              Online Shop
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              The best products at the best prices. Fast delivery and top-notch
              customer support available 24/7.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>
                <NavLink to="/" className="hover:text-blue-600 transition">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/cart" className="hover:text-blue-600 transition">
                  Cart
                </NavLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2 text-sm text-slate-500">
              <li>Email: support@onlineshop.com</li>
              <li>Phone: +48 123 456 789</li>
              <li>Location: Lublin, Poland</li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};
