import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary/5 py-24 lg:py-32">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <h1 className="max-w-4xl font-bold tracking-tight text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
          Ăn gì? Ở đâu? <span className="text-primary">FoodMap biết hết.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Khám phá hàng ngàn quán ăn ngon, đánh giá chân thực từ cộng đồng và
          tìm kiếm địa điểm phù hợp nhất với bạn.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="rounded-full px-8 text-base">
            <Link href="/kham-pha">Khám Phá Ngay</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full px-8 text-base bg-background"
          >
            <Link href="/bang-xep-hang">Xem Bảng Xếp Hạng</Link>
          </Button>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute -z-10 w-[500px] h-[500px] bg-primary/20 blur-3xl rounded-full top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50" />
    </section>
  );
}
