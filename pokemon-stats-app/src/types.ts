// src/types.ts

// Define an interface for individual stat objects
interface Stat {
  base_stat: number;
  stat: {
    name: string;
  };
}

// Define an interface for type objects
interface Type {
  type: {
    name: string;
  };
}

// Define an interface for each Pokémon
export interface Pokemon {
  image: string;
  name: string;
  url: string;
  stats: Stat[]; // List of stats, e.g., HP, Attack, Defense, etc.
  types: Type[]; // List of types, e.g., Fire, Water, Grass, etc.
}
