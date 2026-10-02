import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { showSuccessToast, showInfoToast, showWarningToast } from '../utils/toast';

export function useCart() {
  const [cartItems, setCartItems] = useLocalStorage('swiggy_cart', []);
  const [cartRestaurant, setCartRestaurant] = useLocalStorage('swiggy_cart_restaurant', null);

  // Sync state if another tab updates localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const item = window.localStorage.getItem('swiggy_cart');
        if (item) setCartItems(JSON.parse(item));
        const rest = window.localStorage.getItem('swiggy_cart_restaurant');
        if (rest) setCartRestaurant(JSON.parse(rest));
      } catch (e) {
        console.error(e);
      }
    };
    window.addEventListener('local-storage-update', handleStorageChange);
    return () => window.removeEventListener('local-storage-update', handleStorageChange);
  }, []);

  const addToCart = (foodItem, restaurant) => {
    // If cart has items from another restaurant
    if (cartRestaurant && cartRestaurant.id !== restaurant.id && cartItems.length > 0) {
      showWarningToast(`Your cart contains items from ${cartRestaurant.name}. Reset cart to add items from ${restaurant.name}?`);
      // We can offer helper clearAndAdd or handle in UI modal
      return { conflict: true, existingRestaurant: cartRestaurant };
    }

    setCartRestaurant(restaurant);

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((i) => i.id === foodItem.id);
      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += 1;
        showSuccessToast(`Increased quantity of ${foodItem.name}`);
        return updated;
      } else {
        showSuccessToast(`Added ${foodItem.name} to cart`);
        return [...prevItems, { ...foodItem, quantity: 1 }];
      }
    });

    return { conflict: false };
  };

  const removeFromCart = (foodItemId) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex((i) => i.id === foodItemId);
      if (existingIndex === -1) return prevItems;

      const item = prevItems[existingIndex];
      if (item.quantity > 1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity -= 1;
        showInfoToast(`Decreased quantity of ${item.name}`);
        return updated;
      } else {
        const updated = prevItems.filter((i) => i.id !== foodItemId);
        showInfoToast(`Removed ${item.name} from cart`);
        if (updated.length === 0) {
          setCartRestaurant(null);
        }
        return updated;
      }
    });
  };

  const updateQuantity = (foodItemId, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems((prev) => {
        const updated = prev.filter((i) => i.id !== foodItemId);
        if (updated.length === 0) setCartRestaurant(null);
        return updated;
      });
      return;
    }
    setCartItems((prev) =>
      prev.map((i) => (i.id === foodItemId ? { ...i, quantity: newQuantity } : i))
    );
  };

  const clearCart = () => {
    setCartItems([]);
    setCartRestaurant(null);
    showInfoToast('Cart cleared');
  };

  const getItemQuantity = (foodItemId) => {
    const found = cartItems.find((i) => i.id === foodItemId);
    return found ? found.quantity : 0;
  };

  const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return {
    cartItems,
    cartRestaurant,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
    cartTotal,
    cartCount,
    isEmpty: cartItems.length === 0,
  };
}
