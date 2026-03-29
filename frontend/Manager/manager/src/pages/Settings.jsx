import React from 'react';
import { Settings as SettingsIcon } from 'lucide-react';

export default function Settings() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-20 text-slate-400 opacity-40">
      <SettingsIcon className="w-16 h-16 mb-4" />
      <h2 className="text-xl font-black uppercase tracking-widest">Settings Under Construction</h2>
    </div>
  );
}
