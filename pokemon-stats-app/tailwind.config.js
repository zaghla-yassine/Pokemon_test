module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Make sure the content paths are correct
  ],
  theme: {
    extend: {
      colors: {
        // Define colors for specific Pokémon types
        fire: "#f43f5e", // Fire type color (example)
        water: "#3b82f6", // Water type color (example)
        grass: "#10b981", // Grass type color (example)
        electric: "#fbbf24", // Electric type color (example)
        fighting: "#ef4444", // Fighting type color (example)
        psychic: "#9333ea", // Psychic type color (example)
        bug: "#6b8e23", // Bug type color (example)
        fairy: "#f9a8d4", // Fairy type color (example)

        // Default color for unrecognized types
        default: "#d1d5db", // Tailwind's gray-300 or any fallback color
      },
    },
  },
  plugins: [],
};
