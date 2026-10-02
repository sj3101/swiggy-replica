import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, Tag, MapPin, CreditCard, CheckCircle2 } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { VegNonVegIcon } from '../components/common/VegNonVegIcon';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ROUTES } from '../constants/routes';
import { showSuccessToast, showErrorToast } from '../utils/toast';

export function CartPage() {
  const navigate = useNavigate();
  const { cartItems, cartRestaurant, updateQuantity, clearCart, cartTotal, isEmpty } = useCart();
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState('');

  const deliveryFee = isEmpty ? 0 : 35;
  const platformFee = isEmpty ? 0 : 10;
  const gstTax = Math.round(cartTotal * 0.05);
  const finalTotal = Math.max(0, cartTotal + deliveryFee + platformFee + gstTax - discount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim()) return;

    if (couponCode.toUpperCase() === 'SWIGGY50') {
      const disc = Math.min(100, Math.round(cartTotal * 0.5));
      setDiscount(disc);
      setAppliedCoupon('SWIGGY50 (50% OFF up to ₹100)');
      showSuccessToast('Coupon SWIGGY50 applied successfully!');
    } else if (couponCode.toUpperCase() === 'WELCOME100') {
      setDiscount(100);
      setAppliedCoupon('WELCOME100 (FLAT ₹100 OFF)');
      showSuccessToast('Coupon WELCOME100 applied!');
    } else {
      showErrorToast('Invalid Coupon Code. Try SWIGGY50 or WELCOME100');
    }
  };

  const handleCheckout = () => {
    if (isEmpty) return;
    // Save placed order info into localStorage for /orders page
    const newOrder = {
      id: `SWG-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleString(),
      restaurant: cartRestaurant,
      items: cartItems,
      totalAmount: finalTotal,
      status: 'Order Placed',
    };

    try {
      const existingOrders = JSON.parse(localStorage.getItem('swiggy_orders') || '[]');
      localStorage.setItem('swiggy_orders', JSON.stringify([newOrder, ...existingOrders]));
    } catch (e) {
      console.error(e);
    }

    clearCart();
    navigate(ROUTES.ORDER_SUCCESS, { state: { order: newOrder } });
  };

  if (isEmpty) {
    return (
      <div className="mx-auto max-w-xl text-center py-20 px-4">
        <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-orange-50 text-[#fc8019] mb-6">
          <ShoppingBag className="h-16 w-16" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Your cart is empty</h2>
        <p className="text-slate-500 mt-2 text-sm">
          You can go to the home page or restaurants list to view more restaurants.
        </p>
        <Link to={ROUTES.RESTAURANTS}>
          <Button size="lg" className="mt-6 font-bold">
            SEE RESTAURANTS NEAR YOU
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-2 mb-6">
        <Link to={ROUTES.RESTAURANTS} className="text-slate-500 hover:text-slate-900">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-black text-slate-900">Cart Checkout</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Delivery address & Payment info */}
        <div className="lg:col-span-7 space-y-6">
          {/* Delivery Address Card */}
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-[#fc8019]">
                <MapPin className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Delivery Address</h3>
                <p className="text-xs text-slate-500">Home • Koramangala 4th Block, Bangalore</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium">
              #42, 8th Main, 3rd Cross, Koramangala 4th Block, Bangalore, Karnataka - 560034
            </p>
          </div>

          {/* Payment Method Card */}
          <div className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-600">
                <CreditCard className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base">Payment Method</h3>
                <p className="text-xs text-slate-500">Cash on Delivery / Pay Online</p>
              </div>
            </div>
            <div className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/50 flex items-center justify-between text-sm font-semibold text-emerald-800">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Pay on Delivery / UPI Available
              </span>
              <span className="text-xs font-bold bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded">
                DEFAULT
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Restaurant Cart Summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-white p-6 shadow-md border border-slate-200">
            {/* Restaurant header */}
            {cartRestaurant && (
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <img
                  src={cartRestaurant.image}
                  alt={cartRestaurant.name}
                  className="h-12 w-12 rounded-xl object-cover"
                />
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">{cartRestaurant.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{cartRestaurant.location}</p>
                </div>
              </div>
            )}

            {/* Cart items list */}
            <div className="py-4 divide-y divide-slate-100 max-h-80 overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div key={item.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2 flex-1">
                    <VegNonVegIcon isVeg={item.isVeg} size="sm" />
                    <div>
                      <h4 className="font-bold text-slate-800 text-sm leading-tight">{item.name}</h4>
                      <span className="text-xs text-slate-500 font-medium">₹{item.price} each</span>
                    </div>
                  </div>

                  {/* Quantity selector */}
                  <div className="flex items-center h-8 px-2 rounded-lg border border-slate-200 bg-slate-50 text-[#fc8019] font-bold text-xs gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="hover:bg-slate-200 p-0.5 rounded"
                    >
                      <Minus className="h-3 w-3 stroke-[3]" />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="hover:bg-slate-200 p-0.5 rounded"
                    >
                      <Plus className="h-3 w-3 stroke-[3]" />
                    </button>
                  </div>

                  <span className="font-extrabold text-slate-900 text-sm min-w-[50px] text-right">
                    ₹{item.price * item.quantity}
                  </span>
                </div>
              ))}
            </div>

            {/* Coupon Code Section */}
            <form onSubmit={handleApplyCoupon} className="mt-4 pt-4 border-t border-slate-100 flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Try SWIGGY50 or WELCOME100"
                  className="pl-9 text-xs uppercase font-bold"
                />
              </div>
              <Button type="submit" variant="secondary" size="sm" className="font-bold text-xs">
                Apply
              </Button>
            </form>

            {appliedCoupon && (
              <p className="mt-2 text-xs font-bold text-emerald-600 bg-emerald-50 p-2 rounded-lg border border-emerald-200">
                ✓ Applied: {appliedCoupon}
              </p>
            )}

            {/* Bill Details Breakdown */}
            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600 font-medium">
              <h4 className="font-bold text-slate-900 text-sm mb-3">Bill Details</h4>
              <div className="flex justify-between">
                <span>Item Total</span>
                <span className="font-bold text-slate-800">₹{cartTotal}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span className="font-bold text-slate-800">₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform Fee</span>
                <span className="font-bold text-slate-800">₹{platformFee}</span>
              </div>
              <div className="flex justify-between">
                <span>GST & Restaurant Charges</span>
                <span className="font-bold text-slate-800">₹{gstTax}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-bold">
                  <span>Coupon Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between pt-3 border-t border-slate-200 text-base font-black text-slate-900">
                <span>TO PAY</span>
                <span>₹{finalTotal}</span>
              </div>
            </div>

            {/* Clear Cart and Checkout */}
            <div className="mt-6 space-y-3">
              <Button
                onClick={handleCheckout}
                size="lg"
                className="w-full font-extrabold text-base bg-[#48c479] hover:bg-[#3db36c] shadow-lg"
              >
                PROCEED TO PAY • ₹{finalTotal}
              </Button>

              <Button
                onClick={clearCart}
                variant="ghost"
                size="sm"
                className="w-full text-xs text-slate-500 hover:text-rose-600"
              >
                <Trash2 className="h-3.5 w-3.5 mr-1" /> Clear Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
