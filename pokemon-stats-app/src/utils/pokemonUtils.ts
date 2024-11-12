import { Pokemon } from "../types";

export const fetchPokemonData = async (
  limit: number = 20,
  offset: number = 0
): Promise<Pokemon[]> => {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon data");
  }

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

  return pokemonDetails;
};

export const filterPokemon = (
  pokemonList: Pokemon[],
  searchTerm: string,
  selectedType: string,
  statName: string,
  statValue: number | string
) => {
  return pokemonList.filter((pokemon) => {
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
};

export const sortPokemon = (pokemonList: Pokemon[], sortOption: string) => {
  return [...pokemonList].sort((a, b) => {
    if (sortOption === "name") return a.name.localeCompare(b.name);
    const aStat =
      a.stats.find((stat) => stat.stat.name === sortOption)?.base_stat || 0;
    const bStat =
      b.stats.find((stat) => stat.stat.name === sortOption)?.base_stat || 0;
    return bStat - aStat;
  });
};

export const paginatePokemon = (
  pokemonList: Pokemon[],
  currentPage: number,
  itemsPerPage: number
) => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  return pokemonList.slice(startIndex, startIndex + itemsPerPage);
};
