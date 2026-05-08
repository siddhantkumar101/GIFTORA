# Giftora Studio

Giftora Studio is a MERN stack custom gifting platform for personalized mugs, T-shirts, phone covers, and photo frames.

## Stack

- MongoDB + Mongoose for products, users, and orders
- Express + Node.js API server
- React + Vite frontend
- Tailwind CSS styling

## Run Locally

```bash
npm run install:all
npm run dev
```

Frontend: http://localhost:5173
Backend: http://localhost:5000

MongoDB is optional for local demo mode. If `MONGODB_URI` is missing or MongoDB is not running, the Express server uses in-memory seeded data so the website still works end to end.

## Backend Env

Create `server/.env` from `server/.env.example` when you want real MongoDB persistence.

## Included Flows

- Product catalog
- Image upload and live product preview
- Custom text, color, style, and quantity controls
- Add to cart and checkout
- Mock secure payment confirmation
- Order tracking
- User profile and saved delivery address
- Admin dashboard for products, pricing, order status, and analytics
