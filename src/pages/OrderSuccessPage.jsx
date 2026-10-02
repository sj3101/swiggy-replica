import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Bike, Clock, MapPin, Receipt, ArrowRight } from 'lucide-react';
import { ROUTES } from '../constants/routes';
import { Button } from '../components/ui/Button';

export function OrderSuccessPage() {
  const location = useLocation();
  const order = location.state?.order;

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
      <div className="rounded-3xl bg-white p-8 shadow-xl border border-slate-100 text-center">
        {/* Animated Check Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6 animate-bounce">
          <CheckCircle2 className="h-12 w-12 stroke-[2.5]" />
        </div>

        <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          Order Placed Successfully!
        </span>

        <h1 className="text-3xl font-black text-slate-900 mt-4 tracking-tight">
          Thank you for your order!
        </h1>
        <p className="text-sm text-slate-500 mt-1 font-medium">
          Order ID: <span className="font-bold text-slate-800">{order?.id || 'SWG-849201'}</span>
        </p>

        {/* Live Tracking Progress Bar */}
        <div className="mt-8 p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-left">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Bike className="h-6 w-6 text-[#fc8019]" />
              <span className="font-extrabold text-slate-900 text-base">Estimated Delivery</span>
            </div>
            <span className="flex items-center gap-1 font-black text-emerald-700 text-sm bg-white px-3 py-1 rounded-lg border border-emerald-200 shadow-2xs">
              <Clock className="h-4 w-4" /> 25 - 30 mins
            </span>
          </div>

          {/* Timeline steps */}
          <div className="relative flex items-center justify-between mt-6 px-2">
            <div className="absolute top-1/2 left-4 right-4 h-1 bg-emerald-200 -translate-y-1/2 z-0" />
            <div className="relative z-10 flex flex-col items-center gap-1">
              <div className="h-8 w-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">1</div>
              <span className="text-[11px] font-bold text-slate-800">Confirmed</span>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-1">
              <div className="h-8 w-8 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold animate-pulse">2</div>
              <span className="text-[11px] font-bold text-slate-800">Preparing</span>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-1">
              <div className="h-8 w-8 rounded-full bg-slate-300 text-slate-600 flex items-center justify-center text-xs font-bold">3</div>
              <span className="text-[11px] font-medium text-slate-500">On the way</span>
            </div>
            <div className="relative z-10 flex flex-col items-center gap-1">
              <div className="h-8 w-8 rounded-full bg-slate-300 text-slate-600 flex items-center justify-center text-xs font-bold">4</div>
              <span className="text-[11px] font-medium text-slate-500">Delivered</span>
            </div>
          </div>
        </div>

        {/* Order details summary if available */}
        {order && (
          <div className="mt-6 p-4 rounded-2xl bg-white border border-slate-200 text-left text-xs space-y-2">
            <div className="flex justify-between font-bold text-slate-800 text-sm border-b border-slate-100 pb-2">
              <span>{order.restaurant?.name}</span>
              <span>Total Paid: ₹{order.totalAmount}</span>
            </div>
            {order.items?.map((item) => (
              <div key={item.id} className="flex justify-between text-slate-600">
                <span>{item.quantity} x {item.name}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to={ROUTES.ORDERS} className="w-full sm:w-auto">
            <Button size="lg" className="w-full font-bold bg-[#fc8019] hover:bg-orange-600">
              <Receipt className="h-4 w-4 mr-2" /> VIEW ALL ORDERS
            </Button>
          </Link>
          <Link to={ROUTES.RESTAURANTS} className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="w-full font-bold">
              CONTINUE SHOPPING <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
