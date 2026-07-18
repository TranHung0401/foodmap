"use client";

import { useState, useRef } from "react";

interface ImageUploaderProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export function ImageUploader({ images, onChange }: ImageUploaderProps) {
  const safeImages = Array.isArray(images)
    ? images
    : typeof images === "string"
    ? (images as string).split(",").map((img) => img.trim()).filter(Boolean)
    : [];

  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const resizeAndConvertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;
          const maxDim = 800; // Optimal size for high quality + small footprint
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = maxDim;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL("image/jpeg", 0.75));
          } else {
            resolve(e.target?.result as string);
          }
        };
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const processFiles = async (files: FileList) => {
    setIsUploading(true);
    const newBase64s: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type.startsWith("image/")) {
        try {
          const base64 = await resizeAndConvertToBase64(file);
          newBase64s.push(base64);
        } catch (err) {
          console.error("Lỗi xử lý file ảnh:", err);
        }
      }
    }
    onChange([...safeImages, ...newBase64s]);
    setIsUploading(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      await processFiles(e.target.files);
    }
  };

  const removeImage = (indexToRemove: number) => {
    onChange(safeImages.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Previews */}
      {safeImages.length > 0 && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
          {safeImages.map((url, idx) => (
            <div
              key={idx}
              style={{
                position: "relative",
                width: 72,
                height: 72,
                borderRadius: 8,
                overflow: "hidden",
                border: "1px solid #e5e5e5",
                background: "#f9f9f9",
              }}
            >
              <img
                src={url}
                alt={`preview ${idx}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <button
                type="button"
                onClick={() => removeImage(idx)}
                style={{
                  position: "absolute",
                  top: 2,
                  right: 2,
                  width: 18,
                  height: 18,
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.6)",
                  color: "#fff",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  cursor: "pointer",
                  padding: 0,
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Drag & Drop Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        style={{
          border: isDragOver ? "2px dashed #ff7a00" : "1px dashed #ccc",
          borderRadius: 8,
          padding: "16px 12px",
          textAlign: "center",
          background: isDragOver ? "#fffaf0" : "#fafafa",
          cursor: "pointer",
          transition: "all 0.15s ease",
        }}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <div style={{ fontSize: 24, marginBottom: 4 }}>📷</div>
        <div style={{ fontSize: 13, color: "#555", fontWeight: 600 }}>
          {isUploading ? "Đang xử lý ảnh..." : "Kéo thả ảnh hoặc click để tải lên"}
        </div>
        <div style={{ fontSize: 11, color: "#888", marginTop: 2 }}>
          Chấp nhận mọi định dạng hình ảnh
        </div>
      </div>
    </div>
  );
}
