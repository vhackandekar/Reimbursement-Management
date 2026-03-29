import React, { useState } from 'react';
import { 
  Search, CheckCircle, XCircle, Clock, 
  MoreVertical, ChevronDown, Download,
  User, Calendar, Tag, ExternalLink
} from 'lucide-react';

export default function ExpenseRequests() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [activeDropdown, setActiveDropdown] = useState(null);
  
  const [expenses, setExpenses] = useState([
    { id: 'EXP-001', employee: 'John Doe', amount: '$1,250', category: 'Travel', date: '2026-03-28', status: 'Pending', managedBy: 'Sarah Smith', managedStatus: 'Awaiting' },
    { id: 'EXP-002', employee: 'Jane Wilson', amount: '$850', category: 'Meals', date: '2026-03-27', status: 'Approved', managedBy: 'Sarah Smith', managedStatus: 'Approved' },
    { id: 'EXP-003', employee: 'Robert Chen', amount: '$2,100', category: 'Accommodation', date: '2026-03-27', status: 'Pending', managedBy: 'Michael Lee', managedStatus: 'Reviewing' },
    { id: 'EXP-004', employee: 'Sarah Smith', amount: '$450', category: 'Transport', date: '2026-03-26', status: 'Approved', managedBy: 'David Chen', managedStatus: 'Approved' },
    { id: 'EXP-005', employee: 'Michael Lee', amount: '$680', category: 'Meals', date: '2026-03-26', status: 'Rejected', managedBy: 'Sarah Smith', managedStatus: 'Rejected' },
    { id: 'EXP-006', employee: 'Alice Brown', amount: '$1,120', category: 'Travel', date: '2026-03-25', status: 'Pending', managedBy: 'Michael Lee', managedStatus: 'Awaiting' },
    { id: 'EXP-007', employee: 'Chris Evans', amount: '$340', category: 'Supplies', date: '2026-03-25', status: 'Approved', managedBy: 'David Chen', managedStatus: 'Approved' },
    { id: 'EXP-008', employee: 'Emma Watson', amount: '$1,500', category: 'Training', date: '2026-03-24', status: 'Rejected', managedBy: 'Sarah Smith', managedStatus: 'Rejected' },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setExpenses(prev => prev.map(exp => 
      exp.id === id ? { ...exp, status: newStatus } : exp
    ));
    setActiveDropdown(null);
  };

  const filteredExpenses = expenses.filter(exp => {
    const matchesSearch = exp.employee.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         exp.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || exp.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 border-green-200 dark:border-green-500/20';
      case 'Pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400 border-amber-200 dark:border-amber-500/20';
      case 'Rejected': return 'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400 border-red-200 dark:border-red-500/20';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-500/10 dark:text-slate-400 border-slate-200 dark:border-slate-500/20';
    }
  };

  return (
    <div className="animate-in fade-in duration-300 pb-12 font-sans space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight uppercase">Expense Approvals</h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1.5 text-sm font-medium">Administrative control panel for reimbursement lifecycle.</p>
        </div>
        
        <button className="flex items-center space-x-2 px-6 py-3 bg-white dark:bg-[#1E293B] border border-slate-200 dark:border-slate-700/50 rounded-2xl text-slate-700 dark:text-slate-200 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm active:scale-95">
          <Download className="w-4 h-4" />
          <span>Export Records</span>
        </button>
      </div>

      {/* Main Table Container */}
      <div className="bg-white dark:bg-[#1E293B] rounded-[32px] shadow-sm border border-slate-200 dark:border-slate-700/50 overflow-hidden flex flex-col transition-colors duration-200">
        
        {/* Search & Filter Bar */}
        <div className="px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-slate-200 dark:border-slate-700/50">
           <div className="flex items-center space-x-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-80 group">
                 <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                 <input 
                   type="text" 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   placeholder="Search employees or categories..." 
                   className="w-full pl-12 pr-4 py-2.5 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-slate-900 dark:text-slate-200 placeholder-slate-400 transition-all shadow-sm" 
                 />
              </div>
           </div>
           
           <div className="flex items-center space-x-3 w-full md:w-auto">
              <div className="flex items-center space-x-2 bg-slate-50 dark:bg-[#0F172A] p-1 rounded-2xl border border-slate-200 dark:border-slate-700/50 shadow-sm">
                 {['All', 'Pending', 'Approved', 'Rejected'].map((status) => (
                   <button 
                     key={status}
                     onClick={() => setStatusFilter(status)}
                     className={`px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
                       statusFilter === status 
                         ? 'bg-white dark:bg-[#1E293B] text-blue-600 dark:text-blue-400 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700' 
                         : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                     }`}
                   >
                     {status}
                   </button>
                 ))}
              </div>
           </div>
        </div>
        
        {/* Table Content */}
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-[#0F172A]/30 border-b border-slate-200 dark:border-slate-700/50">
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em]">Requester</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em]">Details</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em]">Managed By</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em]">Current Status</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-500 dark:text-slate-400 text-right uppercase tracking-[0.15em]">System Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/40">
              {filteredExpenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-slate-50/80 dark:hover:bg-[#0F172A]/40 transition-all group">
                  
                  {/* Requester */}
                  <td className="px-8 py-5">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-2xl bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 flex items-center justify-center text-blue-700 dark:text-blue-400 mr-4 shrink-0 font-bold text-xs shadow-sm">
                         {exp.employee.charAt(0)}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">{exp.employee}</span>
                        <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 tracking-wide flex items-center">
                           <Calendar className="w-3 h-3 mr-1" />
                           {exp.date}
                        </span>
                      </div>
                    </div>
                  </td>
                  
                  {/* Details */}
                  <td className="px-6 py-5">
                    <div className="flex flex-col">
                       <span className="text-sm font-bold text-slate-900 dark:text-white">{exp.amount}</span>
                       <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest flex items-center mt-1">
                          <Tag className="w-3 h-3 mr-1" />
                          {exp.category}
                       </span>
                    </div>
                  </td>
                  
                  {/* Manager Info */}
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-3">
                       <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700/50 flex items-center justify-center text-slate-400">
                          <User className="w-4 h-4" />
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tight">{exp.managedBy}</span>
                          <span className={`text-[9px] font-bold uppercase tracking-[0.1em] ${
                            exp.managedStatus === 'Approved' ? 'text-green-500' : 
                            exp.managedStatus === 'Rejected' ? 'text-red-500' : 
                            'text-amber-500'
                          }`}>
                            {exp.managedStatus}
                          </span>
                       </div>
                    </div>
                  </td>
                  
                  {/* Current Status Badge (Static) */}
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-3 py-1.5 rounded-2xl text-[10px] font-bold border ${getStatusStyle(exp.status)} shadow-sm font-sans tracking-wide`}>
                       {exp.status === 'Approved' && <CheckCircle className="w-3 h-3 mr-1.5" />}
                       {exp.status === 'Rejected' && <XCircle className="w-3 h-3 mr-1.5" />}
                       {exp.status === 'Pending' && <Clock className="w-3 h-3 mr-1.5" />}
                       {exp.status}
                    </span>
                  </td>

                  {/* Proper Professional Actions Dropdown */}
                  <td className="px-8 py-5 text-right relative">
                    <div className="flex items-center justify-end">
                       <button 
                         onClick={() => setActiveDropdown(activeDropdown === exp.id ? null : exp.id)}
                         className={`flex items-center space-x-2 px-4 py-2 rounded-xl border font-bold text-[10px] uppercase tracking-widest transition-all ${
                           activeDropdown === exp.id 
                             ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/25' 
                             : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors'
                         }`}
                       >
                         <span>Update Status</span>
                         <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === exp.id ? 'rotate-180' : ''}`} />
                       </button>
                    </div>

                    {/* Actual Action Menu */}
                    {activeDropdown === exp.id && (
                      <>
                        <div className="fixed inset-0 z-30" onClick={() => setActiveDropdown(null)}></div>
                        <div className="absolute top-[calc(100%-8px)] right-8 w-44 bg-white dark:bg-[#111827] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 py-3 z-40 animate-in fade-in zoom-in-95 duration-200 flex flex-col font-sans">
                           <div className="px-4 py-1 mb-2">
                             <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Administrative Override</span>
                           </div>
                           
                           <button onClick={() => handleStatusChange(exp.id, 'Approved')} className="w-full flex items-center px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-green-50 dark:hover:bg-green-500/10 hover:text-green-600 dark:hover:text-green-400 transition-colors group">
                              <CheckCircle className="w-3.5 h-3.5 mr-3 text-slate-400 group-hover:text-green-500 transition-colors" />
                              Approve
                           </button>
                           
                           <button onClick={() => handleStatusChange(exp.id, 'Rejected')} className="w-full flex items-center px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 transition-colors group">
                              <XCircle className="w-3.5 h-3.5 mr-3 text-slate-400 group-hover:text-red-500 transition-colors" />
                              Reject
                           </button>
                           
                           <button onClick={() => handleStatusChange(exp.id, 'Pending')} className="w-full flex items-center px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-amber-50 dark:hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 transition-colors group">
                              <Clock className="w-3.5 h-3.5 mr-3 text-slate-400 group-hover:text-amber-500 transition-colors" />
                              Mark Pending
                           </button>
                           
                           <div className="h-px bg-slate-100 dark:bg-slate-800 my-2 mx-4"></div>
                           
                           <button className="w-full flex items-center px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                              <ExternalLink className="w-3.5 h-3.5 mr-3 text-slate-400 group-hover:text-blue-500 transition-colors" />
                              View Receipt
                           </button>
                        </div>
                      </>
                    )}
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredExpenses.length === 0 && (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800/50 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">No records found</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs mt-1">We couldn't find any reimbursement requests matching your current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
