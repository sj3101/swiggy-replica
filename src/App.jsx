import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/Home';
import { RestaurantsPage } from './pages/RestaurantsPage';
import { RestaurantMenuPage } from './pages/RestaurantMenuPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { SearchPage } from './pages/SearchPage';
import { OrdersPage } from './pages/OrdersPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { ROUTES } from './constants/routes';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.HOME} element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={ROUTES.RESTAURANTS} element={<RestaurantsPage />} />
          <Route path={ROUTES.RESTAURANT_MENU} element={<RestaurantMenuPage />} />
          <Route path={ROUTES.CART} element={<CartPage />} />
          <Route path={ROUTES.CHECKOUT} element={<CheckoutPage />} />
          <Route path={ROUTES.SEARCH} element={<SearchPage />} />
          <Route path={ROUTES.ORDERS} element={<OrdersPage />} />
          <Route path={ROUTES.ORDER_SUCCESS} element={<OrderSuccessPage />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
