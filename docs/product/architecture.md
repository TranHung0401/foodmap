# Architecture & Technical Constraints

## 1. Tech Stack (Accepted — Decision 0008)
- **Frontend:** Next.js 15 (App Router) + TypeScript
- **UI:** shadcn/ui + Tailwind CSS
- **Database:** Supabase (PostgreSQL + Auth + Storage + Realtime)
- **Auth:** Supabase Auth — chỉ bắt buộc login khi tạo địa điểm mới (Decision 0009)
- **Map:** Leaflet / OpenStreetMap — miễn phí 100%, không cần API key
- **Storage:** Supabase Storage (ảnh review, ảnh dashboard issues)
- **Hosting:** Vercel

### Leaflet + Next.js SSR Note
Leaflet không hỗ trợ SSR. Import MapView với:
```tsx
const MapView = dynamic(() => import('@/components/map/MapView'), { ssr: false })
```

## 2. Database Schema (Supabase)

```sql
-- Địa điểm ăn uống
CREATE TABLE places (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  description   TEXT,
  category      TEXT,
  province      TEXT NOT NULL,
  district      TEXT,
  address       TEXT,
  lat           FLOAT,
  lng           FLOAT,
  price_range   INT CHECK (price_range BETWEEN 1 AND 4),
  cover_image   TEXT,
  images        TEXT[],
  avg_rating    FLOAT DEFAULT 0,
  avg_food      FLOAT DEFAULT 0,
  avg_service   FLOAT DEFAULT 0,
  avg_space     FLOAT DEFAULT 0,
  total_reviews INT DEFAULT 0,
  total_bookmarks INT DEFAULT 0,
  created_by    UUID REFERENCES auth.users(id), -- Bắt buộc login khi tạo
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Review của người dùng
CREATE TABLE reviews (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  place_id      UUID REFERENCES places(id) ON DELETE CASCADE,
  session_id    TEXT, -- Anonymous
  reviewer_name TEXT NOT NULL,
  rating_food   INT CHECK (rating_food BETWEEN 1 AND 5),
  rating_service INT CHECK (rating_service BETWEEN 1 AND 5),
  rating_space  INT CHECK (rating_space BETWEEN 1 AND 5),
  title         TEXT,
  content       TEXT NOT NULL,
  images        TEXT[],
  tags          TEXT[],
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

-- Bảng category và bookmark...
-- (xem US-002 cho full schema)

-- Review Dashboard issues (tách biệt khỏi FoodMap app data)
CREATE TABLE demo_issues (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  number        INT NOT NULL,
  area          TEXT NOT NULL,     -- Nhà hàng, Bản đồ, Profile, Tìm kiếm, Toàn site
  page          TEXT,
  title         TEXT NOT NULL,
  group_type    TEXT,              -- Chức năng, UI, UX, Map
  priority      TEXT,             -- Cao, Trung bình, Thấp
  status        TEXT DEFAULT 'Chờ xử lý',
  description   TEXT,
  images        TEXT[],
  dev_notes     TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);
```

## 3. Route Map

| Route | Mô tả | Layout |
|-------|-------|--------|
| `/` | Landing Page (Hero, Features, Stats, Ranking Preview) | main layout |
| `/kham-pha` | Trang Khám Phá (List + Map) | main layout |
| `/dia-diem/[slug]` | Chi Tiết Địa Điểm | main layout |
| `/bang-xep-hang` | Bảng Xếp Hạng | main layout |
| `/yeu-thich` | Bookmark (localStorage) | main layout |
| `/review-dashboard` | Interactive Review Dashboard (team tool) | **dashboard layout riêng** |

## 4. Product Decisions (Summary)
- **Map:** Leaflet + OpenStreetMap — miễn phí hoàn toàn (Decision 0008).
- **Auth:** Anonymous review + Login cho tạo địa điểm (Decision 0009).
- **Dashboard:** Route riêng, layout riêng, Realtime Supabase (Decision 0010).
- **Data Seed:** Database khởi điểm trống, phụ thuộc vào cộng đồng đóng góp.
- **Moderation:** Review hiển thị ngay, không kiểm duyệt trước.
- **Rating:** 3 tiêu chí — Đồ ăn, Phục vụ, Không gian. Rating tổng = trung bình cộng.

