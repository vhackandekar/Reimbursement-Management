import React from 'react';
import { Plus, Search, Mail } from 'lucide-react';

export default function UserManagement() {
  const users = [
    { id: 1, user: 'marc', role: 'Manager', manager: 'sarah', email: 'marc@gmail.com' },
    { id: 2, user: 'david', role: 'Employee', manager: 'marc', email: 'david@company.com' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">User Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Can create a new user on the fly, if no user found with that name.</p>
        </div>
        <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg flex items-center shadow-sm text-sm">
          <Plus className="w-4 h-4 mr-2" />
          New User
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center bg-white dark:bg-slate-800">
           <div className="relative w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search users..." className="w-full pl-9 pr-4 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-slate-100" />
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Manager</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider w-40 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {users.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900 dark:text-white border-r border-slate-100 dark:border-slate-700/50">{row.user}</td>
                  <td className="px-6 py-4 border-r border-slate-100 dark:border-slate-700/50">
                     <select defaultValue={row.role} className="bg-transparent text-sm font-medium text-slate-700 dark:text-slate-300 outline-none w-full appearance-none cursor-pointer">
                        <option value="Manager">Manager</option>
                        <option value="Employee">Employee</option>
                        <option value="Admin">Admin</option>
                     </select>
                  </td>
                  <td className="px-6 py-4 border-r border-slate-100 dark:border-slate-700/50">
                    <input type="text" defaultValue={row.manager} className="bg-transparent border-b border-slate-300 dark:border-slate-600 focus:border-blue-500 outline-none text-sm text-slate-700 dark:text-slate-300 w-full hover:border-blue-500 px-1 py-0.5" />
                  </td>
                  <td className="px-6 py-4 border-r border-slate-100 dark:border-slate-700/50 text-sm text-slate-600 dark:text-slate-300">{row.email}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="px-3 py-1.5 border border-slate-300 dark:border-slate-600 rounded-md text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 hover:border-slate-400 transition-colors shadow-sm group relative">
                      Send password
                      <div className="absolute hidden group-hover:block w-48 p-2 bg-slate-800 text-white text-xs rounded shadow-lg -top-12 left-1/2 -translate-x-1/2 z-10 font-normal">
                        Clicking on this button should send a randomly generated unique password in mail of that user...
                      </div>
                    </button>
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
