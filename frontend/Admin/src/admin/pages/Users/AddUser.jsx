import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Mail, Key, 
  CheckCircle2, Send, RotateCcw, UserPlus 
} from 'lucide-react';

export default function AddUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Employee',
    manager: '',
    access: 'Standard',
    status: 'Active'
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call to create user
    setShowSuccess(true);
    
    // Clear form to allow adding another user
    setFormData({
      name: '',
      email: '',
      role: 'Employee',
      manager: formData.manager, // Keep manager for convenience
      access: 'Standard',
      status: 'Active'
    });

    // Hide toast after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  };

  const handleSendPassword = () => {
    setIsSending(true);
    // Simulate email sending delay
    setTimeout(() => {
      setIsSending(false);
      setIsPasswordSent(true);
    }, 1500);
  };

  const resetForm = () => {
    setIsUserCreated(false);
    setIsPasswordSent(false);
    // In a real app, you'd reset form fields here too
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-4xl mx-auto pb-20 font-sans">
      
      {/* Page Header */}
      <div className="flex items-center space-x-5">
        <button 
          onClick={() => navigate('/admin/users')} 
          className="p-3 bg-white dark:bg-[#1E293B] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-2xl transition-all border border-slate-200 dark:border-slate-700/50 shadow-sm group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Onboard New Member</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium">Create a profile and generate secure access credentials.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-[#1E293B] rounded-[32px] border border-slate-200 dark:border-slate-700/50 p-8 md:p-12 shadow-sm transition-all duration-300 overflow-hidden relative">
        
        {/* Success Notification (Professional Bottom Toast) */}
        {showSuccess && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-8 duration-500">
             <div className="flex items-center space-x-4 px-8 py-4 bg-slate-900 dark:bg-blue-600 text-white rounded-[28px] shadow-2xl shadow-blue-500/20 border border-white/10 backdrop-blur-md">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                   <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-bold tracking-tight uppercase">User Added Successfully!</span>
             </div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-10 transition-opacity duration-300">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
            <div className="space-y-2.5">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Full Member Name</label>
              <input 
                type="text" 
                required 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-5 py-3.5 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all shadow-sm" 
                placeholder="e.g. Johnathan Doe" 
              />
            </div>
            
            <div className="space-y-2.5">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Work Email Address</label>
              <input 
                type="email" 
                required 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-5 py-3.5 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 transition-all shadow-sm" 
                placeholder="john@company.com" 
              />
            </div>
            
            <div className="space-y-2.5">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">System Designation</label>
              <div className="relative">
                <select 
                  value={formData.role} 
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full px-5 py-3.5 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 appearance-none shadow-sm cursor-pointer font-medium"
                >
                  <option value="Employee">Employee</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">System Administrator</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
            
            <div className="space-y-2.5">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Primary Reporting Manager</label>
              <div className="relative">
                <select 
                  value={formData.manager}
                  onChange={(e) => setFormData({...formData, manager: e.target.value})}
                  className="w-full px-5 py-3.5 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 appearance-none shadow-sm cursor-pointer font-medium"
                >
                  <option value="">Select Manager...</option>
                  <option value="sarah">Sarah Smith (Sales)</option>
                  <option value="john">Michael Lee (Finance)</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Platform Access Scope</label>
              <select className="w-full px-5 py-3.5 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 appearance-none shadow-sm cursor-pointer font-medium">
                <option value="Standard">Standard (Default Permissions)</option>
                <option value="Full Access">Full Access (Root Access)</option>
                <option value="Restricted">Restricted (Audit Only)</option>
              </select>
            </div>

            <div className="space-y-2.5">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Operational Status</label>
              <select className="w-full px-5 py-3.5 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-2xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 appearance-none shadow-sm cursor-pointer font-medium">
                <option value="Active">Operational (Active)</option>
                <option value="Inactive">On-Hold (Inactive)</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center justify-end pt-10 border-t border-slate-100 dark:border-slate-800 mt-10">
            <div className="flex items-center space-x-4">
              <button 
                type="button" 
                onClick={() => navigate('/admin/users')} 
                className="px-6 py-3 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                disabled={showSuccess}
                className={`px-8 flex items-center py-4 ${showSuccess ? 'bg-green-600' : 'bg-blue-600 hover:bg-blue-700'} text-white text-sm font-bold rounded-[22px] transition-all shadow-xl shadow-blue-500/25 active:scale-95 group`}
              >
                {showSuccess ? (
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                ) : (
                  <UserPlus className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                )}
                {showSuccess ? 'User Added' : 'Add User'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
