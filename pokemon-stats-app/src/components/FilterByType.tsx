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
      className="border p-2 mb-4 w-full"
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
