import { NavLink } from "react-router-dom";

export function Sidebar({ categories }: { categories: string[] }) {
  const items = [
    { label: "All Products", to: "/", end: true },
    ...categories.map((c) => ({
      label: c,
      to: `/category/${encodeURIComponent(c)}`,
      end: false,
    })),
  ];

  return (
    <>
      <nav className="xl:hidden flex gap-2 overflow-x-auto pb-3 mb-6 -mx-1 px-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `shrink-0 px-4 py-2 rounded-full text-sm font-medium capitalize transition ${
                isActive
                  ? "bg-blue-800 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <aside className="hidden xl:block absolute -left-72 top-14 w-64 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-800 mb-4 uppercase tracking-wider">
          Categories
        </h3>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `block px-4 py-2 rounded-lg font-medium transition-all capitalize ${
                    isActive
                      ? "bg-blue-50 text-blue-800 shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
}
