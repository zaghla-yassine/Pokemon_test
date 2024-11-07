import React from "react";

interface FilterByTypeProps {
  types: string[];
  selectedType: string;
  onFilter: (type: string) => void;
}

const FilterByType: React.FC<FilterByTypeProps> = ({
  types,
  selectedType,
  onFilter,
}) => {
  return (
    <select
      value={selectedType}
      onChange={(e) => onFilter(e.target.value)}
      className="px-4 py-2 border rounded-lg max-w-xs w-full"
    >
      <option value="">All Types</option>
      {types.map((type) => (
        <option key={type} value={type}>
          {type}
        </option>
      ))}
    </select>
  );
};

export default FilterByType;
