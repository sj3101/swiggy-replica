export const ROUTES = {
  HOME: '/',
  RESTAURANTS: '/restaurants',
  RESTAURANT_MENU: '/restaurant/:id',
  CART: '/cart',
  SEARCH: '/search',
  ORDERS: '/orders',
  ORDER_SUCCESS: '/order-success',
};

export const getRestaurantMenuPath = (id) => `/restaurant/${id}`;
export const getSearchPath = (query) => `/search?q=${encodeURIComponent(query || '')}`;
