import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight, DollarSign } from 'lucide-react';

export default function AdminLogin() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate login
    navigate('/admin/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0F172A] p-4 text-slate-900 dark:text-slate-200 font-sans">
      <div className="w-full max-w-md bg-white dark:bg-[#1E293B] rounded-2xl shadow-xl overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="p-8">
          <div className="mb-8 text-center">
            <div className="w-12 h-12 bg-blue-500 rounded-xl mx-auto flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-bold dark:text-white">Admin Login</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2">Sign in to ExpenseManagement</p>
          </div>
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <div className="relative">
                <Mail className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="email" required className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" placeholder="admin@company.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="password" required className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" placeholder="••••••••" />
              </div>
            </div>
            <button type="submit" className="w-full py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center">
              Login <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </form>
        </div>
        <div className="px-8 py-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0B0F19]/50 text-center">
          <p className="text-sm">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-blue-500 hover:text-blue-600 dark:text-blue-400">Signup</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
