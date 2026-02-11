import { Search, X } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative w-full max-w-md mx-auto mb-4 group">
      <div className="absolute inset-0 bg-[#3BC4C4]/20 blur-xl rounded-full opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
      <div className="relative">
        <input
          type="text"
          className="block w-full pl-11 pr-12 py-3 bg-neutral-900/40 border border-neutral-700/50 rounded-full text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#3BC4C4]/20 focus:border-[#3BC4C4]/40 transition-all duration-300 backdrop-blur-md hover:border-neutral-500"
          placeholder="궁금한 키워드로 영상 찾기"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-neutral-500 group-focus-within:text-[#3BC4C4] transition-colors duration-300" />
        </div>
        {value && (
          <button
            onClick={() => onChange("")}
            className="absolute inset-y-0 right-0 pr-4 flex items-center cursor-pointer text-neutral-500 hover:text-white transition-colors duration-300"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}
