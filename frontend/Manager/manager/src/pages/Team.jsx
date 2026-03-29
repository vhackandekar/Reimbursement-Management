import React, { useState, useEffect } from 'react';
import { 
  Users, User, Mail, Shield, TrendingUp, 
  MapPin, Calendar, MoreVertical, ExternalLink,
  DollarSign, Clock, CheckCircle2, AlertCircle
} from 'lucide-react';

// Mock data for team members
const teamMembers = [
  {
    id: 1,
    name: 'Sarah Connor',
    role: 'Senior Project Manager',
    email: 'sarah.c@company.com',
    location: 'Tokyo, JP',
    joined: 'Jan 2024',
    monthlySpend: 49896,
    pendingRequests: 3,
    status: 'Active',
    avatar: 'SC'
  },
  {
    id: 2,
    name: 'John Smith',
    role: 'Field Engineer',
    email: 'john.s@company.com',
    location: 'London, UK',
    joined: 'Mar 2024',
    monthlySpend: 10560,
    pendingRequests: 0,
    status: 'Away',
    avatar: 'JS'
  },
  {
    id: 3,
    name: 'Emily Taylor',
    role: 'Solutions Architect',
    email: 'emily.t@company.com',
    location: 'Berlin, DE',
    joined: 'Feb 2024',
    monthlySpend: 28000,
    pendingRequests: 1,
    status: 'Active',
    avatar: 'ET'
  },
  {
    id: 4,
    name: 'Michael Chen',
    role: 'Associate Consultant',
    email: 'm.chen@company.com',
    location: 'Singapore, SG',
    joined: 'May 2024',
    monthlySpend: 8200,
    pendingRequests: 0,
    status: 'Active',
    avatar: 'MC'
  }
];

const TeamMemberCard = ({ member }) => (
  <div className="bg-white dark:bg-[#1E293B] rounded-[32px] border border-slate-200 dark:border-slate-800 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
    <div className="flex justify-between items-start mb-6">
      <div className="flex items-center space-x-4">
        <div className="w-14 h-14 rounded-2xl bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white text-xl font-bold shadow-lg shadow-blue-500/20">
          {member.avatar}
        </div>
        <div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">{member.name}</h4>
          <p className="text-xs font-medium text-slate-400 dark:text-slate-500">{member.role}</p>
        </div>
      </div>
      <button className="p-2 text-slate-300 hover:text-slate-600 dark:hover:text-slate-400 transition-colors">
        <MoreVertical className="w-5 h-5" />
      </button>
    </div>

    <div className="space-y-4 mb-6">
      <div className="flex items-center text-xs text-slate-500 font-medium">
        <MapPin className="w-3.5 h-3.5 mr-2 opacity-50" />
        {member.location}
      </div>
      <div className="flex items-center text-xs text-slate-500 font-medium">
        <Mail className="w-3.5 h-3.5 mr-2 opacity-50" />
        {member.email}
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Monthly Spend</p>
        <p className="text-sm font-bold text-slate-900 dark:text-white flex items-center">
          ₹ {member.monthlySpend.toLocaleString()}
          <TrendingUp className="w-3 h-3 ml-1.5 text-green-500" />
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-none">Pending</p>
        <p className={`text-sm font-bold flex items-center ${member.pendingRequests > 0 ? 'text-blue-600' : 'text-slate-400'}`}>
          {member.pendingRequests} <Clock className="w-3 h-3 ml-1.5 opacity-50" />
        </p>
      </div>
    </div>

    <button className="w-full mt-6 py-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-600 dark:text-slate-400 text-[10px] font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center group-hover:shadow-lg group-hover:shadow-blue-500/20">
      Account Activity
      <ExternalLink className="w-3 h-3 ml-2" />
    </button>
  </div>
);

export default function Team() {
  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">Team Management</h2>
          <p className="text-sm text-slate-500 font-medium tracking-wide">
            Oversee and manage your direct reports' activity and fiscal impact.
          </p>
        </div>
        
        <div className="flex items-center space-x-3 h-12">
          {/* Add member button removed based on manager permissions */}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {teamMembers.map(member => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
}
