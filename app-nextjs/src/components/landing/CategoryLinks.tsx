import Link from "next/link";
import { Coffee, Utensils, Pizza, IceCream, Beer, Map } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  { name: "Cà phê", icon: Coffee, count: "450+" },
  { name: "Nhà hàng", icon: Utensils, count: "320+" },
  { name: "Ăn vặt", icon: Pizza, count: "210+" },
  { name: "Tráng miệng", icon: IceCream, count: "150+" },
  { name: "Quán nhậu", icon: Beer, count: "85+" },
  { name: "Gần bạn", icon: Map, count: "Khám phá" },
];

export function CategoryLinks() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold tracking-tight">Khám Phá Theo Danh Mục</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.name} href={`/kham-pha?category=${category.name}`}>
              <Card className="hover:border-primary/50 hover:bg-primary/5 transition-colors cursor-pointer border-border/50">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    <category.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-medium text-foreground">{category.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{category.count}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
