import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Utensils, Sparkles, X } from 'lucide-react';
import { useSearch } from '../hooks/useSearch';
import { useCart } from '../hooks/useCart';
import { RestaurantCard } from '../components/common/RestaurantCard';
import { FoodItemCard } from '../components/common/FoodItemCard';
import { Dialog } from '../components/ui/Dialog';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';

const POPULAR = ['Biryani', 'Pizza', 'Burger', 'Dosa', 'Chinese', 'Ice Cream', 'Paneer', 'Chicken'];

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const { query, setQuery, results, loading, clearSearch } = useSearch(initialQuery);
  const {
    addToCart,
    removeFromCart,
    getItemQuantity,
    conflictPending,
    confirmReplaceCart,
    cancelConflict,
  } = useCart();

  // Keep query in sync with URL param
  useEffect(() => {
    const q = searchParams.get('q') || '';
    if (q !== query) setQuery(q);
  }, [searchParams]); // eslint-disable-line

  const handleQueryChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.trim()) {
      setSearchParams({ q: val.trim() });
    } else {
      setSearchParams({});
    }
  };

  const handlePopularClick = (term) => {
    setQuery(term);
    setSearchParams({ q: term });
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">

      {/* ── Search Bar ──────────────────────────────────────────── */}
      <div className="mb-8">
        <div className="relative flex items-center">
          <Search className="absolute left-4 h-5 w-5 text-slate-400" />
          <Input
            type="text"
            value={query}
            onChange={handleQueryChange}
            placeholder="Search for restaurants and food items..."
            className="h-14 pl-12 pr-12 text-base rounded-2xl border-2 border-slate-200 focus:border-[#fc8019] shadow-sm font-semibold"
            autoFocus
          />
          {query && (
            <button
              onClick={() => { clearSearch(); setSearchParams({}); }}
              className="absolute right-4 p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Popular tags */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1">
            <Sparkles className="h-3.5 w-3.5 text-amber-500" /> Popular:
          </span>
          {POPULAR.map((term) => (
            <button
              key={term}
              onClick={() => handlePopularClick(term)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                query.toLowerCase() === term.toLowerCase()
                  ? 'bg-[#fc8019] text-white border-[#fc8019] shadow-xs'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {term}
            </button>
          ))}
        </div>
      </div>

      {/* ── Loading ──────────────────────────────────────────────── */}
      {loading && (
        <div className="space-y-4 py-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-slate-200 animate-pulse rounded-2xl" />
          ))}
        </div>
      )}

      {/* ── Empty query prompt ───────────────────────────────────── */}
      {!loading && !query.trim() && (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-100 p-8 shadow-xs">
          <Search className="mx-auto h-12 w-12 text-slate-300 mb-3" />
          <h3 className="text-xl font-bold text-slate-800">Search for your favourite food or restaurant</h3>
          <p className="text-slate-500 text-sm mt-1">
            Try "Biryani", "Meghana Foods", "Pizza" or "Desserts".
          </p>
        </div>
      )}

      {/* ── No results ───────────────────────────────────────────── */}
      {!loading && query.trim() && results.restaurants.length === 0 && results.foodItems.length === 0 && (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
          <Utensils className="mx-auto h-12 w-12 text-slate-300 mb-3" />
          <h3 className="text-xl font-bold text-slate-800">No results for &ldquo;{query}&rdquo;</h3>
          <p className="text-slate-500 text-sm mt-1">
            Check the spelling or try a different keyword.
          </p>
        </div>
      )}

      {/* ── Results ──────────────────────────────────────────────── */}
      {!loading && (results.restaurants.length > 0 || results.foodItems.length > 0) && (
        <div className="space-y-10">
          {/* Restaurants */}
          {results.restaurants.length > 0 && (
            <section>
              <h2 className="text-xl font-black text-slate-900 mb-4 tracking-tight">
                Restaurants &nbsp;
                <span className="text-base font-semibold text-slate-400">({results.restaurants.length})</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.restaurants.map((rest) => (
                  <RestaurantCard key={rest.id} restaurant={rest} />
                ))}
              </div>
            </section>
          )}

          {/* Food items */}
          {results.foodItems.length > 0 && (
            <section>
              <h2 className="text-xl font-black text-slate-900 mb-4 tracking-tight">
                Dishes &nbsp;
                <span className="text-base font-semibold text-slate-400">({results.foodItems.length})</span>
              </h2>
              <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="px-4 divide-y divide-slate-100">
                  {results.foodItems.map((item) => (
                    <FoodItemCard
                      key={item.id}
                      item={item}
                      restaurant={item.restaurant}
                      quantity={getItemQuantity(item.id)}
                      onAdd={addToCart}
                      onRemove={removeFromCart}
                    />
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      )}

      {/* ── Cart Conflict Dialog ─────────────────────────────────── */}
      <Dialog
        isOpen={!!conflictPending}
        onClose={cancelConflict}
        title="Start a new cart?"
        description={
          conflictPending
            ? `Your cart has items from "${conflictPending.existingRestaurant?.name}". Adding from "${conflictPending.restaurant?.name}" will clear the current cart.`
            : ''
        }
        footer={
          <>
            <Button variant="outline" onClick={cancelConflict}>Keep Existing</Button>
            <Button className="bg-[#fc8019] hover:bg-orange-600" onClick={confirmReplaceCart}>
              Start New Cart
            </Button>
          </>
        }
      />
    </div>
  );
}
