# 🏢 Apartment Management System (Backend)

## 📌 Overview

Hệ thống quản lý ký túc xá / chung cư, hỗ trợ quản lý phòng, cư dân, hóa đơn và yêu cầu bảo trì/sửa chữa khi thiết bị hỏng, hư hại.

---

## 🚀 Tech Stack

* **Node.js** (Backend)
* **Prisma ORM**
* **PostgreSQL**
* **Docker** (optional)
* **GitHub Actions** (CI/CD - planned)
* **Render** (Deployment - planned)

---

## 🎯 Core Features (Current)

### 🔐 Authentication & Authorization

* Đăng ký / đăng nhập
* Phân quyền:

  * ADMIN
  * MANAGER
  * RESIDENT

---

### 🏠 Room Management

* Tạo / cập nhật / xóa phòng
* Xem danh sách phòng
* Quản lý sức chứa (`capacity`, `currentOccupancy`)
* Trạng thái phòng: AVAILABLE / FULL / MAINTENANCE

---

### 👥 Resident Management

* Gán user vào phòng
* Xóa user khỏi phòng
* Quan hệ 1 phòng - nhiều user

---

### 💸 Billing

* Tạo hóa đơn theo phòng
* Các loại:

  * ELECTRIC
  * WATER
  * RENT
* Trạng thái:

  * PAID / UNPAID

---

### 🛠️ Maintenance Request

* User gửi yêu cầu sửa chữa
* Trạng thái:

  * PENDING → ACCEPTED → IN_PROGRESS → DONE
* Liên kết với:

  * Room
  * User

---

### 🧾 Audit Log

* Lưu lịch sử thay đổi
* Có `oldData` và `newData` dạng JSON

---

## 🧱 Database Design

### Entities chính

* `User`
* `Room`
* `Bill`
* `MaintenanceRequest`
* `AuditLog`

### Điểm đáng chú ý

* Soft delete: `deletedAt`
* Tự động update time: `updatedAt`
* Index:

  * `status`
  * `roomId`
  * `deletedAt`
* Quan hệ:

  * Room - User (1-N)
  * Room - Bill (1-N)
  * Room - MaintenanceRequest (1-N)
  * User - AuditLog (1-N)

---

## ⚙️ Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Setup environment

```env
DATABASE_URL="postgresql://user:password@localhost:5432/apartment_db"
```

---

### 3. Prisma

Init:

```bash
npx prisma init
```

Generate client:

```bash
npx prisma generate
```

Migration:

```bash
npx prisma migrate dev --name init
```

---

### 4. Run server

```bash
npm run start:dev
```
