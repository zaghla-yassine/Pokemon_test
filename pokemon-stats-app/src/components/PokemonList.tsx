// src/components/PokemonList.tsx

import React from "react";
import { Pokemon } from "../types";
import PokemonCard from "./PokemonCard";

interface PokemonListProps {
  pokemonList: Pokemon[];
}

const PokemonList: React.FC<PokemonListProps> = ({ pokemonList }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {pokemonList.map((pokemon, index) => (
        <PokemonCard key={index} pokemon={pokemon} />
      ))}
    </div>
  );
};

export default PokemonList;
