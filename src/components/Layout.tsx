import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export function Layout({ categories }: { categories: string[] }) {
  return (
    <div className="relative w-full">
      <Sidebar categories={categories} />
      <Outlet />
    </div>
  );
}
