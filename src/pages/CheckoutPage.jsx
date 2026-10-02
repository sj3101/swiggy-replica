import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, MapPin, CreditCard, Smartphone, Banknote,
  CheckCircle2, ChevronRight, ShoppingBag
} from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { VegNonVegIcon } from '../components/common/VegNonVegIcon';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ROUTES } from '../constants/routes';
import { showSuccessToast, showErrorToast } from '../utils/toast';

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI / Google Pay / PhonePe', icon: Smartphone },
  { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
  { id: 'cod', label: 'Cash on Delivery', icon: Banknote },
];

const ADDRESSES = [
  { id: 'home', label: 'Home', address: '#42, 8th Main, 3rd Cross, Koramangala 4th Block, Bangalore - 560034' },
  { id: 'work', label: 'Work', address: 'Prestige Tech Park, Marathahalli, Bangalore - 560037' },
];

export function CheckoutPage() {
  const navigate = useNavigate();
  const { cartItems, cartRestaurant, cartTotal, clearCart, isEmpty } = useCart();

  const [selectedAddress, setSelectedAddress] = useState(ADDRESSES[0].id);
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [upiId, setUpiId] = useState('user@okhdfcbank');
  const [isPlacing, setIsPlacing] = useState(false);

  const deliveryFee = 35;
  const platformFee = 10;
  const codFee = selectedPayment === 'cod' ? 5 : 0;
  const gstTax = Math.round(cartTotal * 0.05);
  const grandTotal = cartTotal + deliveryFee + platformFee + codFee + gstTax;

  if (isEmpty) {
    return (
      <div className="mx-auto max-w-xl text-center py-20 px-4">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-orange-50 text-[#fc8019] mb-5">
          <ShoppingBag className="h-12 w-12" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Nothing to checkout</h2>
        <p className="text-slate-500 mt-2 text-sm">Your cart is empty. Add some items first.</p>
        <Link to={ROUTES.RESTAURANTS}>
          <Button size="lg" className="mt-6">BROWSE RESTAURANTS</Button>
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    if (selectedPayment === 'upi' && !upiId.trim()) {
      showErrorToast('Please enter a valid UPI ID to proceed.');
      return;
    }

    setIsPlacing(true);

    try {
      // Simulate a short network delay
      await new Promise((resolve) => setTimeout(resolve, 900));

      const currentAddress = ADDRESSES.find((a) => a.id === selectedAddress);
      const newOrder = {
        id: `SWG-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleString('en-IN', {
          day: 'numeric', month: 'short', year: 'numeric',
          hour: '2-digit', minute: '2-digit',
        }),
        restaurant: cartRestaurant,
        items: cartItems,
        totalAmount: grandTotal,
        status: 'Order Placed',
        paymentMethod: PAYMENT_METHODS.find((p) => p.id === selectedPayment)?.label || 'UPI',
        deliveryAddress: currentAddress?.address || '',
      };

      // Persist to localStorage
      const existing = JSON.parse(localStorage.getItem('swiggy_orders') || '[]');
      localStorage.setItem('swiggy_orders', JSON.stringify([newOrder, ...existing]));

      clearCart();
      showSuccessToast('🎉 Order placed successfully!');
      navigate(ROUTES.ORDER_SUCCESS, { state: { order: newOrder } });
    } catch (err) {
      console.error('Order placement failed:', err);
      showErrorToast('Failed to place order. Please try again.');
      setIsPlacing(false);
    }
  };

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 pb-16">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <Link to={ROUTES.CART} className="text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-black text-slate-900">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ── Left: Address + Payment ────────────────────────────── */}
        <div className="lg:col-span-7 space-y-6">

          {/* Delivery Address */}
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-[#fc8019]">
                <MapPin className="h-5 w-5" />
              </div>
              <h2 className="font-black text-slate-900 text-base">Delivery Address</h2>
            </div>

            <div className="space-y-3">
              {ADDRESSES.map((addr) => (
                <button
                  key={addr.id}
                  onClick={() => setSelectedAddress(addr.id)}
                  className={`w-full flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all ${
                    selectedAddress === addr.id
                      ? 'border-[#fc8019] bg-orange-50/50'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    selectedAddress === addr.id ? 'border-[#fc8019]' : 'border-slate-300'
                  }`}>
                    {selectedAddress === addr.id && (
                      <div className="h-2 w-2 rounded-full bg-[#fc8019]" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{addr.label}</p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{addr.address}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Method */}
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <CreditCard className="h-5 w-5" />
              </div>
              <h2 className="font-black text-slate-900 text-base">Payment Method</h2>
            </div>

            <div className="space-y-3">
              {PAYMENT_METHODS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setSelectedPayment(id)}
                  className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                    selectedPayment === id
                      ? 'border-emerald-500 bg-emerald-50/60'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    selectedPayment === id ? 'border-emerald-600' : 'border-slate-300'
                  }`}>
                    {selectedPayment === id && (
                      <div className="h-2 w-2 rounded-full bg-emerald-600" />
                    )}
                  </div>
                  <Icon className={`h-5 w-5 shrink-0 ${selectedPayment === id ? 'text-emerald-600' : 'text-slate-400'}`} />
                  <span className={`text-sm font-semibold ${selectedPayment === id ? 'text-emerald-800' : 'text-slate-700'}`}>
                    {label}
                  </span>
                  {id === 'cod' && (
                    <span className="ml-auto text-[10px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                      +₹5 fee
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* UPI ID input */}
            {selectedPayment === 'upi' && (
              <div className="mt-4">
                <label className="text-xs font-bold text-slate-600 mb-1 block">Enter UPI ID</label>
                <Input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="yourname@upi"
                  className="text-sm"
                />
              </div>
            )}
          </div>
        </div>

        {/* ── Right: Order Summary ───────────────────────────────── */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl bg-white shadow-md border border-slate-200 p-6 sticky top-24 space-y-5">
            <h3 className="text-base font-black text-slate-900">Order Summary</h3>

            {/* Restaurant */}
            {cartRestaurant && (
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <img
                  src={cartRestaurant.image}
                  alt={cartRestaurant.name}
                  className="h-11 w-11 rounded-xl object-cover shrink-0"
                />
                <div className="min-w-0">
                  <p className="font-bold text-slate-800 text-sm truncate">{cartRestaurant.name}</p>
                  <p className="text-xs text-slate-500 truncate">{cartRestaurant.location}</p>
                </div>
              </div>
            )}

            {/* Items */}
            <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-2">
                  <VegNonVegIcon isVeg={item.isVeg} size="sm" />
                  <span className="flex-1 text-xs font-medium text-slate-700 truncate">
                    {item.quantity} × {item.name}
                  </span>
                  <span className="text-xs font-bold text-slate-900 shrink-0">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Bill breakdown */}
            <div className="pt-3 border-t border-slate-100 space-y-2 text-sm text-slate-600">
              <div className="flex justify-between">
                <span>Item Total</span>
                <span className="font-semibold text-slate-800">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-semibold text-slate-800">₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fee</span>
                <span className="font-semibold text-slate-800">₹{platformFee}</span>
              </div>
              {codFee > 0 && (
                <div className="flex justify-between text-amber-600">
                  <span>Cash on Delivery Fee</span>
                  <span className="font-semibold">₹{codFee}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span className="font-semibold text-slate-800">₹{gstTax}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-between text-base font-black text-slate-900">
              <span>TO PAY</span>
              <span>₹{grandTotal}</span>
            </div>

            {/* Place Order */}
            <Button
              onClick={handlePlaceOrder}
              disabled={isPlacing}
              size="lg"
              className="w-full font-extrabold text-base bg-[#fc8019] hover:bg-orange-600 shadow-lg disabled:opacity-70"
            >
              {isPlacing ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Placing Order…
                </span>
              ) : (
                <>
                  <CheckCircle2 className="h-5 w-5 mr-2" />
                  PLACE ORDER • ₹{grandTotal}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
