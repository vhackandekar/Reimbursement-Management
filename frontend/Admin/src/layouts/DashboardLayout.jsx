import React from 'react';
import { 
  LayoutDashboard, Users, FileText, DollarSign, 
  BarChart2, Settings, LogOut, Bell, Sun
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 min-h-[48px] rounded-lg transition-colors group ${
      active 
        ? 'bg-blue-500 text-white font-medium shadow-md shadow-blue-500/20' 
        : 'text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
    }`}
  >
    <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'}`} />
    <span className="text-sm font-medium tracking-wide">{label}</span>
  </button>
);

export default function DashboardLayout({ children, activeTab, setActiveTab, onLogout }) {
  // Hardcoded dark theme values to strictly match the Figma dark mode screenshot
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-300 font-sans dark">
      <div className="flex h-screen overflow-hidden">
        
        {/* Sidebar Background: very dark slate/navy */}
        <aside className="w-64 bg-[#0B0F19] border-r border-slate-800/60 flex flex-col z-20 hidden md:flex shrink-0">
          <div className="h-16 flex items-center px-6 border-b border-slate-800/60 shrink-0">
            <div className="w-7 h-7 bg-blue-500 rounded flex items-center justify-center mr-3 shrink-0 shadow-sm shadow-blue-500/20">
              <DollarSign className="w-4 h-4 text-white" />
            </div>
            <span className="text-[15px] font-bold text-white tracking-wide">ExpenseManagement</span>
          </div>
          
          <div className="flex-1 flex flex-col justify-between py-6 overflow-y-auto">
            <nav className="px-3 space-y-1.5 flex-1">
              <SidebarItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
              <SidebarItem icon={Users} label="Manage Users" active={activeTab === 'Employees'} onClick={() => setActiveTab('Employees')} />
              <SidebarItem icon={FileText} label="Approval Rules" active={activeTab === 'Rules'} onClick={() => setActiveTab('Rules')} />
              <SidebarItem icon={DollarSign} label="All Expenses" active={activeTab === 'Expenses'} onClick={() => setActiveTab('Expenses')} />
              <SidebarItem icon={BarChart2} label="Reports" active={activeTab === 'Reports'} onClick={() => setActiveTab('Reports')} />
              <SidebarItem icon={Settings} label="Settings" active={activeTab === 'Settings'} onClick={() => setActiveTab('Settings')} />
            </nav>
            
            <div className="px-3 mt-6 shrink-0">
              <button onClick={onLogout} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-400 hover:bg-slate-800/80 hover:text-slate-200 transition-colors">
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium tracking-wide">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#0F172A]">
          
          {/* Top Navbar */}
          <header className="h-16 bg-[#0F172A] border-b border-slate-800/60 flex items-center justify-between px-8 shrink-0 relative z-10">
            <div className="flex items-center">
              <h1 className="text-[15px] font-semibold text-white tracking-wide">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-5 relative z-20">
              <button className="text-slate-400 hover:text-white transition-colors">
                <Sun className="w-5 h-5" />
              </button>
              
              <button className="text-slate-400 hover:text-white transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0F172A]"></span>
              </button>

              <div className="flex items-center pl-2">
                 <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white mr-3 shrink-0 shadow-sm shadow-blue-500/20">
                    <User className="w-4 h-4" />
                 </div>
                 <span className="text-sm font-medium text-slate-300 hidden sm:block">Admin User</span>
              </div>
            </div>
          </header>

          {/* Scrollable Content Container */}
          <div className="flex-1 overflow-y-auto w-full p-6 md:p-8 relative z-0">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// Quick inline component to supply the missing icon in topbar above since User wasn't imported there
function User({ className }) {
  return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
}
