"use client";

import { useState, useMemo, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsSection } from "@/components/dashboard/StatsSection";
import { FilterBar, FilterState } from "@/components/dashboard/FilterBar";
import { AreaSection } from "@/components/dashboard/AreaSection";
import { AddPlaceDrawer } from "@/components/dashboard/AddPlaceDrawer";
import { mockIssues } from "@/lib/mock-issues";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { Issue, RestaurantSatisfaction, BookingStatus } from "@/types/issue";

// ── Badge helpers ────────────────────────────────────────────────────────────

function GroupBadge({ group }: { group: string }) {
  const styles: Record<string, React.CSSProperties> = {
    "Cơm/Món nước": { background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe" },
    "Ăn vặt": { background: "#faf5ff", color: "#7c3aed", border: "1px solid #e9d5ff" },
    "Cafe/Trà sữa": { background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" },
    "Lẩu/Nướng": { background: "#fff7ed", color: "#c2410c", border: "1px solid #fed7aa" },
  };
  const s = styles[group] ?? { background: "#f4f4f5", color: "#52525b", border: "1px solid #e4e4e7" };
  return (
    <span style={{ fontSize: 10.5, padding: "2px 8px", borderRadius: 999, fontWeight: 600, whiteSpace: "nowrap", marginRight: 3, display: "inline-block", ...s }}>
      {group}
    </span>
  );
}

function PrioBadge({ priority }: { priority: string }) {
  const styles: Record<string, React.CSSProperties> = {
    "Rất tốt": { background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" },
    "Hài lòng": { background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe" },
    "Trung bình": { background: "#fffbeb", color: "#d97706", border: "1px solid #fde68a" },
    "Tệ": { background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca" },
  };
  const s = styles[priority] ?? { background: "#f4f4f5", color: "#71717a", border: "1px solid #e4e4e7" };
  return (
    <span style={{ fontSize: 10.5, padding: "2px 8px", borderRadius: 999, fontWeight: 600, whiteSpace: "nowrap", display: "inline-block", ...s }}>
      {priority}
    </span>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, React.CSSProperties> = {
    "Đặt bàn":     { background: "#f0fdf4", color: "#15803d", border: "1px solid #bbf7d0" },
    "Không đặt bàn": { background: "#f4f4f5", color: "#71717a", border: "1px solid #e4e4e7" },
  };
  const s = styles[status] ?? { background: "#f4f4f5", color: "#71717a", border: "1px solid #e4e4e7" };
  return (
    <span style={{ fontSize: 10.5, padding: "2px 8px", borderRadius: 999, fontWeight: 600, whiteSpace: "nowrap", display: "inline-block", ...s }}>
      {status}
    </span>
  );
}

export default function ReviewDashboardPage() {
  const [issues, setIssues] = useState<Issue[]>(mockIssues);
  const [filters, setFilters] = useState<FilterState>({
    area: "Tất cả",
    group: "Tất cả",
    priority: "Tất cả",
    status: "Tất cả",
  });
  const [expandedIssueIds, setExpandedIssueIds] = useState<Record<string, boolean>>({});
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Load Data
  useEffect(() => {
    // 1. Try loading from LocalStorage first if not in Supabase mode
    if (!isSupabaseConfigured) {
      const localData = localStorage.getItem("foodmap_places");
      if (localData) {
        try {
          setIssues(JSON.parse(localData));
        } catch (e) {
          console.error("Lỗi đọc dữ liệu từ LocalStorage:", e);
        }
      }
    }

    // 2. Load from Supabase if configured
    async function loadData() {
      if (isSupabaseConfigured && supabase) {
        try {
          const { data, error } = await supabase
            .from("foodmap_places")
            .select("*")
            .order("number", { ascending: false });

          if (error) throw error;

          if (data && data.length > 0) {
            setIssues(data as Issue[]);
          } else {
            // Seed database table if empty
            const { error: seedError } = await supabase.from("foodmap_places").insert(mockIssues);
            if (!seedError) {
              setIssues(mockIssues);
            }
          }
        } catch (err) {
          console.error("Lỗi kết nối Supabase, chạy chế độ tĩnh:", err);
        }
      }
    }
    loadData();
  }, []);

  // Supabase Real-time Sync (for multi-device updates)
  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      const channel = supabase
        .channel("realtime-foodmap")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "foodmap_places" },
          (payload) => {
            if (payload.eventType === "INSERT") {
              setIssues((prev) => {
                const exists = prev.some((i) => i.id === payload.new.id);
                if (exists) return prev;
                return [payload.new as Issue, ...prev];
              });
            } else if (payload.eventType === "UPDATE") {
              setIssues((prev) =>
                prev.map((i) => (i.id === payload.new.id ? (payload.new as Issue) : i))
              );
            } else if (payload.eventType === "DELETE") {
              setIssues((prev) => prev.filter((i) => i.id !== payload.old.id));
            }
          }
        )
        .subscribe();

      return () => {
        supabase?.removeChannel(channel);
      };
    }
  }, []);

  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      if (filters.area !== "Tất cả" && issue.area !== filters.area) return false;
      if (filters.group !== "Tất cả" && !issue.groupType.includes(filters.group)) return false;
      if (filters.priority !== "Tất cả" && issue.priority !== filters.priority) return false;
      if (filters.status !== "Tất cả" && issue.status !== filters.status) return false;
      return true;
    });
  }, [issues, filters]);

  // Group by area
  const areaMap = useMemo(() => {
    const map: Record<string, Issue[]> = {};
    for (const issue of filteredIssues) {
      if (!map[issue.area]) map[issue.area] = [];
      map[issue.area].push(issue);
    }
    return map;
  }, [filteredIssues]);

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // Save changes locally to issues.json file (local development only)
  const saveToLocalSourceFile = async (updatedIssues: Issue[]) => {
    if (typeof window !== "undefined" && window.location.hostname !== "localhost") {
      // Don't call API on production static site hosting (like GitHub Pages)
      return;
    }
    try {
      const res = await fetch("/api/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedIssues),
      });
      if (!res.ok) {
        throw new Error("Lỗi phản hồi từ server");
      }
    } catch (err) {
      console.error("Không thể ghi file mã nguồn (chỉ khả dụng ở Local Dev Server):", err);
    }
  };

  const handleSaveIssue = async (id: string, newStatus: BookingStatus, newNotes: string, newImages: string[]) => {
    const updatedAt = new Date().toISOString();

    const nextIssues = issues.map((issue) =>
      issue.id === id
        ? { ...issue, status: newStatus, devNotes: newNotes, images: newImages, updatedAt }
        : issue
    );

    // 1. Update client state
    setIssues(nextIssues);

    // 2. Sync
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase
          .from("foodmap_places")
          .update({
            status: newStatus,
            devNotes: newNotes,
            images: newImages,
            updatedAt,
          })
          .eq("id", id);
      } catch (err) {
        console.error("Lỗi lưu Supabase:", err);
      }
    } else {
      // Standalone mode: save to LocalStorage and try saving to file (if localhost)
      localStorage.setItem("foodmap_places", JSON.stringify(nextIssues));
      await saveToLocalSourceFile(nextIssues);
    }
  };

  const handleToggleIssue = (id: string) => {
    setExpandedIssueIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleExpandAll = () => {
    const next: Record<string, boolean> = {};
    filteredIssues.forEach((issue) => {
      next[issue.id] = true;
    });
    setExpandedIssueIds(next);
  };

  const handleCollapseAll = () => {
    setExpandedIssueIds({});
  };

  const handleRowClick = (issueId: string) => {
    setExpandedIssueIds((prev) => ({ ...prev, [issueId]: true }));
    setTimeout(() => {
      const element = document.getElementById(`issue-card-${issueId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.style.borderColor = "#111";
        element.style.boxShadow = "0 0 0 2px rgba(17, 17, 17, 0.2)";
        setTimeout(() => {
          element.style.borderColor = "#e5e5e5";
          element.style.boxShadow = "none";
        }, 1500);
      }
    }, 100);
  };

  const handleAddPlace = async (newPlace: {
    area: string;
    page: string;
    title: string;
    groupType: string;
    priority: RestaurantSatisfaction;
    status: BookingStatus;
    description: string;
    images: string[];
  }) => {
    const nextNumber = issues.length > 0 ? Math.max(...issues.map((i) => i.number)) + 1 : 1;
    const createdItem: Issue = {
      ...newPlace,
      id: String(nextNumber),
      number: nextNumber,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    const nextIssues = [createdItem, ...issues];

    // 1. Update client state
    setIssues(nextIssues);

    // 2. Sync
    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from("foodmap_places").insert([createdItem]);
      } catch (err) {
        console.error("Lỗi thêm quán lên Supabase:", err);
      }
    } else {
      // Standalone mode: save to LocalStorage and try saving to file (if localhost)
      localStorage.setItem("foodmap_places", JSON.stringify(nextIssues));
      await saveToLocalSourceFile(nextIssues);
    }

    // Scroll to the newly added place
    setTimeout(() => {
      handleRowClick(createdItem.id);
    }, 300);
  };

  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh", fontFamily: "-apple-system,'Segoe UI',Roboto,Arial,sans-serif", fontSize: 14.5, lineHeight: 1.55, color: "#111" }}>
      <DashboardHeader isCloudActive={isSupabaseConfigured} />

      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "18px 22px 70px" }}>
        {/* Dev hint */}
        <div style={{ background: "#1a1a1a", border: "1px solid #2a2a2a", color: "#ccc", borderRadius: 10, padding: "10px 14px", fontSize: 13, margin: "14px 0" }}>
          <b style={{ color: "#fff" }}>Chế độ hoạt động:</b>{" "}
          {isSupabaseConfigured ? (
            <span>
              <b style={{ color: "#4ade80" }}>Cloud Sync (Supabase) đang hoạt động</b>. Mọi thay đổi bạn thực hiện sẽ được đồng bộ thời gian thực đa thiết bị (cả trên Điện thoại và Máy tính).
            </span>
          ) : (
            <span>
              <b style={{ color: "#38bdf8" }}>LocalStorage (Offline) đang hoạt động</b>.{" "}
              {typeof window !== "undefined" && window.location.hostname === "localhost" ? (
                <span>Khi bạn chạy thử ở Local máy tính, thao tác chỉnh sửa/thêm quán mới sẽ được ghi đè trực tiếp vào file mã nguồn <code style={{ color: "#38bdf8", background: "#222", padding: "2px 5px", borderRadius: 4 }}>issues.json</code>.</span>
              ) : (
                <span>Do chạy ở môi trường GitHub Pages tĩnh, dữ liệu sẽ được lưu tạm an toàn trong trình duyệt (LocalStorage) của bạn.</span>
              )}
            </span>
          )}
        </div>

        {/* Stats */}
        <StatsSection issues={issues} />

        {/* Filter bar */}
        <FilterBar
          filters={filters}
          onFilterChange={handleFilterChange}
          onExpandAll={handleExpandAll}
          onCollapseAll={handleCollapseAll}
        />

        {/* Summary table */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", margin: "22px 0 8px" }}>
          <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: ".06em", color: "#888", fontWeight: 700 }}>Tổng quan địa điểm</div>
          <button
            onClick={() => setIsDrawerOpen(true)}
            style={{
              background: "#111",
              color: "#fff",
              border: "none",
              borderRadius: 7,
              padding: "6px 14px",
              fontSize: 12.5,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#111")}
          >
            ➕ Thêm quán mới
          </button>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", border: "1px solid #e5e5e5", borderRadius: 11, overflow: "hidden", marginBottom: 22 }}>
          <thead>
            <tr>
              {["#", "Quận", "Tên quán", "Nhận xét nổi bật", "Phân loại", "Hài lòng", "Đặt bàn"].map((h) => (
                <th key={h} style={{ background: "#f9f9f9", textAlign: "left", fontSize: 11.5, color: "#555", padding: "9px 12px", textTransform: "uppercase", letterSpacing: ".04em", fontWeight: 700, borderBottom: "1px solid #e5e5e5" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredIssues.map((issue) => (
              <tr
                key={issue.id}
                onClick={() => handleRowClick(issue.id)}
                style={{ cursor: "pointer", borderTop: "1px solid #e5e5e5" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <td style={{ padding: "9px 12px", fontWeight: 700, color: "#111", whiteSpace: "nowrap" }}>#{issue.number}</td>
                <td style={{ padding: "9px 12px" }}>{issue.area}</td>
                <td style={{ padding: "9px 12px" }}>{issue.page}</td>
                <td style={{ padding: "9px 12px" }}>{issue.title}</td>
                <td style={{ padding: "9px 12px" }}>
                  {issue.groupType.split(",").map((g) => g.trim()).filter(Boolean).map((g) => <GroupBadge key={g} group={g} />)}
                </td>
                <td style={{ padding: "9px 12px" }}><PrioBadge priority={issue.priority} /></td>
                <td style={{ padding: "9px 12px" }}><StatusBadge status={issue.status} /></td>
              </tr>
            ))}
            {filteredIssues.length === 0 && (
              <tr>
                <td colSpan={7} style={{ textAlign: "center", color: "#888", padding: 30 }}>Không có quán ăn nào phù hợp với bộ lọc.</td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Detail cards grouped by area */}
        <div style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: ".05em", color: "#888", fontWeight: 700, margin: "22px 0 8px" }}>Chi tiết theo Quận & Địa điểm</div>
        {Object.entries(areaMap).map(([area, areaIssues]) => (
          <AreaSection
            key={area}
            area={area}
            issues={areaIssues}
            expandedIssueIds={expandedIssueIds}
            onToggleIssue={handleToggleIssue}
            onSave={handleSaveIssue}
          />
        ))}

        {Object.keys(areaMap).length === 0 && (
          <div style={{ textAlign: "center", color: "#888", padding: 30 }}>Không có quán ăn nào phù hợp với bộ lọc.</div>
        )}

        <div style={{ color: "#888", fontSize: 12, textAlign: "center", marginTop: 28 }}>
          FoodMap Admin Dashboard · {new Date().getFullYear()}
        </div>
      </div>

      {/* Add Place Slide-over Drawer */}
      <AddPlaceDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onAdd={handleAddPlace}
      />
    </div>
  );
}
