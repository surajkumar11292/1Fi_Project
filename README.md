# 1Fi Marketplace - Fintech BNPL Ecommerce Platform

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-6D28D9?style=for-the-badge)](https://mongodb.com)
[![React 18](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org)
[![Express](https://img.shields.io/badge/Express-4.21-000000?style=for-the-badge&logo=express)](https://expressjs.com)
[![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)](https://mongodb.com)
[![Cloudinary CDN](https://img.shields.io/badge/Cloudinary-CDN-3448C5?style=for-the-badge&logo=cloudinary)](https://cloudinary.com)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

A production-grade, fintech-driven **Marketplace & No-Cost EMI Financing platform** for **1Fi — Shop Using Your Mutual Funds**.

---

## 🚀 Live Architecture & Design Highlights

1. **3-Tab Shop Architecture**:
   - **1Fi Marketplace (Active)**: Full dynamic ecommerce catalog with multi-variant selection, price range filters, and real-time EMI financing calculation.
   - **Top Brands (Placeholder)**: Partner vouchers and brand discounts layout matching the 1Fi app experience.
   - **Nearby Stores (Placeholder)**: Offline merchant QR scan-and-pay discovery layout matching the 1Fi app experience.

2. **Fintech EMI Calculation Engine**:
   - **0% No-Cost EMI**: Subsidized loans across 3 and 6-month tenures with ₹0 down payment and ₹0 processing fee.
   - **Reducing Balance Formula**: $E = \frac{P \cdot r \cdot (1+r)^n}{(1+r)^n - 1}$ for 9, 12, and 24-month interest financing.
   - **Live Variant Recalculation**: Switching variant attributes (e.g. 256GB $\to$ 512GB) immediately updates monthly installments.

3. **Cloudinary Digital Asset CDN**:
   - High-resolution photography served over global Cloudinary CDN with automatic WebP/AVIF format and quality optimization.

4. **Advanced MongoDB Aggregation**:
   - `/api/products/meta/categories` uses an aggregation pipeline (`$match` $\to$ `$group` $\to$ `$project` $\to$ `$sort`) to compute live catalog counts per category.

5. **Production Code Architecture**:
   - Modular separation of concerns across service layers, custom hooks (`useProducts`, `useProduct`, `useWishlist`, `useDebounce`), normalized schemas, and centralized error handling.

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite 6, React Router v6, Tailwind CSS v3, Lucide React, Axios |
| **Backend** | Node.js (ES Modules), Express.js, Mongoose ODM v8, Cloudinary SDK v2 |
| **Database** | MongoDB Atlas (Cloud Cluster) |
| **Media CDN** | Cloudinary Digital Asset Management |
| **State & Storage** | React Hooks (`useProducts`, `useProduct`, `useWishlist`, `useDebounce`), Browser `localStorage` |

---

## 📁 Repository Directory Structure

```
1Fi_Marketplace/
├── client/                     # Vite + React Frontend Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/         # Navbar, Footer, MobileBottomNav, SkeletonLoader
│   │   │   ├── marketplace/    # SearchBar, CategoryFilter, SortDropdown, PriceRangeSlider, ProductCard, ProductGrid
│   │   │   ├── product/        # ImageGallery, VariantSelector, EmiPlanList, ProceedModal
│   │   │   └── shop/           # HeroBanner, TabSwitcher, TopBrandsTab, NearbyStoresTab
│   │   ├── hooks/              # useProducts, useProduct, useWishlist, useDebounce
│   │   ├── pages/              # ShopPage, ProductDetailPage, WishlistPage
│   │   ├── services/           # api.js (Configured Axios client)
│   │   ├── App.jsx             # Router definition
│   │   ├── main.jsx            # Concurrent root entry
│   │   └── index.css           # Tailwind base and 1Fi custom classes
│   ├── index.html              # HTML5 entry with SEO tags & Google Fonts
│   ├── tailwind.config.js      # 1Fi purple brand palette & theme extensions
│   └── vite.config.js          # Vite config with dev proxy to backend
├── server/                     # Express REST API Backend
│   ├── config/
│   │   ├── db.js               # Resilient MongoDB Atlas connection
│   │   └── cloudinary.js       # Cloudinary v2 setup & upload helper
│   ├── controllers/
│   │   └── productController.js# Query filters, aggregation pipeline, EMI calculation
│   ├── data/
│   │   └── seedData.js         # Curated catalog (Smartphones, Laptops, Audio, Wearables, Tablets, Gaming)
│   ├── middleware/
│   │   ├── errorHandler.js     # Centralized error handler (CastError, ValidationError)
│   │   └── notFound.js         # 404 JSON response middleware
│   ├── models/
│   │   └── Product.js          # Schema with embedded variants, EMI plans, virtuals & indexes
│   ├── routes/
│   │   └── productRoutes.js    # Express REST route definitions
│   ├── scripts/
│   │   ├── clearData.js        # Purges MongoDB collection and Cloudinary assets
│   │   └── seed.js             # Uploads images to Cloudinary, computes EMIs, seeds MongoDB
│   ├── .env.example            # Environment variables template
│   ├── package.json            # Backend scripts and dependencies
│   └── server.js               # Express application entrypoint
└── README.md                   # Project documentation
```

---

## ⚡ Quickstart & Setup Guide

### 1. Prerequisites
- Node.js (v18 or higher)
- npm (v9 or higher)

### 2. Backend Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# (Optional) Wipe existing database and Cloudinary assets
npm run clear

# Seed product catalog & upload images to Cloudinary CDN
npm run seed

# Start development API server
npm run dev
# Server will listen at: http://127.0.0.1:5000
```

### 3. Frontend Setup
```bash
# In a separate terminal, navigate to client directory
cd client

# Install dependencies
npm install

# Start Vite development server
npm run dev
# Application will launch at: http://127.0.0.1:5173
```

---

## 📡 REST API Documentation

### 1. Health Check
- **Endpoint**: `GET /api/health`
- **Response**: `200 OK`
```json
{
  "status": "OK",
  "service": "1Fi Marketplace API",
  "uptime": 124.5,
  "environment": "development"
}
```

### 2. Get Products (With Search, Filtering & Pagination)
- **Endpoint**: `GET /api/products`
- **Query Parameters**:
  - `search`: Full text keyword search
  - `category`: Filter by category (e.g. `Smartphones`, `Laptops`, `Audio`, `Wearables`)
  - `noCostOnly`: Filter for 0% No-Cost EMI products (`true`/`false`)
  - `sort`: Sort order (`newest`, `price-asc`, `price-desc`, `rating`)
  - `page`: Page number (default `1`)
  - `limit`: Items per page (default `12`)

### 3. Get Category Aggregation Facets
- **Endpoint**: `GET /api/products/meta/categories`
- **Response**:
```json
{
  "success": true,
  "count": 4,
  "data": [
    { "category": "Audio", "count": 1 },
    { "category": "Laptops", "count": 1 },
    { "category": "Smartphones", "count": 3 },
    { "category": "Wearables", "count": 1 }
  ]
}
```

### 4. Dynamic EMI Calculator Quote
- **Endpoint**: `POST /api/products/calculate-emi`
- **Payload**:
```json
{
  "principal": 90000,
  "tenureMonths": 6,
  "annualRate": 0
}
```
- **Response**:
```json
{
  "success": true,
  "data": {
    "principal": 90000,
    "downPayment": 0,
    "netLoanAmount": 90000,
    "tenureMonths": 6,
    "annualRate": 0,
    "monthlyInstallment": 15000,
    "totalPayable": 90000,
    "totalInterest": 0,
    "isNoCost": true
  }
}
```

### 5. Get Single Product by Slug
- **Endpoint**: `GET /api/products/:slug`
- **Example**: `GET /api/products/apple-iphone-15-pro-max`

---

## 🔒 Security & Performance Best Practices

- **Security Compliance**: Listens strictly on `127.0.0.1` / `localhost` during local runs; no sensitive credentials stored in frontend bundles.
- **Input Sanitization**: Mongoose schema validations, regex boundary escaping, and parametrized queries eliminate injection attacks.
- **Debounced Network Requests**: Search bar inputs are debounced by 350ms, avoiding redundant queries.
- **Virtual Properties**: Mongoose virtuals compute `startingEmi`, `basePrice`, and `discountPercentage` on the fly, eliminating database redundancy.
