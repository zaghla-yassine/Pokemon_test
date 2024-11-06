// src/components/PokemonList.tsx
import React from "react";
import { Pokemon } from "../types";
import PokemonCard from "./PokemonCard";

interface PokemonListProps {
  pokemonList: Pokemon[];
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemonList }) => {
  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 p-4 m-10 mt-6">
      {pokemonList.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
