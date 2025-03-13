import React, { ChangeEvent } from "react";

interface FilterSectionProps {
  title: string;
  options: string[];
  selected: Set<string>;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FilterSection: React.FC<FilterSectionProps> = React.memo(({ title, options, selected, onChange }) => (
  <div className={`${title.toLowerCase()}FilterContainer`}>
    <label>{title}:</label>
    <div>
      {options.map((opt) => (
        <label key={opt}>
          <input
            type="checkbox"
            className={`${title.toLowerCase()}Filter`}
            value={opt}
            checked={selected.has(opt)}
            onChange={onChange}
          />
          {opt.charAt(0).toUpperCase() + opt.slice(1)}
        </label>
      ))}
    </div>
  </div>
));

export default FilterSection;
