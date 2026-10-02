import React from 'react';
import { Star, Plus, Minus } from 'lucide-react';
import { VegNonVegIcon } from './VegNonVegIcon';
import { Button } from '../ui/Button';

export function FoodItemCard({ item, restaurant, quantity = 0, onAdd, onRemove }) {
  const { id, name, description, price, image, isVeg, rating, bestseller } = item;

  return (
    <div className="flex justify-between items-start gap-4 py-5 border-b border-slate-200 last:border-b-0 hover:bg-slate-50/50 p-3 rounded-2xl transition-colors">
      {/* Left side info */}
      <div className="flex-1 flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <VegNonVegIcon isVeg={isVeg} size="sm" />
          {bestseller && (
            <span className="flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
              <Star className="h-3 w-3 fill-amber-500 text-amber-500" />
              Bestseller
            </span>
          )}
        </div>

        <h4 className="font-bold text-slate-800 text-base leading-snug">{name}</h4>

        <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
          <span>₹{price}</span>
          {rating && (
            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              <Star className="h-2.5 w-2.5 fill-emerald-600 text-emerald-600" />
              {rating}
            </span>
          )}
        </div>

        {description && (
          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed max-w-lg">
            {description}
          </p>
        )}
      </div>

      {/* Right side image & Add button */}
      <div className="relative flex flex-col items-center shrink-0 w-32">
        <div className="h-28 w-32 overflow-hidden rounded-xl bg-slate-100 shadow-sm border border-slate-100">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Floating ADD Button */}
        <div className="-mt-5 z-10 shadow-md rounded-lg overflow-hidden bg-white border border-slate-200">
          {quantity > 0 ? (
            <div className="flex items-center h-9 px-2 bg-white text-[#fc8019] font-extrabold text-sm gap-3">
              <button
                onClick={() => onRemove(id)}
                className="hover:bg-slate-100 p-1 rounded transition-colors"
                title="Decrease"
              >
                <Minus className="h-3.5 w-3.5 stroke-[3]" />
              </button>
              <span className="w-4 text-center">{quantity}</span>
              <button
                onClick={() => onAdd(item, restaurant)}
                className="hover:bg-slate-100 p-1 rounded transition-colors"
                title="Increase"
              >
                <Plus className="h-3.5 w-3.5 stroke-[3]" />
              </button>
            </div>
          ) : (
            <Button
              onClick={() => onAdd(item, restaurant)}
              variant="outline"
              size="sm"
              className="h-9 px-6 font-extrabold text-[#fc8019] border-slate-200 hover:bg-orange-50 hover:border-orange-200 uppercase tracking-wider text-xs shadow-xs"
            >
              ADD
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
