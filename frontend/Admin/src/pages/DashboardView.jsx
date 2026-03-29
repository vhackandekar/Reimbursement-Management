import React from 'react';
import { 
  Users, UserCheck, DollarSign, FileText, 
  Clock, CheckCircle, XCircle, Timer,
  ArrowUpRight
} from 'lucide-react';

const KPICard = ({ title, value, subtext, subtextColor = 'text-green-500', icon: Icon, iconColor, iconBg }) => (
  <div className="bg-[#1E293B] p-5 rounded-xl border border-slate-700/50 flex flex-col justify-between h-full">
    <div className="flex justify-between items-start mb-4">
      <div>
        <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-white">{value}</h3>
      </div>
      <div className={`p-2.5 rounded-lg ${iconBg}`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
    </div>
    <p className={`text-xs font-medium ${subtextColor}`}>{subtext}</p>
  </div>
);

const QuickAction = ({ icon: Icon, title, isPrimary }) => (
  <button className={`w-full flex items-center justify-between p-4 rounded-xl transition-all ${
    isPrimary 
      ? 'bg-blue-500 hover:bg-blue-600 text-white border border-blue-500' 
      : 'bg-transparent hover:bg-slate-800 text-slate-200 border border-slate-700'
  }`}>
    <div className="flex items-center space-x-3">
      <Icon className="w-5 h-5" />
      <span className="font-semibold text-sm">{title}</span>
    </div>
    <ArrowUpRight className="w-4 h-4 opacity-70" />
  </button>
);

export default function DashboardView({ setActiveTab }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300 pb-10">
      
      {/* Header section */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-wide">Welcome back, Admin!</h1>
        <p className="text-slate-400 mt-1.5 text-sm">Here's what's happening with your expense management system today</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard 
          title="Total Employees" value="142" subtext="↗ +8 this month" 
          icon={Users} iconColor="text-blue-400" iconBg="bg-blue-500/10" 
        />
        <KPICard 
          title="Total Managers" value="18" subtext="↗ +2 this month" 
          icon={UserCheck} iconColor="text-purple-400" iconBg="bg-purple-500/10" 
        />
        <KPICard 
          title="Total Expenses" value="$84,250" subtext="↗ +1.2% from last month" 
          icon={DollarSign} iconColor="text-green-400" iconBg="bg-green-500/10" 
        />
        <KPICard 
          title="Active Approval Rules" value="12" subtext="All rules active" subtextColor="text-slate-400"
          icon={FileText} iconColor="text-amber-400" iconBg="bg-amber-500/10" 
        />
        <KPICard 
          title="Pending Approvals" value="28" subtext="Awaiting action" subtextColor="text-amber-500"
          icon={Clock} iconColor="text-amber-400" iconBg="bg-amber-500/10" 
        />
        <KPICard 
          title="Approved This Month" value="156" subtext="89% approval rate" subtextColor="text-green-500"
          icon={CheckCircle} iconColor="text-green-400" iconBg="bg-green-500/10" 
        />
        <KPICard 
          title="Rejected This Month" value="19" subtext="11% rejection rate" subtextColor="text-red-500"
          icon={XCircle} iconColor="text-red-400" iconBg="bg-red-500/10" 
        />
        <KPICard 
          title="Avg Processing Time" value="2.4d" subtext="-0.5 days faster" subtextColor="text-green-500"
          icon={Timer} iconColor="text-blue-400" iconBg="bg-blue-500/10" 
        />
      </div>

      {/* Quick Actions */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white tracking-wide">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div onClick={() => setActiveTab('Employees')}>
             <QuickAction icon={Users} title="Manage Users" isPrimary={true} />
          </div>
          <div onClick={() => setActiveTab('Rules')}>
             <QuickAction icon={FileText} title="Approval Rules" isPrimary={false} />
          </div>
          <div onClick={() => setActiveTab('Expenses')}>
             <QuickAction icon={DollarSign} title="View All Expenses" isPrimary={false} />
          </div>
        </div>
      </div>

      {/* Recent Expense Requests stub */}
      <div className="pt-4">
         <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white tracking-wide">Recent Expense Requests</h2>
            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">View All</button>
         </div>
         <div className="bg-[#1E293B] rounded-xl border border-slate-700/50 h-32 flex items-center justify-center">
            <p className="text-slate-500 text-sm">Table content matching previous designs goes here...</p>
         </div>
      </div>

    </div>
  );
}
