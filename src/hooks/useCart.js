import { useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { showSuccessToast, showInfoToast, showWarningToast, showErrorToast } from '../utils/toast';

export function useCart() {
  const [cartItems, setCartItems] = useLocalStorage('swiggy_cart', []);
  const [cartRestaurant, setCartRestaurant] = useLocalStorage('swiggy_cart_restaurant', null);

  // Conflict state: when user tries to add from a different restaurant
  const [conflictPending, setConflictPending] = useState(null); // { foodItem, restaurant }

  /**
   * Attempt to add item. Returns `{ conflict: true }` if items from another
   * restaurant are already in cart, storing the pending action in state so
   * the UI can show a confirmation dialog.
   */
  const addToCart = (foodItem, restaurant) => {
    if (!restaurant) {
      showErrorToast('Restaurant information is missing.');
      return { conflict: false };
    }

    // Conflict: cart has items from a different restaurant
    if (cartRestaurant && cartRestaurant.id !== restaurant.id && cartItems.length > 0) {
      setConflictPending({ foodItem, restaurant, existingRestaurant: cartRestaurant });
      return { conflict: true, existingRestaurant: cartRestaurant };
    }

    _doAdd(foodItem, restaurant);
    return { conflict: false };
  };

  /** Internal: actually adds the item, assumes no conflict */
  const _doAdd = (foodItem, restaurant) => {
    try {
      setCartRestaurant(restaurant);
      setCartItems((prevItems) => {
        const existingIndex = prevItems.findIndex((i) => i.id === foodItem.id);
        if (existingIndex > -1) {
          // Immutably update quantity
          const updated = prevItems.map((i, idx) =>
            idx === existingIndex ? { ...i, quantity: i.quantity + 1 } : i
          );
          showSuccessToast(`${foodItem.name} quantity updated!`);
          return updated;
        } else {
          showSuccessToast(`${foodItem.name} added to cart!`);
          return [...prevItems, { ...foodItem, quantity: 1 }];
        }
      });
    } catch (e) {
      console.error('Failed to add to cart:', e);
      showErrorToast('Could not add item to cart. Please try again.');
    }
  };

  /**
   * Called when user confirms "clear existing cart and add new item".
   * Clears the cart, then adds the pending item.
   */
  const confirmReplaceCart = () => {
    if (!conflictPending) return;
    const { foodItem, restaurant } = conflictPending;
    try {
      setCartItems([]);
      setCartRestaurant(null);
      setConflictPending(null);
      // Small timeout so state flushes before re-add
      setTimeout(() => {
        _doAdd(foodItem, restaurant);
      }, 0);
    } catch (e) {
      console.error('Failed to replace cart:', e);
      showErrorToast('Something went wrong. Please try again.');
    }
  };

  /** Cancel the pending conflict action */
  const cancelConflict = () => {
    setConflictPending(null);
  };

  /** Decrease quantity by 1; remove if quantity hits 0 */
  const removeFromCart = (foodItemId) => {
    try {
      setCartItems((prevItems) => {
        const existingIndex = prevItems.findIndex((i) => i.id === foodItemId);
        if (existingIndex === -1) return prevItems;

        const item = prevItems[existingIndex];
        if (item.quantity > 1) {
          const updated = prevItems.map((i, idx) =>
            idx === existingIndex ? { ...i, quantity: i.quantity - 1 } : i
          );
          return updated;
        } else {
          const updated = prevItems.filter((i) => i.id !== foodItemId);
          showInfoToast(`${item.name} removed from cart`);
          if (updated.length === 0) {
            setCartRestaurant(null);
          }
          return updated;
        }
      });
    } catch (e) {
      console.error('Failed to remove from cart:', e);
      showErrorToast('Could not update cart. Please try again.');
    }
  };

  /** Set an explicit quantity (0 = remove) */
  const updateQuantity = (foodItemId, newQuantity) => {
    try {
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
    } catch (e) {
      console.error('Failed to update quantity:', e);
      showErrorToast('Could not update quantity. Please try again.');
    }
  };

  const clearCart = () => {
    try {
      setCartItems([]);
      setCartRestaurant(null);
      showInfoToast('Cart cleared');
    } catch (e) {
      console.error('Failed to clear cart:', e);
    }
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
    // Conflict resolution
    conflictPending,
    confirmReplaceCart,
    cancelConflict,
  };
}
