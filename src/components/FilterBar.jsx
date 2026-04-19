import { memo } from "react";

const FILTERS = ["all", "completed", "pending"];

function FilterBar({ activeFilter, onFilterChange }) {
  return (
    <div className="filter-bar" role="tablist" aria-label="Todo filters">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          type="button"
          role="tab"
          aria-selected={activeFilter === filter}
          className={activeFilter === filter ? "active" : ""}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default memo(FilterBar);
