import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Globe, ArrowRight } from 'lucide-react';

export default function AdminSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirm: '', country: 'US' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app: call register API, create company + admin, set currency based on country
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0F172A] p-4 text-slate-900 dark:text-slate-200 font-sans">
      <div className="w-full max-w-md bg-white dark:bg-[#1E293B] rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="p-8">
          <div className="mb-6 text-center shadow-none">
            <h2 className="text-xl font-bold dark:text-white">Admin (Company) Signup Page</h2>
            <p className="text-xs text-red-500 mt-1 font-medium">1 admin user per company</p>
          </div>
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1.5">Name</label>
              <div className="relative">
                <User className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" required className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" placeholder="John Doe" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="email" required className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" placeholder="admin@company.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="password" required className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" placeholder="••••••••" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="password" required className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" placeholder="••••••••" />
              </div>
            </div>
            <div className="pt-2">
              <label className="block text-sm font-medium mb-1.5">Country Selection</label>
              <div className="relative">
                <Globe className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <select className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                   <option value="US">United States (USD)</option>
                   <option value="UK">United Kingdom (GBP)</option>
                   <option value="IN">India (INR)</option>
                   <option value="EU">Europe (EUR)</option>
                </select>
              </div>
            </div>
            
            <button type="submit" className="w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors mt-6">
              Create Company Account
            </button>
          </form>
        </div>
        <div className="px-8 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F19]/50 text-center">
            <p className="text-sm">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400">Login</Link>
            </p>
        </div>
      </div>
    </div>
  );
}
