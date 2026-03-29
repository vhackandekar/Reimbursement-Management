import React from 'react';
import { Plus, Search, FileText, Settings, Trash2, Filter, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ApprovalRules() {
  const navigate = useNavigate();
  const rules = [
    { 
      id: 1, 
      name: 'High-Value Travel', 
      desc: 'Flights and hotels exceeding local thresholds', 
      conditionSummary: 'Category: Travel AND Amount > $1000',
      type: 'Sequential', 
      approvers: '3 Members',
      minPerc: '100%',
      status: 'Active'
    },
    { 
      id: 2, 
      name: 'Meals & Entertainment', 
      desc: 'Standard daily allowance policy', 
      conditionSummary: 'Category: Meals AND Amount > $50',
      type: 'Parallel', 
      approvers: 'Direct Mgr',
      minPerc: '100%',
      status: 'Active'
    },
    { 
      id: 3, 
      name: 'IT Equipment', 
      desc: 'Laptops, screens and peripherals', 
      conditionSummary: 'Category: Others AND Role: Engineering',
      type: 'Sequential', 
      approvers: 'Finance Dept',
      minPerc: '50%',
      status: 'Inactive'
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-7xl mx-auto pb-12 font-sans">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Approval Rules</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1 text-sm bg-transparent">Define the logic that connects expenses to approvers.</p>
        </div>
        <button 
          onClick={() => navigate('/admin/rules/new')}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl flex items-center transition-all shadow-md shadow-blue-500/20 active:scale-95 text-sm uppercase tracking-widest"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create New Rule
        </button>
      </div>

      {/* Main Container */}
      <div className="bg-white dark:bg-[#1E293B] rounded-[28px] border border-slate-200 dark:border-slate-700/50 shadow-sm overflow-hidden flex flex-col transition-colors duration-200">
        
        {/* Table Top Actions */}
        <div className="px-8 py-6 border-b border-slate-200 dark:border-slate-700/50 flex flex-col md:flex-row justify-between items-center gap-4 bg-transparent transition-colors duration-200">
           <div className="relative w-full md:w-96 group">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input 
                type="text" 
                placeholder="Search rules by name or condition..." 
                className="w-full pl-12 pr-4 py-2.5 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-slate-900 dark:text-white placeholder-slate-400 transition-all shadow-sm" 
              />
           </div>
           <button className="flex items-center space-x-2 px-4 py-2.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-xs font-bold uppercase tracking-widest border border-slate-200 dark:border-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
              <Filter className="w-3.5 h-3.5" />
              <span>Advanced Filter</span>
           </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-[#0F172A]/50 border-b border-slate-200 dark:border-slate-700/50 transition-colors duration-200">
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em]">Rule Identification</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em]">Trigger Conditions</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em]">Workflow Type</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em]">Min Req %</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/30">
              {rules.map((rule) => (
                <tr key={rule.id} className="hover:bg-slate-50/80 dark:hover:bg-[#0F172A]/30 transition-colors group">
                  
                  {/* Rule Name & Status */}
                  <td className="px-8 py-6">
                    <div className="flex items-center">
                      <div className="p-3 rounded-2xl bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 mr-4 border border-blue-100/50 dark:border-transparent">
                         <FileText className="w-5 h-5" />
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center">
                           <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">{rule.name}</span>
                        </div>
                        <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500 mt-1 max-w-[200px] truncate">{rule.desc}</span>
                      </div>
                    </div>
                  </td>

                  {/* Trigger Conditions */}
                  <td className="px-8 py-6">
                    <div className="flex items-center px-3 py-1.5 rounded-xl bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 border-dashed">
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-300 font-mono tracking-tighter">
                        {rule.conditionSummary}
                      </span>
                    </div>
                  </td>

                  {/* Workflow Type */}
                  <td className="px-8 py-6">
                     <span className={`inline-flex px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border transition-colors ${
                       rule.type === 'Sequential' 
                         ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-500/20' 
                         : 'bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-500/20'
                     }`}>
                       {rule.type}
                     </span>
                  </td>

                  {/* Min Approval % */}
                  <td className="px-8 py-6">
                     <span className="text-sm font-bold text-slate-900 dark:text-white">{rule.minPerc}</span>
                  </td>

                  {/* Actions Area */}
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end space-x-2">
                       <button className="p-2.5 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700 shadow-sm" title="Edit Logic">
                          <Settings className="w-5 h-5 ml-auto" />
                       </button>
                       <button className="p-2.5 text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-white dark:hover:bg-slate-800 rounded-xl transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700 shadow-sm" title="Archive Rule">
                          <Trash2 className="w-5 h-5 ml-auto" />
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
