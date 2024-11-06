// src/App.tsx
import React, { useEffect, useState } from "react";
import { Pokemon } from "./types";
import SearchBar from "./components/SearchBar";
import FilterByType from "./components/FilterByType";
import SortOptions from "./components/SortOptions";
import Pagination from "./components/Pagination";
import PokemonList from "./components/PokemonList";
import StatSearch from "./components/StatSearch"; // Import the updated StatSearch component

const App: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [statName, setStatName] = useState<string>("");
  const [statValue, setStatValue] = useState<number | string>("");
  const itemsPerPage = 9;

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
            image: pokemonData.sprites.front_default,
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

  // Handle stat search
  const handleStatSearch = (name: string, value: number | string) => {
    if (name === "" && value === "") {
      // Reset stat filters when no stat name or value is provided
      setStatName("");
      setStatValue("");
    } else {
      setStatName(name);
      setStatValue(value);
    }
  };

  // Apply search, filter, and stat filter
  const filteredPokemon = pokemonList.filter((pokemon) => {
    const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm);
    const matchesType =
      !selectedType ||
      pokemon.types.some((type) => type.type.name === selectedType);

    const matchesStat =
      !statName || !statValue
        ? true
        : pokemon.stats.some(
            (stat) =>
              stat.stat.name.toLowerCase() === statName.toLowerCase() &&
              stat.base_stat > Number(statValue)
          );

    return matchesSearch && matchesType && matchesStat;
  });

  // Sort filtered Pokémon list
  const sortedPokemon = [...filteredPokemon].sort((a, b) => {
    if (sortOption === "name") return a.name.localeCompare(b.name);
    const aStat =
      a.stats.find((stat) => stat.stat.name === sortOption)?.base_stat || 0;
    const bStat =
      b.stats.find((stat) => stat.stat.name === sortOption)?.base_stat || 0;
    return bStat - aStat;
  });

  const totalPages = Math.ceil(sortedPokemon.length / itemsPerPage);
  const paginatedPokemon = sortedPokemon.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-4">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
        Pokémon List
      </h1>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      <StatSearch onStatSearch={handleStatSearch} />{" "}
      {/* Use the StatSearch component */}
      <FilterByType
        types={[
          "fire",
          "water",
          "grass",
          "normal",
          "flying",
          "ground",
          "ghost",
          "ice",
          "rock",
          "poison",
        ]}
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
