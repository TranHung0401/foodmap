import { Search, MapPin, MessageSquare } from "lucide-react";

const steps = [
  {
    title: "Tìm Kiếm",
    description: "Nhập tên món ăn, khu vực hoặc chọn theo danh mục để tìm quán phù hợp.",
    icon: Search,
  },
  {
    title: "Xem Chi Tiết",
    description: "Xem thông tin chi tiết, hình ảnh, đánh giá và vị trí chính xác trên bản đồ.",
    icon: MapPin,
  },
  {
    title: "Đánh Giá",
    description: "Chia sẻ trải nghiệm của bạn với cộng đồng, hoàn toàn ẩn danh nếu muốn.",
    icon: MessageSquare,
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Sử Dụng FoodMap Như Thế Nào?</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Chỉ với 3 bước đơn giản, bạn đã có thể khám phá và chia sẻ những địa điểm ẩm thực tuyệt vời.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center">
              {index !== steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-full h-[2px] bg-border border-dashed border-b-2" />
              )}
              <div className="relative z-10 w-20 h-20 rounded-full bg-background border-4 border-primary/20 flex items-center justify-center mb-6 shadow-sm">
                <step.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
