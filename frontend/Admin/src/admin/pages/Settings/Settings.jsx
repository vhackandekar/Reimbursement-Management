import React from 'react';
import { Save, Building2, Wallet, Users, Bell } from 'lucide-react';

export default function Settings() {
  const handleSave = (e) => {
    e.preventDefault();
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-4xl pb-10">
      <div>
        <h1 className="text-2xl font-bold text-white">Platform Settings</h1>
        <p className="text-slate-400 mt-1 text-sm">Configure global constraints and preferences.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* 🧩 Company Settings */}
        <div className="bg-[#1E293B] rounded-xl border border-slate-700/50 p-6 md:p-8">
          <h2 className="text-lg font-semibold text-white flex items-center mb-6">
            <Building2 className="w-5 h-5 mr-3 text-blue-400" /> Company Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
               <label className="text-sm font-medium text-slate-300">Company Name</label>
               <input type="text" defaultValue="Acme Corp" className="w-full px-4 py-2 bg-[#0F172A] border border-slate-700/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
             </div>
             <div className="space-y-2">
               <label className="text-sm font-medium text-slate-300">HQ Country</label>
               <select defaultValue="US" className="w-full px-4 py-2 bg-[#0F172A] border border-slate-700/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                 <option value="US">United States</option>
                 <option value="UK">United Kingdom</option>
               </select>
             </div>
             <div className="space-y-2">
               <label className="text-sm font-medium text-slate-300">Base Currency</label>
               <input type="text" readOnly value="USD - US Dollar" className="w-full px-4 py-2 bg-[#0F172A]/50 border border-slate-700/50 rounded-lg text-sm text-slate-400 outline-none cursor-not-allowed" />
             </div>
          </div>
        </div>

        {/* 🧩 Expense Settings */}
        <div className="bg-[#1E293B] rounded-xl border border-slate-700/50 p-6 md:p-8">
          <h2 className="text-lg font-semibold text-white flex items-center mb-6">
            <Wallet className="w-5 h-5 mr-3 text-green-400" /> Expense Settings
          </h2>
          <div className="space-y-5">
             <label className="flex items-center justify-between cursor-pointer p-4 rounded-lg border border-slate-700/50 bg-[#0F172A]">
               <div>
                 <span className="text-sm font-medium text-white block">Multi-currency Support</span>
                 <span className="text-xs text-slate-400 mt-0.5">Allow users to log expenses in foreign currencies</span>
               </div>
               <input type="checkbox" className="w-4 h-4 rounded border-slate-600 bg-transparent focus:ring-blue-500/50" />
             </label>

             <label className="flex items-center justify-between cursor-pointer p-4 rounded-lg border border-slate-700/50 bg-[#0F172A]">
               <div>
                 <span className="text-sm font-medium text-white block">Auto FX Conversion</span>
                 <span className="text-xs text-slate-400 mt-0.5">Automatically convert foreign expenses to base currency using live rates</span>
               </div>
               <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-600 bg-transparent focus:ring-blue-500/50" />
             </label>
          </div>
        </div>

        {/* 🧩 Approval Settings */}
        <div className="bg-[#1E293B] rounded-xl border border-slate-700/50 p-6 md:p-8">
          <h2 className="text-lg font-semibold text-white flex items-center mb-6">
            <Users className="w-5 h-5 mr-3 text-purple-400" /> Approval Settings
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2">
               <label className="text-sm font-medium text-slate-300">Default Approval Type</label>
               <select defaultValue="Sequential" className="w-full px-4 py-2 bg-[#0F172A] border border-slate-700/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                 <option value="Sequential">Sequential Flow</option>
                 <option value="Parallel">Parallel Consensus</option>
               </select>
             </div>
             <div className="space-y-2">
               <label className="text-sm font-medium text-slate-300">Default Requisite %</label>
               <input type="number" defaultValue="100" min="1" max="100" className="w-full px-4 py-2 bg-[#0F172A] border border-slate-700/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500" />
             </div>
          </div>
        </div>

        {/* 🧩 Notification Settings */}
        <div className="bg-[#1E293B] rounded-xl border border-slate-700/50 p-6 md:p-8">
          <h2 className="text-lg font-semibold text-white flex items-center mb-6">
            <Bell className="w-5 h-5 mr-3 text-amber-400" /> Notification Settings
          </h2>
          <div className="space-y-5">
             <label className="flex items-center justify-between cursor-pointer p-4 rounded-lg border border-slate-700/50 bg-[#0F172A]">
               <div>
                 <span className="text-sm font-medium text-white block">Email Alerts via System</span>
                 <span className="text-xs text-slate-400 mt-0.5">Send alerts for pending approvals, rejections, and new users</span>
               </div>
               <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-600 bg-transparent focus:ring-blue-500/50" />
             </label>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button type="submit" className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg flex items-center transition-colors shadow-sm">
            <Save className="w-4 h-4 mr-2" />
            Save Configurations
          </button>
        </div>

      </form>
    </div>
  );
}
