import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchPokemonData } from "../utils/pokemonUtils";
import { Pokemon } from "../types";

const usePokemonData = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [sortOption, setSortOption] = useState("none");
  const [statName, setStatName] = useState("");
  const [statValue, setStatValue] = useState<number | string>("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 20;

  const {
    data: newPokemonList = [],
    error,
    isLoading,
  } = useQuery({
    queryKey: ["pokemonData", currentPage],
    queryFn: () =>
      fetchPokemonData(itemsPerPage, (currentPage - 1) * itemsPerPage),
    staleTime: 60000,
  });

  useEffect(() => {
    if (newPokemonList.length > 0) {
      setPokemonList((prevList) => [...prevList, ...newPokemonList]);
    }
  }, [newPokemonList]);

  const filteredPokemonList = useMemo(() => {
    let filteredList = pokemonList.filter((pokemon) => {
      const matchesSearch = pokemon.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType =
        !selectedType ||
        pokemon.types.some((type) => type.type.name === selectedType);
      const matchesStat =
        !statName || !statValue
          ? true
          : pokemon.stats.some(
              (stat) =>
                stat.stat.name.toLowerCase() === statName.toLowerCase() &&
                stat.base_stat >= Number(statValue)
            );

      return matchesSearch && matchesType && matchesStat;
    });

    if (sortOption !== "none") {
      filteredList = filteredList.sort((a, b) => {
        if (sortOption === "name") return a.name.localeCompare(b.name);
        const aStat =
          a.stats.find((stat) => stat.stat.name === sortOption)?.base_stat || 0;
        const bStat =
          b.stats.find((stat) => stat.stat.name === sortOption)?.base_stat || 0;
        return bStat - aStat;
      });
    }

    return filteredList;
  }, [pokemonList, searchTerm, selectedType, sortOption, statName, statValue]);

  const handleSearch = (term: string) => setSearchTerm(term);
  const handleFilter = (type: string) => setSelectedType(type);
  const handleSort = (option: string) => setSortOption(option);
  const handleStatSearch = (name: string, value: number | string) => {
    setStatName(name);
    setStatValue(value);
  };
  const loadNextPage = () => setCurrentPage((prevPage) => prevPage + 1);

  return {
    pokemonList: filteredPokemonList,
    loading: isLoading,
    error,
    loadNextPage,
    searchTerm,
    selectedType,
    sortOption,
    handleSearch,
    handleFilter,
    handleSort,
    handleStatSearch,
  };
};

export default usePokemonData;
