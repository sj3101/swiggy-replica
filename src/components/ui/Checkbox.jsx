import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export const Checkbox = React.forwardRef(({ className, checked, onChange, label, id, ...props }, ref) => {
  return (
    <label htmlFor={id} className="inline-flex items-center gap-2 cursor-pointer select-none">
      <div className="relative flex items-center justify-center">
        <input
          type="checkbox"
          id={id}
          ref={ref}
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
          {...props}
        />
        <div
          className={cn(
            'h-5 w-5 rounded border border-slate-300 bg-white transition-all peer-checked:bg-[#fc8019] peer-checked:border-[#fc8019] peer-focus-visible:ring-2 peer-focus-visible:ring-orange-500 peer-focus-visible:ring-offset-1 flex items-center justify-center',
            className
          )}
        >
          {checked && <Check className="h-3.5 w-3.5 text-white stroke-[3]" />}
        </div>
      </div>
      {label && <span className="text-sm font-medium text-slate-700">{label}</span>}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';
