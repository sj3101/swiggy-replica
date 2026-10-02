import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Receipt, CheckCircle, Clock, ShoppingBag, ArrowRight } from 'lucide-react';
import { ROUTES } from '../constants/routes';
import { Button } from '../components/ui/Button';

export function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('swiggy_orders');
      if (stored) {
        setOrders(JSON.parse(stored));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-[#fc8019]">
          <Receipt className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-slate-900">Your Past Orders</h1>
          <p className="text-xs text-slate-500 font-medium">Track your orders and view bill summaries</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 shadow-xs">
          <ShoppingBag className="mx-auto h-16 w-16 text-slate-300 mb-3" />
          <h3 className="text-xl font-bold text-slate-800">No past orders yet</h3>
          <p className="text-slate-500 text-sm mt-1">
            When you place an order, it will appear here so you can reorder easily.
          </p>
          <Link to={ROUTES.RESTAURANTS}>
            <Button className="mt-6 font-bold">START ORDERING</Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-3xl bg-white p-6 shadow-sm border border-slate-200 flex flex-col md:flex-row justify-between gap-6 hover:shadow-md transition-shadow"
            >
              {/* Order Info */}
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-bold text-[#fc8019] bg-orange-50 px-2.5 py-1 rounded-full border border-orange-100">
                      ORDER ID: {order.id}
                    </span>
                    <p className="text-xs text-slate-400 font-medium mt-1.5 flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {order.date}
                    </p>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    {order.status || 'Delivered'}
                  </span>
                </div>

                {/* Restaurant */}
                {order.restaurant && (
                  <div className="mt-4 flex items-center gap-3">
                    <img
                      src={order.restaurant.image}
                      alt={order.restaurant.name}
                      className="h-12 w-12 rounded-xl object-cover"
                    />
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-base">{order.restaurant.name}</h4>
                      <p className="text-xs text-slate-500">{order.restaurant.location}</p>
                    </div>
                  </div>
                )}

                {/* Items summary */}
                <div className="mt-4 text-xs text-slate-700 space-y-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {order.items?.map((item) => (
                    <div key={item.id} className="flex justify-between font-medium">
                      <span>
                        {item.quantity} x {item.name}
                      </span>
                      <span className="font-bold text-slate-900">₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total & Actions */}
              <div className="flex md:flex-col justify-between items-end md:justify-center border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 shrink-0 gap-3">
                <div className="text-left md:text-right">
                  <span className="text-xs text-slate-400 font-medium block">Total Paid</span>
                  <span className="text-xl font-black text-slate-900">₹{order.totalAmount}</span>
                </div>

                {order.restaurant && (
                  <Link to={`/restaurant/${order.restaurant.id}`}>
                    <Button size="sm" variant="outline" className="font-bold text-xs">
                      REORDER <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
