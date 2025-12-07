Vehicle Rental System

🔗 Live URL: (https://assignment-2-wheat-two.vercel.app/)
🔗 GitHub Repository: https://github.com/mdrasel97/b6a2-Vehicle-Rental-System

🚗 Project Overview

The Vehicle Rental System Backend is a modular, scalable, and secure REST API built using TypeScript, Node.js, Express, and MVC Architecture.
It manages vehicles, bookings, users, and admin operations in a clean and maintainable code structure.

⭐ Features
🔐 Authentication & Authorization

JWT-based authentication

Role-based access control (Admin / Customer)

🚘 Vehicle Management

Add, update, delete vehicles

Prevent deleting vehicles with active bookings

Image & details handling

📅 Booking System

Create and manage bookings

Check availability

Prevent overlapping bookings

👨‍💼 User Management

Register, login

Separate user and admin access

⚙️ Admin Features

Manage all vehicles

Manage all users

Manage bookings

📡 API Response Format

Unified sendResponse() utility

Consistent error handling

Global error handler with Zod validation

🔧 Built-in Best Practices

Environment variable configuration with dotenv

ESLint + Prettier formatting

TypeScript strict mode

Layered architecture (MVC + Services)

🧰 Technology Stack
Backend

Node.js

Express.js

TypeScript

PostgreSQL / MongoDB / pg

JWT (Authentication)

Bcrypt (Password hashing)
