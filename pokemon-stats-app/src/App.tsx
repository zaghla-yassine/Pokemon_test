// src/App.tsx
import React, { useEffect, useState } from "react";
import { Pokemon } from "./types";
import SearchBar from "./components/SearchBar";
import FilterByType from "./components/FilterByType";
import SortOptions from "./components/SortOptions";
import Pagination from "./components/Pagination";
import PokemonList from "./components/PokemonList";

const App: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      const response = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=100"
      );
      const data = await response.json();

      // Fetch detailed Pokémon data (including types and stats) for each Pokémon
      const pokemonDetails = await Promise.all(
        data.results.map(async (pokemon: any) => {
          const detailResponse = await fetch(pokemon.url);
          const pokemonData = await detailResponse.json();
          return {
            name: pokemonData.name,
            types: pokemonData.types,
            stats: pokemonData.stats,
            image: pokemonData.sprites.front_default, // Get the front-facing image
          };
        })
      );

      setPokemonList(pokemonDetails);
      setLoading(false);
    };

    fetchPokemon();
  }, []);

  const handleSearch = (term: string) => setSearchTerm(term.toLowerCase());
  const handleFilter = (type: string) => setSelectedType(type);
  const handleSort = (option: string) => setSortOption(option);
  const handlePageChange = (page: number) => setCurrentPage(page);

  // Apply search, filter, and sort
  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );

  // Sort filtered Pokémon list
  const sortedPokemon = [...filteredPokemon].sort((a, b) => {
    if (sortOption === "name") return a.name.localeCompare(b.name);
    const aStat =
      a.stats.find((stat) => stat.stat.name === sortOption)?.base_stat || 0;
    const bStat =
      b.stats.find((stat) => stat.stat.name === sortOption)?.base_stat || 0;
    return bStat - aStat;
  });

  // Pagination calculations
  const totalPages = Math.ceil(sortedPokemon.length / itemsPerPage);
  const paginatedPokemon = sortedPokemon.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pokémon List</h1>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      <FilterByType
        types={["fire", "water", "grass"]}
        selectedType={selectedType}
        onFilter={handleFilter}
      />
      <SortOptions sortOption={sortOption} onSort={handleSort} />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <PokemonList pokemonList={paginatedPokemon} />
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default App;
