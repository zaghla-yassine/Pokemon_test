// src/components/StatSearch.tsx
import React, { useState } from "react";

interface StatSearchProps {
  onStatSearch: (statName: string, statValue: number | string) => void;
}

const StatSearch: React.FC<StatSearchProps> = ({ onStatSearch }) => {
  const [statName, setStatName] = useState<string>("");
  const [statValue, setStatValue] = useState<number | string>("");

  // List of possible stat names
  const statNames = [
    "hp",
    "attack",
    "defense",
    "special-attack",
    "special-defense",
    "speed",
  ];

  const handleStatSearch = () => {
    // If both statName and statValue are empty, reset the filters
    if (!statName || !statValue) {
      onStatSearch("", "");
    } else {
      onStatSearch(statName, Number(statValue));
    }
  };

  return (
    <div className="flex space-x-4 mb-4">
      {/* Dropdown for selecting stat name */}
      <select
        value={statName}
        onChange={(e) => setStatName(e.target.value)}
        className="px-4 py-2 border rounded-lg"
      >
        <option value="">Select Stat</option>
        {statNames.map((name) => (
          <option key={name} value={name}>
            {name.charAt(0).toUpperCase() + name.slice(1).replace("-", " ")}
          </option>
        ))}
      </select>

      {/* Input for entering stat value */}
      <input
        type="number"
        value={statValue}
        onChange={(e) => setStatValue(e.target.value)}
        placeholder="Min stat value"
        className="px-4 py-2 border rounded-lg"
      />
      <button
        onClick={handleStatSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg"
      >
        Search
      </button>
    </div>
  );
};

export default StatSearch;
