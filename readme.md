# 🚆 IRCTC Booking API

## 📖 Overview
This API provides authentication, train management, and booking functionalities for an IRCTC-like railway system.

---

## ⚙️ Installation & Setup

### **1️⃣ Clone the Repository**
```bash
git clone https://github.com/your-repo.git
cd your-repo
```

### **2️⃣ Install Dependencies**
```bash
npm install bcrypt cookie-parser dotenv express jsonwebtoken nodemon pg sequelize
```

### **3️⃣ Set Up Environment Variables (`.env`)**
Create a `.env` file in the root directory and add:
```env
PORT=5000
SECRET_KEY=your_jwt_secret
DB_HOST=localhost
DB_USER=your_postgres_user
DB_PASSWORD=your_postgres_password
DB_NAME=irctc
ADMIN_API_KEY=your_admin_api_key
```

### **4️⃣ Start the Server**
```bash
npm start  # or nodemon server.js
```

---

## 📌 Dependencies
This project uses the following npm packages:

| Package          | Version  | Description |
|-----------------|----------|-------------|
| **bcrypt**      | ^5.1.1   | Hashes passwords securely. |
| **cookie-parser** | ^1.4.7 | Parses cookies for handling sessions. |
| **dotenv**      | ^16.4.7  | Loads environment variables from a `.env` file. |
| **express**     | ^4.21.2  | Web framework for Node.js. |
| **jsonwebtoken** | ^9.0.2  | Implements JWT authentication. |
| **nodemon**     | ^3.1.9  | Automatically restarts the server on code changes. |
| **pg**          | ^8.13.3  | PostgreSQL client for Node.js. |
| **sequelize**   | ^6.37.5  | ORM for handling PostgreSQL database operations. |

---

## 📌 API Routes

### **🟢 1. Authentication Routes**
#### **📌 Register a User**
- **Endpoint:** `POST /api/register`
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
    "username": "john_doe",
    "password": "securepassword",
    "email": "john@example.com",
    "role": "user"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User registered successfully",
    "user": { "id": 1, "username": "john_doe" }
  }
  ```

#### **📌 Login User**
- **Endpoint:** `POST /api/login`
- **Description:** Logs in a user and returns a JWT token.
- **Request Body:**
  ```json
  {
    "username": "john_doe",
    "password": "securepassword"
  }
  ```
- **Response:**
  ```json
  {
    "message": "Login successful",
    "token": "your_jwt_token"
  }
  ```

---

### **🚉 2. Train Management (Admin Only)**
> **🔒 Requires `x-api-key` in headers (Admin API Key).**

#### **📌 Add a Train**
- **Endpoint:** `POST /api/add`
- **Headers:**
  ```json
  {
    "x-api-key": "your_admin_api_key"
  }
  ```
- **Request Body:**
  ```json
  {
    "train_name": "Rajdhani Express",
    "train_number": "12345",
    "source": "Delhi",
    "destination": "Mumbai",
    "departure_time": "2025-02-20T08:00:00",
    "arrival_time": "2025-02-20T20:00:00",
    "seats_available": 50
  }
  ```
- **Response:**
  ```json
  {
    "message": "Train added successfully",
    "train": { "id": 1, "train_name": "Rajdhani Express" }
  }
  ```

#### **📌 Update Train Details**
- **Endpoint:** `PUT /api/update/:id`
- **Headers:**
  ```json
  {
    "x-api-key": "your_admin_api_key"
  }
  ```
- **Request Body:**
  ```json
  {
    "seats_available": 40
  }
  ```
- **Response:**
  ```json
  {
    "message": "Train updated successfully"
  }
  ```

#### **📌 Check Train Availability**
- **Endpoint:** `GET /api/availability`
- **Response:**
  ```json
  [
    {
      "train_name": "Rajdhani Express",
      "train_number": "12345",
      "seats_available": 40
    }
  ]
  ```

---

## 🎯 **Conclusion**
This API allows **user authentication**, **train management**, and **ticket booking** securely using JWT authentication and admin authorization. 🚆

🚀 **Now, you're ready to test and use this API!** 🎉

