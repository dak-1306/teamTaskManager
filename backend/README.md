# BACKEND

## Công nghệ sử dụng

- bcryptjs
- cors
- dotenv
- Node
- MongoDb
- express
- jsonwebtoken
- mongoose
- nodemon

## Cài đặt môi trường
```bash
- cd backend
- npm install
```
## Chạy project
```bash
- cd backend
- npm run dev
```
## API

Base URL: http://localhost:3000

### User endpoints

GET /users

- Auth: No
- Description: Lấy danh sách tất cả người dùng.

GET /users/me

- Auth: Yes
- Description: Lấy thông tin user hiện tại (theo token).

POST /users/create

- Auth: No
- Body (JSON)

```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

- Description: Tạo user mới (đăng ký).

POST /users/login

- Auth: No
- Body (JSON)

```json
{
  "email": "string",
  "password": "string"
}
```

- Description: Đăng nhập, trả về token.

PUT /users/:id

- Auth: Yes
- Body (JSON)

```json
{
  "name": "string",
  "email": "string"
}
```

- Description: Cập nhật user theo id.

PUT /users/:id/password

- Auth: Yes
- Body (JSON)

```json
{
  "currentPassword": "string",
  "newPassword": "string"
}
```

- Description: Đổi mật khẩu user.

DELETE /users/:id

- Auth: Yes
- Description: Xoá user theo id.

### Project Endpoints

GET /projects

- Auth: No
- Description: Lấy tất cả project.

GET /projects (filter variant)

- Auth: Yes
- Query Params:name, date, status
- Description: Lọc project theo tên / ngày / trạng thái.

POST /projects/create

- Auth: Yes

- Body (JSON)

```json
{
  "name": "string",
  "description": "string"
}
```

Description: Tạo project mới.

GET /projects/search

- Auth: Yes

- Query Params: query

- Description: Tìm project theo tên.

GET /projects/me

- Auth: Yes

- Description: Lấy project thuộc user hiện tại (owned + member).

GET /projects/:id

- Auth: Yes

- Description: Lấy chi tiết project theo id.

PUT /projects/:id

- Auth: Yes

- Body (JSON)

```json
{
  "fieldsToUpdate": "..."
}
```

- Description: Cập nhật project.

DELETE /projects/:id

- Auth: Yes

- Description: Xoá project.

POST /projects/:id/members

- Auth: Yes

- Body (JSON)

```json
{
  "memberEmail": "string"
}
```

- Description: Thêm member vào project.

### Task Endpoints

GET /tasks

- Auth: No

- Description: Lấy tất cả task.

GET /tasks (filter variant)

- Auth: Yes

- Query Params

```
status
priority
projectId
date
```

- Description: Lọc task theo status / priority / sort-by-date.

POST /tasks/create

- Auth: Yes

- Body (JSON)

```json
{
  "title": "string",
  "description": "string",
  "dueDate": "date",
  "priority": "string",
  "assignedTo": "string",
  "projectId": "string"
}
```

- Description: Tạo task mới.

GET /tasks/search

- Auth: Yes

- Query Params

```
query
projectId
```

- Description: Tìm task theo tiêu đề hoặc mô tả.

GET /tasks/me

- Auth: Yes

- Description: Lấy task của user hiện tại.

GET /tasks/projects/:id

- Auth: Yes

- Description: Lấy các task thuộc project.

GET /tasks/:id

- Auth: Yes

- Description: Lấy chi tiết task theo id.

PUT /tasks/:id

- Auth: Yes

- Body (JSON)

```json
{
  "fieldsToUpdate": "..."
}
```

- Description: Cập nhật task.

DELETE /tasks/:id

- Auth: Yes

- Description: Xoá task.

POST /tasks/:id/assignees

- Auth: Yes

- Body (JSON)

```json
{
  "email": "string"
}
```

- Description: Thêm assignee vào task.

## Cấu trúc thư mục

```
backend/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │   ├── project.model.js
│   │   └── task.model.js
│   │
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── project.controller.js
│   │   └── task.controller.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── project.routes.js
│   │   └── task.routes.js
│   │
│   ├── middleware/
│   │   └── auth.middleware.js
│   │
│   └── app.js
│
├── index.js
├── .env
├── package.json
```
