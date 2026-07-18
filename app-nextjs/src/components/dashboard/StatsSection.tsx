import { Issue } from "@/types/issue";

interface StatsSectionProps {
  issues: Issue[];
}

export function StatsSection({ issues }: StatsSectionProps) {
  const total = issues.length;
  const booking = issues.filter((i) => i.status === "Đặt bàn").length;
  const goodRatingCount = issues.filter((i) => i.priority === "Rất tốt" || i.priority === "Hài lòng").length;
  const riceSoup = issues.filter((i) => i.groupType && i.groupType.includes("Cơm/Món nước")).length;
  const cafeTea = issues.filter((i) => i.groupType && i.groupType.includes("Cafe/Trà sữa")).length;
  const hotpotBbq = issues.filter((i) => i.groupType && i.groupType.includes("Lẩu/Nướng")).length;

  const stats = [
    { label: "Tổng quán", value: total },
    { label: "Có đặt bàn", value: booking },
    { label: "Đánh giá tốt", value: goodRatingCount },
    { label: "Cơm / Nước", value: riceSoup },
    { label: "Cafe / Trà sữa", value: cafeTea },
    { label: "Lẩu / Nướng", value: hotpotBbq },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, margin: "14px 0" }}>
      {/* Stats Cards Row */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {stats.map((stat, i) => (
          <div
            key={i}
            style={{
              background: "#fff",
              border: "1px solid #e5e5e5",
              borderRadius: 11,
              padding: "10px 16px",
              minWidth: 92,
              textAlign: "center",
              flex: "1 1 100px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 700, color: "#111" }}>{stat.value}</div>
            <div style={{ fontSize: 11.5, color: "#888", fontWeight: 500 }}>{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
