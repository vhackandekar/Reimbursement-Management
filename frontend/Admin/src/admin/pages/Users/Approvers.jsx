import React, { useState } from 'react';
import { 
  ShieldCheck, Edit3, Trash2, CheckCircle2, 
  UserPlus, Search, X, Filter, CheckSquare, Square, MoreVertical, ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Approvers() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedApprovers, setSelectedApprovers] = useState([]);
  const [approvers, setApprovers] = useState([
    { id: 1, name: 'Sarah Smith', email: 'sarah.smith@company.com', role: 'Manager', department: 'Sales', level: 'Level 1', limit: '$5,000', isActive: true },
    { id: 2, name: 'Michael Lee', email: 'michael.lee@company.com', role: 'Finance', department: 'Engineering', level: 'Level 2', limit: '$15,000', isActive: true },
    { id: 3, name: 'David Chen', email: 'david.chen@company.com', role: 'Admin', department: 'Finance', level: 'Level 3 (Final)', limit: 'Unlimited', isActive: true },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Manager',
    department: '',
    limit: '$1,000'
  });

  const handleAddApprover = (e) => {
    e.preventDefault();
    const newApprover = {
      id: approvers.length + 1,
      ...formData,
      level: formData.role === 'Admin' ? 'Level 3 (Final)' : 'Level 1',
      isActive: true
    };
    setApprovers([...approvers, newApprover]);
    setIsModalOpen(false);
    setFormData({ name: '', email: '', role: 'Manager', department: '', limit: '$1,000' });
  };

  const toggleSelectAll = () => {
    if (selectedApprovers.length === approvers.length) setSelectedApprovers([]);
    else setSelectedApprovers(approvers.map(a => a.id));
  };

  const toggleSelectApprover = (id) => {
    setSelectedApprovers(prev => 
      prev.includes(id) ? prev.filter(aid => aid !== id) : [...prev, id]
    );
  };

  const toggleStatus = (id) => {
    setApprovers(approvers.map(a => a.id === id ? { ...a, isActive: !a.isActive } : a));
  };

  return (
    <div className="animate-in fade-in duration-300 pb-10 max-w-7xl mx-auto font-sans relative">
      
      {/* Page Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Approver Management</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm font-medium">Configure authorized personnel for expense routing.</p>
        </div>
        
        <div className="flex items-center space-x-3">
          {selectedApprovers.length > 0 && (
            <div className="flex items-center space-x-2 bg-red-50 dark:bg-red-500/10 px-4 py-2 rounded-2xl border border-red-100 dark:border-red-500/20 mr-2 animate-in slide-in-from-right-2">
               <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-widest">{selectedApprovers.length} Selected</span>
               <button className="text-[10px] font-bold text-red-600 dark:text-red-400 hover:text-red-700 uppercase tracking-widest ml-2 border-l border-red-200 pl-3">Revoke All</button>
            </div>
          )}
          <button 
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl flex items-center transition-all shadow-lg shadow-blue-500/20 active:scale-95 text-xs uppercase tracking-widest"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Designate New
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white dark:bg-[#1E293B] rounded-[32px] shadow-sm border border-slate-200 dark:border-slate-700/50 overflow-hidden flex flex-col transition-colors duration-200">
        
        {/* Table Controls */}
        <div className="px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 bg-white dark:bg-[#1E293B] border-b border-slate-200 dark:border-slate-700/50">
           <div className="flex items-center space-x-4">
              <button 
                onClick={toggleSelectAll}
                className={`transition-colors ${selectedApprovers.length === approvers.length ? 'text-blue-600' : 'text-slate-300 hover:text-slate-400'}`}
              >
                {selectedApprovers.length === approvers.length ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
              </button>
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center border border-blue-100/50 dark:border-transparent">
                 <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Active Approvers</h2>
           </div>
           
           <div className="flex items-center space-x-3 w-full md:w-auto overflow-hidden">
              <div className="relative flex-1 md:w-80 group">
                 <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                 <input 
                   type="text" 
                   placeholder="Filter by name or role..." 
                   className="w-full pl-12 pr-4 py-2.5 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-slate-900 dark:text-slate-200 placeholder-slate-400 transition-all shadow-sm" 
                 />
              </div>
              <button className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors border border-slate-200 dark:border-slate-700/50 shadow-sm">
                 <Filter className="w-4 h-4" />
              </button>
           </div>
        </div>
        
        {/* Modern Selectable Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-[#0F172A]/30 border-b border-slate-200 dark:border-slate-700/50 transition-colors duration-200">
                <th className="px-8 py-4 w-10"></th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em]">Member Profile</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em]">Primary Role</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em]">Dept</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em]">Auth Level</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em]">Max Threshold</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em]">Status</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 text-right uppercase tracking-[0.15em]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
              {approvers.map((approver) => (
                <tr key={approver.id} className={`hover:bg-slate-50/80 dark:hover:bg-[#0F172A]/40 transition-all group ${selectedApprovers.includes(approver.id) ? 'bg-blue-50/40 dark:bg-blue-500/5' : ''}`}>
                  
                  {/* Row Checkbox */}
                  <td className="px-8 py-5">
                    <button 
                      onClick={() => toggleSelectApprover(approver.id)}
                      className={`transition-colors ${selectedApprovers.includes(approver.id) ? 'text-blue-600' : 'text-slate-300 dark:text-slate-600 hover:text-slate-400'}`}
                    >
                      {selectedApprovers.includes(approver.id) ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}
                    </button>
                  </td>

                  {/* Name & Email Profile */}
                  <td className="px-6 py-5">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-500/20 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center text-blue-700 dark:text-blue-400 mr-3 shrink-0 font-bold text-[10px] shadow-sm">
                         {approver.name.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">{approver.name}</span>
                        <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 tracking-wide">{approver.email}</span>
                      </div>
                    </div>
                  </td>
                  
                  {/* Role */}
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-xl text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700/50 uppercase tracking-widest">
                      {approver.role}
                    </span>
                  </td>
                  
                  {/* Department */}
                  <td className="px-6 py-5">
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">{approver.department}</span>
                  </td>
                  
                  {/* Approval Level */}
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center px-3 py-1 rounded-xl text-[10px] font-bold bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-500/20">
                      {approver.level}
                    </span>
                  </td>
                  
                  {/* Limit */}
                  <td className="px-6 py-5">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">{approver.limit}</span>
                  </td>

                  {/* Status Toggle (Deep Analysis) */}
                  <td className="px-6 py-5">
                    <button 
                      onClick={() => toggleStatus(approver.id)}
                      className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${approver.isActive ? 'bg-green-500' : 'bg-slate-200 dark:bg-slate-700'}`}
                    >
                      <span className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${approver.isActive ? 'translate-x-5' : 'translate-x-0'}`}></span>
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-700 shadow-sm" title="Settings">
                         <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-2.5 text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all border border-transparent hover:border-slate-100 dark:hover:border-slate-700 shadow-sm" title="Delete">
                         <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="group-hover:hidden">
                       <MoreVertical className="w-4 h-4 text-slate-300 ml-auto" />
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Approver Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setIsModalOpen(false)}></div>
          
          <div className="bg-white dark:bg-[#111827] rounded-[40px] shadow-2xl w-full max-w-lg relative z-10 border border-slate-200 dark:border-slate-700 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-10 py-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-[#0B0F19]">
               <div>
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white uppercase tracking-tight">Designate Approver</h3>
                 <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-[0.2em]">Administrative Permissions</p>
               </div>
               <button onClick={() => setIsModalOpen(false)} className="p-2.5 text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-all">
                 <X className="w-5 h-5" />
               </button>
            </div>

            <form onSubmit={handleAddApprover} className="p-10 space-y-7">
              <div className="space-y-5">
                <div className="group">
                   <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-2 px-1 transition-colors group-focus-within:text-blue-500">Member Full Name</label>
                   <input required type="text" placeholder="Johnathan Doe" className="w-full px-6 py-4 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-slate-900 dark:text-white transition-all shadow-sm" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>

                <div className="group">
                   <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-2 px-1 transition-colors group-focus-within:text-blue-500">Corporate Email</label>
                   <input required type="email" placeholder="john@company.com" className="w-full px-6 py-4 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-slate-900 dark:text-white transition-all shadow-sm" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>

                <div className="grid grid-cols-2 gap-5">
                   <div className="group">
                      <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-2 px-1">Functional Role</label>
                      <div className="relative">
                        <select className="w-full px-6 py-4 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-3xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 appearance-none shadow-sm transition-all" value={formData.role} onChange={(e) => setFormData({...formData, role: e.target.value})}>
                          <option value="Manager">Manager</option>
                          <option value="Finance">Finance</option>
                          <option value="HR">HR</option>
                          <option value="Admin">Admin</option>
                        </select>
                        <ChevronRight className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400" />
                      </div>
                   </div>
                   <div className="group">
                      <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-2 px-1">Dept</label>
                      <input required type="text" placeholder="e.g. Sales" className="w-full px-6 py-4 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-3xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-slate-900 dark:text-white transition-all shadow-sm" value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} />
                   </div>
                </div>

                <div className="group">
                   <label className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block mb-2 px-1">Approval Threshold</label>
                   <div className="relative">
                      <select className="w-full px-6 py-4 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-3xl text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 appearance-none shadow-sm transition-all" value={formData.limit} onChange={(e) => setFormData({...formData, limit: e.target.value})}>
                        <option value="$1,000">$1,000</option>
                        <option value="$5,000">$5,000</option>
                        <option value="$15,000">$15,000</option>
                        <option value="Unlimited">Ultimate Authority</option>
                      </select>
                      <ChevronRight className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 rotate-90 text-slate-400" />
                   </div>
                </div>
              </div>

              <div className="pt-4">
                <button type="submit" className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-[24px] transition-all shadow-xl shadow-blue-500/25 active:scale-[0.98] text-xs uppercase tracking-[0.2em] mb-2">
                  Confirm Member Setup
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
