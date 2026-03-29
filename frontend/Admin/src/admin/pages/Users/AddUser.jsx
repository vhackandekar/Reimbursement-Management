import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Mail, Key } from 'lucide-react';

export default function AddUser() {
  const navigate = useNavigate();
  const [role, setRole] = useState('Employee');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call to create user
    navigate('/admin/users');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-3xl mx-auto pb-10">
      <div className="flex items-center space-x-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-white dark:bg-[#1E293B] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg transition-colors border border-slate-200 dark:border-slate-700/50 shadow-sm">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Add New User</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Create a user profile, set access permissions, and generate credentials.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-slate-200 dark:border-slate-700/50 p-6 md:p-8 shadow-sm transition-colors duration-200">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
              <input type="text" required className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors shadow-sm" placeholder="e.g. Jane Doe" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
              <input type="email" required className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors shadow-sm" placeholder="jane@company.com" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none shadow-sm cursor-pointer">
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Manager</label>
              <select className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none shadow-sm cursor-pointer">
                <option value="">Select Manager...</option>
                <option value="sarah">Sarah Connor</option>
                <option value="john">John Smith</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Platform Access Level</label>
              <select className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none shadow-sm cursor-pointer">
                <option value="Standard">Standard (Default)</option>
                <option value="Full Access">Full Access (Admin Privileges)</option>
                <option value="Restricted">Restricted (View Only)</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Account Status</label>
              <select className="w-full px-4 py-2.5 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none shadow-sm cursor-pointer">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end pt-5 border-t border-slate-200 dark:border-slate-700/50 mt-8">
            <button type="button" onClick={() => navigate(-1)} className="px-5 py-2.5 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors mr-3">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg flex items-center transition-colors shadow-md shadow-blue-500/20">
              <Save className="w-4 h-4 mr-2" />
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
