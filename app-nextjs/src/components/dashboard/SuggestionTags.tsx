"use client";

import { RestaurantSatisfaction } from "@/types/issue";

interface SuggestionTagsProps {
  priority: RestaurantSatisfaction;
  onSelectTag: (tag: string) => void;
}

const TAG_MAP: Record<RestaurantSatisfaction, string[]> = {
  "Rất tốt": ["Đồ ăn ngon", "Phục vụ nhanh", "Không gian đẹp", "Sạch sẽ", "Giá hợp lý", "Chắc chắn quay lại", "Nhân viên thân thiện"],
  "Hài lòng": ["Đồ ăn ổn", "Giá bình dân", "Phục vụ nhiệt tình", "Không gian thoáng", "Vị vừa miệng"],
  "Trung bình": ["Chờ hơi lâu", "Món ăn hơi ngọt", "Món ăn hơi mặn", "Giá hơi cao", "Không gian nhỏ"],
  "Tệ": ["Thái độ kém", "Không vệ sinh", "Đồ ăn nguội", "Giá quá đắt", "Rất thất vọng", "Không quay lại"],
};

export function SuggestionTags({ priority, onSelectTag }: SuggestionTagsProps) {
  const tags = TAG_MAP[priority] || [];

  if (tags.length === 0) return null;

  return (
    <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ fontSize: 11.5, color: "#888", fontWeight: 600 }}>💡 GỢI Ý NHANH (BẤM ĐỂ THÊM):</div>
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => onSelectTag(`#${tag}`)}
            style={{
              background: "#f4f4f5",
              color: "#52525b",
              border: "1px solid #e4e4e7",
              borderRadius: 6,
              padding: "4px 8px",
              fontSize: 11.5,
              fontWeight: 500,
              cursor: "pointer",
              transition: "all 0.15s ease",
              fontFamily: "inherit",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#e4e4e7";
              e.currentTarget.style.color = "#18181b";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#f4f4f5";
              e.currentTarget.style.color = "#52525b";
            }}
          >
            #{tag}
          </button>
        ))}
      </div>
    </div>
  );
}
