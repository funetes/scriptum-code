import { Link } from "react-router";
import { Folder } from "lucide-react";
import type { Category } from "../types/script";

interface CategoryListProps {
  categories: Category[];
}

export function CategoryList({ categories }: CategoryListProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-6">
        <Folder className="w-5 h-5 text-neutral-400" />
        <h2 className="text-xl font-bold text-white">Categories</h2>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((item) => (
          <Link
            to={`/${item.id}`}
            key={item.id}
            className=" group relative overflow-hidden rounded-2xl bg-neutral-800/40 border border-neutral-700/50 hover:border-neutral-500 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-linear-to-br from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="p-4">
              <h2 className="text-sm font-semibold text-neutral-200 group-hover:text-white transition-colors text-center">
                {item.name}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
