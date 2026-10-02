import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { VegNonVegIcon } from '../components/common/VegNonVegIcon';
import { Button } from '../components/ui/Button';
import { ROUTES } from '../constants/routes';

export function CartPage() {
  const { cartItems, cartRestaurant, updateQuantity, removeFromCart, clearCart, cartTotal, isEmpty } = useCart();

  const deliveryFee = 35;
  const platformFee = 10;
  const gstTax = Math.round(cartTotal * 0.05);
  const grandTotal = cartTotal + deliveryFee + platformFee + gstTax;

  /* ── Empty state ─────────────────────────────────────────────── */
  if (isEmpty) {
    return (
      <div className="mx-auto max-w-xl text-center py-20 px-4">
        <div className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-orange-50 text-[#fc8019] mb-6">
          <ShoppingBag className="h-16 w-16" />
        </div>
        <h2 className="text-2xl font-black text-slate-900">Your cart is empty</h2>
        <p className="text-slate-500 mt-2 text-sm">
          Looks like you haven't added anything yet. Let's fix that!
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
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Link to={ROUTES.RESTAURANTS} className="text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-2xl font-black text-slate-900">Your Cart</h1>
        {cartRestaurant && (
          <span className="text-sm text-slate-500 font-medium">
            • {cartRestaurant.name}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ── Left: Cart Items ─────────────────────────────────────── */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl bg-white shadow-sm border border-slate-200 overflow-hidden">
            {/* Restaurant banner */}
            {cartRestaurant && (
              <div className="flex items-center gap-3 p-4 border-b border-slate-100 bg-slate-50">
                <img
                  src={cartRestaurant.image}
                  alt={cartRestaurant.name}
                  className="h-12 w-12 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-extrabold text-slate-900 text-base truncate">{cartRestaurant.name}</h3>
                  <p className="text-xs text-slate-500 truncate">{cartRestaurant.location}</p>
                </div>
                <Link to={`/restaurant/${cartRestaurant.id}`}>
                  <Button variant="outline" size="sm" className="text-xs font-bold shrink-0">
                    Add More
                  </Button>
                </Link>
              </div>
            )}

            {/* Items */}
            <div className="divide-y divide-slate-100 px-4">
              {cartItems.map((item) => (
                <div key={item.id} className="py-4 flex items-center gap-3">
                  {/* Veg/NonVeg + Name */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <VegNonVegIcon isVeg={item.isVeg} size="sm" />
                      <h4 className="font-bold text-slate-800 text-sm truncate">{item.name}</h4>
                    </div>
                    <span className="text-xs text-slate-500">₹{item.price} each</span>
                  </div>

                  {/* Quantity stepper */}
                  <div className="flex items-center gap-1 rounded-lg border border-[#fc8019] bg-white text-[#fc8019] font-bold text-sm overflow-hidden shrink-0">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2.5 py-1.5 hover:bg-orange-50 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3.5 w-3.5 stroke-[3]" />
                    </button>
                    <span className="w-6 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2.5 py-1.5 hover:bg-orange-50 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3.5 w-3.5 stroke-[3]" />
                    </button>
                  </div>

                  {/* Subtotal */}
                  <span className="font-extrabold text-slate-900 text-sm min-w-[56px] text-right">
                    ₹{item.price * item.quantity}
                  </span>

                  {/* Remove */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-slate-300 hover:text-red-500 transition-colors ml-1 shrink-0"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Clear cart */}
            <div className="px-4 pb-4 pt-2">
              <button
                onClick={clearCart}
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-red-500 transition-colors font-medium"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Clear entire cart
              </button>
            </div>
          </div>
        </div>

        {/* ── Right: Bill Summary ──────────────────────────────────── */}
        <div className="lg:col-span-5">
          <div className="rounded-3xl bg-white shadow-md border border-slate-200 p-6 sticky top-24">
            <h3 className="text-base font-black text-slate-900 mb-4">Bill Details</h3>

            <div className="space-y-2.5 text-sm text-slate-600">
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
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 flex justify-between text-base font-black text-slate-900">
              <span>Grand Total</span>
              <span>₹{grandTotal}</span>
            </div>

            {/* Proceed to Checkout */}
            <Link to="/checkout" className="block mt-6">
              <Button size="lg" className="w-full font-extrabold text-base bg-[#48c479] hover:bg-[#3db36c] shadow-md">
                PROCEED TO CHECKOUT
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>

            <p className="mt-3 text-center text-xs text-slate-400 font-medium">
              You'll choose a payment method on the next step.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
