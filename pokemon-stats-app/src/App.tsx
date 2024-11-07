import React, { useEffect, useState } from "react";
import { Pokemon } from "./types";
import SearchBar from "./components/SearchBar";
import FilterByType from "./components/FilterByType";
import SortOptions from "./components/SortOptions";
import Pagination from "./components/Pagination";
import PokemonList from "./components/PokemonList";
import StatSearch from "./components/StatSearch";

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

  const handleSearch = (term: string) => {
    setSearchTerm(term.toLowerCase());
    setCurrentPage(1);
  };
  const handleFilter = (type: string) => setSelectedType(type);
  const handleSort = (option: string) => setSortOption(option);
  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleStatSearch = (name: string, value: number | string) => {
    if (name === "" && value === "") {
      setStatName("");
      setStatValue("");
    } else {
      setStatName(name);
      setStatValue(value);
    }
  };

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

      <div className="flex flex-col md:flex-row md:items-center md:justify-center space-y-2 md:space-y-0 md:space-x-4 mb-4">
        <div className="flex-1 max-w-md">
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-left space-y-2 md:space-y-0 md:space-x-4 mb-4">
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r text-black">
          Search By:
        </h3>
        <div className="flex flex-col sm:flex-row sm:space-x-2 max-w-xs">
          <StatSearch onStatSearch={handleStatSearch} />
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-left space-y-2 md:space-y-0 md:space-x-4 mb-4">
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r text-black">
          Filter By:
        </h3>
        <div className="flex-1 max-w-xs">
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
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-left space-y-2 md:space-y-0 md:space-x-4 mb-4">
        <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r text-black">
          Sort By:
        </h3>
        <div className="flex-1 max-w-xs">
          <SortOptions sortOption={sortOption} onSort={handleSort} />
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : paginatedPokemon.length > 0 ? (
        <>
          <PokemonList pokemonList={paginatedPokemon} />
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
