# US-008 Interactive Review Dashboard

## Status

planned

## Lane

high-risk

## Product Contract

Xây dựng trang `/review-dashboard` cho phép dev team và stakeholders xem, filter,
và cập nhật trạng thái các issues trước khi launch FoodMap.
Dashboard kết nối Supabase Realtime: khi một người lưu thay đổi, tất cả người
đang mở trang đều thấy ngay lập tức.

## Relevant Decisions

- `docs/decisions/0008-tech-stack-nextjs-supabase.md`
- `docs/decisions/0010-review-dashboard-integration.md`

## Relevant Product Docs

- `docs/product/architecture.md`
- `SPEC.md` (sections 2.1 – 2.6)

## Acceptance Criteria

### AC-1: Header Dashboard (SPEC 2.1)
- Gradient background `from-orange-600 via-amber-600 to-red-600`.
- Tiêu đề: "Review FoodMap — Trước khi launch".
- Sub: "Site: demo.foodmap.vn · Cập nhật: [ngày hiện tại]".
- Cloud Status Pill: hiển thị `● Cloud: đang kiểm tra…` khi load; chuyển sang `● Cloud: Đang hoạt động` (xanh lá) khi Supabase kết nối thành công.
- Dev Hint Box (background tím nhạt, viền tím).

### AC-2: Stats Section (SPEC 2.3)
- 6 stat cards hiển thị: Tổng, Đã duyệt, Ưu tiên Cao, Chức năng, UI, UX/Map.
- Số liệu tính từ bảng `demo_issues` trong Supabase (không mock cứng).
- Layout flex-wrap, responsive.

### AC-3: Filter Bar Sticky (SPEC 2.4)
- 4 nhóm filter buttons (shadcn `ToggleGroup`):
  - Khu vực: Tất cả | Nhà hàng | Bản đồ | Profile | Tìm kiếm | Toàn site
  - Nhóm: Tất cả | Chức năng | UI | UX | Map
  - Ưu tiên: Tất cả | Cao | Trung bình | Thấp
  - Trạng thái: Tất cả | Chờ xử lý | Đang sửa | Đã sửa | Đã kiểm tra
- Nút "Mở tất cả" / "Thu tất cả".
- Filter kết hợp → table update realtime (client-side filter).

### AC-4: Bảng Issues (SPEC 2.5)
- Cột: #, Khu vực, Trang, Vấn đề, Nhóm (badge), Ưu tiên (badge), Trạng thái (badge).
- Hover effect trên mỗi dòng.
- Click dòng → mở Sheet chi tiết.
- Badge màu sắc: Cao=đỏ, Trung bình=cam, Thấp=xanh; Chờ xử lý=xám, Đang sửa=cam, Đã sửa=xanh lá, Đã kiểm tra=tím.

### AC-5: Sheet Chi Tiết (SPEC 2.6)
- shadcn `Sheet` từ phía phải màn hình.
- Header: `#ID - Tiêu đề vấn đề`.
- Thông tin: Khu vực, Trang, Nhóm badges, Ưu tiên, Trạng thái.
- Mô tả vấn đề (text dài).
- Grid ảnh screenshot (1-2 cột, từ Supabase Storage).
- Dev Section:
  - Select `Tiến độ` (4 options).
  - Textarea `Ghi chú của dev`.
  - Button `💾 Lưu` (màu cam đậm).
  - Toast "Đã lưu thành công" sau khi save.

### AC-6: Supabase Realtime (US-3.3 từ SPEC)
- Sau khi nhấn `💾 Lưu`: Supabase UPDATE ghi thành công.
- Tất cả người đang mở `/review-dashboard` thấy thay đổi trong < 2 giây.
- Không cần refresh trang.

## Design Notes

- UI surfaces:
  - `app/review-dashboard/layout.tsx` (layout riêng, KHÔNG dùng main layout)
  - `app/review-dashboard/page.tsx` (Server Component, fetch initial data)
  - `components/dashboard/DashboardHeader.tsx`
  - `components/dashboard/StatsSection.tsx`
  - `components/dashboard/FilterBar.tsx`
  - `components/dashboard/IssuesTable.tsx`
  - `components/dashboard/IssueSheet.tsx`
- Supabase table: `demo_issues`
- Realtime: `supabase.channel('demo_issues').on('postgres_changes', ...)`

## Database Schema

```sql
CREATE TABLE demo_issues (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  number        INT NOT NULL,
  area          TEXT NOT NULL,  -- Khu vực: Nhà hàng, Bản đồ, ...
  page          TEXT,           -- Trang cụ thể
  title         TEXT NOT NULL,  -- Vấn đề
  group_type    TEXT,           -- Nhóm: Chức năng, UI, UX, Map
  priority      TEXT,           -- Cao, Trung bình, Thấp
  status        TEXT DEFAULT 'Chờ xử lý', -- Trạng thái
  description   TEXT,
  images        TEXT[],         -- URLs từ Supabase Storage
  dev_notes     TEXT,           -- Ghi chú của dev
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);
```

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id US-008 --unit 1 --integration 1 --e2e 1 --platform 0`.

| Layer | Expected proof |
| --- | --- |
| Unit | Mỗi component render đúng với mock data |
| Integration | Filter + Table kết nối đúng với Supabase query |
| E2E | Flow: load page → filter → click row → mở Sheet → lưu → toast xuất hiện |
| Platform | Responsive: desktop-first, mobile usable |
| Release | Realtime sync test: mở 2 tab, lưu ở tab 1, tab 2 cập nhật trong < 2s |

## Risk Flags

- External systems (Supabase Realtime)
- Public contracts (Sheet API shape)
- Data model (demo_issues schema)

→ Confirmed: high-risk lane.

## Harness Delta

Tạo từ SPEC.md intake #3. Decision 0010-review-dashboard đã được ghi.
