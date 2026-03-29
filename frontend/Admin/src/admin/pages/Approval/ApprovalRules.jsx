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
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Approval Rules</h1>
          <p className="text-slate-400 mt-1 bg-transparent">Manage functional expense approval routing policies.</p>
        </div>
        <button 
          onClick={() => navigate('/admin/rules/new')}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg flex items-center transition-colors text-sm shadow-sm"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Rule
        </button>
      </div>

      <div className="bg-[#1E293B] rounded-xl border border-slate-700/50 shadow-sm overflow-hidden flex flex-col">
        <div className="px-6 py-5 border-b border-slate-700/50 flex justify-between items-center bg-[#1E293B]">
           <div className="relative w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search rules..." className="w-full pl-9 pr-4 py-1.5 bg-[#0F172A] border border-slate-700/50 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-colors" />
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0F172A]/50 border-b border-slate-700/50">
                <th className="px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Rule Name</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Flow Type</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Threshold</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">Approval Base</th>
                <th className="px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {rules.map((rule) => (
                <tr key={rule.id} className="hover:bg-[#0F172A]/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400 mr-3">
                         <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{rule.name}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{rule.desc}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                     <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                       {rule.type}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300 font-mono">{rule.threshold}</td>
                  <td className="px-6 py-4 text-sm text-blue-400 font-bold">{rule.minPerc}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <button className="text-slate-400 hover:text-blue-400 text-sm font-medium transition-colors">
                       <Settings className="w-4 h-4 ml-auto" />
                    </button>
                    <button className="text-slate-400 hover:text-red-400 text-sm font-medium transition-colors">
                       <Trash2 className="w-4 h-4 ml-auto" />
                    </button>
                  </td>
                </tr>
              ))}
              {rules.length === 0 && (
                <tr>
                   <td colSpan="5" className="px-6 py-8 text-center text-slate-500 text-sm">No rules configured.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
