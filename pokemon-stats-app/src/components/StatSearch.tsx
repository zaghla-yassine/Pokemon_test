import React, { useState } from "react";

interface StatSearchProps {
  onStatSearch: (statName: string, statValue: number | string) => void;
}

const StatSearch: React.FC<StatSearchProps> = ({ onStatSearch }) => {
  const [statName, setStatName] = useState<string>("");
  const [statValue, setStatValue] = useState<number | string>("");

  const statNames = [
    "hp",
    "attack",
    "defense",
    "special-attack",
    "special-defense",
    "speed",
  ];

  const handleStatSearch = () => {
    if (!statName || !statValue) {
      onStatSearch("", "");
    } else {
      onStatSearch(statName, Number(statValue));
    }
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0 mb-4">
      <select
        value={statName}
        onChange={(e) => setStatName(e.target.value)}
        className="px-4 py-2 border rounded-lg max-w-xs w-full"
      >
        <option value="">Stats</option>
        {statNames.map((name) => (
          <option key={name} value={name}>
            {name.charAt(0).toUpperCase() + name.slice(1).replace("-", " ")}
          </option>
        ))}
      </select>

      <input
        type="number"
        value={statValue}
        onChange={(e) => setStatValue(e.target.value)}
        placeholder="Min value"
        min="0"
        className="px-2 py-2 border rounded-lg max-w-xs w-full"
      />

      <button
        onClick={handleStatSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg max-w-xs w-full sm:w-auto"
      >
        Search
      </button>
    </div>
  );
};

export default StatSearch;
