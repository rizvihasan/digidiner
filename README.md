# digidiner - Restaurant Ordering App

Welcome to digidiner! This is a full-stack web app I built to help restaurants like "The Digital Diner" offer a smooth online menu and pickup ordering experience. The project uses React (Vite, TypeScript, Tailwind) for the frontend, Node.js/Express for the backend, and leverages both MongoDB and PostgreSQL for data storage.

## Features

- Browse a categorized menu (starters, mains, desserts, drinks, etc.)
- Add and remove items from a shopping cart
- See your cart total and details
- Place an order with your name and phone number (no payment required)
- Get an order confirmation and look up past orders by phone or email

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend:** Node.js, Express, Mongoose (MongoDB), pg (PostgreSQL)
- **Databases:**
  - MongoDB Atlas (menu items)
  - Neon DB PostgreSQL (orders)

## Why Both MongoDB and PostgreSQL?

I chose MongoDB for menu items because restaurant menus can change a lot—new categories, specials, or item options. MongoDB's flexible schema makes this easy. For orders, I wanted strong data integrity and the ability to do relational queries (like order history by customer), so PostgreSQL was the best fit.

## How to Run Locally

### Backend (Node.js/Express)
1. Go to the backend folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `server/` with your database URIs:
   ```dotenv
   PORT=5001
   MONGO_URI=your-mongodb-uri
   PG_DATABASE_URL=your-postgres-uri
   ```
4. Start the backend:
   ```bash
   npm start
   ```
   The API will run on `http://localhost:5001`.

### Frontend (React)
1. Go to the project root (if not already there):
   ```bash
   cd ..
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root with:
   ```dotenv
   VITE_API_BASE_URL=http://localhost:5001/api
   ```
4. Start the frontend:
   ```bash
   npm run dev
   ```
   The app will be at `http://localhost:5173`.

## API Endpoints

- `GET /api/menu` — Get all menu items
- `GET /api/menu/:id` — Get a single menu item
- `POST /api/orders` — Place a new order
- `GET /api/orders/lookup?phone=...` — Get orders by phone
- `GET /api/orders/lookup?email=...` — Get orders by email

## Deployment

- **Backend:** [https://digidiner-backend.onrender.com](https://digidiner-backend.onrender.com)
- **Frontend:** [Add your Netlify link here once deployed]

If you deploy your own version, make sure to set the `VITE_API_BASE_URL` in Netlify to your backend's `/api` endpoint, and update CORS in the backend to allow your Netlify domain.

## Assumptions & Challenges

- The backend and frontend are deployed separately, so CORS must be set up right.
- Menu data is seeded using `server/seeder.js`.
- PostgreSQL tables must exist before running the backend (see `orderRoutes.js` for structure).
- No authentication—order lookup is by phone/email only.
- I focused on clean code, clear separation of concerns, and a smooth user experience.

---

**Thanks for checking out digidiner! If you have questions or want to contribute, feel free to open an issue or PR.**

