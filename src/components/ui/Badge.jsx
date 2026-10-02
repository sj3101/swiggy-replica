import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-[#fc8019] text-white hover:bg-[#e37113]',
        secondary: 'border-transparent bg-slate-100 text-slate-800 hover:bg-slate-200',
        destructive: 'border-transparent bg-red-500 text-white hover:bg-red-600',
        outline: 'text-slate-950 border border-slate-200',
        success: 'border-transparent bg-emerald-600 text-white',
        veg: 'border-emerald-600 text-emerald-700 bg-emerald-50 border',
        nonVeg: 'border-rose-600 text-rose-700 bg-rose-50 border',
        rating: 'bg-emerald-700 text-white gap-1 font-bold',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
