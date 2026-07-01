import Link from "next/link";
import { Trophy, Star, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const mockRanking = [
  { rank: 1, name: "Bún Bò Huế Oanh", category: "Món nước", rating: 4.9, reviews: 3420 },
  { rank: 2, name: "Phở Thìn Lò Đúc", category: "Món nước", rating: 4.8, reviews: 2890 },
  { rank: 3, name: "Cơm Tấm Ba Ghiền", category: "Cơm", rating: 4.7, reviews: 2150 },
  { rank: 4, name: "Bánh Mì Huynh Hoa", category: "Ăn vặt", rating: 4.7, reviews: 1980 },
  { rank: 5, name: "Cà phê Muối Chú Long", category: "Cà phê", rating: 4.6, reviews: 1540 },
];

export function RankingPreview() {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="p-3 bg-primary/10 rounded-2xl text-primary mb-4">
            <Trophy className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Bảng Xếp Hạng Được Yêu Thích Nhất
          </h2>
          <p className="mt-2 text-muted-foreground">
            Top các địa điểm được cộng đồng đánh giá và lưu trữ nhiều nhất tuần này.
          </p>
        </div>

        <Card className="overflow-hidden">
          <div className="divide-y divide-border">
            {mockRanking.map((place) => (
              <Link
                key={place.rank}
                href="/bang-xep-hang"
                className="flex items-center justify-between p-4 sm:p-5 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <span className="font-bold text-lg text-muted-foreground w-6">
                    #{place.rank}
                  </span>
                  <div>
                    <h3 className="font-semibold text-foreground text-base sm:text-lg">
                      {place.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {place.category}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row items-end sm:items-center gap-1 sm:gap-6 ml-4">
                  <div className="flex items-center text-sm">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                    <span className="font-medium">{place.rating}</span>
                  </div>
                  <div className="text-sm text-muted-foreground hidden sm:block">
                    {place.reviews} đánh giá
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        <div className="mt-8 text-center">
          <Link
            href="/bang-xep-hang"
            className={buttonVariants({ variant: "outline", className: "rounded-full px-8" })}
          >
            Xem toàn bộ bảng xếp hạng <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}
