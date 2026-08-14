# 🔐 PassOP - Password Manager

PassOP is a full-stack password manager that allows users to securely manage their website credentials in one place.

The application provides user authentication and ensures that each user can access only their own saved passwords.

---

## 🚀 Features

### 🔑 Authentication
- User registration
- User login
- JWT-based authentication
- Password hashing using bcrypt
- HTTP-only cookie-based authentication
- Protected backend routes

### 🔐 Password Management
- Add new passwords
- View saved passwords
- Edit existing passwords
- Delete passwords
- Copy username, password and website URL
- Password visibility toggle
- User-specific password storage

### 👤 User Isolation
- Each password is associated with a specific user
- Authenticated users can only access their own passwords
- Update and delete operations verify the logged-in user's ownership

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
- JavaScript

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- CORS
- Cookie Parser

---

## 🏗️ Project Structure

```text
password-manager/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── password.controller.js
│   │   │
│   │   ├── db/
│   │   │   └── db.js
│   │   │
│   │   ├── middleware/
│   │   │   └── auth.middleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── password.model.js
│   │   │   └── user.model.js
│   │   │
│   │   └── routes/
│   │       └── auth.routes.js
│   │
│   ├── package.json
│   └── server.js
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── footer.jsx
│   │   ├── login.jsx
│   │   ├── manager.jsx
│   │   ├── navbar.jsx
│   │   └── register.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── package.json
├── README.md
└── vite.config.js

# 🔐 PassOP - Password Manager

PassOP is a full-stack password manager that allows users to securely manage their website credentials in one place.

The application provides user authentication and ensures that each user can access only their own saved passwords.

---

## 🚀 Features

### 🔑 Authentication
- User registration
- User login
- JWT-based authentication
- Password hashing using bcrypt
- HTTP-only cookie-based authentication
- Protected backend routes

### 🔐 Password Management
- Add new passwords
- View saved passwords
- Edit existing passwords
- Delete passwords
- Copy username, password and website URL
- Password visibility toggle
- User-specific password storage

### 👤 User Isolation
- Each password is associated with a specific user
- Authenticated users can only access their own passwords
- Update and delete operations verify the logged-in user's ownership

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- React Router
- JavaScript

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- CORS
- Cookie Parser

---

## 🏗️ Project Structure

```text
password-manager/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   └── password.controller.js
│   │   │
│   │   ├── db/
│   │   │   └── db.js
│   │   │
│   │   ├── middleware/
│   │   │   └── auth.middleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── password.model.js
│   │   │   └── user.model.js
│   │   │
│   │   └── routes/
│   │       └── auth.routes.js
│   │
│   ├── package.json
│   └── server.js
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── footer.jsx
│   │   ├── login.jsx
│   │   ├── manager.jsx
│   │   ├── navbar.jsx
│   │   └── register.jsx
│   │
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
│
├── .gitignore
├── package.json
├── README.md
└── vite.config.js

