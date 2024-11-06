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
    <div className="border border-gray-300 rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow transform hover:scale-105">
      {/* Ensure the image source is correct */}
      <figure className="container-card-img position-relative my-2 flex justify-center items-center">
        <img src={image} alt={pokemon.name} />
      </figure>

      <h2 className="text-2xl font-semibold capitalize text-center">
        {pokemon.name}
      </h2>

      {/* Display Stats */}
      {stats.length > 0 && (
        <ul className="mt-4 space-y-2 grid place-items-center">
          {stats.map((stat, index) => (
            <li
              key={index}
              className="grid grid-cols-2 gap-2 w-full max-w-md text-sm"
            >
              <span className="capitalize font-medium">{stat.stat.name}:</span>
              <span className="text-right">{stat.base_stat}</span>{" "}
              {/* Align the value to the right */}
            </li>
          ))}
        </ul>
      )}
      {/* Display Types */}
      {types.length > 0 && (
        <div className="flex flex-wrap space-x-2 justify-center mt-2">
          {types.map((type, index) => {
            const typeName = type.type.name.toLowerCase(); // Ensure the type name is lowercase
            // List of valid Pokémon types and their corresponding colors
            const typeColors: { [key: string]: string } = {
              fire: "bg-red-500",
              water: "bg-blue-500",
              grass: "bg-green-500",
              electric: "bg-yellow-500",
              fighting: "bg-orange-500",
              psychic: "bg-purple-500",
              bug: "bg-lime-500",
              fairy: "bg-pink-500",
              poison: "bg-violet-500",
              normal: "bg-gray-300",
              flying: "bg-sky-500",
              ground: "bg-yellow-700",
              ghost: "bg-indigo-700",
              ice: "bg-cyan-400",
              rock: "bg-stone-500",
            };

            // Check if the type is in the valid types, otherwise fallback to a default color
            const bgColorClass = typeColors[typeName] || "bg-gray-500";

            return (
              <span
                key={index}
                className={`px-5 py-2 rounded-full text-white ${bgColorClass} text-lg font-semibold`}
              >
                {typeName}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PokemonCard;
