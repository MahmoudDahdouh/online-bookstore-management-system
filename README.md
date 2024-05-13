# 📚 Online Bookstore Management System

This project is a TypeScript application featuring database models implemented using Sequelize, a promise-based Node.js ORM.

## 📋 Table of Contents

- [Introduction](#📜-introduction)
- [Setup](#🛠️-setup)
- [Database](#📦-database)
- [Features](#🚀-features)
- [Technologies](#💻-technologies)
- [Contributing](#🤝-contributing)
- [License](#📄-license)

## 📜 Introduction

The application is a simple online bookstore management system that allows users to browse books, add them to their cart, and place orders.

## 🛠️ Setup

To get started with this project, follow these steps:

1. **Clone the repository:**  
   Run the following command to clone the repository to your local machine:

   ```bash
   git clone https://github.com/MahmoudDahdouh/online-bookstore-management-system.git
   ```

2. **Install dependencies:**  
   Navigate to the project directory and run the following command to install the project dependencies:

   ```bash
   npm install
   ```

3. **Configure `.env` file:**  
   Create a `.env` file, then add the necessary variable, you can take a look at `.env.sample` file

4. **Run the application at `dev` environment**
   ```bash
   npm run dev
   ```
5. **Sync database**

   ```bash
   npm run db:sync
   ```

6. **Seed the database with dummy data**
   ```bash
   npm run db:seed
   ```

## 📦 Database

The application consists of 4 tables
| Model | Description |
|-----------|--------------------------------------------------|
| User | Represents a user with login credentials. |
| Book | Represents a book with detailed information. |
| Order | Represents an order placed by a user. |
| OrderItem | Represents an item within an order. |

![Database Schema](https://i.imgur.com/sNEuTO3.png)

## 🚀 Features

- 📝 **Register:** Login by email and password or Create a new account.
- 🔍 **Search:** Easily find books by title, author, or genre.
- 🛒 **Cart:** Add, update, and remove books.
- 📊 **Admin Dashboard:** Add new books.
- 📜 **Order History:** View past orders and order details.
- 📱 **Responsive Design:** Works on all devices.

## 💻 Technologies

- 🌐 **Frontend**: HTML, CSS, JavaScript, EJS
- 🖥️ **Backend**: Node.js, Express.js with TypeScript
- 📦 **Database**: MySQL
- 🛠️ **ORM**: Sequelize
- 🎨 **UI Framework**: Bootstrap 5
- 🔒 **Authentication**: JWT
- 🍪 **Session Management**: Express-session
- ✅ **Validation**: Yup
- 🚀 **Deployment**: AWS

## 🤝 Contributing

Contributions are welcome! Feel free to fork the repository, create a new branch, and submit a pull request.

## 📄 License

This project is licensed under the MIT License.
