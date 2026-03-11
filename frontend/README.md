# Frontend

## Giới thiệu

## Công nghệ sử dụng

- React
- React Router dom
- Axios
- Context, Zustand
- Tailwind
- Lucide React

## Cài đặt môi trường

```bash
- cd frontend
- npm install
```

## Chạy project

```bash
- cd frontend
- npm run dev
```

## Cấu trúc thư mục

```
src/
├── app/                         # Cấu hình core của web
│   ├── axios.js                 # Cấu hình axios instance (baseURL, interceptors)
│   ├── providers.jsx            # Các global providers (Context, Theme...)
│   └── router.jsx               # Cấu hình routing của web

├── assets/                      # Tài nguyên tĩnh
│   ├── images/                  # Hình ảnh
│   └── icon/                    # Icon

├── features/                    # Các module chức năng (feature-based structure)

│   ├── auth/                    # Chức năng xác thực
│   │   ├── api/                 # Gọi API liên quan đến auth
│   │   ├── components/          # Components dùng riêng cho auth
│   │   ├── context/             # Auth context / provider
│   │   ├── hooks/               # Custom hooks cho auth
│   │   └── pages/               # Login, Register...

│   ├── dashboard/               # Trang dashboard
│   │   ├── components/
│   │   └── pages/

│   ├── landing/                 # Trang landing page

│   ├── project/                 # Quản lý project
│   │   ├── components/
│   │   ├── pages/
│   │   └── stores/              # State management (Zustand)

│   └── task/                    # Quản lý task
│       ├── components/
│       ├── pages/
│       └── stores/              # State management (Zustand)

├── shared/                      # Thành phần dùng chung toàn app
│   ├── layout/                  # Layout components (Header, Footer, MainLayout)
│   ├── ui/                      # UI components dùng lại (Button, Modal...)
│   └── utils/                   # Helper functions

├── styles/                      # Global styles Css/Tailwind config

├── App.jsx                      # Root component
└── main.jsx                     # Entry point (render React app)
```
