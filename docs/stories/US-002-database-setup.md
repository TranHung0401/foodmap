# US-002 Database Setup

## Status

planned

## Lane

high-risk

## Product Contract

Thiết lập schema cho Supabase PostgreSQL để quản lý địa điểm, review, category và bookmark. Thiết lập các RLS policies cơ bản. Yêu cầu Auth khi tạo quán mới.

## Relevant Product Docs

- `docs/product/architecture.md`

## Acceptance Criteria

- Bảng `places` được tạo với các cột rating tách biệt (đồ ăn, phục vụ, không gian).
- Bảng `reviews` được tạo (hỗ trợ session_id ẩn danh).
- Bảng `categories`, `bookmarks`, `review_votes` được tạo.
- Cấu hình RLS (Row Level Security): read public, create `places` yêu cầu auth, create `reviews` public (với session_id).

## Design Notes

- Tables: `places`, `reviews`, `categories`, `bookmarks`, `review_votes`.
- API: Dùng Supabase client.
- Auth: Kích hoạt Email/Password Auth trên Supabase để admin/user có thể đăng nhập.

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id US-002 --unit 1 --integration 1 --e2e 0 --platform 0`.

| Layer | Expected proof |
| --- | --- |
| Unit | SQL script chạy thành công |
| Integration | Dùng supabase client query fetch test thử 1 record thành công |
| E2E | |
| Platform | |
| Release | |

## Harness Delta

Tạo từ spec ban đầu. Xác định là high-risk vì đây là Data model setup.
