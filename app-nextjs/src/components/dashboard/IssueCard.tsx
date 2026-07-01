"use client";

import { useState } from "react";
import { Issue, BookingStatus } from "@/types/issue";

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

// ── IssueCard ────────────────────────────────────────────────────────────────

interface IssueCardProps {
  issue: Issue;
  isOpen: boolean;
  onToggle: () => void;
  onSave: (id: string, newStatus: BookingStatus, newNotes: string, newImages: string[]) => void;
}

export function IssueCard({ issue, isOpen, onToggle, onSave }: IssueCardProps) {
  const [devStatus, setDevStatus] = useState<BookingStatus>(issue.status);
  const [devNotes, setDevNotes] = useState(issue.devNotes ?? "");
  const [devImages, setDevImages] = useState(issue.images?.join(", ") ?? "");
  const [savedMsg, setSavedMsg] = useState(false);

  const groups = issue.groupType.split(",").map((g) => g.trim()).filter(Boolean);
  const imageUrls = devImages.split(",").map((img) => img.trim()).filter(Boolean);

  function handleSave() {
    onSave(issue.id, devStatus, devNotes, imageUrls);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2500);
  }

  return (
    <div
      id={`issue-card-${issue.id}`}
      style={{
        background: "#fff",
        border: "1px solid #e5e5e5",
        borderRadius: 10,
        marginBottom: 8,
        overflow: "hidden",
        transition: "all 0.2s ease-in-out",
      }}
    >
      {/* Head */}
      <div
        onClick={onToggle}
        style={{ display: "flex", gap: 9, alignItems: "center", flexWrap: "wrap", padding: "10px 14px", cursor: "pointer" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#fafafa")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
      >
        <span style={{ color: "#aaa", fontSize: 11, transform: isOpen ? "rotate(90deg)" : "none", display: "inline-block", transition: "transform 0.15s" }}>▸</span>
        <span style={{ fontWeight: 700, color: "#333", fontSize: 13 }}>#{issue.number}</span>
        <span style={{ fontWeight: 500, fontSize: 13.5, flex: 1, minWidth: 120 }}>{issue.title}</span>
        <div style={{ display: "flex", gap: 4, alignItems: "center", flexWrap: "wrap" }}>
          {groups.map((g) => <GroupBadge key={g} group={g} />)}
          <PrioBadge priority={issue.priority} />
          <StatusBadge status={issue.status} />
        </div>
      </div>

      {/* Body */}
      {isOpen && (
        <div style={{ borderTop: "1px solid #f0f0f0", padding: "14px 14px 16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 16 }}>
            {/* Left — Info & Admin Action */}
            <div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                {[
                  { label: "Quận", value: issue.area },
                  { label: "Tên quán / Địa điểm", value: issue.page },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <div style={{ fontSize: 10.5, textTransform: "uppercase" as const, letterSpacing: ".04em", color: "#999", marginBottom: 3, fontWeight: 600 }}>{label}</div>
                    <div style={{ fontSize: 13.5, color: "#222" }}>{value}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                <div>
                  <div style={{ fontSize: 10.5, textTransform: "uppercase" as const, letterSpacing: ".04em", color: "#999", marginBottom: 5, fontWeight: 600 }}>Phân loại</div>
                  <div>{groups.map((g) => <GroupBadge key={g} group={g} />)}</div>
                </div>
                <div>
                  <div style={{ fontSize: 10.5, textTransform: "uppercase" as const, letterSpacing: ".04em", color: "#999", marginBottom: 5, fontWeight: 600 }}>Mức độ hài lòng</div>
                  <PrioBadge priority={issue.priority} />
                </div>
              </div>

              {issue.description && (
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 10.5, textTransform: "uppercase" as const, letterSpacing: ".04em", color: "#999", marginBottom: 5, fontWeight: 600 }}>Chi tiết nhận xét</div>
                  <div style={{ background: "#fafafa", border: "1px solid #ececec", borderRadius: 8, padding: "8px 10px", fontSize: 13, color: "#555", lineHeight: 1.6 }}>
                    {issue.description}
                  </div>
                </div>
              )}

              {/* Admin Box inside Left Column */}
              <div style={{ background: "#fafafa", border: "1px solid #ececec", borderRadius: 9, padding: 12, marginTop: 14 }}>
                <div style={{ fontSize: 11, textTransform: "uppercase" as const, letterSpacing: ".04em", color: "#999", marginBottom: 8, fontWeight: 600 }}>Phần dành cho Admin</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: "#666" }}>Đặt bàn:</span>
                  <select
                    value={devStatus}
                    onChange={(e) => setDevStatus(e.target.value as BookingStatus)}
                    style={{ fontSize: 13, padding: "4px 8px", border: "1px solid #ddd", borderRadius: 6, background: "#fff", color: "#222", fontFamily: "inherit", cursor: "pointer" }}
                  >
                    <option value="Đặt bàn">Đặt bàn</option>
                    <option value="Không đặt bàn">Không đặt bàn</option>
                  </select>
                </div>
                <div style={{ display: "flex", flexDirection: "column" as const, gap: 4, marginBottom: 8 }}>
                  <div style={{ fontSize: 12, color: "#666" }}>Phản hồi của quán / Ghi chú:</div>
                  <textarea
                    value={devNotes}
                    onChange={(e) => setDevNotes(e.target.value)}
                    placeholder="Ghi chú của admin hoặc phản hồi..."
                    style={{ width: "100%", minHeight: 60, resize: "vertical", fontSize: 13, padding: "7px 9px", border: "1px solid #ddd", borderRadius: 6, fontFamily: "inherit", background: "#fff", boxSizing: "border-box", color: "#222" }}
                  />
                </div>
                {/* Image Input field */}
                <div style={{ display: "flex", flexDirection: "column" as const, gap: 4, marginBottom: 12 }}>
                  <div style={{ fontSize: 12, color: "#666" }}>Đường dẫn hình ảnh (phân tách bằng dấu phẩy):</div>
                  <input
                    type="text"
                    value={devImages}
                    onChange={(e) => setDevImages(e.target.value)}
                    placeholder="https://image1.jpg, https://image2.jpg"
                    style={{ width: "100%", fontSize: 13, padding: "7px 9px", border: "1px solid #ddd", borderRadius: 6, fontFamily: "inherit", background: "#fff", boxSizing: "border-box", color: "#222" }}
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <button
                    onClick={handleSave}
                    style={{ background: "#111", color: "#fff", border: "none", borderRadius: 6, padding: "6px 16px", fontSize: 13, cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#111")}
                  >
                    💾 Lưu
                  </button>
                  {savedMsg && <span style={{ fontSize: 12, color: "#16a34a", fontWeight: 600 }}>✓ Đã lưu</span>}
                </div>
              </div>
            </div>

            {/* Right — Image display column */}
            <div style={{ display: "flex", flexDirection: "column" as const, gap: 8 }}>
              <div style={{ fontSize: 10.5, textTransform: "uppercase" as const, letterSpacing: ".04em", color: "#999", fontWeight: 600 }}>Hình ảnh quán ăn</div>
              {imageUrls.length > 0 ? (
                <div style={{ display: "grid", gridTemplateColumns: imageUrls.length > 1 ? "1fr 1fr" : "1fr", gap: 10 }}>
                  {imageUrls.map((url, index) => (
                    <div key={index} style={{ border: "1px solid #e5e5e5", borderRadius: 8, overflow: "hidden", background: "#f9f9f9" }}>
                      <img
                        src={url}
                        alt={`Hình ảnh ${index + 1}`}
                        style={{ width: "100%", height: "auto", display: "block", maxHeight: 180, objectFit: "cover" }}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    color: "#888",
                    fontSize: 13,
                    padding: "30px 18px",
                    textAlign: "center",
                    border: "1px dashed #ddd",
                    borderRadius: 8,
                    background: "#fafafa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                  }}
                >
                  — chưa có hình ảnh —
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
