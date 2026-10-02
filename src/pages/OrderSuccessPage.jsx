import React from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, Bike, Clock, Home, Receipt } from 'lucide-react';
import { ROUTES } from '../constants/routes';
import { Button } from '../components/ui/Button';
import { VegNonVegIcon } from '../components/common/VegNonVegIcon';

const STEPS = ['Confirmed', 'Preparing', 'On the way', 'Delivered'];

export function OrderSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  // If someone navigates here directly without state, redirect to orders
  if (!order) {
    return (
      <div className="mx-auto max-w-xl text-center py-20 px-4">
        <CheckCircle2 className="mx-auto h-16 w-16 text-emerald-500 mb-4" />
        <h2 className="text-2xl font-black text-slate-900">Order Confirmed!</h2>
        <p className="text-slate-500 mt-2 text-sm">
          Your order has been placed. Check your orders for details.
        </p>
        <Link to={ROUTES.ORDERS}>
          <Button className="mt-6">View Orders</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 py-10 pb-16">
      <div className="rounded-3xl bg-white p-8 shadow-xl border border-slate-100">

        {/* ── Success animation ──────────────────────────────────── */}
        <div className="text-center mb-6">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-4">
            <CheckCircle2 className="h-12 w-12 stroke-[2]" />
          </div>
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Order Placed Successfully!
          </span>
          <h1 className="text-2xl font-black text-slate-900 mt-4">
            Thank you for your order!
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Order ID:{' '}
            <span className="font-bold text-slate-800">{order.id}</span>
          </p>
          {order.date && (
            <p className="text-xs text-slate-400 mt-1">{order.date}</p>
          )}
        </div>

        {/* ── Delivery tracking ─────────────────────────────────── */}
        <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 mb-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Bike className="h-5 w-5 text-[#fc8019]" />
              <span className="font-extrabold text-slate-900 text-sm">Estimated Delivery</span>
            </div>
            <span className="flex items-center gap-1 font-black text-emerald-700 text-sm bg-white px-3 py-1 rounded-lg border border-emerald-200">
              <Clock className="h-4 w-4" /> 25–35 mins
            </span>
          </div>

          {/* Step timeline */}
          <div className="relative flex items-start justify-between px-2">
            <div className="absolute top-3.5 left-6 right-6 h-0.5 bg-slate-200 z-0" />
            <div className="absolute top-3.5 left-6 w-[33%] h-0.5 bg-emerald-400 z-0" />
            {STEPS.map((step, i) => (
              <div key={step} className="relative z-10 flex flex-col items-center gap-1.5 w-1/4">
                <div
                  className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                    i === 0
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : i === 1
                      ? 'bg-emerald-500 border-emerald-500 text-white animate-pulse'
                      : 'bg-white border-slate-300 text-slate-400'
                  }`}
                >
                  {i < 2 ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </div>
                <span className={`text-[10px] font-semibold text-center leading-tight ${i < 2 ? 'text-emerald-700' : 'text-slate-400'}`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Restaurant + Order Summary ─────────────────────────── */}
        <div className="border border-slate-200 rounded-2xl overflow-hidden mb-6">
          {/* Restaurant header */}
          {order.restaurant && (
            <div className="flex items-center gap-3 p-4 bg-slate-50 border-b border-slate-100">
              <img
                src={order.restaurant.image}
                alt={order.restaurant.name}
                className="h-11 w-11 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="font-extrabold text-slate-900 text-sm truncate">{order.restaurant.name}</p>
                <p className="text-xs text-slate-500 truncate">{order.restaurant.location}</p>
              </div>
            </div>
          )}

          {/* Items */}
          <div className="px-4 divide-y divide-slate-100">
            {order.items?.map((item) => (
              <div key={item.id} className="flex items-center gap-2 py-2.5">
                <VegNonVegIcon isVeg={item.isVeg} size="sm" />
                <span className="flex-1 text-sm text-slate-700 truncate">
                  {item.quantity} × {item.name}
                </span>
                <span className="text-sm font-bold text-slate-900 shrink-0">
                  ₹{item.price * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center p-4 bg-slate-50 border-t border-slate-100">
            <span className="text-sm font-bold text-slate-800">Total Paid</span>
            <span className="text-lg font-black text-slate-900">₹{order.totalAmount}</span>
          </div>
        </div>

        {/* ── Delivery address / Payment ─────────────────────────── */}
        <div className="grid grid-cols-2 gap-3 mb-6 text-xs text-slate-600">
          {order.deliveryAddress && (
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <p className="font-bold text-slate-800 mb-0.5">Delivery Address</p>
              <p className="leading-relaxed">{order.deliveryAddress}</p>
            </div>
          )}
          {order.paymentMethod && (
            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
              <p className="font-bold text-slate-800 mb-0.5">Payment Method</p>
              <p>{order.paymentMethod}</p>
            </div>
          )}
        </div>

        {/* ── Action buttons ─────────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link to={ROUTES.HOME} className="flex-1">
            <Button size="lg" variant="outline" className="w-full font-bold">
              <Home className="h-4 w-4 mr-2" /> Back to Home
            </Button>
          </Link>
          <Link to={ROUTES.ORDERS} className="flex-1">
            <Button size="lg" className="w-full font-bold">
              <Receipt className="h-4 w-4 mr-2" /> View All Orders
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
