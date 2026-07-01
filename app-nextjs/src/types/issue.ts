export type RestaurantSatisfaction = "Rất tốt" | "Hài lòng" | "Trung bình" | "Tệ";
export type BookingStatus = "Đặt bàn" | "Không đặt bàn";

export interface Issue {
  id: string;
  number: number;
  area: string; // Quận (HCMC districts)
  page: string; // Tên quán
  title: string; // Nhận xét nổi bật
  groupType: string; // Phân loại: Cơm/Món nước | Ăn vặt | Cafe/Trà sữa | Lẩu/Nướng
  priority: RestaurantSatisfaction; // Mức độ hài lòng
  status: BookingStatus; // Đặt bàn
  description: string; // Chi tiết đánh giá
  images?: string[];
  devNotes?: string; // Phản hồi của quán / Ghi chú admin
  createdAt: string;
  updatedAt: string;
}
