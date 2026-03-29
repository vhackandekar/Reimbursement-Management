import React from 'react';
import { Send, Edit3, Trash2 } from 'lucide-react';

export default function ManageUsers() {
  const users = [
    { id: 1, name: 'John Doe', email: 'john.doe@company.com', phone: '+1 234-567-8901', role: 'Employee', department: 'Sales', manager: 'Sarah Smith' },
    { id: 2, name: 'Jane Wilson', email: 'jane.wilson@company.com', phone: '+1 234-567-8902', role: 'Employee', department: 'Marketing', manager: 'Sarah Smith' },
    { id: 3, name: 'Michael Lee', email: 'michael.lee@company.com', phone: '+1 234-567-8903', role: 'Manager', department: 'Engineering', manager: 'None' },
    { id: 4, name: 'Sarah Smith', email: 'sarah.smith@company.com', phone: '+1 234-567-8904', role: 'Manager', department: 'Sales', manager: 'None' },
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
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Manager</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 text-right uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700/50">
              {users.map((emp) => (
                <tr key={emp.id} className="hover:bg-slate-50 dark:hover:bg-[#0F172A]/50 transition-colors group">
                  
                  {/* Name */}
                  <td className="px-6 py-5">
                    <span className="text-sm font-semibold text-slate-900 dark:text-white">{emp.name}</span>
                  </td>
                  
                  {/* Email */}
                  <td className="px-6 py-5">
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{emp.email}</span>
                  </td>
                  
                  {/* Phone */}
                  <td className="px-6 py-5">
                     <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{emp.phone}</span>
                  </td>
                  
                  {/* Role Dropdown */}
                  <td className="px-6 py-5 w-40">
                    <div className="relative">
                       <select 
                         defaultValue={emp.role}
                         className="w-full bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 rounded-lg text-sm text-slate-800 dark:text-white font-medium py-2 pl-3 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer shadow-sm"
                       >
                         <option value="Employee">Employee</option>
                         <option value="Manager">Manager</option>
                       </select>
                       <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                         <svg className="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                       </div>
                    </div>
                  </td>
                  
                  {/* Department */}
                  <td className="px-6 py-5">
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{emp.department}</span>
                  </td>

                  {/* Manager Dropdown */}
                  <td className="px-6 py-5 w-48">
                    <div className="relative">
                       <select 
                         defaultValue={emp.manager}
                         className="w-full bg-white dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 hover:border-slate-300 dark:hover:border-slate-600 rounded-lg text-sm text-slate-800 dark:text-white font-medium py-2 pl-3 pr-8 appearance-none focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors cursor-pointer shadow-sm"
                       >
                         <option value="None">None</option>
                         <option value="Sarah Smith">Sarah Smith</option>
                         <option value="John Doe">John Doe</option>
                       </select>
                       <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                         <svg className="fill-current w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
                       </div>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-5 text-right w-56">
                    <div className="flex items-center justify-end space-x-3">
                      <button className="flex items-center px-3 py-1.5 border border-blue-500/30 dark:border-[#2463EB]/40 bg-blue-500/5 dark:bg-transparent hover:bg-blue-50 dark:hover:bg-[#2463EB]/10 rounded-lg transition-colors text-blue-600 dark:text-blue-500 font-medium text-sm shadow-sm justify-center">
                         <Send className="w-3.5 h-3.5 mr-2" />
                         Send Password
                      </button>
                      <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors p-1" title="Edit">
                         <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors p-1" title="Delete">
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
