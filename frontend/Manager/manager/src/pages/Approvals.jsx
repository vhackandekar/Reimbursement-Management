import React, { useState, useEffect } from 'react';
import { 
  ClipboardCheck, CheckCircle2, XCircle, Search, 
  Filter, ArrowUpDown, Info, Clock, AlertCircle,
  ShieldCheck
} from 'lucide-react';
import { managerApi } from '../services/managerApi';

export default function Approvals() {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Pending');

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    setLoading(true);
    const data = await managerApi.getTeamExpenses();
    setExpenses(data);
    setLoading(false);
  };

  const handleAction = async (id, status) => {
    // Optimistic update
    setExpenses(prev => prev.map(exp => 
      exp.id === id ? { ...exp, status: status } : exp
    ));
    await managerApi.updateExpenseStatus(id, status);
  };

  const filteredExpenses = expenses.filter(exp => 
    filter === 'All' ? true : exp.status === filter
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section from Wireframe - High Contrast */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <p className="text-blue-600 dark:text-blue-400 text-[11px] font-bold uppercase tracking-[0.2em] italic">Manager's View</p>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Approvals to review</h2>
        </div>

        {/* Filter Tabs */}
        <div className="flex bg-white dark:bg-[#1E293B] p-1 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          {['Pending', 'Approved', 'Rejected', 'All'].map((tab) => (
            <button key={tab} onClick={() => setFilter(tab)}
              className={`px-5 py-2 text-xs font-semibold rounded-xl transition-all ${
                filter === tab 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table Container with Improved Contrast */}
      <div className="bg-white dark:bg-[#1E293B] rounded-[32px] border border-slate-200 dark:border-slate-800/50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto text-[13px]">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-8 py-5 text-left font-bold text-slate-800 dark:text-slate-100 uppercase tracking-widest text-[11px]">Approval Subject</th>
                <th className="px-6 py-5 text-left font-bold text-slate-800 dark:text-slate-100 uppercase tracking-widest text-[11px]">Request Owner</th>
                <th className="px-6 py-5 text-left font-bold text-slate-800 dark:text-slate-100 uppercase tracking-widest text-[11px]">Category</th>
                <th className="px-6 py-5 text-center font-bold text-slate-800 dark:text-slate-100 uppercase tracking-widest text-[11px]">Status</th>
                <th className="px-6 py-5 text-right font-bold text-slate-800 dark:text-slate-100 uppercase tracking-widest text-[11px]">
                  Total amount <br/> <span className="text-[10px] lowercase opacity-80 font-bold">(in company's currency)</span>
                </th>
                <th className="px-8 py-5 text-center font-bold text-slate-800 dark:text-slate-100 uppercase tracking-widest text-[11px]">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {loading ? (
                <tr><td colSpan="6" className="py-24 text-center font-semibold text-blue-600 dark:text-blue-400 animate-pulse tracking-widest uppercase text-xs">Loading records...</td></tr>
              ) : filteredExpenses.length === 0 ? (
                <tr><td colSpan="6" className="py-24 text-center text-slate-500 dark:text-slate-400 italic font-medium">No {filter.toLowerCase()} records found.</td></tr>
              ) : (
                filteredExpenses.map((exp) => (
                  <tr key={exp.id} className={`transition-all duration-300 ${exp.status !== 'Pending' ? 'opacity-75 bg-slate-50/50 dark:bg-slate-900/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800/20'}`}>
                    <td className="px-8 py-6 font-bold text-slate-900 dark:text-white capitalize tracking-wide">{exp.subject || 'none'}</td>
                    <td className="px-6 py-6 font-bold text-slate-800 dark:text-slate-200">{exp.owner}</td>
                    <td className="px-6 py-6 font-bold text-slate-700 dark:text-slate-300">{exp.category}</td>
                    <td className="px-6 py-6 text-center">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border-2 shadow-sm ${
                        exp.status === 'Approved' ? 'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' :
                        exp.status === 'Rejected' ? 'bg-red-100 text-red-700 border-red-300 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800' :
                        'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800'
                      }`}>
                        {exp.status}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-right whitespace-nowrap">
                      <div className="font-bold flex flex-col sm:flex-row sm:items-baseline justify-end gap-1">
                        <span className="text-red-600 dark:text-red-400 font-bold">{exp.amount} {exp.currency}</span>
                        <span className="text-slate-400 dark:text-slate-500 mx-1 hidden sm:inline font-bold">=</span>
                        <span className="text-blue-700 dark:text-blue-300 font-bold">{exp.convertedAmount.toLocaleString()} {exp.convertedCurrency}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center space-x-2">
                        {exp.status === 'Pending' ? (
                          <>
                            <button 
                              onClick={() => handleAction(exp.id, 'Approved')} 
                              className="px-5 py-2.5 bg-green-600 hover:bg-green-500 text-white text-[10px] font-bold uppercase tracking-wider rounded-xl shadow-lg shadow-green-500/20 active:scale-95 transition-all"
                            >
                              Approve
                            </button>
                            <button 
                              onClick={() => handleAction(exp.id, 'Rejected')} 
                              className="px-5 py-2.5 border-2 border-red-600 text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 text-[10px] font-bold uppercase tracking-wider rounded-xl active:scale-95 transition-all"
                            >
                              Reject
                            </button>
                          </>
                        ) : (
                          <div className="flex items-center text-slate-500 dark:text-slate-400 space-x-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                            <ShieldCheck className="w-4 h-4 text-blue-500" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Finalized</span>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
