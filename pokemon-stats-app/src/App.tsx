import React from "react";
import usePokemonData from "./hooks/usePokemonData";
import SearchBar from "./components/SearchBar";
import FilterByType from "./components/FilterByType";
import SortOptions from "./components/SortOptions";
import PokemonList from "./components/PokemonList";
import StatSearch from "./components/StatSearch";
import { POKEMON_TYPES } from "./utils/constants";

const App: React.FC = () => {
  const {
    pokemonList,
    loading,
    error,
    searchTerm,
    selectedType,
    sortOption,
    handleSearch,
    handleFilter,
    handleSort,
    loadNextPage,
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
      />
      <h3 className="text-black font-bold mt-4">Sort By :</h3>
      <SortOptions sortOption={sortOption} onSort={handleSort} />

      {error ? (
        <p className="text-center text-red-600 text-lg mt-8">{error.message}</p>
      ) : loading && pokemonList.length === 0 ? (
        <p>Loading...</p>
      ) : pokemonList.length > 0 ? (
        <>
          <PokemonList pokemonList={pokemonList} />
          <div className="flex justify-center mt-4">
            <button
              onClick={loadNextPage}
              disabled={loading}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600 text-lg mt-8">No data found.</p>
      )}
    </div>
  );
};

export default App;
