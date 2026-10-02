import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Tag } from 'lucide-react';
import { RatingBadge } from './RatingBadge';
import { getRestaurantMenuPath } from '../../constants/routes';

export function RestaurantCard({ restaurant }) {
  const {
    id,
    name,
    image,
    cuisines = [],
    rating,
    deliveryTime,
    priceForTwo,
    location,
    offers,
    isVeg,
  } = restaurant;

  return (
    <Link
      to={getRestaurantMenuPath(id)}
      className="group relative flex flex-col rounded-2xl bg-white p-3 transition-all duration-300 hover:scale-[0.98] hover:shadow-xl border border-slate-100/80 cursor-pointer"
    >
      {/* Image container */}
      <div className="relative h-44 w-full overflow-hidden rounded-xl bg-slate-200">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Veg Only Tag if veg */}
        {isVeg && (
          <span className="absolute top-2.5 left-2.5 rounded-full bg-emerald-600/90 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-white backdrop-blur-xs uppercase shadow-sm">
            Pure Veg
          </span>
        )}

        {/* Offer Tag */}
        {offers && (
          <div className="absolute bottom-2 left-3 right-3 flex items-center gap-1.5 text-white font-extrabold text-sm tracking-tight drop-shadow-md">
            <Tag className="h-4 w-4 fill-amber-400 text-amber-500 shrink-0" />
            <span className="truncate uppercase">{offers}</span>
          </div>
        )}
      </div>

      {/* Details container */}
      <div className="mt-3 flex flex-col gap-1 px-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate font-bold text-slate-800 text-lg group-hover:text-[#fc8019] transition-colors">
            {name}
          </h3>
        </div>

        {/* Rating and Delivery time */}
        <div className="flex items-center gap-3 text-sm font-semibold text-slate-700 mt-0.5">
          <RatingBadge rating={rating} />
          <span className="h-1 w-1 rounded-full bg-slate-400" />
          <span className="flex items-center gap-1 text-slate-600 font-medium">
            <Clock className="h-3.5 w-3.5 text-slate-400" />
            {deliveryTime}
          </span>
        </div>

        {/* Cuisines */}
        <p className="truncate text-sm font-normal text-slate-500 mt-1">
          {cuisines.join(', ')}
        </p>

        {/* Location & Price */}
        <div className="mt-2 flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-medium text-slate-500">
          <span className="flex items-center gap-1 truncate max-w-[60%]">
            <MapPin className="h-3 w-3 text-slate-400 shrink-0" />
            <span className="truncate">{location.split(',')[0]}</span>
          </span>
          <span className="font-semibold text-slate-700">{priceForTwo}</span>
        </div>
      </div>
    </Link>
  );
}
