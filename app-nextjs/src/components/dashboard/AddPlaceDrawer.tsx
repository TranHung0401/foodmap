"use client";

import { useState } from "react";
import { Issue, RestaurantSatisfaction, BookingStatus } from "@/types/issue";
import { ImageUploader } from "./ImageUploader";
import { SuggestionTags } from "./SuggestionTags";

interface AddPlaceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (place: {
    area: string;
    page: string;
    title: string;
    groupType: string;
    priority: RestaurantSatisfaction;
    status: BookingStatus;
    description: string;
    images: string[];
  }) => void;
  issues: Issue[];
}

const AREAS = [
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
  "Cơm/Món nước",
  "Ăn vặt",
  "Cafe/Trà sữa",
  "Lẩu/Nướng",
];

export function AddPlaceDrawer({ isOpen, onClose, onAdd, issues }: AddPlaceDrawerProps) {
  const [name, setName] = useState("");
  const [area, setArea] = useState(AREAS[0]);
  const [group, setGroup] = useState(FOOD_GROUPS[0]);
  const [satisfaction, setSatisfaction] = useState<RestaurantSatisfaction>("Rất tốt");
  const [booking, setBooking] = useState<BookingStatus>("Không đặt bàn");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const isDuplicate = name.trim() !== "" && issues.some(
    (item) => item.page.toLowerCase().trim() === name.toLowerCase().trim()
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) {
      setError("Vui lòng nhập tên quán ăn!");
      return;
    }
    if (!title.trim()) {
      setError("Vui lòng nhập nhận xét nổi bật!");
      return;
    }

    onAdd({
      page: name.trim(),
      area,
      groupType: group,
      priority: satisfaction,
      status: booking,
      title: title.trim(),
      description: description.trim(),
      images,
    });

    // Reset Form
    setName("");
    setArea(AREAS[0]);
    setGroup(FOOD_GROUPS[0]);
    setSatisfaction("Rất tốt");
    setBooking("Không đặt bàn");
    setTitle("");
    setDescription("");
    setImages([]);
    setError("");
    onClose();
  }

  const handleSelectTag = (tag: string) => {
    setDescription((prev) => (prev ? `${prev} ${tag}` : tag));
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(2px)",
          zIndex: 100,
          cursor: "pointer",
          animation: "fadeIn 0.2s ease-out",
        }}
      />

      {/* Drawer Panel */}
      <div
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          height: "100vh",
          width: "100%",
          maxWidth: "420px",
          background: "#fff",
          boxShadow: "-4px 0 20px rgba(0,0,0,0.15)",
          zIndex: 101,
          display: "flex",
          flexDirection: "column",
          animation: "slideIn 0.25s ease-out",
          fontFamily: "inherit",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "20px 24px",
            borderBottom: "1px solid #eee",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ margin: 0, fontSize: 17, fontWeight: 700, color: "#111" }}>
            ➕ Thêm Địa Điểm Mới
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: 20,
              cursor: "pointer",
              color: "#999",
            }}
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form
          onSubmit={handleSubmit}
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          {error && (
            <div
              style={{
                background: "#fef2f2",
                color: "#dc2626",
                padding: "10px 14px",
                borderRadius: 8,
                fontSize: 13,
                border: "1px solid #fecaca",
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* Tên Quán */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#666" }}>TÊN QUÁN ĂN *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ví dụ: Cơm Tấm Thuận Kiều"
              style={{
                padding: "8px 12px",
                border: isDuplicate ? "1px solid #eab308" : "1px solid #ddd",
                borderRadius: 7,
                fontSize: 13.5,
                fontFamily: "inherit",
              }}
            />
            {isDuplicate && (
              <div style={{ fontSize: 12, color: "#eab308", fontWeight: 500, marginTop: 2 }}>
                ⚠️ Tên quán này đã tồn tại trong danh sách!
              </div>
            )}
          </div>

          {/* Quận & Phân Loại (Grid) */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#666" }}>QUẬN / KHU VỰC</label>
              <select
                value={area}
                onChange={(e) => setArea(e.target.value)}
                style={{
                  padding: "8px 10px",
                  border: "1px solid #ddd",
                  borderRadius: 7,
                  fontSize: 13.5,
                  background: "#fff",
                  fontFamily: "inherit",
                  cursor: "pointer",
                }}
              >
                {AREAS.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#666" }}>PHÂN LOẠI MÓN</label>
              <select
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                style={{
                  padding: "8px 10px",
                  border: "1px solid #ddd",
                  borderRadius: 7,
                  fontSize: 13.5,
                  background: "#fff",
                  fontFamily: "inherit",
                  cursor: "pointer",
                }}
              >
                {FOOD_GROUPS.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Hài Lòng & Đặt Bàn (Grid) */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#666" }}>MỨC ĐỘ HÀI LÒNG</label>
              <select
                value={satisfaction}
                onChange={(e) => setSatisfaction(e.target.value as RestaurantSatisfaction)}
                style={{
                  padding: "8px 10px",
                  border: "1px solid #ddd",
                  borderRadius: 7,
                  fontSize: 13.5,
                  background: "#fff",
                  fontFamily: "inherit",
                  cursor: "pointer",
                }}
              >
                <option value="Rất tốt">Rất tốt</option>
                <option value="Hài lòng">Hài lòng</option>
                <option value="Trung bình">Trung bình</option>
                <option value="Tệ">Tệ</option>
              </select>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "#666" }}>ĐẶT BÀN TRƯỚC</label>
              <select
                value={booking}
                onChange={(e) => setBooking(e.target.value as BookingStatus)}
                style={{
                  padding: "8px 10px",
                  border: "1px solid #ddd",
                  borderRadius: 7,
                  fontSize: 13.5,
                  background: "#fff",
                  fontFamily: "inherit",
                  cursor: "pointer",
                }}
              >
                <option value="Đặt bàn">Đặt bàn</option>
                <option value="Không đặt bàn">Không đặt bàn</option>
              </select>
            </div>
          </div>

          {/* Nhận xét nổi bật */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#666" }}>NHẬN XÉT NỔI BẬT *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Tóm tắt nhận xét chính (Ví dụ: Đồ ăn ngon vị thanh...)"
              style={{
                padding: "8px 12px",
                border: "1px solid #ddd",
                borderRadius: 7,
                fontSize: 13.5,
                fontFamily: "inherit",
              }}
            />
          </div>

          {/* Chi tiết đánh giá */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#666" }}>CHI TIẾT NHẬN XÉT</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mô tả cụ thể hơn về đồ ăn, phục vụ hoặc không gian..."
              style={{
                padding: "8px 12px",
                border: "1px solid #ddd",
                borderRadius: 7,
                fontSize: 13.5,
                fontFamily: "inherit",
                minHeight: "80px",
                resize: "vertical",
              }}
            />
            {/* Suggestion tags based on satisfaction */}
            <SuggestionTags priority={satisfaction} onSelectTag={handleSelectTag} />
          </div>

          {/* Hình ảnh */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 600, color: "#666" }}>HÌNH ẢNH QUÁN ĂN</label>
            <ImageUploader images={images} onChange={setImages} />
          </div>

          {/* Buttons Footer */}
          <div
            style={{
              marginTop: "auto",
              display: "flex",
              gap: 10,
              paddingTop: "20px",
              borderTop: "1px solid #eee",
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: 7,
                background: "#fff",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 13.5,
                fontFamily: "inherit",
              }}
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: "10px",
                border: "none",
                borderRadius: 7,
                background: "#111",
                color: "#fff",
                cursor: "pointer",
                fontWeight: 600,
                fontSize: 13.5,
                fontFamily: "inherit",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#333")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#111")}
            >
              Lưu địa điểm
            </button>
          </div>
        </form>
      </div>

      {/* Slide & Fade Keyframes (injecting to head if not present) */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
