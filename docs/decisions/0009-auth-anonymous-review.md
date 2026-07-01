# 0009 Auth Strategy: Anonymous Review + Login For Create

Date: 2026-06-28

## Status

Accepted

## Context

FoodMap muốn tối thiểu hóa rào cản để người dùng đóng góp review.
Đồng thời cần một mức độ xác thực nhất định khi ai đó tạo địa điểm mới
để tránh spam địa điểm không có thật.

## Decision

- **Review ẩn danh:** Người dùng review mà không cần đăng nhập. Mỗi session được gán `session_id`
  (UUID lưu trong localStorage hoặc cookie). Field `reviewer_name` do user tự nhập.
- **Tạo địa điểm:** Bắt buộc Supabase Auth (email/password hoặc OAuth Google).
  Field `created_by` trong bảng `places` references `auth.users(id)`.
- **Không có hard rate limit** cho anonymous review ở MVP. Sẽ thêm nếu có spam.
- **Không có pre-moderation:** Review hiển thị ngay sau khi submit.

## Alternatives Considered

1. **Bắt buộc login cho cả review:** Giảm đóng góp cộng đồng, tăng churn.
2. **Hoàn toàn anonymous (không có auth):** Không thể kiểm soát spam địa điểm.
3. **reCAPTCHA cho anonymous:** Thêm friction, chưa cần thiết ở MVP.

## Consequences

Positive:

- Tỷ lệ review cao hơn vì không có rào cản.
- Supabase Auth chỉ cần setup cho một flow (tạo địa điểm).
- `session_id` đủ để track "lịch sử review" của một device.

Tradeoffs:

- Không thể xác thực danh tính reviewer → dễ bị review spam.
- Nếu user xóa localStorage → mất session_id, không biết họ đã review gì.
- Audit trail yếu cho anonymous reviews.

## Follow-Up

- Thêm report/flag review mechanism ở Phase sau MVP.
- Nếu spam: Thêm cooldown hoặc CAPTCHA per session_id.
- Decision về RLS (Row Level Security) Supabase cần xem xét riêng.
