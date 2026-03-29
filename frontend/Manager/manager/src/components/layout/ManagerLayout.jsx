import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  ClipboardCheck, Users, Settings, 
  LogOut, DollarSign, Bell, Sun, Moon, User
} from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, to }) => (
  <NavLink 
    to={to}
    className={({ isActive }) => `w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all group ${
      isActive 
        ? 'bg-blue-600 text-white font-medium shadow-md shadow-blue-900/30 dark:shadow-blue-500/20' 
        : 'text-blue-100 hover:bg-blue-800/60 hover:text-white dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200'
    }`}
  >
    {({ isActive }) => (
      <>
        <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-blue-300 group-hover:text-white dark:text-slate-400 dark:group-hover:text-slate-300 transition-colors'}`} />
        <span className="text-sm font-medium tracking-wide">{label}</span>
      </>
    )}
  </NavLink>
);

export default function ManagerLayout() {
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(true);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('.user-profile-menu')) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-200 ${isDark ? 'dark bg-[#0F172A] text-slate-300' : 'bg-[#F8FAFC] text-slate-800'}`}>
      <div className="flex h-screen overflow-hidden">
        
        {/* Manager Sidebar */}
        <aside className="w-64 bg-[#1E3A8A] dark:bg-[#0B0F19] border-r border-[#1E3A8A] dark:border-[#1E293B] flex flex-col z-20 hidden md:flex shrink-0 transition-colors duration-200">
          <div className="h-16 flex items-center px-6 border-b border-blue-800 dark:border-[#1E293B] shrink-0 transition-colors">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mr-3 shrink-0 shadow-sm shadow-blue-500/20">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <span className="text-base font-bold text-white tracking-wide uppercase italic">Manager Portal</span>
          </div>
          
          <div className="flex-1 flex flex-col justify-between py-6 overflow-y-auto">
            <nav className="px-4 space-y-1.5 flex-1">
              <SidebarItem icon={ClipboardCheck} label="Approvals" to="/approvals" />
              <SidebarItem icon={Users} label="My Team" to="/team" />
              <SidebarItem icon={Settings} label="Settings" to="/settings" />
            </nav>
            
            <div className="px-4 mt-6 shrink-0 border-t border-blue-800 dark:border-[#1E293B] pt-4 transition-colors">
              <button onClick={handleLogout} className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-blue-100 hover:bg-blue-800/60 hover:text-white dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200 transition-colors group">
                <LogOut className="w-5 h-5 text-blue-300 group-hover:text-white dark:text-slate-400 dark:group-hover:text-slate-200 transition-colors" />
                <span className="text-sm font-semibold tracking-wide">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#F8FAFC] dark:bg-[#0F172A] transition-colors duration-200">
          
          {/* Top Navbar */}
          <header className="h-16 bg-white dark:bg-[#0F172A] border-b border-slate-200 dark:border-slate-800/60 flex items-center justify-between px-8 shrink-0 relative z-30 transition-colors duration-200 shadow-sm shadow-slate-200/50 dark:shadow-none">
            <div className="flex items-center space-x-3">
              <div className="px-3 py-1 bg-blue-600 dark:bg-blue-500 rounded-lg text-[11px] font-bold text-white uppercase tracking-widest border border-blue-500 dark:border-blue-400 shadow-sm shadow-blue-500/20">
                Manager
              </div>
              <h1 className="text-[16px] font-bold text-slate-900 dark:text-white tracking-wide">Expense Management</h1>
            </div>
            
            <div className="flex items-center space-x-5 relative">
              <button 
                onClick={() => setIsDark(!isDark)} 
                className="p-2 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 rounded-full transition-colors"
                title="Toggle Dark/Light Mode"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              
              <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors relative">
                <Bell className="w-5 h-5" />
                <span className={`absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-500 rounded-full border-2 ${isDark ? 'border-[#0F172A]' : 'border-white'}`}></span>
              </button>

              <div className="flex items-center pl-2 relative user-profile-menu">
                 <button 
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center focus:outline-none group active:scale-95 transition-transform"
                 >
                    <div className="w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center text-white mr-3 shrink-0 font-bold text-xs shadow-md shadow-blue-500/20 transition-transform group-hover:scale-105">
                       MC
                    </div>
                    <div className="hidden sm:flex flex-col items-start -space-y-0.5 text-left">
                       <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Michael Connor</span>
                    </div>
                 </button>

                 {/* Profile Dropdown */}
                 {dropdownOpen && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-[#1E293B] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                       <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800 mb-1">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Account Manager</p>
                       </div>
                       <button 
                          onClick={() => {navigate('/settings'); setDropdownOpen(false);}}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                       >
                          <User className="w-4 h-4 text-slate-400" />
                          <span className="font-medium">My Profile</span>
                       </button>
                       <button 
                          onClick={() => {navigate('/settings'); setDropdownOpen(false);}}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                       >
                          <Settings className="w-4 h-4 text-slate-400" />
                          <span className="font-medium">Settings</span>
                       </button>
                       <div className="h-px bg-slate-100 dark:bg-slate-800 my-1"></div>
                       <button 
                          onClick={() => {handleLogout(); setDropdownOpen(false);}}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                       >
                          <LogOut className="w-4 h-4" />
                          <span className="font-medium">Sign out</span>
                       </button>
                    </div>
                 )}
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
