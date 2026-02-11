import { SearchInput } from "./SearchInput";

interface HeroSectionProps {
  query: string;
  setQuery: (query: string) => void;
}

export function HeroSection({ query, setQuery }: HeroSectionProps) {
  return (
    <header className="mb-4 text-center">
      <SearchInput value={query} onChange={setQuery} />
    </header>
  );
}
