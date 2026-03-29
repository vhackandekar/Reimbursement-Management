import React, { useState, useEffect } from 'react';
import { 
  ClipboardCheck, CheckCircle2, XCircle, Search, 
  Filter, ArrowUpDown, Info, Clock, AlertCircle
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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight italic">Approvals to review</h2>
          <p className="text-slate-500 text-sm font-medium uppercase tracking-widest">Manager's View</p>
        </div>

        <div className="flex bg-white dark:bg-[#1E293B] p-1 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          {['Pending', 'Approved', 'Rejected', 'All'].map((tab) => (
            <button key={tab} onClick={() => setFilter(tab)}
              className={`px-5 py-2 text-xs font-bold rounded-xl transition-all ${
                filter === tab ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 'text-slate-500'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-[#1E293B] rounded-[32px] border border-slate-200 dark:border-slate-700/50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/20 border-b border-slate-200 dark:border-slate-700/50">
                <th className="px-8 py-5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">Approval Subject</th>
                <th className="px-6 py-5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">Request Owner</th>
                <th className="px-6 py-5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest">Category</th>
                <th className="px-6 py-5 text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">Request Status</th>
                <th className="px-6 py-5 text-right text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                  Total amount <br/> <span className="text-[9px] lowercase opacity-60">(in company's currency)</span>
                </th>
                <th className="px-8 py-5 text-center text-[11px] font-bold text-slate-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50 font-sans">
              {loading ? (
                <tr><td colSpan="6" className="py-20 text-center font-bold text-slate-400 animate-pulse">LOADING RECORDS...</td></tr>
              ) : (
                filteredExpenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/10 transition-colors group">
                    <td className="px-8 py-6 font-bold text-slate-900 dark:text-white text-sm">{exp.subject}</td>
                    <td className="px-6 py-6 text-xs font-bold text-slate-700 dark:text-slate-300">{exp.owner}</td>
                    <td className="px-6 py-6 font-bold text-slate-500 text-xs">{exp.category}</td>
                    <td className="px-6 py-6 text-center">
                      <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        exp.status === 'Approved' ? 'bg-green-100/50 text-green-600 border-green-200' :
                        exp.status === 'Rejected' ? 'bg-red-100/50 text-red-600 border-red-200' :
                        'bg-blue-100/50 text-blue-600 border-blue-200'
                      }`}>
                        {exp.status}
                      </span>
                    </td>
                    <td className="px-6 py-6 text-right">
                      <div className="text-[12px] font-black">
                        <span className="text-red-500">{exp.amount} {exp.currency}</span>
                        <span className="mx-1 text-slate-300">=</span>
                        <span className="text-blue-600">{exp.convertedAmount.toLocaleString()} {exp.convertedCurrency}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-center space-x-2">
                        {exp.status === 'Pending' ? (
                          <>
                            <button onClick={() => handleAction(exp.id, 'Approved')} className="px-4 py-2 bg-green-600 text-white text-[10px] font-black uppercase rounded-xl shadow-lg shadow-green-500/20 hover:scale-105 active:scale-95 transition-all">Approve</button>
                            <button onClick={() => handleAction(exp.id, 'Rejected')} className="px-4 py-2 border-2 border-red-500 text-red-500 text-[10px] font-black uppercase rounded-xl hover:bg-red-50 transition-all">Reject</button>
                          </>
                        ) : (
                          <span className="text-[10px] font-bold text-slate-400 italic opacity-50 flex items-center"><Info className="w-3 h-3 mr-1"/> READ ONLY</span>
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
