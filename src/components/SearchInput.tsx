"use client";

import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");

  // Initialize search query from URL params if present
  useEffect(() => {
    const query = searchParams.get("query");
    if (query) {
      setSearchQuery(query);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-md">
      <label htmlFor="search-input" className="sr-only">
        Search courses
      </label>
      <input
        id="search-input"
        type="text"
        placeholder="Search courses..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full rounded-full bg-secondary/80 px-4 py-2 pl-10 pr-10 text-sm
        focus:outline-none focus:ring-2 focus:ring-primary"
        aria-label="Search courses"
      />
      <Search
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2
        text-muted-foreground"
        aria-hidden="true"
      />
      {searchQuery && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-12 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-primary p-1 text-primary-foreground hover:bg-primary/90"
        aria-label="Submit search"
      >
        <Search className="h-3 w-3" />
      </button>
    </form>
  );
}

export default SearchInput;
