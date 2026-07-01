import Link from "next/link";
import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockPlaces = [
  {
    id: "1",
    name: "Cà phê Muối Chú Long",
    category: "Cà phê",
    rating: 4.8,
    reviews: 124,
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "2",
    name: "Phở Thìn Lò Đúc",
    category: "Nhà hàng",
    rating: 4.5,
    reviews: 890,
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cb438?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "3",
    name: "Bánh Mì Huynh Hoa",
    category: "Ăn vặt",
    rating: 4.9,
    reviews: 2100,
    image: "https://images.unsplash.com/photo-1509697452888-7cd0233633ab?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "4",
    name: "Pizza 4P's",
    category: "Nhà hàng",
    rating: 4.7,
    reviews: 1560,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "5",
    name: "The Running Bean",
    category: "Cà phê",
    rating: 4.6,
    reviews: 432,
    image: "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: "6",
    name: "Ốc Đào",
    category: "Ăn vặt",
    rating: 4.4,
    reviews: 780,
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&q=80&w=800",
  },
];

export function TopPicks() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Đang Hot Tuần Này</h2>
            <p className="text-muted-foreground">Những địa điểm được cộng đồng FoodMap yêu thích nhất</p>
          </div>
          <Link href="/kham-pha" className="text-primary hover:underline font-medium mt-4 md:mt-0">
            Xem tất cả &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockPlaces.map((place) => (
            <Link key={place.id} href={`/dia-diem/${place.id}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow border-border/50 h-full">
                <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={place.image}
                    alt={place.name}
                    className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                  />
                  <Badge className="absolute top-3 right-3 bg-background/90 text-foreground hover:bg-background/90 backdrop-blur-sm border-none shadow-sm">
                    {place.category}
                  </Badge>
                </div>
                <CardContent className="p-5">
                  <h3 className="font-semibold text-lg line-clamp-1 mb-2">{place.name}</h3>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                    <span className="font-medium text-foreground mr-1">{place.rating}</span>
                    <span>({place.reviews} đánh giá)</span>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
