# US-007 Bookmark LocalStorage

## Status

planned

## Lane

normal

## Product Contract

Cho phép người dùng đánh dấu lưu (bookmark) quán ăn yêu thích vào Local Storage (offline-first). Quản lý danh sách các quán đã lưu tại trang `/yeu-thich`.

## Relevant Product Docs

- `docs/product/features.md`

## Acceptance Criteria

- Nút Bookmark trên PlaceCard và PlaceDetail hoạt động (toggle lưu / bỏ lưu).
- Trạng thái lưu (heart icon) giữ nguyên khi reload trang (load từ localStorage).
- Trang `/yeu-thich` hiển thị danh sách quán đã lưu (Grid view).
- Có thông báo (empty state) "Chưa có địa điểm yêu thích" nếu danh sách trống.

## Design Notes

- State: Custom hook `useBookmarks` để sync với localStorage (có thể kết hợp Zustand).
- UI surfaces: `app/yeu-thich/page.tsx`.

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id US-007 --unit 1 --integration 1 --e2e 0 --platform 0`.

| Layer | Expected proof |
| --- | --- |
| Unit | Custom hook `useBookmarks` lưu và xoá đúng logic localStorage |
| Integration | |
| E2E | Có thể click lưu ở trang Khám phá và thấy kết quả ở trang Yêu thích |
| Platform | |
| Release | |

## Harness Delta

Tạo từ spec ban đầu.
