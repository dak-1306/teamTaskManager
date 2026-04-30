# 🎨 Frontend - Team Task Manager

Ứng dụng phía Client của hệ thống Team Task Manager, được xây dựng với React 19 và Vite, mang lại trải nghiệm người dùng nhanh chóng, mượt mà và giao diện hiện đại.

## 🛠 Công nghệ sử dụng

- **Core**: React 19, Vite
- **Routing**: React Router DOM v7
- **Styling & UI**: Tailwind CSS 4, Shadcn UI, Radix UI, Class Variance Authority
- **State Management**: Zustand
- **Data Fetching**: Axios
- **Form & Validation**: React Hook Form, Zod
- **Icons**: Lucide React
- **Animations**: Framer Motion, Tailwind Animate
- **Charts**: Recharts

## 🚀 Cài đặt và Chạy

**Cài đặt các gói phụ thuộc (Dependencies)**
```bash
cd frontend
npm install
```

**Chạy môi trường phát triển (Development server)**
```bash
npm run dev
```

## 📂 Cấu trúc thư mục (`src/`)

```text
src/
├── app/                         # Cấu hình lõi (Axios instance, Providers, Router)
├── assets/                      # Tài nguyên tĩnh (Images, Icons)
├── features/                    # Các module tính năng (Feature-based structure)
│   ├── auth/                    # Chức năng xác thực (Login, Register...)
│   ├── dashboard/               # Bảng điều khiển tổng quan
│   ├── landing/                 # Trang Landing giới thiệu
│   ├── project/                 # Quản lý dự án
│   └── task/                    # Quản lý công việc
├── shared/                      # Các thành phần dùng chung toàn cục
│   ├── layout/                  # Layout (Header, Sidebar, MainLayout)
│   ├── ui/                      # Các UI components tái sử dụng (Shadcn UI)
│   └── utils/                   # Các hàm tiện ích (Helpers)
├── styles/                      # CSS toàn cục / Tailwind Config
├── App.jsx                      # Component gốc
└── main.jsx                     # Entry point
```
*Lưu ý: Bên trong mỗi tính năng (`features/`), mã nguồn được chia nhỏ thành `api/`, `components/`, `context/`, `hooks/`, `pages/`, `stores/`... giúp dự án dễ bảo trì và mở rộng.*
