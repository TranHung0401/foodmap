# Hướng Dẫn Cấu Hình Supabase (Đồng Bộ Đa Thiết Bị)

Để dữ liệu của bạn có thể đồng bộ **thời gian thực (real-time)** giữa Máy tính, Điện thoại hoặc chia sẻ cho nhiều người dùng khác, bạn cần tạo một cơ sở dữ liệu Supabase miễn phí theo hướng dẫn dưới đây.

---

## Bước 1: Tạo Dự Án Supabase
1. Truy cập [Supabase](https://supabase.com) và đăng nhập (bằng tài khoản Github).
2. Tạo một dự án mới (New Project), chọn vùng địa lý gần nhất (ví dụ: Singapore) để đạt tốc độ tốt nhất.

---

## Bước 2: Tạo Bảng Dữ Liệu (SQL Query)
1. Trong trang quản lý dự án Supabase, chọn mục **SQL Editor** ở thanh menu bên trái.
2. Bấm **New Query** và dán đoạn mã SQL sau:

```sql
-- 1. Tạo bảng dữ liệu foodmap_places
create table public.foodmap_places (
  id text primary key,
  number integer not null,
  area text not null,
  page text not null,
  title text not null,
  "groupType" text not null,
  priority text not null,
  status text not null,
  description text,
  images text[] default '{}'::text[],
  "devNotes" text,
  "createdAt" timestamp with time zone default timezone('utc'::text, now()) not null,
  "updatedAt" timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Bật tính năng Real-time để đồng bộ tức thời cho bảng này
alter publication supabase_realtime add table foodmap_places;

-- 3. Cấu hình phân quyền truy cập (cho phép đọc ghi ẩn danh cho bản demo)
alter table public.foodmap_places enable row level security;

create policy "Cho phép tất cả mọi người đọc"
  on public.foodmap_places for select
  using (true);

create policy "Cho phép tất cả mọi người ghi"
  on public.foodmap_places for insert
  with check (true);

create policy "Cho phép tất cả mọi người sửa"
  on public.foodmap_places for update
  using (true);
```
3. Bấm **Run** để khởi tạo bảng.

---

## Bước 3: Cấu Hình Biến Môi Trường Trong Next.js
1. Trong Supabase, vào mục **Project Settings** -> **API**.
2. Copy hai giá trị:
   - **Project URL**
   - **Project API keys (anon public)**
3. Tạo một file tên là `.env.local` ở thư mục gốc của dự án `d:/foodmap/app-nextjs/` và dán cấu hình sau:

```env
NEXT_PUBLIC_SUPABASE_URL=đường_dẫn_project_url_của_bạn
NEXT_PUBLIC_SUPABASE_ANON_KEY=key_anon_của_bạn
```

---

## Cơ Chế Tự Động Phóng Vệ Tinh (Fallback)
- **Khi có file `.env.local`:** Giao diện sẽ tự động chuyển sang chế độ `● Cloud Sync: Hoạt động` ở góc phải Header. Bạn thêm quán trên điện thoại thì máy tính sẽ tự động cập nhật ngay lập tức mà không cần F5!
- **Khi chưa có cấu hình:** Giao diện tự động dùng `● LocalStorage: Đang chạy`. Mọi sửa đổi và dữ liệu thêm mới vẫn lưu trên máy tính của bạn an toàn.
