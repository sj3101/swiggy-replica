# Swiggy Web Replica

A frontend replica of the Swiggy web experience built with React and Vite. The project focuses on recreating the core food-delivery browsing and ordering flow using mock data and local browser persistence.

## Features

* Swiggy-style responsive UI
* Home page with food categories and restaurant sections
* Restaurant listing
* Restaurant details and menu
* Restaurant and food search
* Restaurant filters
* Add items to cart
* Increase/decrease item quantity
* Remove items from cart
* Cart persistence using `localStorage`
* Restaurant switching confirmation
* Checkout flow
* Mock payment selection
* Mock order placement
* Order confirmation page
* Previous orders stored locally
* Toast notifications
* Loading and empty states
* Responsive layout

## Tech Stack

* React
* Vite
* JavaScript
* React Router v7
* Tailwind CSS v4
* shadcn/ui
* Lucide React
* React-Toastify
* Browser localStorage

## Project Structure

```text
src/
├── api/
├── components/
│   ├── layout/
│   ├── restaurant/
│   ├── menu/
│   └── ui/
├── constants/
├── data/
├── hooks/
├── lib/
├── pages/
└── utils/
```

### Main Layers

**components/**
Reusable UI components such as restaurant cards, menu items, navigation and cart components.

**pages/**
Route-level pages such as Home, Restaurants, Restaurant Menu, Cart, Checkout and Orders.

**hooks/**
Application logic and reusable state such as cart management, restaurant data and search.

**data/**
Mock restaurant and food data used by the application.

**constants/**
Centralized application constants and route definitions.

**utils/**
Reusable helper and formatting functions.

**api/**
Mock API/data-access layer kept separate from the UI so it can be replaced with a real backend later.

## Application Routes

| Route               | Description        |
| ------------------- | ------------------ |
| `/`                 | Home               |
| `/restaurants`      | Restaurant listing |
| `/restaurant/:id`   | Restaurant menu    |
| `/search?q=<query>` | Search results     |
| `/cart`             | Shopping cart      |
| `/checkout`         | Checkout           |
| `/orders`           | Previous orders    |
| `/order-success`    | Order confirmation |

## Main User Flow

```text
Home
  ↓
Restaurants
  ↓
Select Restaurant
  ↓
Browse Menu
  ↓
Add Food Item
  ↓
Cart
  ↓
Checkout
  ↓
Place Order
  ↓
Order Confirmation
  ↓
Orders
```

## Getting Started

### Prerequisites

Make sure Node.js and npm are installed.

### Installation

Clone or download the project and move into the project directory:

```bash
cd swiggy-replica
```

Install dependencies:

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open the local URL shown by Vite in your browser.

### Production Build

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## Data & Persistence

This project does not use a backend or the actual Swiggy API.

Restaurant and food information is provided through mock data.

Cart and order information is persisted using the browser's `localStorage`, allowing the state to remain available after refreshing the page.

## Design Decisions

### Mock Data

The application uses mock restaurant and food data to keep the project self-contained and focused on the frontend experience.

### Local Storage

`localStorage` is used to simulate persistence without introducing a backend or database.

### Component-Based Architecture

Common UI elements are implemented as reusable components instead of duplicating the same markup across pages.

### Custom Hooks

Application logic such as cart operations and search is kept inside custom hooks to keep page components easier to maintain.

### No Global State Library

Redux, Zustand and Context API are intentionally not used. The application's current state and complexity can be handled with React state and custom hooks.

## Scope

This is a frontend replica created for demonstration and development purposes.

It does not include:

* Real Swiggy API integration
* User authentication
* Real payment processing
* Real order delivery tracking
* Production backend
* Real restaurant/order database

## Future Improvements

If this project were extended further, possible improvements would include:

* Backend API integration
* User authentication
* Real database
* Restaurant owner/admin dashboard
* Real-time order tracking
* Payment gateway integration
* Address management
* More advanced filtering and sorting
* Order status updates
* Better mobile-specific navigation

## Disclaimer

This project is an independent frontend replica created for learning and demonstration purposes. It is not affiliated with or endorsed by Swiggy.
