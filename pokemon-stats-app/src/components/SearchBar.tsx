// src/components/SearchBar.tsx
import React from "react";

interface SearchBarProps {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
      placeholder="Search Pokémon by name"
      className="border p-2 mb-4 w-full"
    />
  );
};

export default SearchBar;
