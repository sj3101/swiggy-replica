import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../lib/utils';

export function RatingBadge({ rating, className }) {
  const getBgColor = (val) => {
    if (val >= 4.5) return 'bg-emerald-700 text-white';
    if (val >= 4.0) return 'bg-emerald-600 text-white';
    if (val >= 3.5) return 'bg-amber-500 text-white';
    return 'bg-orange-500 text-white';
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-bold tracking-tight shadow-2xs',
        getBgColor(rating),
        className
      )}
    >
      <Star className="h-3 w-3 fill-current text-white stroke-none" />
      <span>{rating ? rating.toFixed(1) : 'NEW'}</span>
    </div>
  );
}
