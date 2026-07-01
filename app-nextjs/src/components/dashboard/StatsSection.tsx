import { Issue } from "@/types/issue";

interface StatsSectionProps {
  issues: Issue[];
}

export function StatsSection({ issues }: StatsSectionProps) {
  const total = issues.length;
  const booking = issues.filter((i) => i.status === "Đặt bàn").length;
  const goodRating = issues.filter((i) => i.priority === "Rất tốt" || i.priority === "Hài lòng").length;
  const riceSoup = issues.filter((i) => i.groupType.includes("Cơm/Món nước")).length;
  const cafeTea = issues.filter((i) => i.groupType.includes("Cafe/Trà sữa")).length;
  const hotpotBbq = issues.filter((i) => i.groupType.includes("Lẩu/Nướng")).length;

  const stats = [
    { label: "Tổng quán", value: total },
    { label: "Có đặt bàn", value: booking },
    { label: "Đánh giá tốt", value: goodRating },
    { label: "Cơm / Nước", value: riceSoup },
    { label: "Cafe / Trà sữa", value: cafeTea },
    { label: "Lẩu / Nướng", value: hotpotBbq },
  ];

  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", margin: "14px 0" }}>
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
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 700, color: "#111" }}>{stat.value}</div>
          <div style={{ fontSize: 11.5, color: "#888" }}>{stat.label}</div>
        </div>
      ))}
    </div>
  );
}
