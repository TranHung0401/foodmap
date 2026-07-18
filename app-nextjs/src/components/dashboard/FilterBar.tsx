"use client";

export interface FilterState {
  area: string;
  group: string;
  priority: string;
  status: string;
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
}

const AREAS = [
  "Tất cả",
  "Quận 1",
  "Quận 3",
  "Quận 4",
  "Quận 5",
  "Quận 7",
  "Quận 10",
  "Bình Thạnh",
  "Phú Nhuận",
  "Tân Bình",
  "Gò Vấp",
  "Thủ Đức",
];

const FOOD_GROUPS = [
  "Tất cả",
  "Cơm/Món nước",
  "Ăn vặt",
  "Cafe/Trà sữa",
  "Lẩu/Nướng",
];

const SATISFACTIONS = [
  "Tất cả",
  "Rất tốt",
  "Hài lòng",
  "Trung bình",
  "Tệ",
];

const BOOKING_STATUSES = [
  "Tất cả",
  "Đặt bàn",
  "Không đặt bàn",
];

function FilterGroup({
  label,
  items,
  value,
  onChange,
}: {
  label: string;
  items: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
      <span style={{ fontSize: 12, color: "#888", fontWeight: 500 }}>{label}</span>
      {items.map((item) => {
        const isActive = value === item;
        return (
          <button
            key={item}
            onClick={() => onChange(item)}
            style={{
              border: `1px solid ${isActive ? "#111" : "#ddd"}`,
              background: isActive ? "#111" : "#fff",
              color: isActive ? "#fff" : "#333",
              borderRadius: 999,
              padding: "4px 12px",
              fontSize: 12.5,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "all 0.15s",
            }}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

export function FilterBar({ filters, onFilterChange, onExpandAll, onCollapseAll }: FilterBarProps) {
  return (
    <div className="responsive-filter-bar">
      <FilterGroup
        label="Quận:"
        items={AREAS}
        value={filters.area}
        onChange={(v) => onFilterChange("area", v)}
      />
      <FilterGroup
        label="Phân loại:"
        items={FOOD_GROUPS}
        value={filters.group}
        onChange={(v) => onFilterChange("group", v)}
      />
      <FilterGroup
        label="Hài lòng:"
        items={SATISFACTIONS}
        value={filters.priority}
        onChange={(v) => onFilterChange("priority", v)}
      />
      <FilterGroup
        label="Đặt bàn:"
        items={BOOKING_STATUSES}
        value={filters.status}
        onChange={(v) => onFilterChange("status", v)}
      />
      <div style={{ marginLeft: "auto", display: "flex", gap: 6, alignItems: "center" }}>
        <button
          onClick={onExpandAll}
          style={{ fontSize: 12.5, color: "#555", cursor: "pointer", border: "none", background: "none", textDecoration: "underline", fontFamily: "inherit" }}
        >
          Mở tất cả
        </button>
        <span style={{ color: "#ccc" }}>|</span>
        <button
          onClick={onCollapseAll}
          style={{ fontSize: 12.5, color: "#555", cursor: "pointer", border: "none", background: "none", textDecoration: "underline", fontFamily: "inherit" }}
        >
          Thu tất cả
        </button>
      </div>
    </div>
  );
}
