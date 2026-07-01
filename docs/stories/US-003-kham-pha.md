# US-003 Trang Khám Phá (List + Map View)

## Status

planned

## Lane

normal

## Product Contract

Trang `/kham-pha` tích hợp List view và Map view (Leaflet/OSM) cho phép người dùng xem danh sách quán và vị trí trên bản đồ, bao gồm hệ thống tìm kiếm, lọc (filter) theo hạng mục.

## Relevant Product Docs

- `docs/product/features.md`
- `docs/product/architecture.md`

## Acceptance Criteria

- Split-screen layout (desktop) và toggle view (mobile).
- Map render bằng Leaflet + OpenStreetMap.
- Hiển thị các pin (marker) theo toạ độ quán.
- Filter panel hoạt động: tỉnh thành, danh mục, khoảng giá, rating.
- Khung tìm kiếm full-text search.

## Design Notes

- UI surfaces: `app/kham-pha/page.tsx`, `components/map/MapView.tsx`.
- Queries: Supabase RPC / Text search query `to_tsvector`.
- Leaflet integration trong Next.js cần cẩn thận SSR (dùng `next/dynamic` với `ssr: false`).

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id US-003 --unit 1 --integration 1 --e2e 0 --platform 0`.

| Layer | Expected proof |
| --- | --- |
| Unit | Filter logic hoạt động đúng |
| Integration | Fetch data lên Map render đúng toạ độ |
| E2E | Filter thay đổi URL và kết quả list thay đổi tương ứng |
| Platform | |
| Release | |

## Harness Delta

Tạo từ spec ban đầu.
