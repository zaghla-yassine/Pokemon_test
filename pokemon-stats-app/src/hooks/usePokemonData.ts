import { useEffect, useState } from "react";
import { Pokemon } from "../types";
import {
  fetchPokemonData,
  filterPokemon,
  sortPokemon,
  paginatePokemon,
} from "../utils/pokemonUtils";

const usePokemonData = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const [statName, setStatName] = useState("");
  const [statValue, setStatValue] = useState<number | string>("");
  const itemsPerPage = 9;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchPokemonData();
      setPokemonList(data);
      setLoading(false);
    };

    loadData();
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term.toLowerCase());
    setCurrentPage(1);
  };
  const handleFilter = (type: string) => {
    setSelectedType(type);
    setCurrentPage(1);
  };
  const handleSort = (option: string) => {
    setSortOption(option);
    setCurrentPage(1);
  };
  const handlePageChange = (page: number) => setCurrentPage(page);
  const handleStatSearch = (name: string, value: number | string) => {
    if (name === "" && value === "") {
      setStatName("");
      setStatValue("");
    } else {
      setStatName(name);
      setStatValue(value);
    }
    setCurrentPage(1);
  };

  const filteredPokemon = filterPokemon(
    pokemonList,
    searchTerm,
    selectedType,
    statName,
    statValue
  );
  const sortedPokemon = sortPokemon(filteredPokemon, sortOption);
  const paginatedPokemon = paginatePokemon(
    sortedPokemon,
    currentPage,
    itemsPerPage
  );
  const totalPages = Math.ceil(sortedPokemon.length / itemsPerPage);

  return {
    pokemonList: paginatedPokemon,
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
  };
};

export default usePokemonData;
