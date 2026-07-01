# US-005 Viết Review Ẩn Danh

## Status

planned

## Lane

normal

## Product Contract

Cho phép người dùng gửi đánh giá về một địa điểm mà không cần tạo tài khoản. Track bằng `session_id`. Đánh giá chia thành 3 điểm: Đồ ăn, Phục vụ, Không gian.

## Relevant Product Docs

- `docs/product/features.md`

## Acceptance Criteria

- Form nhập tên, nội dung review.
- Chấm điểm 3 tiêu chí: Đồ ăn, Phục vụ, Không gian (từ 1-5 sao).
- Có thể chọn tags (Ngon, Rẻ...).
- Nút Gửi review hoạt động trơn tru (Optimistic update, không cần reload).
- Review hiện lên trang chi tiết quán sau khi gửi.

## Design Notes

- UI surfaces: `components/review/ReviewForm.tsx`.
- API: Dùng Supabase client insert vào bảng `reviews` với `session_id` từ localStorage/cookie.
- State: Dùng React Hook Form + Zod để validate (tối thiểu 30 ký tự nội dung).

## Validation

When updating durable proof status, use numeric booleans:
`scripts/bin/harness-cli story update --id US-005 --unit 1 --integration 1 --e2e 0 --platform 0`.

| Layer | Expected proof |
| --- | --- |
| Unit | Zod schema chặn review thiếu điểm số |
| Integration | Insert thành công vào Supabase table `reviews` |
| E2E | |
| Platform | |
| Release | |

## Harness Delta

Tạo từ spec ban đầu.
