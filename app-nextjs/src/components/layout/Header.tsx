import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center px-4">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold inline-block text-primary text-xl">FoodMap</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/kham-pha"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Khám Phá
            </Link>
            <Link
              href="/bang-xep-hang"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Bảng Xếp Hạng
            </Link>
            <Link
              href="/yeu-thich"
              className="flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Yêu Thích
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Link href="/review-dashboard">
              <Button variant="ghost" className="hidden sm:inline-flex text-muted-foreground">
                Dashboard
              </Button>
            </Link>
            <Button>Đăng Nhập</Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
