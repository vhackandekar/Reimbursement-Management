import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
  return (
    <div className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 min-h-[500px] transition-colors duration-200">
      <div className="flex items-center space-x-4 mb-8">
        <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-600 dark:text-emerald-400">
          <SettingsIcon className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Settings</h2>
          <p className="text-slate-500 dark:text-slate-400">Manage your profile and preferences</p>
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center h-64 text-center space-y-4">
        <SettingsIcon className="w-12 h-12 text-slate-300 dark:text-slate-700 animate-[spin_4s_linear_infinite]" />
        <h3 className="text-lg font-medium text-slate-900 dark:text-white">Settings Coming Soon</h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-sm">
          You'll be able to manage your account details and notification preferences here.
        </p>
      </div>
    </div>
  );
}
