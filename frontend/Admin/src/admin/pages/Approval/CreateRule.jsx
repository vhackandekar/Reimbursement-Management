import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Save, Plus, Trash2, 
  Filter, AlertCircle, Info, ChevronRight 
} from 'lucide-react';

export default function CreateRule() {
  const navigate = useNavigate();
  
  // State for conditions
  const [conditions, setConditions] = useState([
    { id: 1, type: 'Expense Category', operator: 'is', value: 'Travel' },
    { id: 2, type: 'Amount', operator: '>', value: '1000' }
  ]);

  // State for selected approvers
  const [selectedApprovers, setSelectedApprovers] = useState([
    { id: 1, name: 'Sarah Smith', role: 'Manager', required: true, seq: 1 },
    { id: 2, name: 'Michael Lee', role: 'Finance', required: false, seq: 2 }
  ]);

  const removeCondition = (id) => setConditions(conditions.filter(c => c.id !== id));
  const addCondition = () => setConditions([...conditions, { id: Date.now(), type: 'Expense Category', operator: 'is', value: '' }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/admin/rules');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300 max-w-[1200px] mx-auto pb-20 font-sans">
      
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-5">
          <button onClick={() => navigate(-1)} className="p-3 bg-white dark:bg-[#1E293B] hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-2xl transition-all border border-slate-200 dark:border-slate-700/50 shadow-sm group">
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">New Approval Rule</h1>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Define routing logic based on expense properties.</p>
          </div>
        </div>
        <button form="approvalForm" type="submit" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-2xl flex items-center transition-all shadow-lg shadow-blue-500/20 active:scale-95 uppercase tracking-widest">
          <Save className="w-4 h-4 mr-2" />
          Publish Rule
        </button>
      </div>

      <form id="approvalForm" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT COLUMN: BASIC INFO & CONDITIONS (8 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Section 1: Basic Info */}
          <div className="bg-white dark:bg-[#1E293B] rounded-[32px] p-8 border border-slate-200 dark:border-slate-700/50 shadow-sm transition-colors duration-200">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <span className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center mr-3 text-sm">1</span>
              General Information
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Rule Designation Name</label>
                <input 
                  type="text" required placeholder="e.g. Travel Policy > $1000"
                  className="w-full px-5 py-3.5 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-slate-900 dark:text-white transition-all shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Operational Description</label>
                <textarea 
                  rows="2" placeholder="Describe when this rule should trigger..."
                  className="w-full px-5 py-3.5 bg-slate-50 dark:bg-[#0F172A] border border-slate-200 dark:border-slate-700/50 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-slate-900 dark:text-white transition-all shadow-sm resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Section 2: Condition Builder */}
          <div className="bg-white dark:bg-[#1E293B] rounded-[32px] p-8 border border-slate-200 dark:border-slate-700/50 shadow-sm transition-colors duration-200">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                <span className="w-8 h-8 rounded-lg bg-purple-50 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center mr-3 text-sm">2</span>
                Trigger Conditions
              </h2>
              <button 
                type="button" onClick={addCondition}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 px-3 py-1.5 rounded-lg transition-colors flex items-center uppercase tracking-wider"
              >
                <Plus className="w-3 h-3 mr-1" /> Add Condition
              </button>
            </div>

            <div className="space-y-4">
              {conditions.map((cond, idx) => (
                <div key={cond.id} className="flex flex-wrap md:flex-nowrap items-center gap-3 bg-slate-50 dark:bg-[#0F172A] p-4 rounded-2xl border border-slate-100 dark:border-slate-800/50 group animate-in slide-in-from-right-2 duration-200">
                  <div className="flex-1 min-w-[140px]">
                    <select className="w-full bg-transparent border-none text-sm font-bold text-slate-700 dark:text-slate-300 focus:ring-0 cursor-pointer">
                      <option>Expense Category</option>
                      <option>Amount</option>
                      <option>Department</option>
                      <option>Role</option>
                    </select>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 hidden md:block" />
                  <div className="w-32">
                    <select className="w-full bg-transparent border-none text-sm font-bold text-blue-600 dark:text-blue-400 focus:ring-0 cursor-pointer">
                      <option>is</option>
                      <option>is not</option>
                      <option>greater than</option>
                      <option>less than</option>
                      <option>equals to</option>
                    </select>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 hidden md:block" />
                  <div className="flex-[2] min-w-[180px]">
                    <input 
                      type="text" defaultValue={cond.value} placeholder="Value..."
                      className="w-full bg-transparent border-none text-sm font-medium text-slate-900 dark:text-white focus:ring-0 placeholder-slate-400"
                    />
                  </div>
                  <button 
                    type="button" onClick={() => removeCondition(cond.id)}
                    className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <div className="p-4 bg-blue-50/50 dark:bg-blue-500/5 rounded-[20px] border border-blue-100/50 dark:border-blue-500/10 flex items-start space-x-3">
                 <Info className="w-5 h-5 text-blue-500 mt-0.5" />
                 <p className="text-xs font-semibold text-blue-700/70 dark:text-blue-400/70 leading-relaxed">
                   Logic: All conditions must be met (AND) for this rule to trigger. You can define category-specific or amount-based logic here.
                 </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: APPROVERS & REQUISITES (5 Cols) */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Section 3: Approvers Setup */}
          <div className="bg-white dark:bg-[#111827] rounded-[32px] p-8 border border-slate-200 dark:border-slate-700 shadow-sm transition-colors duration-200">
            <div className="flex items-center justify-between mb-8">
               <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
                <span className="w-8 h-8 rounded-lg bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center mr-3 text-sm">3</span>
                Approver Flow
               </h2>
               <div className="flex items-center space-x-3 group relative cursor-help" title="If checked, request goes to manager first.">
                  <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Is manager an approver?</span>
                  <input type="checkbox" className="w-5 h-5 rounded-lg border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-blue-600 focus:ring-blue-500/50 cursor-pointer shadow-sm" />
               </div>
            </div>

            {/* List of active approvers to pick from */}
            <div className="space-y-4">
               {selectedApprovers.map((appr, idx) => (
                 <div key={appr.id} className="flex items-center p-3.5 bg-white dark:bg-[#0F172A]/50 border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-all group">
                    <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center text-xs font-bold mr-4 shrink-0">
                       {idx + 1}
                    </div>
                    <div className="flex-1">
                       <p className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-tight">{appr.name}</p>
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{appr.role}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                       <div className="flex flex-col items-center">
                          <label className="text-[9px] font-bold text-slate-400 mb-1 leading-none uppercase">Req</label>
                          <input type="checkbox" defaultChecked={appr.required} className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 bg-transparent text-blue-600 focus:ring-blue-500/50 cursor-pointer" />
                       </div>
                       <button type="button" className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                 </div>
               ))}
               
               <button type="button" className="w-full py-3.5 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 hover:text-blue-500 hover:border-blue-200 dark:hover:border-blue-500/30 transition-all flex items-center justify-center text-xs font-bold uppercase tracking-widest space-x-2 group">
                  <Plus className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>Assign Another Approver</span>
               </button>
            </div>

            {/* Workflow Logic Section */}
            <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 space-y-8">
               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <div className="flex flex-col">
                        <label className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">Flow Sequence Type</label>
                        <div className="flex items-center mt-1 space-x-2 group cursor-help" title="If checked, sequence matters (John -> Mitchell -> Andreas)">
                           <input type="checkbox" className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-blue-600 focus:ring-blue-500/50 cursor-pointer" />
                           <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-blue-500 transition-colors">Enabled Approvers Sequence</span>
                        </div>
                     </div>
                     <div className="flex bg-slate-100 dark:bg-[#0F172A] p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700/50">
                        <button type="button" className="px-4 py-2 bg-white dark:bg-blue-600 text-slate-900 dark:text-white text-[10px] font-bold rounded-xl shadow-sm tracking-widest uppercase">Sequential</button>
                        <button type="button" className="px-4 py-2 text-slate-500 dark:text-slate-400 text-[10px] font-bold tracking-widest uppercase hover:text-slate-800 dark:hover:text-slate-200">Parallel</button>
                     </div>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium italic pr-4">
                    In Sequential flow, request moves to next member only after current one approves.
                  </p>
               </div>

               <div className="space-y-4">
                  <div className="flex items-center justify-between">
                     <label className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">Min Approval %</label>
                     <div className="flex items-center border-b border-slate-200 dark:border-slate-700 px-1 pb-1">
                        <input type="number" defaultValue="100" className="w-12 bg-transparent border-none focus:ring-0 text-lg font-bold text-blue-600 p-0 text-center" />
                        <span className="text-sm font-bold text-slate-400">%</span>
                     </div>
                  </div>
                  <div className="flex items-start space-x-3 bg-amber-50/50 dark:bg-amber-500/5 p-4 rounded-2xl border border-amber-100/50 dark:border-amber-500/10">
                     <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                     <p className="text-[11px] font-medium text-amber-700 dark:text-amber-400 leading-normal">
                       For example, if set to 50%, the request is approved as soon as half of the designated non-mandatory approvers agree.
                     </p>
                  </div>
               </div>
            </div>
          </div>
        </div>

      </form>
    </div>
  );
}
