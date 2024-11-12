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
      className="px-4 py-2 border rounded-lg max-w-xs w-full"
    >
      <option value="none">None</option>
      <option value="name">Name</option>
      <option value="hp">HP</option>
      <option value="attack">Attack</option>
      <option value="defense">Defense</option>
    </select>
  );
};

export default SortOptions;
