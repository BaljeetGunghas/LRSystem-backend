# 📚 Library Reservation Backend API

A Node.js + Express backend for a book reservation system that allows users to register, login, browse books, reserve books for 3 days, and manage their reservations.

> 🔗 **Live Frontend**: [https://liberary.netlify.app/](https://liberary.netlify.app/)

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- TypeScript
- JWT for Authentication
- Cookie-based session
- RESTful API design

---

## 🚀 Features

- ✅ User registration & login (JWT + cookies)
- ✅ View books with search & pagination
- ✅ Reserve a book for 3 days (auto-expiry handled)
- ✅ Cancel reservation
- ✅ Persistent reservation history
- ✅ Admin control to mark book availability (optional)

---

## 🧩 Folder Structure

```
project-root/
├── controllers/
│ ├── authController.ts
│ ├── bookController.ts
│ └── reservationController.ts
├── models/
│ ├── User.ts
│ ├── Book.ts
│ └── Reservation.ts
├── routes/
│ ├── authRoutes.ts
│ ├── bookRoutes.ts
│ └── reservationRoutes.ts
├── middleware/
│ └── authMiddleware.ts
├── config/
│ └── db.ts
├── server.ts
├── tsconfig.json
├── .env
├── package.json
└── README.md
```


---

## 🧪 API Endpoints

### 🔐 Auth
| Method | Route           | Description         |
|--------|------------------|---------------------|
| POST   | `/auth/register` | Register new user   |
| POST   | `/auth/login`    | Login user          |
| GET    | `/auth/logout`   | Logout user         |

### 📚 Books
| Method | Route        | Description                     |
|--------|--------------|---------------------------------|
| GET    | `/books`     | Get all books (search + pagination) |
| PATCH  | `/books/:id` | Update book availability (optional) |

### 🗓️ Reservations
| Method | Route               | Description               |
|--------|---------------------|---------------------------|
| POST   | `/reservations`     | Reserve a book            |
| GET    | `/reservations`     | Get all user reservations |
| DELETE | `/reservations/:id` | Cancel a reservation      |

---

## 📦 Installation & Setup

```bash
# 1. Clone the repo
git clone https://github.com/yourusername/library-backend.git
cd library-backend

# 2. Install dependencies
npm install

# 3. Create .env file
touch .env
```

## .env file content:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/library
JWT_SECRET=your_secret_key
```

# 4. Build the project
>npm run build

# 5. Start server
>npm start

---

# 🔁 Sample API Usage
## Reserve a Book
```
POST /reservations
Content-Type: application/json
Cookie: token=jwt_token

{
  "bookId": "685d8eff58a86b0cd4c648f5"
}
```

## Cancel Reservation
```
DELETE /reservations/686032ae54524a1e732c48d3
Cookie: token=jwt_token
```
---

# 🧾 License

This project is licensed under the MIT License.

---


# 💡 Author
### Made with ❤️ by Baljeet Gunghas

#### 👨‍💻 Developer Info

- 📞 **Phone**: +91-8685070017  
- 📧 **Email**: [baljeetgunghas5@gmail.com](mailto:baljeetgunghas5@gmail.com)  
- 📍 **Location**: New Delhi, India  
- 💼 **Portfolio**: [baljeetgunghasportfolio.netlify.app](https://baljeetgunghasportfolio.netlify.app/)  
- 🐙 **GitHub**: [BaljeetGunghas](https://github.com/BaljeetGunghas)  
- 💼 **LinkedIn**: [dev-baljeet-gunghas](https://www.linkedin.com/in/dev-baljeet-gunghas-b6698421b/)  
- 📸 **Instagram**: [baljeet_gunghas2](https://www.instagram.com/baljeet_gunghas2/)

---
