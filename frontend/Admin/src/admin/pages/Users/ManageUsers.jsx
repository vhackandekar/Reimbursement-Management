import React from 'react';
import { Edit3, Trash2, ShieldAlert } from 'lucide-react';

export default function ManageUsers() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john.doe@company.com', phone: '+1 234-567-8901', role: 'Employee', access: 'Standard', manager: 'Sarah Smith' },
    { id: 2, name: 'Jane Wilson', email: 'jane.wilson@company.com', phone: '+1 234-567-8902', role: 'Employee', access: 'Restricted', manager: 'Sarah Smith' },
    { id: 3, name: 'Michael Lee', email: 'michael.lee@company.com', phone: '+1 234-567-8903', role: 'Manager', access: 'Full Access', manager: 'None' },
    { id: 4, name: 'Sarah Smith', email: 'sarah.smith@company.com', phone: '+1 234-567-8904', role: 'Manager', access: 'Full Access', manager: 'None' },
  ];

  return (
    <div className="animate-in fade-in duration-300 pb-10 max-w-7xl mx-auto font-sans">
      
      {/* Light/Dark mode reactive container */}
      <div className="bg-white dark:bg-[#1E293B] rounded-xl shadow-sm border border-slate-200 dark:border-slate-700/50 overflow-hidden flex flex-col mt-4 transition-colors duration-200">
        
        {/* Top Header/Search Row */}
        <div className="px-6 py-5 flex flex-col md:flex-row justify-between items-center bg-white dark:bg-[#1E293B] border-b border-slate-200 dark:border-slate-700/50 transition-colors duration-200">
           <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-wide mb-4 md:mb-0">All Users</h2>
           <div className="relative w-full md:w-80">
              <input 
                type="text" 
                placeholder="Search users..." 
                className="w-full px-4 py-2 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 transition-colors" 
              />
           </div>
        </div>
        
        {/* Table Area */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-[#0F172A]/30 border-b border-slate-200 dark:border-slate-700/50 transition-colors duration-200">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Manager</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 text-center uppercase tracking-wider">Action</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 text-right uppercase tracking-wider">Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700/50">
              {users.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50 dark:hover:bg-[#0F172A]/50 transition-colors group">
                  
                  {/* User (Name + Avatar) */}
                  <td className="px-6 py-5">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3 text-[10px] font-bold">
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-tight">{emp.name.toLowerCase()}</span>
                    </div>
                  </td>
                  
                  {/* Role (Static) */}
                  <td className="px-6 py-5">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                      {emp.role}
                    </span>
                  </td>

                  {/* Manager (Static) */}
                  <td className="px-6 py-5">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {emp.manager === 'None' ? '—' : emp.manager}
                    </span>
                  </td>

                  {/* Email */}
                  <td className="px-6 py-5">
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400 underline decoration-slate-200 dark:decoration-slate-700 underline-offset-4">{emp.email}</span>
                  </td>

                  {/* Send Password Action (Key Integration) */}
                  <td className="px-6 py-5 text-center">
                    <button className="px-5 py-2 bg-slate-900 dark:bg-slate-800 hover:bg-black dark:hover:bg-slate-700 text-white text-[11px] font-bold rounded-xl transition-all shadow-sm active:scale-95 border border-slate-700 dark:border-slate-600">
                      Send password
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors border border-transparent hover:border-blue-200 dark:hover:border-blue-500/30 shadow-sm" title="Edit Profile">
                         <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-500/30 shadow-sm" title="Delete User">
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
