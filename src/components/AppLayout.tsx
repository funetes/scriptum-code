import { useState } from "react";
import { Outlet, useParams } from "react-router";
import Header from "./Header";
import { SearchOverlay } from "./SearchOverlay";
import { useScriptMetadata } from "../hooks/useScriptMetadata";
import { useCategory } from "../hooks/useCategory";

const AppLayout = () => {
  const params = useParams();
  const { metadata } = useScriptMetadata(params?.id);
  const { category: categoryData } = useCategory(
    params?.id ? "" : params?.categoryId,
  );
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const displayCategory = metadata?.category || categoryData?.name;

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        id={params.id}
        title={metadata?.title}
        onSearchClick={() => setIsSearchOpen(true)}
        category={displayCategory}
        categoryId={params.categoryId}
      />
      <main className="flex-1 w-full">
        <Outlet />
      </main>
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
};

export default AppLayout;
