import { memo } from "react";


const FILTERS = [
  { key: "all", label: "All" },
  { key: "completed", label: "Completed" },
  { key: "pending", label: "Pending" },
];

function FilterBar({ activeFilter, onFilterChange, allCount, completedCount, pendingCount }) {
  const counts = {
    all: allCount,
    completed: completedCount,
    pending: pendingCount,
  };
  return (
    <div className="filter-bar" role="tablist" aria-label="Todo filters">
      {FILTERS.map(({ key, label }) => {
        const noTasks = counts.all < 1;
        const isActive = activeFilter === key;
        // When there are no tasks, all are disabled and gray
        // When there are tasks, only the active filter is green and disabled, others enabled if count > 0
        let isDisabled, className;
        if (noTasks) {
          isDisabled = true;
          className = "";
        } else {
          isDisabled = isActive;
          className = isActive ? "active" : "";
        }
        return (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={className}
            onClick={!isDisabled && counts[key] > 0 ? () => onFilterChange(key) : undefined}
            disabled={isDisabled || counts[key] < 1}
          >
            {label} <span className="filter-count">({counts[key]})</span>
          </button>
        );
      })}
    </div>
  );
}

export default memo(FilterBar);
