# Team task manager
## Cấu trúc thư mục
**Feature-Based Architecture**
```
src/
│
├── app/                      # Cấu hình gốc
│   ├── store.js
│   ├── router.jsx
│   └── axios.js
│
├── assets/                   # Hình ảnh, icon, svg
│   ├── images/
│   └── icons/
│
├── components/               # Component dùng chung
│   │
│   ├── ui/                   # Component thuần UI
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   ├── Select.jsx
│   │   ├── Spinner.jsx
│   │   └── Badge.jsx
│   │
│   ├── layout/               # Layout tổng thể
│   │   ├── MainLayout.jsx
│   │   ├── AuthLayout.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   │
│   ├── common/               # Component tái sử dụng logic
│   │   ├── ProtectedRoute.jsx
│   │   ├── Pagination.jsx
│   │   └── ConfirmDialog.jsx
│   │
│   └── task/                 # Component riêng cho task
│       ├── TaskCard.jsx
│       ├── TaskForm.jsx
│       ├── TaskFilter.jsx
│       └── TaskDetailModal.jsx
│
├── features/                 # Tách theo domain (quan trọng)
│   │
│   ├── auth/
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── authSlice.js      # nếu dùng Redux
│   │   ├── authAPI.js
│   │   └── useAuth.js
│   │
│   ├── project/
│   │   ├── pages/
│   │   │   ├── ProjectList.jsx
│   │   │   └── ProjectDetail.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── projectAPI.js
│   │   └── useProject.js
│   │
│   ├── task/
│   │   ├── pages/
│   │   │   └── Board.jsx
│   │   ├── KanbanColumn.jsx
│   │   ├── taskAPI.js
│   │   └── useTask.js
│   │
│   └── dashboard/
│       ├── Dashboard.jsx
│       └── StatsCard.jsx
│
├── context/                  # Global context
│   ├── AuthContext.jsx
│   ├── ThemeContext.jsx
│   └── ProjectContext.jsx
│
├── hooks/                    # Custom hooks
│   ├── useDebounce.js
│   ├── useLocalStorage.js
│   ├── usePagination.js
│   └── useToggle.js
│
├── services/                 # Gọi API tập trung
│   ├── authService.js
│   ├── projectService.js
│   └── taskService.js
│
├── utils/                    # Hàm tiện ích
│   ├── constants.js
│   ├── formatDate.js
│   ├── validate.js
│   └── role.js
│
├── styles/
│   ├── index.css
│   └── tailwind.css
│
├── App.jsx
├── main.jsx
└── index.css
```