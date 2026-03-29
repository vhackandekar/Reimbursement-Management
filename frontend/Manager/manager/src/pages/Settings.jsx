import React, { useState } from 'react';
import { 
  User, Settings as SettingsIcon, Bell, Shield, 
  Moon, Sun, Globe, Save, Camera, Mail, 
  Phone, Lock, Eye, EyeOff
} from 'lucide-react';

const SettingsTab = ({ icon: Icon, label, isActive, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center space-x-3 px-6 py-4 border-l-4 transition-all ${
      isActive 
        ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-900/10 text-blue-600 dark:text-blue-400 font-bold' 
        : 'border-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800/40 hover:text-slate-700 dark:hover:text-slate-300 font-semibold'
    }`}
  >
    <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
    <span className="text-sm tracking-wide">{label}</span>
  </button>
);

const InputGroup = ({ label, icon: Icon, type = "text", placeholder, value }) => (
  <div className="space-y-1.5">
    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest pl-1">{label}</label>
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
        <Icon className="w-4 h-4" />
      </div>
      <input 
        type={type} 
        placeholder={placeholder}
        defaultValue={value}
        className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm font-semibold text-slate-900 dark:text-white" 
      />
    </div>
  </div>
);

const ToggleGroup = ({ label, description, checked, onChange }) => (
  <div className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800 last:border-0 hover:bg-slate-50/50 dark:hover:bg-slate-800/20 px-4 -mx-4 rounded-xl transition-all">
    <div className="space-y-0.5">
      <p className="text-sm font-bold text-slate-800 dark:text-white">{label}</p>
      <p className="text-xs text-slate-500 font-medium">{description}</p>
    </div>
    <button 
      onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${checked ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'}`}
    >
      <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 transform ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  </div>
);

export default function Settings() {
  const [activeTab, setActiveTab] = useState('profile');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    approvals: true,
    teamSpend: true
  });

  const [profile, setProfile] = useState({
    name: 'Michael Connor',
    email: 'michael.c@company.com',
    phone: '+1 (555) 012-3456',
    role: 'Senior Department Manager'
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="space-y-1">
        <p className="text-blue-600 dark:text-blue-400 text-[11px] font-bold uppercase tracking-[0.2em] italic">Workspace Management</p>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Account Settings</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:w-64 flex flex-col bg-white dark:bg-[#1E293B] rounded-[32px] border border-slate-200 dark:border-slate-800 p-2 shadow-sm shrink-0 h-fit">
          <SettingsTab icon={User} label="My Profile" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
          <SettingsTab icon={Bell} label="Notifications" isActive={activeTab === 'notifications'} onClick={() => setActiveTab('notifications')} />
          <SettingsTab icon={Shield} label="Security" isActive={activeTab === 'security'} onClick={() => setActiveTab('security')} />
          <SettingsTab icon={Globe} label="Localization" isActive={activeTab === 'localization'} onClick={() => setActiveTab('localization')} />
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white dark:bg-[#1E293B] rounded-[32px] border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
          {activeTab === 'profile' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <div className="relative group">
                  <div className="w-24 h-24 rounded-[32px] bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl shadow-blue-500/20 group-hover:scale-105 transition-transform duration-300">
                    MC
                  </div>
                  <button className="absolute -bottom-1 -right-1 p-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white">{profile.name}</h4>
                  <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{profile.role}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                <InputGroup label="Full Name" icon={User} value={profile.name} />
                <InputGroup label="Email Address" icon={Mail} value={profile.email} />
                <InputGroup label="Phone Number" icon={Phone} value={profile.phone} />
                <InputGroup label="Role Title" icon={Shield} value={profile.role} />
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end">
                <button className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all">
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div className="space-y-1 py-1 border-b border-slate-100 dark:border-slate-800">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Notification Preferences</h4>
                <p className="text-sm text-slate-500 font-medium">Manage how and when you receive updates.</p>
              </div>

              <div className="space-y-2">
                <ToggleGroup 
                  label="Email Notifications" 
                  description="Receive weekly summaries and spend alerts via email." 
                  checked={notifications.email} 
                  onChange={() => setNotifications({...notifications, email: !notifications.email})} 
                />
                <ToggleGroup 
                  label="Push Notifications" 
                  description="Get instant browser alerts for new approval requests." 
                  checked={notifications.push} 
                  onChange={() => setNotifications({...notifications, push: !notifications.push})} 
                />
                <ToggleGroup 
                  label="New Approvals" 
                  description="Notify me as soon as a team member submits an expense." 
                  checked={notifications.approvals} 
                  onChange={() => setNotifications({...notifications, approvals: !notifications.approvals})} 
                />
                <ToggleGroup 
                  label="Team Overspend Alerts" 
                  description="Receive priority alerts when monthly budgets are exceeded." 
                  checked={notifications.teamSpend} 
                  onChange={() => setNotifications({...notifications, teamSpend: !notifications.teamSpend})} 
                />
              </div>

              <div className="pt-6 flex justify-end">
                <button className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all">
                  <Save className="w-4 h-4" />
                  <span>Update Preferences</span>
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-8">
               <div className="space-y-1 py-1 border-b border-slate-100 dark:border-slate-800">
                <h4 className="text-lg font-bold text-slate-900 dark:text-white">Security & Access</h4>
                <p className="text-sm text-slate-500 font-medium">Protect your account with a strong password.</p>
              </div>

              <div className="space-y-6 max-w-md">
                <InputGroup label="Current Password" icon={Lock} type="password" placeholder="••••••••" />
                <InputGroup label="New Password" icon={Lock} type="password" placeholder="Min. 8 characters" />
                <InputGroup label="Confirm New Password" icon={Lock} type="password" placeholder="Re-type new password" />
              </div>

              <div className="pt-6 flex justify-end">
                <button className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white text-xs font-bold uppercase tracking-widest rounded-xl shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-95 transition-all">
                  <Lock className="w-4 h-4" />
                  <span>Update Password</span>
                </button>
              </div>
            </div>
          )}

          {(activeTab === 'localization') && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400 opacity-40">
              <Globe className="w-16 h-16 mb-4" />
              <h2 className="text-xl font-bold uppercase tracking-widest">Module Under Construction</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
