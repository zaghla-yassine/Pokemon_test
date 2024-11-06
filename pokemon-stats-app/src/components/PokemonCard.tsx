// src/components/PokemonCard.tsx

import React from "react";
import { Pokemon } from "../types";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  const types = pokemon.types || [];
  const stats = pokemon.stats || [];
  const image = pokemon.image || ""; // Get the Pokémon's image

  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow">
      {/* Ensure the image source is correct */}
      <img
        src={image}
        alt={pokemon.name}
        className="w-full h-48 object-cover rounded-t-lg"
      />
      <h2 className="text-xl font-bold capitalize mt-4">{pokemon.name}</h2>

      {/* Display Types */}
      {types.length > 0 && (
        <div className="flex space-x-2 mt-2">
          {types.map((type, index) => (
            <span
              key={index}
              className={`px-2 py-1 rounded-full bg-${type.type.name}`}
            >
              {type.type.name}
            </span>
          ))}
        </div>
      )}

      {/* Display Stats */}
      {stats.length > 0 && (
        <ul className="mt-4">
          {stats.map((stat, index) => (
            <li key={index} className="flex justify-between">
              <span className="capitalize">{stat.stat.name}:</span>
              <span>{stat.base_stat}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PokemonCard;
