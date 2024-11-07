import React from "react";
import usePokemonData from "./hooks/usePokemonData";
import SearchBar from "./components/SearchBar";
import FilterByType from "./components/FilterByType";
import SortOptions from "./components/SortOptions";
import Pagination from "./components/Pagination";
import PokemonList from "./components/PokemonList";
import StatSearch from "./components/StatSearch";
import { POKEMON_TYPES } from "./utils/constants";

const App: React.FC = () => {
  const {
    pokemonList,
    loading,
    searchTerm,
    selectedType,
    sortOption,
    currentPage,
    totalPages,
    handleSearch,
    handleFilter,
    handleSort,
    handlePageChange,
    handleStatSearch,
  } = usePokemonData();

  return (
    <div className="p-4">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
        Pokémon List
      </h1>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      <StatSearch onStatSearch={handleStatSearch} />
      <h3 className="text-black font-bold">Filter By :</h3>
      <FilterByType
        types={POKEMON_TYPES}
        selectedType={selectedType}
        onFilter={handleFilter}
      />{" "}
      <h3 className="text-black font-bold">Sort By :</h3>
      <SortOptions sortOption={sortOption} onSort={handleSort} />
      {loading ? (
        <p>Loading...</p>
      ) : pokemonList.length > 0 ? (
        <>
          <PokemonList pokemonList={pokemonList} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <p className="text-center text-gray-600 text-lg mt-8">No data found.</p>
      )}
    </div>
  );
};

export default App;
