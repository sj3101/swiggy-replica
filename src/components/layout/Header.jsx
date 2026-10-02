import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, MapPin, ChevronDown, User, HelpCircle, UtensilsCrossed, Menu, X } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { useCart } from '../../hooks/useCart';
import { Dialog } from '../ui/Dialog';

export function Header() {
  const location = useLocation();
  const { cartCount } = useCart();
  const [selectedLocation, setSelectedLocation] = useState('Koramangala, Bangalore');
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const locationsList = [
    'Koramangala, Bangalore',
    'Indiranagar, Bangalore',
    'HSR Layout, Bangalore',
    'Jayanagar, Bangalore',
    'Whitefield, Bangalore',
    'BTM Layout, Bangalore',
    'MG Road, Bangalore',
  ];

  const handleSaveLocation = (loc) => {
    setSelectedLocation(loc);
    setIsLocationDialogOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  const navLinkClass = (path) =>
    `flex items-center gap-1.5 py-2 px-2.5 rounded-lg font-semibold text-sm transition-colors hover:text-[#fc8019] ${
      isActive(path) ? 'text-[#fc8019]' : 'text-slate-700'
    }`;

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white shadow-sm border-b border-slate-100">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

          {/* ── Logo + Location ──────────────────────────────────── */}
          <div className="flex items-center gap-4 min-w-0">
            <Link
              to={ROUTES.HOME}
              className="flex items-center gap-2 group shrink-0"
              aria-label="Swiggy home"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fc8019] text-white shadow-md group-hover:scale-105 transition-transform">
                <UtensilsCrossed className="h-5 w-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 group-hover:text-[#fc8019] transition-colors hidden sm:inline">
                swiggy
              </span>
            </Link>

            {/* Location selector — desktop only */}
            <button
              onClick={() => setIsLocationDialogOpen(true)}
              aria-label="Change delivery location"
              className="hidden md:flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors group cursor-pointer max-w-[260px]"
            >
              <MapPin className="h-4 w-4 text-[#fc8019] shrink-0" />
              <span className="font-bold text-slate-900 border-b-2 border-slate-800 group-hover:border-[#fc8019] group-hover:text-[#fc8019] transition-colors truncate">
                {selectedLocation.split(',')[0]}
              </span>
              <span className="text-xs text-slate-400 font-normal truncate hidden lg:inline">
                , {selectedLocation.split(',')[1]}
              </span>
              <ChevronDown className="h-4 w-4 text-[#fc8019] shrink-0" />
            </button>
          </div>

          {/* ── Desktop Nav ──────────────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            <Link to={ROUTES.SEARCH} className={navLinkClass(ROUTES.SEARCH)}>
              <Search className="h-4 w-4" />
              <span className="hidden lg:inline">Search</span>
            </Link>

            <Link to={ROUTES.RESTAURANTS} className={navLinkClass(ROUTES.RESTAURANTS)}>
              <UtensilsCrossed className="h-4 w-4" />
              <span className="hidden lg:inline">Offers</span>
            </Link>

            <button
              onClick={() => alert('Swiggy Help center is available 24/7!')}
              className="flex items-center gap-1.5 py-2 px-2.5 rounded-lg font-semibold text-sm text-slate-700 hover:text-[#fc8019] transition-colors"
              aria-label="Help"
            >
              <HelpCircle className="h-4 w-4" />
              <span className="hidden lg:inline">Help</span>
            </button>

            <button
              onClick={() => alert('Sign In coming soon!')}
              className="flex items-center gap-1.5 py-2 px-2.5 rounded-lg font-semibold text-sm text-slate-700 hover:text-[#fc8019] transition-colors"
              aria-label="Sign in"
            >
              <User className="h-4 w-4" />
              <span className="hidden lg:inline">Sign In</span>
            </button>

            <Link
              to={ROUTES.CART}
              className={`relative flex items-center gap-1.5 py-2 px-2.5 rounded-lg font-semibold text-sm transition-colors hover:text-[#fc8019] ${
                isActive(ROUTES.CART) ? 'text-[#fc8019]' : 'text-slate-700'
              }`}
              aria-label={`Cart, ${cartCount} items`}
            >
              <div className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#fc8019] text-[10px] font-bold text-white">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </div>
              <span className="hidden lg:inline">Cart</span>
              {cartCount > 0 && (
                <span className="hidden lg:inline text-xs bg-orange-100 text-[#fc8019] px-1.5 py-0.5 rounded-full font-extrabold">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>

          {/* ── Mobile: Cart + Hamburger ──────────────────────────── */}
          <div className="flex items-center gap-2 md:hidden">
            <Link
              to={ROUTES.CART}
              className="relative p-2 text-slate-700 hover:text-[#fc8019] transition-colors"
              aria-label={`Cart, ${cartCount} items`}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#fc8019] text-[10px] font-bold text-white">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-[#fc8019] transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu Dropdown ─────────────────────────────── */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1">
            <button
              onClick={() => setIsLocationDialogOpen(true)}
              className="flex items-center gap-2 w-full p-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <MapPin className="h-4 w-4 text-[#fc8019]" />
              {selectedLocation}
            </button>
            <Link
              to={ROUTES.SEARCH}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 w-full p-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <Search className="h-4 w-4" /> Search
            </Link>
            <Link
              to={ROUTES.RESTAURANTS}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 w-full p-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <UtensilsCrossed className="h-4 w-4" /> Restaurants
            </Link>
            <Link
              to={ROUTES.ORDERS}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 w-full p-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50"
            >
              <ShoppingBag className="h-4 w-4" /> My Orders
            </Link>
          </div>
        )}
      </header>

      {/* ── Location Dialog ──────────────────────────────────────── */}
      <Dialog
        isOpen={isLocationDialogOpen}
        onClose={() => setIsLocationDialogOpen(false)}
        title="Select Delivery Location"
        description="Choose your location to find nearby restaurants."
      >
        <div className="flex flex-col gap-2 py-2">
          {locationsList.map((loc) => (
            <button
              key={loc}
              onClick={() => handleSaveLocation(loc)}
              className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                selectedLocation === loc
                  ? 'border-[#fc8019] bg-orange-50 text-[#fc8019] font-bold'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <MapPin className="h-4 w-4 text-[#fc8019] shrink-0" />
              <span className="text-sm">{loc}</span>
            </button>
          ))}
        </div>
      </Dialog>
    </>
  );
}
