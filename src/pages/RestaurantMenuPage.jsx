import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, MapPin, Tag, Search, ArrowLeft, Utensils, Check, ShoppingBag, AlertTriangle } from 'lucide-react';
import { useRestaurantMenu } from '../hooks/useRestaurants';
import { useCart } from '../hooks/useCart';
import { FoodItemCard } from '../components/common/FoodItemCard';
import { RatingBadge } from '../components/common/RatingBadge';
import { Dialog } from '../components/ui/Dialog';
import { Button } from '../components/ui/Button';
import { ROUTES } from '../constants/routes';

export function RestaurantMenuPage() {
  const { id } = useParams();
  const { restaurant, foodItems, loading, error } = useRestaurantMenu(id);
  const {
    addToCart,
    removeFromCart,
    getItemQuantity,
    cartCount,
    cartTotal,
    conflictPending,
    confirmReplaceCart,
    cancelConflict,
  } = useCart();

  const [searchQuery, setSearchQuery] = useState('');
  const [vegOnly, setVegOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  /* ── Loading skeleton ─────────────────────────────────────────── */
  if (loading) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="h-8 w-40 rounded-lg bg-slate-200 animate-pulse mb-8" />
        <div className="h-44 rounded-3xl bg-slate-200 animate-pulse mb-8" />
        <div className="h-10 w-full rounded-lg bg-slate-200 animate-pulse mb-6" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 rounded-2xl bg-slate-200 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  /* ── Error / not found ────────────────────────────────────────── */
  if (error || !restaurant) {
    return (
      <div className="mx-auto max-w-xl text-center py-20 px-4">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-red-50 text-red-400 mb-4">
          <AlertTriangle className="h-10 w-10" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Restaurant Not Found</h2>
        <p className="text-slate-500 mt-2">
          {error || 'The requested restaurant does not exist.'}
        </p>
        <Link to={ROUTES.RESTAURANTS}>
          <Button className="mt-6">← Back to Restaurants</Button>
        </Link>
      </div>
    );
  }

  /* ── Filter logic ─────────────────────────────────────────────── */
  const categories = ['All', ...new Set(foodItems.map((item) => item.category))];

  const filteredItems = foodItems.filter((item) => {
    if (vegOnly && !item.isVeg) return false;
    if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        item.name.toLowerCase().includes(q) ||
        (item.description && item.description.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="pb-28">
      {/* ── Back link ─────────────────────────────────────────────── */}
      <div className="mx-auto max-w-4xl px-4 pt-6">
        <Link
          to={ROUTES.RESTAURANTS}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#fc8019] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Restaurants
        </Link>
      </div>

      {/* ── Restaurant Info Card ───────────────────────────────────── */}
      <div className="mx-auto max-w-4xl px-4 mt-4">
        <div className="rounded-3xl bg-white p-6 shadow-md border border-slate-100 flex flex-col md:flex-row justify-between gap-6">
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  {restaurant.name}
                </h1>
                {restaurant.isVeg && (
                  <span className="rounded-full bg-emerald-100 text-emerald-800 px-2.5 py-0.5 text-xs font-bold">
                    Pure Veg
                  </span>
                )}
              </div>
              <p className="text-sm font-medium text-slate-500 mt-1">
                {restaurant.cuisines?.join(', ')}
              </p>
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mt-2">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                <span>{restaurant.location}</span>
              </div>
            </div>

            {restaurant.offers && (
              <div className="mt-4 inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-[#fc8019] px-3 py-1.5 rounded-xl font-bold text-xs w-fit">
                <Tag className="h-4 w-4" />
                <span>{restaurant.offers}</span>
              </div>
            )}
          </div>

          {/* Rating / delivery info box */}
          <div className="flex flex-row md:flex-col items-center justify-between md:justify-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 shrink-0 min-w-[140px]">
            <RatingBadge rating={restaurant.rating} />
            <div className="text-center">
              <span className="flex items-center justify-center gap-1 text-xs font-bold text-slate-700">
                <Clock className="h-3.5 w-3.5 text-slate-500" />
                {restaurant.deliveryTime}
              </span>
              <span className="text-[11px] text-slate-500 mt-0.5 block font-medium">
                {restaurant.priceForTwo}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Menu Filters ──────────────────────────────────────────── */}
      <div className="mx-auto max-w-4xl px-4 mt-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
            {/* Veg only toggle */}
            <button
              onClick={() => setVegOnly(!vegOnly)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                vegOnly
                  ? 'bg-emerald-600 text-white border-emerald-600'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
              }`}
            >
              {vegOnly && <Check className="h-3.5 w-3.5 stroke-[3]" />}
              Veg Only
            </button>

            {/* Category pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Dish search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes..."
              className="w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 py-1.5 text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
        </div>
      </div>

      {/* ── Menu Items ────────────────────────────────────────────── */}
      <div className="mx-auto max-w-4xl px-4 mt-6">
        {filteredItems.length === 0 ? (
          <div className="text-center py-14 bg-white rounded-2xl border border-slate-200">
            <Utensils className="mx-auto h-10 w-10 text-slate-300 mb-3" />
            <p className="font-bold text-slate-700 text-base">No dishes match your criteria</p>
            <p className="text-sm text-slate-400 mt-1">Try adjusting the filters or searching for something else.</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setVegOnly(false);
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 text-xs text-[#fc8019]"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            {/* Group by category */}
            {selectedCategory === 'All'
              ? categories.slice(1).map((cat) => {
                  const items = filteredItems.filter((i) => i.category === cat);
                  if (items.length === 0) return null;
                  return (
                    <div key={cat}>
                      <div className="px-6 pt-6 pb-2">
                        <h3 className="text-base font-black text-slate-800 tracking-tight">
                          {cat}
                          <span className="ml-2 text-xs font-semibold text-slate-400">({items.length})</span>
                        </h3>
                        <div className="mt-1 h-px bg-slate-100" />
                      </div>
                      <div className="px-4 divide-y divide-slate-100">
                        {items.map((item) => (
                          <FoodItemCard
                            key={item.id}
                            item={item}
                            restaurant={restaurant}
                            quantity={getItemQuantity(item.id)}
                            onAdd={addToCart}
                            onRemove={removeFromCart}
                          />
                        ))}
                      </div>
                    </div>
                  );
                })
              : (
                <div className="px-4 divide-y divide-slate-100">
                  {filteredItems.map((item) => (
                    <FoodItemCard
                      key={item.id}
                      item={item}
                      restaurant={restaurant}
                      quantity={getItemQuantity(item.id)}
                      onAdd={addToCart}
                      onRemove={removeFromCart}
                    />
                  ))}
                </div>
              )}
          </div>
        )}
      </div>

      {/* ── Floating Cart Bar ─────────────────────────────────────── */}
      {cartCount > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-sm px-4">
          <Link
            to={ROUTES.CART}
            className="flex items-center justify-between rounded-2xl bg-[#48c479] text-white p-4 shadow-2xl hover:bg-[#3db36c] transition-all hover:scale-[1.02] active:scale-[0.99]"
          >
            <div className="flex items-center gap-3">
              <span className="bg-white/20 px-2.5 py-1 rounded-lg font-black text-sm">
                {cartCount} {cartCount === 1 ? 'ITEM' : 'ITEMS'}
              </span>
              <span className="font-extrabold text-base">₹{cartTotal}</span>
            </div>
            <div className="flex items-center gap-1.5 font-extrabold text-sm uppercase tracking-wider">
              <ShoppingBag className="h-4 w-4" />
              <span>VIEW CART</span>
            </div>
          </Link>
        </div>
      )}

      {/* ── Restaurant Conflict Dialog ─────────────────────────────── */}
      <Dialog
        isOpen={!!conflictPending}
        onClose={cancelConflict}
        title="Start a new cart?"
        description={
          conflictPending
            ? `Your cart has items from "${conflictPending.existingRestaurant?.name}". Adding items from "${conflictPending.restaurant?.name}" will clear your current cart.`
            : ''
        }
        footer={
          <>
            <Button variant="outline" onClick={cancelConflict}>
              Keep Existing Cart
            </Button>
            <Button
              className="bg-[#fc8019] hover:bg-orange-600"
              onClick={confirmReplaceCart}
            >
              Start New Cart
            </Button>
          </>
        }
      />
    </div>
  );
}
