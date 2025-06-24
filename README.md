# Task Management API ✅

A secure and feature-rich **Task Management API** built with **Node.js**, **Express**, and **MongoDB**, designed for real-world task tracking applications.

## Table of Contents
- [Features](#-features)
- [Tech Stack](#-tech-stack--packages)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Configuration](#-configuration)
- [Email Functionality](#-email-with-resend)
- [Testing](#-testing)
- [Contributing](#-contributing)

## 🚀 Features

### Core Functionality
- 🔐 JWT-based user authentication (register/login/logout)
- 📋 Full CRUD operations for tasks
- 📁 File uploads (avatars/task images) with `multer` & `sharp`

### Additional Features
- 📧 Email notifications via Resend
- 🔍 Robust input validation with `validator`
- 🔒 Secure password hashing using `bcrypt`
- 🧪 Comprehensive test suite with Jest & Supertest

## 📦 Tech Stack & Packages

### Core Dependencies
| Package | Purpose |
|---------|---------|
| `express` | API framework |
| `mongoose` | MongoDB ODM |
| `jsonwebtoken` | Authentication |
| `bcrypt` | Password hashing |
| `validator` | Input validation |
| `multer` + `sharp` | File upload & processing |
| `resend` | Email functionality |

### Development Tools
| Package | Purpose |
|---------|---------|
| `nodemon` | Development server |
| `jest` + `supertest` | Testing framework |
| `env-cmd` | Environment management |

## 🛠️ Getting Started

### Prerequisites
- Node.js (v14+ recommended)
- npm or yarn
- MongoDB (Atlas or local instance)

### Installation
```bash
# Clone repository
git clone https://github.com/your-username/task-manager-api.git

# Navigate to project directory
cd task-manager-api

# Install dependencies
npm install

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

