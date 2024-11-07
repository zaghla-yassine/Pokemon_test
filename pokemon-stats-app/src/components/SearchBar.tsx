import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  searchTerm: string;
  onSearch: (searchTerm: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearch }) => {
  return (
    <div className="mb-6 w-full max-w-md mx-auto mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
        <h6 className="text-xl font-bold mb-2 sm:mb-0 sm:text-left text-center">
          Search for a Pokémon:
        </h6>
        <div className="relative flex-1 max-w-xs mx-auto sm:mx-0">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="By name"
            className="border-2 border-gray-300 rounded-lg p-3 w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
