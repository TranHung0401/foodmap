export function StatsBar() {
  const stats = [
    { label: "Địa Điểm", value: "1,200+" },
    { label: "Đánh Giá", value: "8,500+" },
    { label: "Tỉnh Thành", value: "63" },
    { label: "Thành Viên", value: "24K+" },
  ];

  return (
    <section className="border-y bg-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 divide-x divide-border/50">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center text-center">
              <span className="text-3xl font-bold text-primary">{stat.value}</span>
              <span className="mt-2 text-sm text-muted-foreground font-medium uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
