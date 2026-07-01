1. Tổng quan
Tên dự án: FoodMap Landing Page
Mục tiêu: Xây dựng một landing page giới thiệu sản phẩm + tích hợp Interactive Review Dashboard (chuyển thể trực tiếp từ thiết kế index.html).

2. CHI TIẾT GIAO DIỆN DEMO DASHBOARD (Epic quan trọng nhất)
2.1 Header của Demo Dashboard

Background: Gradient tím-hồng → chuyển thành gradient cam-vàng (from-orange-600 via-amber-600 to-red-600)
Tiêu đề: “Review FoodMap — Trước khi launch”
Subline: “Site: demo.foodmap.vn · Cập nhật: [ngày hiện tại]”
Cloud Status: Pill giống hệt gốc (cloudpill):
● Cloud: đang kiểm tra… (màu xám)
Khi kết nối Supabase thành công: ● Cloud: Đang hoạt động (màu xanh lá)

Dev Hint Box (giống hệt vị trí và style gốc):Dành cho dev: Ở mỗi vấn đề, chọn Tiến độ + viết Ghi chú của dev, rồi bấm 💾 Lưu. Thay đổi được lưu realtime qua Supabase cho mọi người đang mở trang.


2.2 Stats Section
Giống bố cục flex-wrap của file gốc, gồm 6 stat cards:

































StatNội dung mẫuTổng248Đã duyệt87Ưu tiên Cao51Chức năng89UI42UX / Map37
Mỗi card có:

Số lớn (font 22px, bold)
Chữ nhỏ bên dưới


2.3 Filter Bar (Sticky, giống hệt cấu trúc .bar trong HTML)
Bao gồm 4 nhóm filter (dùng shadcn Button group):

Khu vực:
Tất cả | Nhà hàng | Bản đồ | Profile | Tìm kiếm | Toàn site

Nhóm:
Tất cả | Chức năng | UI | UX | Map

Ưu tiên:
Tất cả | Cao | Trung bình | Thấp

Trạng thái:
Tất cả | Chờ xử lý | Đang sửa | Đã sửa | Đã kiểm tra



Bên phải: 2 link “Mở tất cả” | “Thu tất cả” (để expand/collapse các card)


2.4 Bảng Issues (Table)
Cột (giống hệt file gốc):












#Khu vựcTrangVấn đềNhómƯu tiênTrạng thái
Ví dụ nội dung (dữ liệu từ Supabase):

#12 | Bản đồ | Trang chủ | Bản đồ không load marker khi zoom | Map, UI | Cao | Chờ xử lý
#23 | Nhà hàng | Chi tiết quán | Nút “Lưu vào tủ” không hoạt động | Chức năng | Cao | Đang sửa

Mỗi dòng:

Clickable → mở chi tiết (Sheet)
Badge cho Nhóm, Ưu tiên, Trạng thái (màu sắc giống gốc: xanh, cam, đỏ…)


2.5 Card Chi Tiết (khi click vào dòng)
Sử dụng shadcn Sheet (sidebar từ phải) hoặc Dialog lớn.
Cấu trúc card:

Header card: #12 - Bản đồ không load marker
Thông tin cơ bản: Khu vực, Trang, Nhóm badges, Ưu tiên, Trạng thái
Mô tả vấn đề (text dài)
Ảnh minh họa: Grid 1-2 cột ảnh (từ Supabase Storage)
Dev Section (phần quan trọng):
Label: Tiến độ
Select (shadcn): Chờ xử lý | Đang sửa | Đã sửa | Đã kiểm tra
Label: Ghi chú của dev
Textarea (multi-line)
Button 💾 Lưu (màu tím đậm giống gốc)
Thông báo “Đã lưu thành công” (toast)



3. USER STORIES & ACCEPTANCE CRITERIA (Cập nhật chi tiết)
US-3.1 – As a dev/stakeholder, I want to view the full review dashboard.
AC:

Header, Stats, Filter Bar, Table và Card Detail phải giống layout + style của file index.html (chỉ thay theme màu và nội dung thành FoodMap).

US-3.2 – As a dev, I want to filter issues.
AC: Tất cả 4 nhóm filter hoạt động kết hợp, cập nhật table realtime.
US-3.3 – As a dev, I want to update an issue.
AC:

Mở Sheet chi tiết khi click dòng
Thay đổi trạng thái + ghi chú
Nhấn Lưu → Supabase update + tất cả người xem khác thấy thay đổi ngay (Realtime)


4. Roadmap & Phases
Phase 1 (5 ngày): Hero + Features + Stats + Filter Bar + Table (UI tĩnh)
Phase 2 (7 ngày): Supabase integration + Sheet chi tiết + Update form
Phase 3 (4 ngày): Realtime subscription + Cloud status + Polish + Waitlist
Phase 4 (3 ngày): Testing + Deploy

Bạn muốn tôi tiếp tục bổ sung phần nào nữa không?

Database Schema SQL chi tiết?
Danh sách mẫu issues cho FoodMap?
Component folder structure?
Hoặc bắt đầu code Phase 1?

Hãy cho biết hướng tiếp theo!ghi vậy sao copy được✅ Dưới đây là bản SPEC HOÀN CHỈNH, dễ copy-paste:

SPEC CHI TIẾT: FOODMAP LANDING PAGE
Phiên bản: 1.1
Ngày: 28/06/2026
Tech Stack: Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Supabase (Auth, Database, Storage, Realtime)

1. MỤC TIÊU
Xây dựng Landing Page cho FoodMap với phần Interactive Review Dashboard được chuyển thể trực tiếp từ thiết kế file index.html, chỉ thay đổi theme và nội dung phù hợp với chủ đề ẩm thực.

2. CHI TIẾT GIAO DIỆN DEMO DASHBOARD
2.1 Header

Gradient background: from-orange-600 via-amber-600 to-red-600
Tiêu đề: Review FoodMap — Trước khi launch
Sub: Site: https://demo.foodmap.vn · Cập nhật: [ngày hiện tại]
Cloud pill: ● Cloud: đang kiểm tra… (sẽ thay bằng realtime status từ Supabase)

2.2 Dev Hint Box

Background tím nhạt, viền tím
Nội dung:
Dành cho dev: Ở mỗi vấn đề, chọn Tiến độ + viết Ghi chú của dev, rồi bấm 💾 Lưu. Thay đổi được lưu realtime qua Supabase.

2.3 Stats Section
6 cards ngang (flex-wrap):

Tổng: 248
Đã duyệt: 87
Ưu tiên Cao: 51
Chức năng: 89
UI: 42
UX/Map: 37

2.4 Filter Bar (Sticky)
4 nhóm filter dạng button (giống .fbtn trong HTML):

Khu vực: Tất cả | Nhà hàng | Bản đồ | Profile | Tìm kiếm | Toàn site
Nhóm: Tất cả | Chức năng | UI | UX | Map
Ưu tiên: Tất cả | Cao | Trung bình | Thấp
Trạng thái: Tất cả | Chờ xử lý | Đang sửa | Đã sửa | Đã kiểm tra

Phía phải: nút “Mở tất cả” | “Thu tất cả”
2.5 Table Issues
Cột:

#
Khu vực
Trang
Vấn đề
Nhóm (badge)
Ưu tiên (badge)
Trạng thái (badge)

Mỗi dòng có hover effect, click mở chi tiết.
2.6 Card Chi Tiết (Sheet từ phải)
Khi click dòng table:

Header: #ID - Tiêu đề vấn đề
Thông tin: Khu vực, Trang, Nhóm, Ưu tiên, Trạng thái
Phần mô tả vấn đề
Grid ảnh screenshot (1 hoặc 2 cột)
Phần Dev:
Select Tiến độ (Chờ xử lý, Đang sửa, Đã sửa, Đã kiểm tra)
Textarea: Ghi chú của dev
Button 💾 Lưu (màu cam đậm)



3. USER STORIES & ACCEPTANCE CRITERIA
US-1: As a visitor, tôi muốn xem Hero section ấn tượng
AC: Headline, subheadline, stats, 2 CTA, responsive.
US-2: As a visitor, tôi muốn xem Features section
AC: 6 cards với icon, tiêu đề, mô tả.
US-3: As a dev/stakeholder, tôi muốn tương tác với Review Dashboard
AC:

Header, Stats, Filter, Table, Card Detail giống bố cục file index.html
Filter hoạt động
Click dòng mở Sheet
Update trạng thái + ghi chú → lưu Supabase
Realtime: người khác thấy thay đổi ngay

US-4: As a visitor, tôi muốn đăng ký waitlist
AC: Form email → lưu vào Supabase.

4. PHASES PHÁT TRIỂN
Phase 1 (5 ngày)

Next.js setup + Tailwind + shadcn
Hero + Features + Stats + Filter Bar + Table (UI)

Phase 2 (7 ngày)

Supabase table demo_issues
Sheet chi tiết + form update
Kết nối fetch & update

Phase 3 (4 ngày)

Supabase Realtime
Cloud status
Waitlist form
Polish & animation

Phase 4 (3 ngày)

Test + Deploy Vercel