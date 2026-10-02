import React from 'react';
import { UtensilsCrossed } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';

export function Footer() {
  return (
    <footer className="mt-auto bg-[#02060c] text-white pt-14 pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5 pb-12 border-b border-slate-800">
          {/* Logo & Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fc8019] text-white">
                <UtensilsCrossed className="h-5 w-5" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">swiggy</span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Order food from your favorite restaurants near you. Fast, reliable delivery with real-time live order tracking.
            </p>
            <p className="text-xs text-slate-500 mt-2">
              © 2026 Swiggy Web Replica. Built with React & Tailwind CSS.
            </p>
          </div>

          {/* Company */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-white text-base">Company</h4>
            <ul className="flex flex-col gap-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Swiggy Corporate</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Team</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Swiggy One</a></li>
            </ul>
          </div>

          {/* Contact us */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-white text-base">Contact us</h4>
            <ul className="flex flex-col gap-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors">Help & Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Partner with us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Ride with us</a></li>
            </ul>
          </div>

          {/* Available Cities */}
          <div className="flex flex-col gap-3">
            <h4 className="font-bold text-white text-base">We deliver to</h4>
            <ul className="flex flex-col gap-2 text-sm text-slate-400">
              <li><Link to={ROUTES.RESTAURANTS} className="hover:text-white transition-colors">Bangalore</Link></li>
              <li><Link to={ROUTES.RESTAURANTS} className="hover:text-white transition-colors">Gurgaon</Link></li>
              <li><Link to={ROUTES.RESTAURANTS} className="hover:text-white transition-colors">Hyderabad</Link></li>
              <li><Link to={ROUTES.RESTAURANTS} className="hover:text-white transition-colors">Delhi</Link></li>
              <li><Link to={ROUTES.RESTAURANTS} className="hover:text-white transition-colors">Mumbai</Link></li>
              <li><Link to={ROUTES.RESTAURANTS} className="hover:text-white transition-colors">Pune</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>By continuing past this page, you agree to our Terms of Service, Cookie Policy, Privacy Policy and Content Policies.</p>
          <div className="flex gap-4 font-medium">
            <a href="#" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
