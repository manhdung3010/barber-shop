import { Service } from '../types/index.ts';

export const servicesData: Service[] = [
  {
    id: 'haircut',
    name: 'Cắt Tóc Thiết Kế',
    description: 'Cắt tóc chuyên nghiệp thiết kế riêng theo tỷ lệ khuôn mặt, chất tóc và phong cách cá nhân.',
    price: '[PRICE]',
    duration: '45 PHÚT',
    image: '/images/services/haircut.svg',
  },
  {
    id: 'fade',
    name: 'Cắt Fade Chuyên Sâu',
    description: 'Kỹ thuật Low, Mid hoặc High Fade mượt mà với đường cạo chấn viền sắc nét từng milimet.',
    price: '[PRICE]',
    duration: '45 PHÚT',
    image: '/images/services/fade.svg',
  },
  {
    id: 'haircut-beard',
    name: 'Cắt Tóc & Tạo Kiểu Râu',
    description: 'Combo cắt tóc thiết kế trọn gói kết hợp tỉa định hình râu, ủ khăn nóng thảo mộc và dưỡng râu.',
    price: '[PRICE]',
    duration: '60 PHÚT',
    image: '/images/services/haircut-beard.svg',
  },
  {
    id: 'perm',
    name: 'Uốn Texture Định Hình',
    description: 'Uốn texture phong cách Hàn Quốc hoặc uốn phồng chân tóc thiết kế riêng theo cấu trúc tóc.',
    price: '[PRICE]',
    duration: '90 PHÚT',
    image: '/images/services/perm.svg',
  },
  {
    id: 'styling',
    name: 'Gội, Sấy & Tạo Kiểu',
    description: 'Gội đầu thư giãn, massage da đầu chuyên sâu, sấy tạo phồng và vuốt sáp/pomade chuẩn form.',
    price: '[PRICE]',
    duration: '30 PHÚT',
    image: '/images/services/styling.svg',
  },
];
