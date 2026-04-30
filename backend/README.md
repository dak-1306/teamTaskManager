# ⚙️ Backend - Team Task Manager

Máy chủ API cho hệ thống Team Task Manager, cung cấp các dịch vụ quản lý người dùng, dự án và công việc một cách bảo mật và hiệu quả.

## 🛠 Công nghệ sử dụng

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB & Mongoose
- **Authentication**: JSON Web Token (JWT), bcryptjs
- **Middleware & Utility**: CORS, dotenv, multer (upload file)
- **Development**: nodemon

## 🚀 Cài đặt và Chạy

**Cài đặt các gói phụ thuộc**
```bash
cd backend
npm install
```

**Chạy môi trường phát triển**
```bash
npm run dev
```

## 📂 Cấu trúc thư mục

```text
backend/
├── src/
│   ├── config/          # Cấu hình kết nối cơ sở dữ liệu (db.js)
│   ├── controllers/     # Xử lý logic API (auth, project, task)
│   ├── middleware/      # Các middleware (auth, upload, error handler)
│   ├── models/          # Mongoose schemas (User, Project, Task)
│   ├── routes/          # Định tuyến API
│   └── app.js           # Khởi tạo ứng dụng Express
├── uploads/             # Thư mục lưu trữ file tĩnh/ảnh
├── index.js             # Điểm vào ứng dụng (Entry point)
├── .env                 # Biến môi trường
└── package.json         # Khai báo thư viện
```

## 🔌 API Endpoints

**Base URL**: `http://localhost:3000`

### 👤 User Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/users` | No | Lấy danh sách tất cả người dùng. |
| GET | `/users/me` | Yes | Lấy thông tin user hiện tại (theo token). |
| POST | `/users/create` | No | Tạo user mới (đăng ký). |
| POST | `/users/login` | No | Đăng nhập, trả về token. |
| PUT | `/users/:id` | Yes | Cập nhật thông tin user. |
| PUT | `/users/:id/password`| Yes | Đổi mật khẩu. |
| DELETE | `/users/:id` | Yes | Xoá user theo ID. |

### 📁 Project Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/projects` | No | Lấy tất cả project. |
| GET | `/projects?name=&date=&status=` | Yes | Lọc project theo các tiêu chí. |
| POST | `/projects/create` | Yes | Tạo project mới. |
| GET | `/projects/search?query=` | Yes | Tìm project theo tên. |
| GET | `/projects/me` | Yes | Lấy project của user hiện tại. |
| GET | `/projects/:id` | Yes | Lấy chi tiết project. |
| PUT | `/projects/:id` | Yes | Cập nhật project. |
| DELETE | `/projects/:id` | Yes | Xoá project. |
| POST | `/projects/:id/members`| Yes | Thêm member vào project. |

### ✅ Task Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/tasks` | No | Lấy tất cả task. |
| GET | `/tasks?status=&priority=&projectId=` | Yes | Lọc task. |
| POST | `/tasks/create` | Yes | Tạo task mới. |
| GET | `/tasks/search?query=` | Yes | Tìm task theo tiêu đề/mô tả. |
| GET | `/tasks/me` | Yes | Lấy task của user hiện tại. |
| GET | `/tasks/projects/:id` | Yes | Lấy các task thuộc project cụ thể. |
| GET | `/tasks/:id` | Yes | Lấy chi tiết task. |
| PUT | `/tasks/:id` | Yes | Cập nhật task. |
| DELETE | `/tasks/:id` | Yes | Xoá task. |
| POST | `/tasks/:id/assignees`| Yes | Gán (assign) user vào task. |
