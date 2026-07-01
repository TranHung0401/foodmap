# Hướng Dẫn Đẩy Lên GitHub Pages (Với Supabase Sync)

Để giao diện Next.js chạy trên **GitHub Pages** và đồng bộ Supabase trực tiếp từ điện thoại, bạn làm theo hướng dẫn dưới đây.

Chúng ta sẽ dùng **GitHub Actions** để tự động build và deploy trang web mỗi khi bạn push code mới lên GitHub.

---

## Bước 1: Cấu hình Secret trên GitHub Repository
Vì file `.env.local` chứa API keys được bảo mật và tự động bỏ qua khi đẩy lên Git, bạn cần thêm chúng vào mục Settings trên GitHub:
1. Mở Repository của bạn trên GitHub.
2. Vào **Settings** (Cài đặt) -> **Secrets and variables** -> **Actions**.
3. Chọn **New repository secret** để thêm 2 biến sau:
   - Tên: `NEXT_PUBLIC_SUPABASE_URL` | Giá trị: *Đường dẫn Supabase URL của bạn*
   - Tên: `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Giá trị: *Key anon của bạn* (có thể điền key `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` mà bạn đã cấu hình).

---

## Bước 2: Bật Quyền Đăng Tải GitHub Pages
1. Trong Repository GitHub của bạn, vào **Settings** -> **Pages**.
2. Tại mục **Build and deployment** -> **Source**, bạn chọn: **GitHub Actions** (thay vì Deploy from branch).

---

## Bước 3: Đẩy Code lên GitHub
Mở Terminal của dự án trên máy tính và chạy các câu lệnh Git sau để push code:

```bash
git add .
git commit -m "feat: cấu hình Supabase và deploy GitHub Actions"
git push origin main
```

*(Thay `main` bằng tên nhánh chính của bạn nếu là `master`)*

---

## Bước 4: Kiểm tra và Truy Cập
1. Sau khi push code, bạn chọn mục **Actions** trên GitHub để xem tiến độ tự động build (thường mất khoảng 1-2 phút).
2. Khi tiến trình báo xanh thành công, đường dẫn trang web của bạn sẽ hiển thị ngay tại đó (ví dụ: `https://<username>.github.io/<repo-name>/`).
3. Mở đường dẫn đó trên **Điện thoại** hoặc chia sẻ cho mọi người. Bạn đã có thể thêm/sửa quán trực tiếp từ điện thoại và dữ liệu sẽ đồng bộ về máy tính local của bạn ngay lập tức!
