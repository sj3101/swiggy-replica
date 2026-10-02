import React from 'react';
import { Filter, Star, Clock, ArrowUpDown, Check } from 'lucide-react';
import { useRestaurants } from '../hooks/useRestaurants';
import { RestaurantCard } from '../components/common/RestaurantCard';
import { Button } from '../components/ui/Button';

export function RestaurantsPage() {
  const { restaurants, loading, filters, updateFilters, resetFilters } = useRestaurants();

  const cuisinesList = ['Biryani', 'Burgers', 'North Indian', 'South Indian', 'Chinese', 'Pizzas', 'Desserts', 'Italian'];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          All Restaurants in Bangalore
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Explore top places, cuisines and deals delivered straight to your home.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="sticky top-20 z-30 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-slate-200 mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider mr-2">
            <Filter className="h-3.5 w-3.5 text-[#fc8019]" />
            Filters:
          </span>

          <button
            onClick={() => updateFilters({ isVeg: !filters.isVeg })}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
              filters.isVeg
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            {filters.isVeg && <Check className="h-3.5 w-3.5 stroke-[3]" />}
            Pure Veg
          </button>

          <button
            onClick={() => updateFilters({ minRating: filters.minRating === 4.0 ? null : 4.0 })}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
              filters.minRating === 4.0
                ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Star className="h-3.5 w-3.5 fill-current" />
            Rating 4.0+
          </button>

          <button
            onClick={() => updateFilters({ minRating: filters.minRating === 4.5 ? null : 4.5 })}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
              filters.minRating === 4.5
                ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Star className="h-3.5 w-3.5 fill-current" />
            Rating 4.5+
          </button>

          <button
            onClick={() => updateFilters({ maxDeliveryMins: filters.maxDeliveryMins === 30 ? null : 30 })}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer flex items-center gap-1.5 ${
              filters.maxDeliveryMins === 30
                ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
            }`}
          >
            <Clock className="h-3.5 w-3.5" />
            Under 30 mins
          </button>

          {cuisinesList.map((c) => (
            <button
              key={c}
              onClick={() => updateFilters({ cuisine: filters.cuisine === c ? null : c })}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                filters.cuisine === c
                  ? 'bg-[#fc8019] text-white border-[#fc8019] shadow-xs font-bold'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-slate-400" />
          <select
            value={filters.sortBy || ''}
            onChange={(e) => updateFilters({ sortBy: e.target.value || null })}
            className="bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
          >
            <option value="">Sort By: Relevance</option>
            <option value="rating">Rating: High to Low</option>
            <option value="deliveryTime">Delivery Time</option>
            <option value="costLowToHigh">Cost: Low to High</option>
            <option value="costHighToLow">Cost: High to Low</option>
          </select>

          {(filters.isVeg || filters.minRating || filters.cuisine || filters.sortBy || filters.maxDeliveryMins) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={resetFilters}
              className="text-xs text-rose-600 font-bold hover:bg-rose-50"
            >
              Reset
            </Button>
          )}
        </div>
      </div>

      {/* Restaurant List */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-4">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="h-64 rounded-2xl bg-slate-200 animate-pulse" />
          ))}
        </div>
      ) : restaurants.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 shadow-sm max-w-xl mx-auto my-8 p-8">
          <p className="text-xl font-extrabold text-slate-800">No restaurants match your active filters.</p>
          <p className="text-sm text-slate-500 mt-2">Try clearing your filters to explore more options.</p>
          <Button onClick={resetFilters} className="mt-6 font-bold">
            Reset All Filters
          </Button>
        </div>
      ) : (
        <>
          <p className="text-xs font-bold text-slate-500 mb-4 uppercase tracking-wider">
            Showing {restaurants.length} Restaurants
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {restaurants.map((rest) => (
              <RestaurantCard key={rest.id} restaurant={rest} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
