# Core Features

## 1. Map View (Trang Khám Phá)
- Hiển thị song song List quán và Bản đồ (Leaflet).
- Kéo/Zoom bản đồ để load danh sách quán.
- Filter theo khu vực, danh mục, giá, rating.

## 2. Bảng Xếp Hạng
- Hệ thống thuật toán xếp hạng dựa vào Rating trung bình, số lượng review, độ tươi mới (recency).
- Bảng xếp hạng Tuần, Tháng, All-time.
- Cấp badge (Mới nổi, Best of).

## 3. Chi Tiết Địa Điểm
- Layout rõ ràng: Tên, Image gallery, Địa chỉ.
- Thống kê Rating theo 3 tiêu chí (Đồ ăn, Phục vụ, Không gian).
- Danh sách Review (có ảnh).
- Button Bookmark.

## 4. Anonymous Review
- Form đánh giá chi tiết 3 tiêu chí.
- Đăng ẩn danh với session_id, không bắt đăng nhập, không có hard-limit.
- Hiển thị trực tiếp (không kiểm duyệt trước).

## 5. Lưu Bookmark Local
- Lưu các quán ưa thích vào `localStorage`.
- Giao diện quản lý các địa điểm đã lưu, filter.
- Người dùng chấp nhận rủi ro mất bookmark nếu xóa cache.

## 6. Thêm Địa Điểm (Yêu cầu Login)
- Để đảm bảo tính xác thực một phần, tính năng thêm quán mới bắt buộc người dùng đăng nhập.
