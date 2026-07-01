# 0010 Review Dashboard: Chuyển Thể Từ index.html Gốc

Date: 2026-06-28

## Status

Accepted

## Context

SPEC.md yêu cầu chuyển thể Interactive Review Dashboard từ một file `index.html` gốc
(không có trong repo). Dashboard dùng để dev team và stakeholders theo dõi và cập nhật
trạng thái các issues trước khi launch FoodMap.
Cần quyết định cách tích hợp Dashboard này vào Next.js App Router.

## Decision

- **Route:** `/review-dashboard` — một route riêng biệt trong Next.js App.
- **Layout:** Dashboard KHÔNG nằm trong main layout của Landing Page. Có layout riêng.
- **Theme:** Gradient `from-orange-600 via-amber-600 to-red-600` (khác hẳn tím pastel của Landing).
- **Data source:** Bảng Supabase `demo_issues` — tách biệt với `places` và `reviews`.
- **Realtime:** Supabase Realtime subscription cho bảng `demo_issues` — khi một dev lưu,
  tất cả người đang mở trang thấy thay đổi ngay.
- **Sheet chi tiết:** Dùng shadcn `Sheet` (side panel từ phải) thay vì Dialog.
- **Access control:** URL công khai (không cần login) — bất kỳ ai có link đều xem được.
  Chỉ cần link mới biết tồn tại.

## Alternatives Considered

1. **Dialog thay vì Sheet:** Sheet phù hợp hơn cho detail panel dài (ảnh + form).
2. **Trang riêng cho chi tiết issue:** Phức tạp hơn, mất context của table.
3. **WebSocket tự build:** Supabase Realtime built-in đủ dùng cho MVP.
4. **Cùng layout với Landing Page:** Confusing về UX — Dashboard là tool nội bộ.

## Consequences

Positive:

- Route riêng → dễ share link với team mà không lẫn vào marketing site.
- Layout riêng → có thể tối ưu cho desktop-first (dashboard thường xem trên laptop).
- Supabase Realtime → zero setup, chỉ cần subscribe channel.

Tradeoffs:

- Bảng `demo_issues` là dữ liệu tạm thời (pre-launch), cần cleanup plan sau launch.
- Dashboard UI phức tạp hơn Landing Page → nên build và test độc lập.

## Follow-Up

- Sau khi FoodMap launch: Archive hoặc password-protect `/review-dashboard`.
- Schema bảng `demo_issues` cần migration riêng (xem US-002).
