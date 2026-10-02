import React from 'react';
import { cn } from '../../lib/utils';

export function VegNonVegIcon({ isVeg, size = 'md', className }) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2 p-[2px]',
    md: 'w-5 h-5 border-2 p-[2.5px]',
    lg: 'w-6 h-6 border-2 p-[3px]',
  };

  const innerDotSize = {
    sm: 'w-1.5 h-1.5',
    md: 'w-2 h-2',
    lg: 'w-2.5 h-2.5',
  };

  if (isVeg) {
    return (
      <div
        className={cn(
          'border-emerald-600 rounded-sm flex items-center justify-center shrink-0 bg-emerald-50/50',
          sizeClasses[size],
          className
        )}
        title="Pure Veg"
      >
        <div className={cn('rounded-full bg-emerald-600', innerDotSize[size])} />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'border-rose-600 rounded-sm flex items-center justify-center shrink-0 bg-rose-50/50',
        sizeClasses[size],
        className
      )}
      title="Non Veg"
    >
      <div
        className="w-0 h-0 border-l-[4px] border-r-[4px] border-b-[8px] border-l-transparent border-r-transparent border-b-rose-600"
      />
    </div>
  );
}
