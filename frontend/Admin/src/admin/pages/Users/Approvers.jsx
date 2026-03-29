import React from 'react';
import { ShieldCheck, Edit3, Trash2, CheckCircle2 } from 'lucide-react';

export default function Approvers() {
  const approvers = [
    { id: 1, name: 'Sarah Smith', email: 'sarah.smith@company.com', department: 'Sales', level: 'Level 1', limit: '$5,000', status: 'Active' },
    { id: 2, name: 'Michael Lee', email: 'michael.lee@company.com', department: 'Engineering', level: 'Level 2', limit: '$15,000', status: 'Active' },
    { id: 3, name: 'David Chen', email: 'david.chen@company.com', department: 'Finance', level: 'Level 3 (Final)', limit: 'Unlimited', status: 'Active' },
  ];

  return (
    <div className="animate-in fade-in duration-300 pb-10 max-w-7xl mx-auto font-sans">
      
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Designated Approvers</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm">Manage personnel authorized to review and approve expense reimbursements.</p>
      </div>

      {/* Light/Dark mode reactive container */}
      <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-sm border border-slate-200 dark:border-slate-700/50 overflow-hidden flex flex-col transition-colors duration-200">
        
        {/* Top Header/Search Row */}
        <div className="px-6 py-5 flex flex-col md:flex-row justify-between items-center bg-white dark:bg-[#1E293B] border-b border-slate-200 dark:border-slate-700/50 transition-colors duration-200">
           <div className="flex items-center mb-4 md:mb-0">
             <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center mr-4 border border-green-500/20">
                <ShieldCheck className="w-5 h-5 text-green-600 dark:text-green-400" />
             </div>
             <div>
               <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-wide">Approver Directory</h2>
             </div>
           </div>
           
           <div className="relative w-full md:w-80">
              <input 
                type="text" 
                placeholder="Search approvers..." 
                className="w-full px-4 py-2 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 transition-colors" 
              />
           </div>
        </div>
        
        {/* Table Area */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-[#0F172A]/30 border-b border-slate-200 dark:border-slate-700/50 transition-colors duration-200">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Name & Email</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Approval Level</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Expense Limit</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 text-right uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700/50">
              {approvers.map((approver) => (
                <tr key={approver.id} className="hover:bg-slate-50 dark:hover:bg-[#0F172A]/50 transition-colors group">
                  
                  {/* Name & Email */}
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">{approver.name}</span>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">{approver.email}</span>
                    </div>
                  </td>
                  
                  {/* Department */}
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{approver.department}</span>
                  </td>
                  
                  {/* Approval Level Box */}
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                      {approver.level}
                    </span>
                  </td>
                  
                  {/* Limit */}
                  <td className="px-6 py-4 w-40">
                    <div className="relative">
                       <select 
                         defaultValue={approver.limit}
                         className="w-full bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 rounded-lg text-sm text-slate-800 dark:text-white font-medium py-1.5 pl-3 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-green-500 transition-colors cursor-pointer shadow-sm"
                       >
                         <option value="$1,000">$1,000</option>
                         <option value="$5,000">$5,000</option>
                         <option value="$15,000">$15,000</option>
                         <option value="Unlimited">Unlimited</option>
                       </select>
                       <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                         <svg className="fill-current w-3.5 h-3.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                       </div>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <div className="flex items-center text-sm font-medium text-slate-600 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-green-500 mr-1.5" />
                      {approver.status}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 text-slate-400 hover:text-green-600 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-green-500/10 rounded-lg transition-colors border border-transparent hover:border-green-200 dark:hover:border-green-500/30 shadow-sm" title="Edit Approver Settings">
                         <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-500/30 shadow-sm" title="Revoke Approver Status">
                         <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
