# US-004 Chi Tiết Địa Điểm

## Status

planned

## Lane

normal

## Product Contract

Trang `/dia-diem/[slug]` cung cấp thông tin chi tiết của một quán ăn (tên, hình ảnh, địa chỉ, rating 3 tiêu chí, danh sách review, map mini).

## Relevant Product Docs

- `docs/product/features.md`

## Acceptance Criteria

- Layout gồm Cover image / gallery.
- Sidebar info: Tên, địa chỉ, giờ mở cửa, rating trung bình và rating chi tiết (đồ ăn, phục vụ, không gian).
- Nút Bookmark (Lưu yêu thích).
- Tabs: Reviews, Ảnh, Bản đồ (Mini map).

## Design Notes

- UI surfaces: `app/dia-diem/[slug]/page.tsx`, `components/place/PlaceDetail.tsx`.
- Queries: Fetch place by slug, left join với reviews.

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id US-004 --unit 1 --integration 1 --e2e 0 --platform 0`.

| Layer | Expected proof |
| --- | --- |
| Unit | Component PlaceDetail hiển thị đủ thông tin |
| Integration | |
| E2E | Load trang thành công cho quán cụ thể, 404 nếu slug không tồn tại |
| Platform | |
| Release | |

## Harness Delta

Tạo từ spec ban đầu.
