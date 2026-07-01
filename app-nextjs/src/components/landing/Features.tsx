import { Search, ShieldCheck, Map, Bookmark, Users, Sparkles } from "lucide-react";

const features = [
  {
    title: "Tìm Kiếm Thông Minh",
    description: "Dễ dàng tìm kiếm hàng quán theo tên, món ăn, khu vực hoặc mức giá bạn mong muốn.",
    icon: Search,
  },
  {
    title: "Đánh Giá Xác Thực",
    description: "Mọi đánh giá đều từ người dùng thật, giúp bạn có cái nhìn khách quan nhất về quán ăn.",
    icon: ShieldCheck,
  },
  {
    title: "Bản Đồ Trực Quan",
    description: "Hiển thị các địa điểm ẩm thực xung quanh bạn trên bản đồ tương tác theo thời gian thực.",
    icon: Map,
  },
  {
    title: "Lưu Địa Điểm Yêu Thích",
    description: "Lưu lại các danh sách quán ngon để dành cho những dịp tụ tập bạn bè hoặc hẹn hò.",
    icon: Bookmark,
  },
  {
    title: "Cộng Đồng Ẩm Thực",
    description: "Tham gia chia sẻ, thảo luận và kết nối với những người đam mê ẩm thực trên toàn quốc.",
    icon: Users,
  },
  {
    title: "Gợi Ý Cá Nhân Hóa",
    description: "Hệ thống tự động đề xuất các món ăn, địa điểm phù hợp với khẩu vị riêng của bạn.",
    icon: Sparkles,
  },
];

export function Features() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Tính Năng Nổi Bật</h2>
          <p className="text-muted-foreground text-lg">
            FoodMap cung cấp đầy đủ các công cụ để bạn có một trải nghiệm khám phá ẩm thực tuyệt vời và trọn vẹn nhất.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group p-8 bg-card rounded-2xl border transition-all hover:shadow-md hover:border-primary/50"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
