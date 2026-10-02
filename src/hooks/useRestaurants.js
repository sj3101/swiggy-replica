import { useState, useEffect, useCallback } from 'react';
import { restaurantApi } from '../api/restaurantApi';

export function useRestaurants(initialFilters = {}) {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const fetchRestaurants = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await restaurantApi.getRestaurants(filters);
      setRestaurants(data);
    } catch (err) {
      console.error('Error fetching restaurants:', err);
      setError('Failed to load restaurants');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({});
  };

  return {
    restaurants,
    loading,
    error,
    filters,
    updateFilters,
    resetFilters,
    refetch: fetchRestaurants,
  };
}

export function useRestaurantMenu(restaurantId) {
  const [restaurant, setRestaurant] = useState(null);
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!restaurantId) return;

    let isMounted = true;
    async function loadMenu() {
      setLoading(true);
      setError(null);
      try {
        const [restData, menuData] = await Promise.all([
          restaurantApi.getRestaurantById(restaurantId),
          restaurantApi.getFoodItemsByRestaurantId(restaurantId),
        ]);

        if (isMounted) {
          setRestaurant(restData);
          setFoodItems(menuData);
        }
      } catch (err) {
        console.error('Error loading restaurant menu:', err);
        if (isMounted) setError('Failed to load restaurant menu');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadMenu();

    return () => {
      isMounted = false;
    };
  }, [restaurantId]);

  return { restaurant, foodItems, loading, error };
}
