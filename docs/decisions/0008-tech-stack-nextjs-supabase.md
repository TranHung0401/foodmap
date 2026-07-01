# 0008 Tech Stack: Next.js 15 + Supabase

Date: 2026-06-28

## Status

Accepted

## Context

FoodMap cần một stack đủ nhanh để launch MVP, hỗ trợ anonymous review (không cần auth phức tạp),
realtime sync cho Review Dashboard, và hosting miễn phí/rẻ ở giai đoạn đầu.
Stack phải quen thuộc với developer Việt Nam và có ecosystem tốt.

## Decision

- **Frontend framework:** Next.js 15 (App Router) với TypeScript.
- **UI components:** shadcn/ui + Tailwind CSS.
- **Database + Auth + Storage + Realtime:** Supabase (PostgreSQL).
- **Map:** Leaflet + OpenStreetMap (miễn phí hoàn toàn, không Google Maps API).
- **Hosting:** Vercel (tích hợp native với Next.js).

## Alternatives Considered

1. **Remix + PlanetScale**: Remix tốt cho form mutations nhưng Realtime phức tạp hơn. PlanetScale không có Storage.
2. **Next.js + Firebase**: Firebase Realtime tốt nhưng chi phí cao hơn Supabase khi scale; không có PostgreSQL-style queries.
3. **Nuxt.js + Supabase**: Nuxt có hệ sinh thái nhỏ hơn ở VN; Next.js quen thuộc hơn với team.
4. **Google Maps API**: Chi phí $7/1000 requests sau free tier; Leaflet + OpenStreetMap = miễn phí 100%.

## Consequences

Positive:

- Vercel + Next.js: Zero-config deployment, preview URLs tự động cho mỗi PR.
- Supabase Realtime: WebSocket built-in, không cần setup thêm Socket.io.
- shadcn/ui: Components là source code trong project, dễ customize.
- Leaflet: Miễn phí, không cần API key, chạy tốt với SSR Next.js.

Tradeoffs:

- Supabase free tier có giới hạn 500MB storage, 50K monthly active users.
- Leaflet tiles từ OpenStreetMap có rate limit khi traffic cao (cần CDN tiles sau này).
- Next.js App Router cần hiểu Server vs Client components rõ ràng.

## Follow-Up

- Khi traffic > 50K MAU: Nâng cấp Supabase plan.
- Khi map bị rate limit: Chuyển sang Mapbox tiles (có free tier 25K views/month).
- Quyết định Supabase Auth flow cần decision riêng (0009).
