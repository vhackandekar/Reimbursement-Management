import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';

export default function CreateRule() {
  const navigate = useNavigate();
  const [approvers, setApprovers] = useState([
    { id: 1, name: 'John', required: true },
    { id: 2, name: 'Mitchell', required: false },
    { id: 3, name: 'Andreas', required: false },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/admin/rules');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-[1200px] mx-auto pb-10 font-sans">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button onClick={() => navigate(-1)} className="p-2 bg-white dark:bg-[#1E293B] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg transition-colors border border-slate-200 dark:border-slate-700/50 shadow-sm">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin view (Approval rules)</h1>
          </div>
        </div>
        <button form="approvalForm" type="submit" className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg flex items-center transition-colors shadow-md shadow-blue-500/20">
          <Save className="w-4 h-4 mr-2" />
          Save Rule
        </button>
      </div>

      <div className="bg-white dark:bg-[#111827] rounded-[24px] border border-slate-200 dark:border-slate-700 shadow-sm p-8 md:p-12 transition-colors duration-200">
        <form id="approvalForm" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* LEFT COLUMN */}
          <div className="space-y-12">
            
            {/* User Field */}
            <div className="flex items-end space-x-4">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 w-16 pb-1">User</label>
              <input 
                type="text" 
                defaultValue="marc"
                className="flex-1 bg-transparent border-0 border-b border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:ring-0 px-0 py-1 text-slate-900 dark:text-white font-medium text-lg placeholder-slate-400"
              />
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 block">Description about rules</label>
              <input 
                type="text" 
                defaultValue="Approval rule for miscellaneous expenses"
                className="w-full bg-transparent border-0 border-b border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:ring-0 px-0 py-1 text-slate-900 dark:text-white font-medium text-lg placeholder-slate-400"
              />
            </div>

            {/* Manager Field */}
            <div className="space-y-3">
              <div className="flex items-end space-x-4">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 w-16 pb-1">Manager</label>
                <div className="relative flex-1">
                  <select className="w-full bg-transparent border-0 border-b border-slate-300 dark:border-slate-600 focus:border-blue-500 focus:ring-0 px-0 py-1 text-slate-900 dark:text-white font-medium text-lg appearance-none cursor-pointer">
                    <option value="sarah" className="bg-white dark:bg-slate-800">sarah</option>
                    <option value="john" className="bg-white dark:bg-slate-800">john</option>
                  </select>
                  <div className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic max-w-sm ml-20">
                Dynamic dropdown. Initially the manager set on user record should be set, admin can change manager for approval if required.
              </p>
            </div>

          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-10">
            
            {/* Header / Is Manager an approver */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-slate-200 dark:border-slate-700 pb-2 gap-4">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Approvers</h2>
              <div className="flex items-center space-x-3 group relative">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Is manager an approver?</span>
                <input type="checkbox" className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 bg-transparent text-blue-500 focus:ring-blue-500/50 cursor-pointer" />
                
                {/* Tooltip replacing the long text arrow */}
                <div className="absolute top-8 right-0 w-64 p-3 bg-slate-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                  If this field is checked then by default the approve request would go to his/her manager first, before going to other approvers.
                </div>
              </div>
            </div>

            {/* Approvers Table */}
            <div className="space-y-4">
              <div className="flex justify-between px-2">
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 w-12 text-center">Seq</span>
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 flex-1 ml-4">User</span>
                <span className="text-sm font-semibold text-slate-500 dark:text-slate-400 w-24 text-center">Required</span>
              </div>
              
              <div className="space-y-3 relative">
                {approvers.map((appr, index) => (
                  <div key={appr.id} className="flex items-center px-2 py-1">
                    <span className="text-lg font-bold text-slate-900 dark:text-white w-12 text-center">{appr.id}</span>
                    <div className="flex-1 border-b border-slate-300 dark:border-slate-600 ml-4 pb-1">
                      <span className="text-lg font-medium text-slate-900 dark:text-white">{appr.name}</span>
                    </div>
                    <div className="w-24 flex justify-center border-b border-slate-300 dark:border-slate-600 pb-1">
                      <input 
                        type="checkbox" 
                        defaultChecked={appr.required}
                        className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 bg-transparent text-blue-500 focus:ring-blue-500/50 cursor-pointer" 
                      />
                    </div>
                  </div>
                ))}
                
                {/* Note pointing to Required checkbox */}
                <div className="absolute -right-4 md:-right-48 top-4 w-40 text-[11px] text-slate-500 dark:text-slate-400 leading-tight hidden md:block">
                  ← If this field is ticked, then anyhow approval of this approver is required in any approval combination scenario.
                </div>
              </div>
            </div>

            {/* Approvers Sequence */}
            <div className="space-y-2 pt-4">
              <div className="flex items-center space-x-3">
                <label className="text-sm font-bold text-slate-900 dark:text-white">Approvers Sequence:</label>
                <input type="checkbox" className="w-5 h-5 rounded border-slate-300 dark:border-slate-600 bg-transparent text-blue-500 focus:ring-blue-500/50 cursor-pointer" />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-md">
                If this field is ticked true then the above mentioned sequence of approvers matters, that is first the request goes to John, if he approves/rejects then only request goes to mitchell and so on.
                <br/><br/>
                If the required approver rejects the request, then expense request is auto-rejected. If not ticked then send approver request to all approvers at the same time.
              </p>
            </div>

            {/* Minimum Approval Percentage */}
            <div className="space-y-2 pt-8">
              <div className="flex items-end space-x-3">
                <label className="text-sm font-bold text-slate-900 dark:text-white pb-1">Minimum Approval percentage:</label>
                <div className="flex items-baseline border-b border-slate-300 dark:border-slate-600 pb-1">
                  <input 
                    type="number" 
                    className="w-16 bg-transparent border-0 focus:ring-0 px-1 py-0 text-slate-900 dark:text-white font-medium text-lg text-center"
                  />
                  <span className="text-slate-900 dark:text-white font-medium ml-1">%</span>
                </div>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 pt-4 max-w-sm">
                Specify the number of percentage approvers required in order to get the request approved.
              </p>
            </div>

          </div>

        </form>
      </div>
    </div>
  );
}
