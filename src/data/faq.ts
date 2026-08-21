export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const faqData: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Giá cắt tóc và dịch vụ tại Sown Barbershop là bao nhiêu?',
    answer:
      'Bảng giá dịch vụ tại Sown Barbershop được niêm yết minh bạch: Cắt tóc thiết kế cơ bản là 80.000đ, Cắt Fade chuyên sâu 100.000đ, Combo Cắt & Ủ khăn nóng cạo râu 120.000đ, Gội đầu dưỡng sinh & sấy vuốt 50.000đ và Uốn tóc Texture định hình 250.000đ. Cam kết không phụ thu phát sinh.',
  },
  {
    id: 'faq-2',
    question: 'Tiệm có tư vấn kiểu tóc phù hợp với khuôn mặt và chất tóc không?',
    answer:
      'Có. Tại Sown Barbershop, mỗi khách hàng khi bước lên ghế cắt đều được Master Barber Nguyễn Sơn trực tiếp tư vấn dựa trên cấu trúc xương đầu, chất tóc (mỏng, dày, cứng, chỉa) và phong cách làm việc hàng ngày để bạn sở hữu mái tóc vừa sắc nét, vừa dễ tự sấy tạo kiểu tại nhà.',
  },
  {
    id: 'faq-3',
    question: 'Tôi có cần phải đặt lịch hẹn trước khi đến tiệm không?',
    answer:
      'Để đảm bảo chất lượng phục vụ chu đáo nhất và không mất thời gian chờ đợi, bạn nên đặt trước qua Zalo hoặc Hotline 098 744 3091. Tiệm luôn ưu tiên phục vụ đúng giờ cho khách hàng có lịch hẹn trước.',
  },
  {
    id: 'faq-4',
    question: 'Địa chỉ tiệm Sown Barbershop ở đâu tại TX. Nghi Sơn, Thanh Hóa?',
    answer:
      'Tiệm tọa lạc tại số 32 Đường Lương Chí, TDP 4, Phường Hải Hòa (Khu vực Tĩnh Gia cũ), Thị xã Nghi Sơn, Tỉnh Thanh Hóa. Vị trí trung tâm thuận tiện, có biển hiệu Barber Shop phong cách cổ điển dễ nhận biết.',
  },
  {
    id: 'faq-5',
    question: 'Sown Barbershop mở cửa vào những khung giờ nào trong tuần?',
    answer:
      'Tiệm mở cửa phục vụ từ Thứ 2 đến Thứ 7 trong khung giờ 08:30 — 20:00, và Chủ Nhật trong khung giờ 08:30 — 18:30. Khách hàng có thể linh hoạt đặt lịch vào các buổi sáng, chiều hoặc tối sau giờ làm.',
  },
  {
    id: 'faq-6',
    question: 'Tiệm có chỗ đỗ xe máy và ô tô thuận tiện không?',
    answer:
      'Có. Sown Barbershop sở hữu mặt tiền thoáng đãng với vỉa hè rộng rãi, có chỗ đỗ xe máy và ô tô an toàn, hoàn toàn miễn phí ngay trước cửa tiệm.',
  },
];
