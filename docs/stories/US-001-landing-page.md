# US-001 Landing Page

## Status

planned

## Lane

normal

## Product Contract

Tạo Landing Page cho FoodMap.vn hiển thị 3 giây đầu tiên để user hiểu "Đây là gì? Tại sao dùng? Bắt đầu ngay". Giao diện gồm Hero Section, Stats Bar, Top Picks, Category Quicklinks, Ranking Preview và How It Works.

## Relevant Product Docs

- `docs/product/overview.md`
- `docs/product/features.md`

## Acceptance Criteria

- Hiển thị Hero section với thông điệp rõ ràng và CTA tìm quán.
- Thanh thống kê (Stats Bar) mock data.
- Phần Top Picks (Đang Hot Tuần Này) hiển thị 6 quán dạng lưới 3 cột.
- Category Quicklinks (các nút category).
- Bảng xếp hạng Preview Top 10.
- Layout responsive chuẩn di động.

## Design Notes

- UI surfaces: `app/page.tsx`, `components/layout/Header.tsx`, `components/layout/Footer.tsx`.
- Commands/Queries: Cần server component fetch data (nếu có DB). MVP có thể mock data.
- UI Style: Dùng shadcn/ui.

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id US-001 --unit 1 --integration 1 --e2e 0 --platform 0`.

| Layer | Expected proof |
| --- | --- |
| Unit | Component render đúng các section |
| Integration | |
| E2E | Có thể click vào CTA dẫn tới `/kham-pha` |
| Platform | Responsive tốt trên mobile/desktop |
| Release | |

## Harness Delta

Tạo từ spec ban đầu.
