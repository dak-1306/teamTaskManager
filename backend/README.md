# BACKEND 
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
│   │   ├── auth.middleware.js
│   │   └── error.middleware.js
│   │
│   ├── utils/
│   │   └── generateToken.js
│   │
│   └── app.js
│
├── server.js
├── .env
├── package.json
```