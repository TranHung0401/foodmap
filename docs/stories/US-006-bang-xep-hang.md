# US-006 Bảng Xếp Hạng Cơ Bản

## Status

planned

## Lane

normal

## Product Contract

Trang `/xep-hang` hiển thị top địa điểm (Tuần, Tháng, All-time) dựa trên công thức tổng hợp đánh giá.

## Relevant Product Docs

- `docs/product/features.md`

## Acceptance Criteria

- Bảng xếp hạng giao diện table (Thứ hạng, Hình ảnh, Tên, Địa chỉ tóm tắt, Điểm, Badge).
- Filter / Tabs: Top Tuần, Top Tháng, Top Mọi Thời Đại.
- Thuật toán (Algorithm) tính điểm ranking hoạt động trên Supabase (có thể là View hoặc RPC).

## Design Notes

- UI surfaces: `app/xep-hang/page.tsx`, `components/ranking/RankingTable.tsx`.
- Queries: Cần Supabase SQL view để tính toán điểm nóng (Hot score).

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id US-006 --unit 1 --integration 1 --e2e 0 --platform 0`.

| Layer | Expected proof |
| --- | --- |
| Unit | |
| Integration | Query xếp hạng trả về kết quả sort đúng thứ tự điểm số |
| E2E | |
| Platform | |
| Release | |

## Harness Delta

Tạo từ spec ban đầu.
