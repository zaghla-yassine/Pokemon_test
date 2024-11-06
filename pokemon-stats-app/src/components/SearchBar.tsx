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
      className="border-2 border-gray-300 rounded-lg p-3 mb-6 w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default SearchBar;
