import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, UserCheck, DollarSign,
  Clock, CheckCircle, XCircle,
  ArrowUpRight, FileText
} from 'lucide-react';

const KPICard = ({ title, value, subtext, subtextColor = 'text-green-500', icon: Icon, iconColor, iconBg }) => (
  <div className="bg-white dark:bg-[#1E293B] p-5 rounded-xl border border-slate-200 dark:border-slate-700/50 flex flex-col justify-between h-full shadow-sm transition-colors duration-200">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{value}</h3>
      </div>
      <div className={`p-2.5 rounded-lg ${iconBg}`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
    </div>
    <p className={`text-xs font-medium ${subtextColor}`}>{subtext}</p>
  </div>
);

const QuickAction = ({ icon: Icon, title, isPrimary, onClick }) => (
  <button onClick={onClick} className={`w-full flex items-center justify-between p-4 rounded-xl transition-all shadow-sm ${
    isPrimary 
      ? 'bg-blue-600 hover:bg-blue-700 text-white border border-blue-600' 
      : 'bg-white dark:bg-[#1E293B] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700/50'
  }`}>
    <div className="flex items-center space-x-3">
      <Icon className="w-5 h-5" />
      <span className="font-semibold text-sm">{title}</span>
    </div>
    <ArrowUpRight className="w-4 h-4 opacity-70" />
  </button>
);

export default function Dashboard() {
  const navigate = useNavigate();

  const recentExpenses = [
    { id: 'EXP-001', employee: 'John Doe', amount: '$1,250', category: 'Travel', date: '2026-03-28', status: 'Pending' },
    { id: 'EXP-002', employee: 'Jane Wilson', amount: '$850', category: 'Meals', date: '2026-03-27', status: 'Approved' },
    { id: 'EXP-003', employee: 'Robert Chen', amount: '$2,100', category: 'Accommodation', date: '2026-03-27', status: 'Pending' },
    { id: 'EXP-004', employee: 'Sarah Smith', amount: '$450', category: 'Transport', date: '2026-03-26', status: 'Approved' },
    { id: 'EXP-005', employee: 'Michael Lee', amount: '$680', category: 'Meals', date: '2026-03-26', status: 'Rejected' },
  ];

  const categorySummaries = [
    { id: 1, title: 'Travel', amount: '$32,450', count: '68 expenses' },
    { id: 2, title: 'Accommodation', amount: '$28,100', count: '42 expenses' },
    { id: 3, title: 'Meals', amount: '$15,800', count: '89 expenses' },
    { id: 4, title: 'Others', amount: '$7,900', count: '35 expenses' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-12 font-sans">
      
      {/* Header section */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-wide">Welcome back, Admin!</h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1.5 text-sm">Here's what's happening with your expense management system today</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <KPICard 
          title="Total Employees" value="142" subtext="↗ +8 this month" 
          icon={Users} iconColor="text-blue-500 dark:text-blue-400" iconBg="bg-blue-50 dark:bg-blue-500/10" 
        />
        <KPICard 
          title="Total Managers" value="18" subtext="↗ +2 this month" 
          icon={UserCheck} iconColor="text-purple-500 dark:text-purple-400" iconBg="bg-purple-50 dark:bg-purple-500/10" 
        />
        <KPICard 
          title="Total Expenses" value="$84,250" subtext="↗ +12% from last month" 
          icon={DollarSign} iconColor="text-green-600 dark:text-green-400" iconBg="bg-green-50 dark:bg-green-500/10" 
        />
        <KPICard 
          title="Pending Approvals" value="28" subtext="Awaiting action" subtextColor="text-amber-600 dark:text-amber-500"
          icon={Clock} iconColor="text-amber-600 dark:text-amber-400" iconBg="bg-amber-50 dark:bg-amber-500/10" 
        />
        <KPICard 
          title="Approved This Month" value="156" subtext="89% approval rate" subtextColor="text-green-600 dark:text-green-500"
          icon={CheckCircle} iconColor="text-green-600 dark:text-green-400" iconBg="bg-green-50 dark:bg-green-500/10" 
        />
        <KPICard 
          title="Rejected This Month" value="19" subtext="11% rejection rate" subtextColor="text-red-600 dark:text-red-500"
          icon={XCircle} iconColor="text-red-600 dark:text-red-400" iconBg="bg-red-50 dark:bg-red-500/10" 
        />
      </div>



      {/* Recent Expense Requests */}
      <div className="pt-4 space-y-4">
         <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-wide">Recent Expense Requests</h2>
            <button onClick={() => navigate('/admin/expenses')} className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-semibold transition-colors">
              View All
            </button>
         </div>

         <div className="bg-white dark:bg-[#1E293B] rounded-xl border border-slate-200 dark:border-slate-700/50 overflow-hidden shadow-sm transition-colors duration-200">
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left whitespace-nowrap">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700/50 bg-slate-50/50 dark:bg-[#0F172A]/30">
                    <th className="px-6 py-4 text-xs font-bold text-slate-600 dark:text-slate-400 tracking-wider">Expense ID</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-600 dark:text-slate-400 tracking-wider">Employee</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-600 dark:text-slate-400 tracking-wider">Amount</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-600 dark:text-slate-400 tracking-wider">Category</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-600 dark:text-slate-400 tracking-wider">Date</th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-600 dark:text-slate-400 tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                  {recentExpenses.map((exp) => (
                    <tr key={exp.id} className="hover:bg-slate-50 dark:hover:bg-[#0F172A]/50 transition-colors">
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{exp.id}</span>
                      </td>
                      <td className="px-6 py-4">
                         <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{exp.employee}</span>
                      </td>
                      <td className="px-6 py-4">
                         <span className="text-sm font-bold text-slate-900 dark:text-white">{exp.amount}</span>
                      </td>
                      <td className="px-6 py-4">
                         <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{exp.category}</span>
                      </td>
                      <td className="px-6 py-4">
                         <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{exp.date}</span>
                      </td>
                      <td className="px-6 py-4">
                         <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${
                           exp.status === 'Approved' ? 'bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400' :
                           exp.status === 'Pending' ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400' :
                           'bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400'
                         }`}>
                           {exp.status}
                         </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
         </div>
      </div>

      {/* Expense Summary by Category */}
      <div className="pt-6 space-y-4">
         <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-wide">Expense Summary by Category (This Month)</h2>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
           {categorySummaries.map((cat) => (
             <div key={cat.id} className="bg-white dark:bg-[#1E293B] p-5 rounded-xl border border-slate-200 dark:border-slate-700/50 shadow-sm flex flex-col transition-colors duration-200">
               <span className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-3">{cat.title}</span>
               <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{cat.amount}</h3>
               <span className="text-xs font-medium text-slate-400 dark:text-slate-500">{cat.count}</span>
             </div>
           ))}
         </div>
      </div>

    </div>
  );
}
