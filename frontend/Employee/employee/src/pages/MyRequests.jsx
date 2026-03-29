import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ShieldAlert, CheckCircle2, Clock, Upload, PlusCircle, ArrowRight, CircleDashed } from 'lucide-react';

const mockRequests = [
  { id: '1', empName: 'Sarah', desc: 'Restaurant bill', date: '4th Oct, 2025', category: 'Food', paidBy: 'Sarah', remarks: 'None', amount: '5000 rs', status: 'Draft' },
  { id: '2', empName: 'Sarah', desc: 'Flight tickets', date: '10th Oct, 2025', category: 'Travel', paidBy: 'Company Card', remarks: 'Client visit', amount: '12000 rs', status: 'Submitted' },
  { id: '3', empName: 'Sarah', desc: 'Office Chair', date: '1st Sep, 2025', category: 'Supplies', paidBy: 'Sarah', remarks: 'Wfh', amount: '500 rs', status: 'Approved' }
];

export default function MyRequests() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const StatusBadge = ({ status }) => {
    switch (status) {
      case 'Approved':
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-emerald-100/50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full text-[10px] sm:text-xs font-bold border border-emerald-200 dark:border-emerald-800">
            <span>Approved</span>
          </span>
        );
      case 'Submitted':
      case 'Waiting approval':
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-[#1E293B] text-white dark:bg-slate-700 rounded-full text-[10px] sm:text-xs font-bold border border-slate-700 shadow-sm">
            <span>Submitted</span>
          </span>
        );
      case 'Draft':
      default:
        return (
          <span className="inline-flex items-center space-x-1 px-3 py-1 bg-transparent text-slate-700 dark:text-slate-300 rounded-full text-[10px] sm:text-xs font-bold border-2 border-slate-300 dark:border-slate-600">
            <span>Draft</span>
          </span>
        );
    }
  };

  const filteredRequests = mockRequests.filter(r => 
    r.desc.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Dashboard Table Container */}
      <div className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden relative z-0 transition-colors duration-200">
        
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-96">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search expenses by description..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors font-medium"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap min-w-[800px]">
             <thead className="bg-[#111827] text-white">
                <tr>
                   <th className="px-6 py-4 text-xs font-semibold tracking-wider border-r border-slate-700/50">Employee</th>
                   <th className="px-6 py-4 text-xs font-semibold tracking-wider border-r border-slate-700/50">Description</th>
                   <th className="px-6 py-4 text-xs font-semibold tracking-wider border-r border-slate-700/50">Date</th>
                   <th className="px-6 py-4 text-xs font-semibold tracking-wider border-r border-slate-700/50">Category</th>
                   <th className="px-6 py-4 text-xs font-semibold tracking-wider border-r border-slate-700/50">Paid By</th>
                   <th className="px-6 py-4 text-xs font-semibold tracking-wider border-r border-slate-700/50">Remarks</th>
                   <th className="px-6 py-4 text-xs font-semibold tracking-wider border-r border-slate-700/50 text-right">Amount</th>
                   <th className="px-6 py-4 text-xs font-semibold tracking-wider text-center">Status</th>
                </tr>
             </thead>
             <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60 font-medium">
                {filteredRequests.map((req, i) => (
                   <tr key={i} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                      <td className="px-6 py-4 text-sm text-slate-800 dark:text-slate-200 border-r border-slate-200 dark:border-slate-800/60">{req.empName}</td>
                      <td className="px-6 py-4 text-sm text-slate-900 dark:text-white border-r border-slate-200 dark:border-slate-800/60">{req.desc}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 border-r border-slate-200 dark:border-slate-800/60">{req.date}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 border-r border-slate-200 dark:border-slate-800/60">{req.category}</td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 border-r border-slate-200 dark:border-slate-800/60">{req.paidBy}</td>
                      <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 italic border-r border-slate-200 dark:border-slate-800/60">{req.remarks || 'None'}</td>
                      <td className="px-6 py-4 text-right border-r border-slate-200 dark:border-slate-800/60">
                         <span className="text-sm font-bold text-slate-900 dark:text-white">{req.amount}</span>
                      </td>
                      <td className="px-6 py-4 flex justify-center items-center h-full">
                         <StatusBadge status={req.status} />
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
