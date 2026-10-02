import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, MapPin, ChevronDown, User, HelpCircle, UtensilsCrossed, Receipt } from 'lucide-react';
import { ROUTES } from '../../constants/routes';
import { useCart } from '../../hooks/useCart';
import { Dialog } from '../ui/Dialog';
import { Button } from '../ui/Button';

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();
  const [selectedLocation, setSelectedLocation] = useState('Koramangala, Bangalore');
  const [isLocationDialogOpen, setIsLocationDialogOpen] = useState(false);
  const [tempLocation, setTempLocation] = useState(selectedLocation);

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

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-white shadow-xs border-b border-slate-100">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Left section: Logo & Location */}
          <div className="flex items-center gap-6">
            <Link to={ROUTES.HOME} className="flex items-center gap-2 group">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#fc8019] text-white shadow-md group-hover:scale-105 transition-transform">
                <UtensilsCrossed className="h-6 w-6" />
              </div>
              <span className="text-2xl font-black tracking-tight text-slate-900 group-hover:text-[#fc8019] transition-colors">
                swiggy
              </span>
            </Link>

            {/* Location selector */}
            <button
              onClick={() => setIsLocationDialogOpen(true)}
              className="hidden md:flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 transition-colors group cursor-pointer"
            >
              <MapPin className="h-4 w-4 text-[#fc8019]" />
              <span className="font-bold text-slate-900 border-b-2 border-slate-900 group-hover:border-[#fc8019] group-hover:text-[#fc8019] transition-colors truncate max-w-[180px]">
                {selectedLocation.split(',')[0]}
              </span>
              <span className="text-xs text-slate-400 font-normal truncate max-w-[120px]">
                , {selectedLocation.split(',')[1]}
              </span>
              <ChevronDown className="h-4 w-4 text-[#fc8019] stroke-[2.5]" />
            </button>
          </div>

          {/* Right section: Navigation Links */}
          <nav className="flex items-center gap-6 font-semibold text-slate-700 text-sm">
            <Link
              to={ROUTES.SEARCH}
              className={`flex items-center gap-2 py-2 px-3 rounded-lg hover:text-[#fc8019] transition-colors ${
                location.pathname === ROUTES.SEARCH ? 'text-[#fc8019]' : ''
              }`}
            >
              <Search className="h-5 w-5" />
              <span className="hidden sm:inline">Search</span>
            </Link>

            <Link
              to={ROUTES.RESTAURANTS}
              className={`flex items-center gap-2 py-2 px-3 rounded-lg hover:text-[#fc8019] transition-colors ${
                location.pathname === ROUTES.RESTAURANTS ? 'text-[#fc8019]' : ''
              }`}
            >
              <UtensilsCrossed className="h-5 w-5" />
              <span className="hidden sm:inline">Restaurants</span>
            </Link>

            <Link
              to={ROUTES.ORDERS}
              className={`flex items-center gap-2 py-2 px-3 rounded-lg hover:text-[#fc8019] transition-colors ${
                location.pathname === ROUTES.ORDERS ? 'text-[#fc8019]' : ''
              }`}
            >
              <Receipt className="h-5 w-5" />
              <span className="hidden sm:inline">Orders</span>
            </Link>

            <Link
              to={ROUTES.CART}
              className={`relative flex items-center gap-2 py-2 px-3 rounded-lg hover:text-[#fc8019] transition-colors ${
                location.pathname === ROUTES.CART ? 'text-[#fc8019]' : ''
              }`}
            >
              <div className="relative">
                <ShoppingBag className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#fc8019] text-[10px] font-bold text-white shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Cart</span>
              {cartCount > 0 && (
                <span className="ml-1 text-xs bg-orange-100 text-[#fc8019] px-2 py-0.5 rounded-full font-extrabold">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => alert('Swiggy Help center is available 24/7!')}
              className="hidden lg:flex items-center gap-2 py-2 px-3 hover:text-[#fc8019] transition-colors"
            >
              <HelpCircle className="h-5 w-5" />
              <span>Help</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Location Dialog */}
      <Dialog
        isOpen={isLocationDialogOpen}
        onClose={() => setIsLocationDialogOpen(false)}
        title="Select Delivery Location"
        description="Choose your location to view nearby restaurants and quick delivery items."
      >
        <div className="flex flex-col gap-3 py-2">
          {locationsList.map((loc) => (
            <button
              key={loc}
              onClick={() => handleSaveLocation(loc)}
              className={`flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                selectedLocation === loc
                  ? 'border-[#fc8019] bg-orange-50/50 text-[#fc8019] font-bold'
                  : 'border-slate-200 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <MapPin className="h-5 w-5 text-[#fc8019] shrink-0" />
              <span>{loc}</span>
            </button>
          ))}
        </div>
      </Dialog>
    </>
  );
}
