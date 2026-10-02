import { RESTAURANTS_DATA } from '../data/restaurants';
import { FOOD_ITEMS_DATA } from '../data/foodItems';
import { FOOD_CATEGORIES } from '../data/categories';

// Helper delay to simulate API response if needed
const delay = (ms = 100) => new Promise(resolve => setTimeout(resolve, ms));

export const restaurantApi = {
  // Fetch all restaurants with optional filters
  async getRestaurants(filters = {}) {
    await delay(50);
    let result = [...RESTAURANTS_DATA];

    if (filters.isVeg) {
      result = result.filter(r => r.isVeg);
    }

    if (filters.minRating) {
      result = result.filter(r => r.rating >= filters.minRating);
    }

    if (filters.maxDeliveryMins) {
      result = result.filter(r => {
        const mins = parseInt(r.deliveryTime);
        return !isNaN(mins) && mins <= filters.maxDeliveryMins;
      });
    }

    if (filters.cuisine) {
      const cuisineLower = filters.cuisine.toLowerCase();
      result = result.filter(r => r.cuisines.some(c => c.toLowerCase().includes(cuisineLower)));
    }

    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase().trim();
      result = result.filter(r => 
        r.name.toLowerCase().includes(q) ||
        r.cuisines.some(c => c.toLowerCase().includes(q)) ||
        r.location.toLowerCase().includes(q)
      );
    }

    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'rating':
          result.sort((a, b) => b.rating - a.rating);
          break;
        case 'deliveryTime':
          result.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
          break;
        case 'costLowToHigh':
          result.sort((a, b) => {
            const priceA = parseInt(a.priceForTwo.replace(/[^0-9]/g, '')) || 0;
            const priceB = parseInt(b.priceForTwo.replace(/[^0-9]/g, '')) || 0;
            return priceA - priceB;
          });
          break;
        case 'costHighToLow':
          result.sort((a, b) => {
            const priceA = parseInt(a.priceForTwo.replace(/[^0-9]/g, '')) || 0;
            const priceB = parseInt(b.priceForTwo.replace(/[^0-9]/g, '')) || 0;
            return priceB - priceA;
          });
          break;
        default:
          break;
      }
    }

    return result;
  },

  // Fetch restaurant by ID
  async getRestaurantById(id) {
    await delay(50);
    return RESTAURANTS_DATA.find(r => r.id === id) || null;
  },

  // Fetch food items by restaurant ID
  async getFoodItemsByRestaurantId(restaurantId) {
    await delay(50);
    return FOOD_ITEMS_DATA.filter(item => item.restaurantId === restaurantId);
  },

  // Search across restaurants and food items
  async searchAll(query) {
    await delay(50);
    if (!query || !query.trim()) return { restaurants: [], foodItems: [] };

    const q = query.toLowerCase().trim();

    const matchingRestaurants = RESTAURANTS_DATA.filter(r => 
      r.name.toLowerCase().includes(q) ||
      r.cuisines.some(c => c.toLowerCase().includes(q)) ||
      r.location.toLowerCase().includes(q)
    );

    // Build a lookup map for restaurants by id
    const restaurantMap = {};
    RESTAURANTS_DATA.forEach(r => { restaurantMap[r.id] = r; });

    const matchingFoodItems = FOOD_ITEMS_DATA
      .filter(item =>
        item.name.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q)
      )
      .map(item => ({
        ...item,
        restaurant: restaurantMap[item.restaurantId] || null,
      }));

    return {
      restaurants: matchingRestaurants,
      foodItems: matchingFoodItems,
    };
  },

  // Get food categories
  async getCategories() {
    await delay(20);
    return FOOD_CATEGORIES;
  }
};
