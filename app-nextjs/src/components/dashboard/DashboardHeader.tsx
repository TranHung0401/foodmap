"use client";

import { useEffect, useState } from "react";

interface DashboardHeaderProps {
  isCloudActive?: boolean;
}

export function DashboardHeader({ isCloudActive = false }: DashboardHeaderProps) {
  const [dateStr, setDateStr] = useState<string>("");

  useEffect(() => {
    setDateStr(
      new Date().toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    );
  }, []);

  return (
    <header
      style={{
        background: "#111",
        padding: "22px 28px",
        borderBottom: "1px solid #222",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 22, fontWeight: 700, color: "#fff", letterSpacing: "-0.5px" }}>
              🍜 FoodMap Review
            </span>
            <span style={{ fontSize: 12, padding: "2px 10px", borderRadius: 999, background: "#222", color: "#aaa", border: "1px solid #333" }}>
              Trước khi launch
            </span>
          </div>
          <div style={{ color: "#888", fontSize: 13 }}>
            Site:{" "}
            <a href="https://demo.foodmap.vn" target="_blank" rel="noreferrer" style={{ color: "#aaa", textDecoration: "none" }}>
              demo.foodmap.vn
            </a>
            {dateStr && <>{" · "}Cập nhật: {dateStr}</>}
          </div>
        </div>

        <span
          style={{
            display: "inline-block",
            fontSize: 12,
            padding: "4px 12px",
            borderRadius: 999,
            border: "1px solid",
            marginTop: 4,
            ...(isCloudActive
              ? { background: "#0a1a0f", color: "#4ade80", borderColor: "#166534", textShadow: "0 0 10px rgba(74, 222, 128, 0.4)" }
              : { background: "#0a171a", color: "#38bdf8", borderColor: "#0369a1" }),
          }}
        >
          {isCloudActive ? "● Cloud Sync: Hoạt động" : "● LocalStorage: Đang chạy"}
        </span>
      </div>
    </header>
  );
}
