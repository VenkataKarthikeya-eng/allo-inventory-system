   # Inventory Reservation System

A full-stack Inventory Reservation System built using Next.js, Prisma ORM, PostgreSQL (Neon), and Vercel deployment.

This project supports:
- Product management
- Warehouse inventory tracking
- Reservation checkout flow
- Reservation expiry handling
- Concurrency-safe stock reservation
- Real-time inventory updates
- Responsive dashboard UI
- Cloud database integration

---

# Tech Stack

Frontend:
- Next.js 16
- React
- Tailwind CSS

Backend:
- Next.js API Routes
- Prisma ORM

Database:
- PostgreSQL (Neon)

Deployment:
- Vercel

---

# Features

## Product Management
- Add products
- Update products
- Delete products
- Search products

## Warehouse Inventory
- Multiple warehouse support
- Available stock tracking
- Reserved stock tracking
- Low stock indicators

## Reservation System
- Reserve products
- Reservation checkout page
- Reservation confirmation
- Reservation cancellation
- Reservation expiry timer
- Automatic reservation release

## Dashboard Analytics
- Total products
- Total stock
- Available stock
- Low stock products
- Warehouse count

---

# Project Structure

```bash
src/
 ├── app/
 │    ├── api/
 │    │    ├── products/
 │    │    ├── reservations/
 │    │    └── warehouses/
 │    ├── checkout/
 │    ├── dashboard/
 │    └── products/
 │
 ├── components/
 │    └── ProductCard.tsx
 │
 └── lib/
      └── prisma.ts 

Environment Variables

Create a .env file in the project root.

Add:

DATABASE_URL="your_neon_database_url"

Example:

DATABASE_URL="postgresql://username:password@host.neon.tech/neondb?sslmode=require"
How To Run Locally
1. Clone Repository
git clone https://github.com/VenkataKarthikeya-eng/allo-inventory-system
2. Open Project
cd allo-inventory-system
3. Install Dependencies
npm install
4. Generate Prisma Client
npx prisma generate
5. Push Database Schema
npx prisma db push
6. Seed Database
npx tsx prisma/seed.ts

This inserts:

Sample products
Sample warehouses
Sample inventory stock
7. Run Development Server
npm run dev

Open:

http://localhost:3000
Production Build

To test production build locally:

npm run build
Deployment Process
GitHub Deployment

Initialize Git:

git init

Push code:

git add .
git commit -m "initial commit"
git push
Vercel Deployment

Deploy using:

vercel --prod
Reservation Expiry Mechanism

The reservation system uses an expiry-based inventory locking mechanism.

How It Works
User clicks "Reserve"
Reservation record is created
Reserved stock increases
Available stock decreases
Reservation expires after 10 minutes if not confirmed
Expiry Flow

Each reservation contains:

expiresAt

When checkout page loads:

API checks reservation expiry
Expired reservations automatically release stock
Reservation status changes to:
RELEASED
CONFIRMED
PENDING
Auto Release Logic

If reservation expires:

reservedStock -= quantity
availableStock += quantity

This prevents inventory deadlocks.

Concurrency Safe Logic

Prisma transactions are used to prevent overselling.

The system checks stock availability before reservation creation.

If stock is insufficient:

409 Conflict

is returned.

This ensures:

No negative stock
No duplicate inventory allocation
Safe concurrent reservations
Error Handling
409 Error

Occurs when:

Not enough stock available
410 Error

Occurs when:

Reservation expired
404 Error

Occurs when:

Reservation not found
UI Features
Responsive design
Product cards
Search functionality
Dashboard analytics
Status badges
Reservation countdown timer
Toast notifications
Professional layout
API Routes
Products
/api/products
/api/products/create
/api/products/update/[id]
/api/products/delete/[id]
Reservations
/api/reservations
/api/reservations/[id]
/api/reservations/[id]/confirm
/api/reservations/[id]/release
Warehouses
/api/warehouses
Database Models
Product

Stores:

Product name
Description
Warehouse

Stores:

Warehouse name
Location
Inventory

Stores:

Total stock
Reserved stock
Available stock
Reservation

Stores:

Reservation status
Quantity
Expiry time
Things I Would Improve With More Time

If more development time was available, I would improve:

User authentication
Role-based access
Admin dashboard
Product image uploads
Better analytics charts
WebSocket real-time updates
Unit testing
Better mobile animations
Pagination
Reservation history
Email notifications
Trade-offs Made
Simplicity Over Complexity

The system uses Next.js API routes instead of separate backend services to keep deployment simpler.

No Authentication

Authentication was skipped to focus on reservation logic and inventory management.

Polling Instead of Realtime

Realtime socket updates were not implemented to reduce project complexity.

Final Outcome

This project demonstrates:

Full-stack development
Database design
API development
Reservation system implementation
Cloud deployment
Production-ready architecture
Inventory concurrency handling
Live Deployment

Vercel:
https://allo-inventory-system-seven.vercel.app

GitHub Repository

GitHub:
https://github.com/VenkataKarthikeya-eng/allo-inventory-system