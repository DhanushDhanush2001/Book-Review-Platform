# 📚 Book Review Platform

A full-stack web application built using the **MERN** stack (MongoDB, Express, React, Node.js) that allows users to browse books, write reviews, and rate them. Admin users can manage the book collection, while regular users can sign up, log in, and manage their profiles.

---

## 🚀 Features

- 🔐 **User Authentication**  
  Sign up, log in, and log out with secure JWT-based authentication.

- 📚 **Book Browsing**  
  Paginated list of books with detailed information and user reviews.

- ✍️ **Review System**  
  Users can submit reviews and ratings for individual books.

- 👤 **Profile Management**  
  Users can view and update their personal information.

- 🛠 **Admin Features**  
  Admins can add new books using a dedicated form interface.

- 📱 **Responsive Design**  
  Mobile-friendly bottom navigation and desktop sidebar built with Tailwind CSS and Lucide Icons.

- ⚠️ **Error Handling**  
  Graceful error feedback for users and basic logging for API responses.

---

## 🛠 Tech Stack

### 🔹 Frontend

- React (Vite)
- Redux Toolkit – State Management
- React Router – Routing
- Tailwind CSS – Utility-first CSS Framework
- Lucide React – Icon Library
- React Hot Toast – Notifications

### 🔸 Backend

- Node.js with Express – API Server
- MongoDB with Mongoose – NoSQL Database
- JWT – JSON Web Token Authentication
- Joi – Data Validation

### 🧰 Tools

- Axios – HTTP Client
- Nodemon – Development Server

---

## 🧪 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/book-review-platform.git
cd book-review-platform

### 2. Install Dependencies
```bash
frontend
cd client
npm install

```bash
cd backend
npm install

### 3. Environment Variables
```bash
Create a .env file in the /backend directory with the following keys:
PORT=your_port_number
NODE_ENV=your_node_environment
DB_LOCAL_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret_key
JWT_EXPIRES_TIME=your_jwt_expiry_time
COOKIES_EXPIRES_TIME=your_cookie_expiry_time


