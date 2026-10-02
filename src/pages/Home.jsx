import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';
import { FOOD_CATEGORIES } from '../data/categories';
import { useRestaurants } from '../hooks/useRestaurants';
import { RestaurantCard } from '../components/common/RestaurantCard';
import { getSearchPath, ROUTES } from '../constants/routes';
import { Button } from '../components/ui/Button';

export function Home() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const { restaurants, loading, filters, updateFilters } = useRestaurants();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(getSearchPath(searchInput.trim()));
    }
  };

  const topRestaurants = restaurants.filter(r => r.rating >= 4.5).slice(0, 4);

  return (
    <div className="pb-16">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-orange-500 via-[#fc8019] to-amber-500 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/20 backdrop-blur-md px-4 py-1 text-xs font-bold uppercase tracking-wider text-white mb-4">
            <Sparkles className="h-4 w-4 text-amber-200" />
            Craving something delicious?
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white mb-4 max-w-3xl leading-tight">
            Order food & groceries from top restaurants in Bangalore
          </h1>
          <p className="text-orange-100 text-base sm:text-lg mb-8 max-w-xl font-medium">
            Lightning-fast delivery from the finest kitchens right to your doorstep.
          </p>

          {/* Search Bar Input */}
          <form
            onSubmit={handleSearchSubmit}
            className="w-full max-w-2xl flex items-center bg-white rounded-2xl p-2 shadow-2xl border border-white/20"
          >
            <Search className="h-6 w-6 text-slate-400 ml-3 shrink-0" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search for restaurants, biryani, pizza or burgers..."
              className="w-full px-4 py-3 text-slate-800 focus:outline-none placeholder:text-slate-400 font-medium text-base bg-transparent"
            />
            <Button
              type="submit"
              size="lg"
              className="rounded-xl font-bold bg-[#fc8019] hover:bg-orange-600 text-white shrink-0 px-6 shadow-md"
            >
              Search
            </Button>
          </form>
        </div>
      </section>

      {/* Category Section: What's on your mind? */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            What's on your mind?
          </h2>
          <Link
            to={ROUTES.RESTAURANTS}
            className="text-sm font-bold text-[#fc8019] hover:underline flex items-center gap-1"
          >
            Explore all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="flex overflow-x-auto gap-4 no-scrollbar pb-4 snap-x">
          {FOOD_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate(getSearchPath(cat.name))}
              className="flex flex-col items-center group cursor-pointer p-2 shrink-0 snap-start transition-all border border-transparent"
            >
              <div className="h-24 w-24 sm:h-32 sm:w-32 overflow-hidden rounded-full shadow-xs bg-slate-100 border-2 border-white group-hover:scale-105 transition-transform duration-300">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="mt-2 text-sm sm:text-base font-bold text-slate-700 group-hover:text-[#fc8019] text-center w-full">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </section>

      {/* Top Rated Restaurant Chains */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-14">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-6 w-6 text-[#fc8019]" />
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Top restaurant chains in Bangalore
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {topRestaurants.map((rest) => (
            <RestaurantCard key={rest.id} restaurant={rest} />
          ))}
        </div>
      </section>

      {/* Restaurants with Online Food Delivery */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-14">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            Restaurants with online food delivery in Bangalore
          </h2>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => updateFilters({ isVeg: !filters.isVeg })}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                filters.isVeg
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              Pure Veg
            </button>
            <button
              onClick={() => updateFilters({ minRating: filters.minRating ? null : 4.0 })}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                filters.minRating === 4.0
                  ? 'bg-amber-500 text-white border-amber-500'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              Ratings 4.0+
            </button>
            <button
              onClick={() => updateFilters({ sortBy: filters.sortBy === 'costLowToHigh' ? null : 'costLowToHigh' })}
              className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                filters.sortBy === 'costLowToHigh'
                  ? 'bg-[#fc8019] text-white border-[#fc8019]'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              Cost: Low to High
            </button>
          </div>
        </div>

        {/* Restaurant Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="h-64 rounded-2xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : restaurants.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <p className="text-lg font-bold text-slate-600">No restaurants match your filters.</p>
            <Button onClick={() => updateFilters({ isVeg: false, minRating: null, sortBy: null })} className="mt-4">
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {restaurants.map((rest) => (
              <RestaurantCard key={rest.id} restaurant={rest} />
            ))}
          </div>
        )}
      </section>

      {/* Popular Cuisines */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-14 mb-8">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-6">
          Best Cuisines Near Me
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {['Chinese Restaurant Near Me', 'South Indian Restaurant Near Me', 'Indian Restaurant Near Me', 'Kerala Restaurant Near Me', 'Korean Restaurant Near Me', 'North Indian Restaurant Near Me', 'Seafood Restaurant Near Me', 'Bengali Restaurant Near Me'].map((cuisine, i) => (
            <div key={i} className="flex items-center justify-center p-4 border border-slate-200 rounded-xl bg-white text-slate-600 font-medium text-sm hover:border-[#fc8019] hover:text-[#fc8019] cursor-pointer transition-colors text-center shadow-xs">
              {cuisine}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
