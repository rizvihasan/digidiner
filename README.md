# digidiner - Restaurant Ordering App

A full-stack application for browsing a restaurant menu and placing orders. Built with React, Node.js, Express, MongoDB, and PostgreSQL.

## Features

*   Browse restaurant menu categorized by sections.
*   Add/remove items to/from a shopping cart.
*   View cart details and total price.
*   Checkout and place an order with customer details.
*   (Optional) View past orders.

## Tech Stack

*   **Frontend:** React, TypeScript, Vite, Tailwind CSS, Shadcn/UI
*   **Backend (Node.js):** Node.js, Express, Mongoose (for MongoDB), pg (for PostgreSQL)
*   **Databases:**
    *   MongoDB Atlas (for Menu Items)
    *   PostgreSQL (Neon DB) (for Orders)

## Backend Setup (Local)

1.  **Navigate to the backend directory:**
    ```bash
    cd server
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create Environment File:**
    Create a `.env` file in the `server/` directory and add your database connection strings:
    ```dotenv
    # .env file in server/ directory
    PORT=5001 # Or another port if 5001 is taken
    MONGO_URI=<Your MongoDB Atlas connection string>
    PG_DATABASE_URL=<Your Neon DB PostgreSQL connection string>
    ```
    *   Replace placeholders with your actual connection strings from MongoDB Atlas and Neon DB.
4.  **Run the server:**
    ```bash
    npm start
    ```
    The backend API should now be running, typically on `http://localhost:5001`.

## Backend Deployment (Production)

* Deploy your backend (Node.js/Express) to a platform like Render, Fly.io, or Railway.
* Set the following environment variables in your deployment platform:
  - `MONGO_URI`
  - `PG_DATABASE_URL`
  - `PORT` (if required by your platform)
* After deployment, update the CORS `origin` in `server/server.js` to include your actual Netlify URL.
* **Backend deployed at:** https://digidiner-backend.onrender.com

## Database Justification (MongoDB vs. PostgreSQL)

This project utilizes a hybrid database approach to leverage the strengths of both MongoDB and PostgreSQL:

*   **MongoDB (for Menu Items):**
    *   **Flexibility:** Menu structures can change frequently (new items, categories, options, pricing). MongoDB's schema-less nature allows for easy updates and variations in menu item data without requiring rigid schema migrations.
    *   **Read Performance:** Well-suited for read-heavy operations like fetching the entire menu or specific categories quickly.
*   **PostgreSQL (for Orders):**
    *   **Data Integrity & Transactions:** Order processing requires high data integrity and atomicity. PostgreSQL's ACID compliance ensures that order creation (inserting order details and associated items) happens reliably as a single transaction. If any part fails, the entire transaction is rolled back, preventing inconsistent data.
    *   **Relational Data:** Order data is inherently relational (orders have customers, orders have multiple items). PostgreSQL excels at managing these relationships and enforcing constraints (e.g., foreign keys).
    *   **Structured Queries:** Complex queries involving order history, customer lookups, or reporting are often easier and more performant with SQL.

## API Endpoints (Node.js Backend)

*   `GET /api/menu`: Fetches all menu items.
*   `GET /api/menu/:id`: Fetches a single menu item by ID.
*   `POST /api/orders`: Creates a new order. Expects customer details and items in the request body.
*   `GET /api/orders/lookup?phone=<phone_number>`: Fetches orders associated with a specific phone number.
*   `GET /api/orders/lookup?email=<email_address>`: Fetches orders associated with a specific email address.

## Frontend Setup (Local)

1.  **Navigate to the project root directory:**
    ```bash
    cd .. 
    ``` 
    (If you are in the `server` directory)
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Create Environment File:**
    Ensure you have a `.env` file in the project root (`digidiner/`) with the backend API URL:
    ```dotenv
    # .env file in project root
    VITE_API_BASE_URL=http://localhost:5001/api 
    ```
4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The frontend should be accessible at `http://localhost:5173` (or another port if 5173 is busy).

## Frontend Deployment (Netlify)

* Deploy your frontend to Netlify.
* In Netlify site settings, set the environment variable:
  - `VITE_API_BASE_URL` = `https://<your-backend-deployment-url>/api`
* **Frontend deployed at:** [Add your Netlify link here once deployed]

## Assumptions & Challenges

* The backend and frontend are deployed separately; CORS must be configured to allow the Netlify domain.
* The backend must be running and accessible for the frontend to function in production.
* Menu data is seeded using `server/seeder.js`.
* PostgreSQL schema must be created before running the backend (see `orderRoutes.js` for table structure).
* (Add any additional assumptions or challenges you faced here)

---

**Checklist Before Deployment:**
- [x] CORS restricted to Netlify and localhost in `server/server.js`
- [x] All environment variables documented
- [x] API endpoints listed
- [x] README includes deployment instructions and links
- [x] All code committed and pushed to GitHub

---

**After deployment, test the full flow (menu, cart, order, order history) on your live URLs!**

