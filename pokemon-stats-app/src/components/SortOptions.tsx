import React from "react";

interface SortOptionsProps {
  sortOption: string;
  onSort: (option: string) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ sortOption, onSort }) => {
  return (
    <select
      value={sortOption}
      onChange={(e) => onSort(e.target.value)}
      className="border p-2 mb-4 w-full"
    >
      <option value="name">Name</option>
      <option value="hp">HP</option>
      <option value="attack">Attack</option>
      <option value="defense">Defense</option>
    </select>
  );
};

export default SortOptions;
