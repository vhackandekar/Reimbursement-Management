import React, { useState, useEffect } from 'react';
import { 
  BarChart3, Clock, CheckCircle2, AlertCircle, 
  TrendingUp, Users, DollarSign, ArrowUpRight
} from 'lucide-react';
import { managerApi } from '../services/managerApi';

const StatCard = ({ icon: Icon, label, value, subtext, trend, color }) => (
  <div className="bg-white dark:bg-[#1E293B] p-6 rounded-[28px] border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group active:scale-95 cursor-default">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${color} bg-opacity-10 dark:bg-opacity-20 transition-colors`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      {trend && (
        <div className="flex items-center space-x-1 px-2.5 py-1 bg-green-100 dark:bg-green-500/10 rounded-full border border-green-200 dark:border-green-500/20">
          <ArrowUpRight className="w-3 h-3 text-green-600 dark:text-green-400" />
          <span className="text-[10px] font-bold text-green-600 dark:text-green-400">{trend}</span>
        </div>
      )}
    </div>
    <div className="space-y-1">
      <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">{value}</h3>
      <div className="flex flex-col">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{label}</span>
        <span className="text-[10px] text-slate-500 font-medium italic mt-0.5">{subtext}</span>
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const data = await managerApi.getManagerStats();
    setStats(data);
    setLoading(false);
  };

  if (loading) return null;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Manager Dashboard</h2>
          <div className="flex items-center space-x-3 text-sm text-slate-500 font-medium">
            <span>Welcome back, Michael</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Clock} 
          label="Pending Approvals" 
          value={stats.pendingCount} 
          subtext="Requiring immediate action"
          color="bg-blue-600"
        />
        <StatCard 
          icon={CheckCircle2} 
          label="Approved Team" 
          value={stats.approvedCount} 
          subtext="Last 30 days"
          trend="+12%"
          color="bg-green-600"
        />
        <StatCard 
          icon={DollarSign} 
          label="Total Team Spend" 
          value={`${stats.totalTeamSpend.toLocaleString()} ${stats.currency}`} 
          subtext="Budget utilization view"
          color="bg-indigo-600"
        />
        <StatCard 
          icon={Users} 
          label="Team Members" 
          value="12" 
          subtext="Active reporters"
          color="bg-purple-600"
        />
      </div>
    </div>
  );
}
