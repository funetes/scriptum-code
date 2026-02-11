import { useLoaderData } from "react-router";
import { Sparkles } from "lucide-react";
import type { Category, ScriptOverview, ScriptSearch } from "../types/script";
import { useSearch } from "../hooks/useSearch";
import { RecentScriptsCarousel } from "./RecentScriptsCarousel";
import { HeroSection } from "./HeroSection";
import { SearchResults } from "./SearchResults";
import { CategoryList } from "./CategoryList";
import { AboutSection } from "./AboutSection";
import Footer from "./Footer";

function App() {
  const { categories, recentScripts } = useLoaderData<{
    categories: Category[];
    recentScripts: ScriptOverview[];
  }>();
  const { query, setQuery, results, loading, error } =
    useSearch<ScriptSearch>("script");

  const showResults = query.trim().length > 0;

  return (
    <div className="flex flex-col justify-center items-center w-full min-h-screen text-neutral-300">
      <div className="flex flex-col w-full max-w-5xl my-8 px-4 md:px-6">
        <HeroSection query={query} setQuery={setQuery} />
        {!showResults && <AboutSection />}
        {showResults ? (
          <SearchResults
            loading={loading}
            error={error}
            results={results}
            query={query}
            categories={categories}
          />
        ) : (
          <div className="space-y-12">
            {recentScripts.length > 0 ? (
              <section className="max-w-5xl mx-auto">
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <h2 className="text-xl font-bold text-white">
                    Latest Added Scripts
                  </h2>
                </div>
                <RecentScriptsCarousel
                  scripts={recentScripts}
                  categories={categories}
                />
              </section>
            ) : null}
            <CategoryList categories={categories} />
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default App;
