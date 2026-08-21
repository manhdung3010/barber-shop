# Sown Barbershop - Website & CMS Admin Panel

Dự án giới thiệu dịch vụ cắt tóc cá nhân hóa (1-on-1 barber service) và bảng điều khiển CMS Admin tích hợp cho **Sown Barbershop** (chủ sở hữu: Master Barber Nguyễn Sơn). Website được tối ưu hóa giao diện hiện đại, mượt mà và trực quan, hỗ trợ quản lý nội dung động linh hoạt từ cơ sở dữ liệu.

---

## 🛠️ Công Nghệ Sử Dụng

- **Frontend & Backend**: Next.js 15+ (App Router, Standalone build)
- **Cơ sở dữ liệu (Database)**: PostgreSQL
- **ORM**: Prisma Client (quản lý Schema, Migrations, và Seed)
- **Styling**: Tailwind CSS v4, PostCSS, Framer Motion (hiệu ứng chuyển động)
- **Bảo mật & Xác thực**: JSON Web Tokens (JWT) cho CMS Admin
- **Môi trường**: Docker & Docker Compose

---

## 📋 Yêu Cầu Hệ Thống

Để chạy dự án ở môi trường phát triển cục bộ, máy tính của bạn cần cài đặt:
- **Node.js**: Phiên bản `20.x` trở lên
- **Trình quản lý gói**: `pnpm` (khuyến nghị, cấu hình mặc định trong Docker) hoặc `npm`
- **Docker & Docker Compose** (nếu muốn khởi chạy nhanh cả hệ thống mà không cần cài đặt database)

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Dự Án

Bạn có thể chạy dự án theo 2 cách dưới đây.

### Cách 1: Chạy Bằng Docker Compose (Khuyến Nghị - Nhanh Nhất)

Cách này sẽ tự động khởi chạy một container cơ sở dữ liệu PostgreSQL và container ứng dụng Next.js mà không cần thiết lập môi trường cục bộ.

1. **Khởi chạy container**:
   ```bash
   docker compose up --build -d
   ```
   *Lệnh này sẽ xây dựng lại image Next.js, chờ cơ sở dữ liệu Postgres sẵn sàng, khởi chạy các bảng và chạy ứng dụng.*

2. **Kiểm tra trạng thái hoạt động**:
   ```bash
   docker compose ps
   ```

3. **Truy cập ứng dụng**:
   - Trang chủ (giao diện khách hàng): [http://localhost:3000](http://localhost:3000)
   - Trang quản trị CMS (Admin): [http://localhost:3000/admin](http://localhost:3000/admin)

4. **Dừng hệ thống**:
   ```bash
   docker compose down
   ```

---

### Cách 2: Chạy Cục Bộ (Local Development)

Nếu bạn muốn tùy chỉnh code hoặc chạy trực tiếp trên máy host để phát triển (development):

#### Bước 1: Khởi chạy Cơ sở dữ liệu
Bạn cần một database PostgreSQL đang chạy.
- Cách nhanh nhất là sử dụng Docker chỉ để chạy database:
  ```bash
  docker compose up -d db
  ```
  *(Lưu ý: Service database trong docker-compose map cổng từ container cổng `5432` ra máy host cổng `5433` để tránh xung đột. Do đó nếu dùng DB từ Docker cho môi trường local host, bạn cần chỉnh DATABASE_URL kết nối tới cổng `5433`)*

#### Bước 2: Thiết lập File Môi Trường (.env)
1. Copy file cấu hình mẫu `.env.example` thành file `.env` thực tế:
   - Trên Windows (PowerShell):
     ```powershell
     Copy-Item .env.example .env
     ```
   - Trên Linux/macOS hoặc CMD:
     ```bash
     cp .env.example .env
     ```

2. Mở file `.env` vừa tạo và cập nhật các thông số cần thiết:
   ```env
   # Nếu bạn chạy db qua docker compose ở Bước 1, sử dụng cổng 5433:
   DATABASE_URL="postgresql://postgres:sownbarberpass@localhost:5433/sownbarber_db?schema=public"
   
   # Khóa bí mật JWT dùng để mã hóa session (Nên đổi ở môi trường production)
   JWT_SECRET="sown-barbershop-super-secret-jwt-key-2026"
   ADMIN_DEFAULT_PASSWORD="sownbarber2026"
   ```

#### Bước 3: Cài đặt Thư viện & Cấu hình Database
1. Cài đặt các gói phụ thuộc (dependencies):
   ```bash
   pnpm install
   # hoặc: npm install
   ```

2. Tạo các bảng cơ sở dữ liệu từ Schema Prisma:
   ```bash
   pnpm db:push
   # hoặc: npm run db:push
   ```

3. Khởi tạo dữ liệu mẫu ban đầu (Seeding):
   ```bash
   pnpm db:seed
   # hoặc: npm run db:seed
   ```
   *Lệnh này sẽ tạo tài khoản quản trị mặc định và điền đầy đủ thông tin dịch vụ, kiểu tóc, bài viết mẫu.*

4. (Tùy chọn) Kiểm tra trạng thái cơ sở dữ liệu:
   ```bash
   npx tsx scripts/check-db.ts
   ```
   *Lệnh này sẽ quét database và in ra báo cáo tổng số bản ghi đã được nạp thành công.*

#### Bước 4: Khởi động Server Phát triển
Chạy lệnh sau để khởi động máy chủ phát triển cục bộ:
```bash
pnpm dev
# hoặc: npm run dev
```

Truy cập trang web tại: [http://localhost:3000](http://localhost:3000)

---

## 🔑 Thông Tin Đăng Nhập Quản Trị (Admin CMS)

Để chỉnh sửa nội dung trang web (thông tin tiệm, danh sách dịch vụ, bảng giá, lookbook kiểu tóc, v.v.), hãy đăng nhập vào trang quản trị:

- **Đường dẫn**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Tài khoản mặc định**: `admin`
- **Mật khẩu mặc định**: `sownbarber2026`

*(Lưu ý: Mật khẩu này được hash và cấu hình tự động thông qua seed script hoặc cấu hình biến môi trường `ADMIN_DEFAULT_PASSWORD`).*

---

## 📁 Cấu Trúc Các Script Thường Dùng

Các lệnh điều khiển chính được định nghĩa trong `package.json`:

- `pnpm dev`: Chạy server phát triển Next.js (hỗ trợ Hot Reload).
- `pnpm build`: Biên dịch ứng dụng Next.js sang bản production (Standalone output).
- `pnpm start`: Khởi chạy ứng dụng production sau khi đã build thành công.
- `pnpm db:generate`: Tạo lại Prisma Client TypeScript.
- `pnpm db:push`: Đồng bộ hóa schema Prisma trực tiếp lên cơ sở dữ liệu mà không tạo file migration.
- `pnpm db:seed`: Chạy file `prisma/seed.ts` để nạp dữ liệu mặc định.
- `pnpm db:studio`: Mở giao diện đồ họa quản lý database của Prisma tại [http://localhost:5555](http://localhost:5555).
