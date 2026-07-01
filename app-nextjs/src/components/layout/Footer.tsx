export function Footer() {
  return (
    <footer className="border-t bg-muted/40 py-6 md:py-0">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by the FoodMap community. Cùng khám phá và đánh giá.
        </p>
        <p className="text-center text-sm text-muted-foreground md:text-left">
          © {new Date().getFullYear()} FoodMap. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
