import React from 'react';
import { Plus, Search, FileText, Settings, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ApprovalRules() {
  const navigate = useNavigate();
  const rules = [
    { id: 1, name: 'Travel Expenses', desc: 'Flights, hotels, and transportation', type: 'Sequential', threshold: '> $500', minPerc: '100%' },
    { id: 2, name: 'Office Supplies', desc: 'Equipment and stationery', type: 'Parallel', threshold: 'Any', minPerc: '50%' },
    { id: 3, name: 'Software Subs', desc: 'SaaS and tool licenses', type: 'Percentage', threshold: '> $100', minPerc: '60%' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-7xl mx-auto pb-10 font-sans">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Approval Rules</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm bg-transparent">Manage functional expense approval routing policies.</p>
        </div>
        <button 
          onClick={() => navigate('/admin/rules/new')}
          className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center transition-colors text-sm shadow-md shadow-blue-500/20"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Rule
        </button>
      </div>

      <div className="bg-white dark:bg-[#1E293B] rounded-[20px] border border-slate-200 dark:border-slate-700/50 shadow-sm overflow-hidden flex flex-col transition-colors duration-200">
        <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-700/50 flex justify-between items-center bg-transparent transition-colors duration-200">
           <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search rules..." className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-900 dark:text-white placeholder-slate-400 transition-colors shadow-sm" />
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-[#0F172A]/50 border-b border-slate-200 dark:border-slate-700/50 transition-colors duration-200">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Rule Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Flow Type</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Threshold</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Approval Base</th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700/50">
              {rules.map((rule) => (
                <tr key={rule.id} className="hover:bg-slate-50 dark:hover:bg-[#0F172A]/30 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center">
                      <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 mr-4 border border-blue-100 dark:border-transparent">
                         <FileText className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 dark:text-white mb-0.5">{rule.name}</span>
                        <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{rule.desc}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                     <span className="px-3 py-1 text-xs font-semibold rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                       {rule.type}
                     </span>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-[#0F172A] px-2 py-1 rounded font-mono border border-slate-100 dark:border-transparent">
                      {rule.threshold}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm text-blue-600 dark:text-blue-400 font-bold">{rule.minPerc}</td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end space-x-2">
                       <button className="p-2 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg transition-colors border border-transparent hover:border-blue-200 dark:hover:border-blue-500/30 shadow-sm" title="Edit Rule">
                          <Settings className="w-4 h-4 ml-auto" />
                       </button>
                       <button className="p-2 text-slate-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors border border-transparent hover:border-red-200 dark:hover:border-red-500/30 shadow-sm" title="Delete Rule">
                          <Trash2 className="w-4 h-4 ml-auto" />
                       </button>
                    </div>
                  </td>
                </tr>
              ))}
              {rules.length === 0 && (
                <tr>
                   <td colSpan="5" className="px-6 py-10 text-center text-slate-500 font-medium text-sm">No rules configured.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
