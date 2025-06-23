# ✅ Task Management API

A secure and feature-rich **Task Management API** built with **Node.js**, **Express**, and **MongoDB**.  
This API supports user authentication, task CRUD operations, file upload, and email functionality — making it suitable for real-world task tracking apps.

---

## 🚀 Features

- 🔐 User authentication with JWT (register/login/logout)
- 📋 Task CRUD operations (Create, Read, Update, Delete)
- 📁 File uploads (avatar/image) using `multer` & `sharp`
- 📧 Email sending via Resend
- 🔍 Input validation using `validator`
- 🔒 Password hashing with `bcrypt`
- 🧪 Unit & Integration testing using Jest & Supertest

---

## 📦 Tech Stack & NPM Packages Used

### 👉 Core:
- [`express`](https://www.npmjs.com/package/express) – API framework
- [`mongoose`](https://www.npmjs.com/package/mongoose) – MongoDB ODM
- [`mongodb`](https://www.npmjs.com/package/mongodb) – MongoDB driver
- [`dotenv`](https://www.npmjs.com/package/dotenv) – Load env variables
- [`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken) – Auth
- [`bcrypt`](https://www.npmjs.com/package/bcrypt) – Password hashing
- [`validator`](https://www.npmjs.com/package/validator) – Input validation
- [`multer`](https://www.npmjs.com/package/multer) – File upload
- [`sharp`](https://www.npmjs.com/package/sharp) – Image processing
- [`resend`](https://www.npmjs.com/package/resend) – Email sending
- [`env-cmd`](https://www.npmjs.com/package/env-cmd) – Manage multiple env files

### 🧪 Dev Dependencies:
- [`nodemon`](https://www.npmjs.com/package/nodemon) – Auto-reload in dev
- [`jest`](https://www.npmjs.com/package/jest) – Testing framework
- [`supertest`](https://www.npmjs.com/package/supertest) – HTTP test requests

---

## 🛠️ Getting Started

### ✅ Prerequisites

- Node.js and npm installed
- MongoDB Atlas or local MongoDB running

---

## 🚚 Installation

```bash
git clone https://github.com/your-username/task-manager-api.git
cd task-manager-api
npm install
```
---

## 🔐 Environment Variables
```bash
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
RESEND_API_KEY=your_resend_key
```
---

## 📬 Email with Resend
- The API uses resend to send transactional emails like welcome messages.

- Set your RESEND_API_KEY properly in .env.

---

## 🤝 Contributing
Contributions are welcome!

