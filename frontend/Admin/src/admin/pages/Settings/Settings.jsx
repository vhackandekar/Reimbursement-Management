import React from 'react';
import { Save, Building2, Wallet, Users, Bell } from 'lucide-react';

export default function Settings() {
  const handleSave = (e) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl pb-10 mx-auto font-sans">
      <div className="pt-2">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Platform Settings</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Configure global constraints and preferences.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* 🧩 Company Settings */}
        <div className="bg-white dark:bg-[#1E293B] rounded-[20px] shadow-sm border border-slate-200 dark:border-slate-700/50 p-6 md:p-8 transition-colors duration-200">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center mb-6">
            <Building2 className="w-5 h-5 mr-3 text-blue-500 dark:text-blue-400" /> Company Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-2">
               <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Company Name</label>
               <input type="text" defaultValue="Acme Corp" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors shadow-sm" />
             </div>
             <div className="space-y-2">
               <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">HQ Country</label>
               <div className="relative">
                 <select defaultValue="US" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition-colors shadow-sm cursor-pointer">
                   <option value="US">United States</option>
                   <option value="UK">United Kingdom</option>
                 </select>
                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                   <svg className="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                 </div>
               </div>
             </div>
             <div className="space-y-2">
               <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Base Currency</label>
               <input type="text" readOnly value="USD - US Dollar" className="w-full px-4 py-2.5 bg-slate-100 dark:bg-[#0F172A]/50 border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm text-slate-500 dark:text-slate-400 font-medium outline-none cursor-not-allowed shadow-none" />
             </div>
          </div>
        </div>

        {/* 🧩 Expense Settings */}
        <div className="bg-white dark:bg-[#1E293B] rounded-[20px] shadow-sm border border-slate-200 dark:border-slate-700/50 p-6 md:p-8 transition-colors duration-200">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center mb-6">
            <Wallet className="w-5 h-5 mr-3 text-green-500 dark:text-green-400" /> Expense Settings
          </h2>
          <div className="space-y-4">
             <label className="flex items-center justify-between cursor-pointer p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50 dark:bg-[#0F172A] transition-colors shadow-sm">
               <div className="pr-8">
                 <span className="text-sm font-bold text-slate-900 dark:text-white block mb-0.5">Multi-currency Support</span>
                 <span className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">Allow users to log expenses in foreign currencies</span>
               </div>
               <input type="checkbox" className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-transparent text-blue-600 focus:ring-blue-500/50 cursor-pointer" />
             </label>

             <label className="flex items-center justify-between cursor-pointer p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50 dark:bg-[#0F172A] transition-colors shadow-sm">
               <div className="pr-8">
                 <span className="text-sm font-bold text-slate-900 dark:text-white block mb-0.5">Auto FX Conversion</span>
                 <span className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">Automatically convert foreign expenses to base currency using live rates</span>
               </div>
               <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-transparent text-blue-600 focus:ring-blue-500/50 cursor-pointer" />
             </label>
          </div>
        </div>

        {/* 🧩 Approval Settings */}
        <div className="bg-white dark:bg-[#1E293B] rounded-[20px] shadow-sm border border-slate-200 dark:border-slate-700/50 p-6 md:p-8 transition-colors duration-200">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center mb-6">
            <Users className="w-5 h-5 mr-3 text-purple-500 dark:text-purple-400" /> Approval Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-2">
               <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Default Approval Type</label>
               <div className="relative">
                 <select defaultValue="Sequential" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none transition-colors shadow-sm cursor-pointer">
                   <option value="Sequential">Sequential Flow</option>
                   <option value="Parallel">Parallel Consensus</option>
                 </select>
                 <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                   <svg className="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                 </div>
               </div>
             </div>
             <div className="space-y-2">
               <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Default Requisite %</label>
               <div className="relative">
                 <input type="number" defaultValue="100" min="1" max="100" className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm text-slate-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors shadow-sm" />
                 <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400">%</span>
               </div>
             </div>
          </div>
        </div>

        {/* 🧩 Notification Settings */}
        <div className="bg-white dark:bg-[#1E293B] rounded-[20px] shadow-sm border border-slate-200 dark:border-slate-700/50 p-6 md:p-8 transition-colors duration-200">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center mb-6">
            <Bell className="w-5 h-5 mr-3 text-amber-500 dark:text-amber-400" /> Notification Settings
          </h2>
          <div className="space-y-4">
             <label className="flex items-center justify-between cursor-pointer p-4 rounded-xl border border-slate-200 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50 dark:bg-[#0F172A] transition-colors shadow-sm">
               <div className="pr-8">
                 <span className="text-sm font-bold text-slate-900 dark:text-white block mb-0.5">Email Alerts via System</span>
                 <span className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">Send alerts for pending approvals, rejections, and new users</span>
               </div>
               <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 bg-white dark:bg-transparent text-blue-600 focus:ring-blue-500/50 cursor-pointer" />
             </label>
          </div>
        </div>

        <div className="flex justify-end pt-4 pb-12">
          <button type="submit" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold tracking-wide rounded-xl flex items-center transition-all shadow-md shadow-blue-500/20 active:scale-95">
            <Save className="w-4 h-4 mr-2" />
            Save Configurations
          </button>
        </div>

      </form>
    </div>
  );
}
