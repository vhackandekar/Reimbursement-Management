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
    <div className="space-y-6 animate-in fade-in duration-300 max-w-2xl">
      <div className="flex items-center space-x-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-[#1E293B] hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors border border-slate-700/50">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">Add New User</h1>
          <p className="text-slate-400 mt-1 text-sm">Create a user profile and generate credentials.</p>
        </div>
      </div>

      <div className="bg-[#1E293B] rounded-xl border border-slate-700/50 p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Full Name</label>
              <input type="text" required className="w-full px-4 py-2 bg-[#0F172A] border border-slate-700/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" placeholder="e.g. Jane Doe" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Email Address</label>
              <input type="email" required className="w-full px-4 py-2 bg-[#0F172A] border border-slate-700/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors" placeholder="jane@company.com" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Role</label>
              <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full px-4 py-2 bg-[#0F172A] border border-slate-700/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                <option value="Employee">Employee</option>
                <option value="Manager">Manager</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Manager</label>
              <select className="w-full px-4 py-2 bg-[#0F172A] border border-slate-700/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                <option value="">Select Manager...</option>
                <option value="sarah">Sarah Connor</option>
                <option value="john">John Smith</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Account Status</label>
              <select className="w-full px-4 py-2 bg-[#0F172A] border border-slate-700/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          
          <div className="border-t border-slate-700/50 pt-6 mt-6">
             <h3 className="text-base font-semibold text-white mb-4">Onboarding Actions</h3>
             
             <div className="space-y-4">
                <label className="flex items-start space-x-3 cursor-pointer group">
                  <div className="relative flex items-center h-5">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-600 bg-[#0F172A] text-blue-500 focus:ring-blue-500/50 focus:ring-offset-0" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors flex items-center">
                      <Key className="w-4 h-4 mr-2 text-blue-400" />
                      Auto-generate Password
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5">A secure random password will be created for this user.</span>
                  </div>
                </label>

                <label className="flex items-start space-x-3 cursor-pointer group">
                  <div className="relative flex items-center h-5">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-slate-600 bg-[#0F172A] text-blue-500 focus:ring-blue-500/50 focus:ring-offset-0" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors flex items-center">
                      <Mail className="w-4 h-4 mr-2 text-blue-400" />
                      Send Welcome Email
                    </span>
                    <span className="text-xs text-slate-500 mt-0.5">Email containing credentials will be sent immediately after creation.</span>
                  </div>
                </label>
             </div>
          </div>

          <div className="flex justify-end pt-4">
            <button type="button" onClick={() => navigate(-1)} className="px-5 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors mr-3">
              Cancel
            </button>
            <button type="submit" className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg flex items-center transition-colors shadow-sm">
              <Save className="w-4 h-4 mr-2" />
              Create User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
