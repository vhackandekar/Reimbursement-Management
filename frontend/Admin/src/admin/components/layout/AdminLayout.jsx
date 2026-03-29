import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, UserPlus, FileText, Settings, 
  LogOut, DollarSign, Bell, Sun, Moon
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, to }) => (
  <NavLink 
    to={to}
    className={({ isActive }) => `w-full flex items-center space-x-3 px-4 py-3 min-h-[48px] rounded-lg transition-colors group ${
      isActive 
        ? 'bg-blue-500 text-white font-medium shadow-md shadow-blue-500/20' 
        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-slate-200'
    }`}
  >
    {({ isActive }) => (
      <>
        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-600 dark:text-slate-400 dark:group-hover:text-slate-300'}`} />
        <span className="text-sm font-medium tracking-wide">{label}</span>
      </>
    )}
  </NavLink>
);

export default function AdminLayout() {
  const navigate = useNavigate();
  // Assume we start in dark mode to match previous setup
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-200 ${isDark ? 'dark bg-[#0F172A] text-slate-300' : 'bg-[#F8FAFC] text-slate-800'}`}>
      <div className="flex h-screen overflow-hidden">
        
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-[#0B0F19] border-r border-slate-200 dark:border-slate-800/60 flex flex-col z-20 hidden md:flex shrink-0 transition-colors duration-200">
          <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800/60 shrink-0">
            <div className="w-7 h-7 bg-blue-500 rounded flex items-center justify-center mr-3 shrink-0 shadow-sm shadow-blue-500/20">
              <DollarSign className="w-4 h-4 text-white" />
            </div>
            <span className="text-[15px] font-bold text-slate-900 dark:text-white tracking-wide">ExpenseManagement</span>
          </div>
          
          <div className="flex-1 flex flex-col justify-between py-6 overflow-y-auto">
            <nav className="px-3 space-y-1.5 flex-1">
              <SidebarItem icon={LayoutDashboard} label="Dashboard" to="/admin/dashboard" />
              <SidebarItem icon={Users} label="Manage Users" to="/admin/users" />
              <SidebarItem icon={UserPlus} label="Add User" to="/admin/users/new" />
              <SidebarItem icon={FileText} label="Approval Rules" to="/admin/rules" />
              <SidebarItem icon={Settings} label="Settings" to="/admin/settings" />
            </nav>
            
            <div className="px-3 mt-6 shrink-0">
              <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/80 dark:hover:text-slate-200 transition-colors">
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium tracking-wide">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#F8FAFC] dark:bg-[#0F172A] transition-colors duration-200">
          
          {/* Top Navbar */}
          <header className="h-16 bg-white dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-800/60 flex items-center justify-between px-8 shrink-0 relative z-10 transition-colors duration-200">
            <div className="flex items-center">
              <h1 className="text-[15px] font-semibold text-slate-900 dark:text-white tracking-wide">Admin Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-5 relative z-20">
              <button onClick={() => setIsDark(!isDark)} className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors">
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              
              <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className={`absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 ${isDark ? 'border-[#0F172A]' : 'border-white'}`}></span>
              </button>

              <div className="flex items-center pl-2">
                 <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white mr-3 shrink-0 shadow-sm shadow-blue-500/20 font-bold text-xs">
                    AD
                 </div>
                 <span className="text-sm font-medium text-slate-600 dark:text-slate-300 hidden sm:block">Admin User</span>
              </div>
            </div>
          </header>

          {/* Scrollable Content Container */}
          <div className="flex-1 overflow-y-auto w-full p-6 md:p-8 relative z-0">
            <div className="max-w-6xl mx-auto">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
