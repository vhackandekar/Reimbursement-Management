import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save, Plus, Target, Info, CheckCircle2 } from 'lucide-react';

export default function CreateRule() {
  const navigate = useNavigate();
  const [flowType, setFlowType] = useState('Sequential');
  const [steps, setSteps] = useState([{ id: 1, user: '', required: true }]);

  const addStep = () => {
    setSteps([...steps, { id: steps.length + 1, user: '', required: false }]);
  };

  const removeStep = (id) => {
    setSteps(steps.filter(step => step.id !== id).map((step, index) => ({ ...step, id: index + 1 })));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/admin/rules');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-4xl pb-10">
      <div className="flex items-center space-x-4">
        <button onClick={() => navigate(-1)} className="p-2 bg-[#1E293B] hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition-colors border border-slate-700/50">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">Create Approval Rule</h1>
          <p className="text-slate-400 mt-1 text-sm">Configure dynamic approval chains and conditions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Form Area */}
        <div className="lg:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} id="ruleForm" className="space-y-6">
            
            {/* 🧩 Section 1: Rule Info */}
            <div className="bg-[#1E293B] rounded-xl border border-slate-700/50 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white flex items-center border-b border-slate-700/50 pb-3">
                <span className="w-6 h-6 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs mr-3">1</span>
                Rule Info
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-1.5 block">Rule Name</label>
                  <input type="text" required className="w-full px-4 py-2 bg-[#0F172A] border border-slate-700/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. High Value Hardware" />
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-1.5 block">Description</label>
                  <textarea rows="2" className="w-full px-4 py-2 bg-[#0F172A] border border-slate-700/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" placeholder="Applies to equipment > $1000"></textarea>
                </div>
              </div>
            </div>

            {/* 🧩 Section 2: Manager Config */}
            <div className="bg-[#1E293B] rounded-xl border border-slate-700/50 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white flex items-center border-b border-slate-700/50 pb-3">
                <span className="w-6 h-6 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs mr-3">2</span>
                Manager Config
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <div>
                  <label className="text-sm font-medium text-slate-300 mb-1.5 block">Default Manager Mapping</label>
                  <select className="w-full px-4 py-2 bg-[#0F172A] border border-slate-700/50 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none">
                    <option>Dynamic (User's Manager)</option>
                    <option>Specific Person</option>
                  </select>
                </div>
                <div className="flex items-center space-x-3 h-[38px] px-3 bg-[#0F172A] rounded-lg border border-slate-700/50">
                   <input type="checkbox" id="includeManager" defaultChecked className="w-4 h-4 rounded border-slate-600 bg-[#0F172A] text-blue-500 focus:ring-blue-500/50" />
                   <label htmlFor="includeManager" className="text-sm font-medium text-slate-300 cursor-pointer">Include Manager in Rule</label>
                </div>
              </div>
            </div>

            {/* 🧩 Section 4: Flow Type */}
            <div className="bg-[#1E293B] rounded-xl border border-slate-700/50 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white flex items-center border-b border-slate-700/50 pb-3">
                <span className="w-6 h-6 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs mr-3">3</span>
                Flow Type
              </h2>
              <div className="flex p-1 bg-[#0F172A] rounded-lg border border-slate-700/50 max-w-sm">
                 <button 
                   type="button"
                   onClick={() => setFlowType('Sequential')}
                   className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${flowType === 'Sequential' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                 >
                   Sequential
                 </button>
                 <button 
                   type="button"
                   onClick={() => setFlowType('Parallel')}
                   className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${flowType === 'Parallel' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
                 >
                   Parallel
                 </button>
              </div>
            </div>

            {/* 🧩 Section 3: Approver Steps */}
            <div className="bg-[#1E293B] rounded-xl border border-slate-700/50 p-6 space-y-4">
              <div className="flex justify-between items-end border-b border-slate-700/50 pb-3">
                <h2 className="text-lg font-semibold text-white flex items-center">
                  <span className="w-6 h-6 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs mr-3">4</span>
                  Approver Steps
                </h2>
                <button type="button" onClick={addStep} className="text-sm text-blue-400 hover:text-blue-300 font-medium flex items-center">
                  <Plus className="w-4 h-4 mr-1" /> Add Step
                </button>
              </div>
              
              <div className="space-y-3">
                {steps.map((step) => (
                  <div key={step.id} className="flex relative items-center gap-4 bg-[#0F172A] p-3 rounded-lg border border-slate-700/50 group">
                    <div className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0">
                      {step.id}
                    </div>
                    <select className="flex-1 bg-transparent text-sm text-white focus:outline-none appearance-none font-medium">
                      <option className="bg-slate-800" value="">Select Approver Role/User...</option>
                      <option className="bg-slate-800" value="Direct Manager">Direct Manager</option>
                      <option className="bg-slate-800" value="CFO">CFO (John Smith)</option>
                      <option className="bg-slate-800" value="Finance Team">Finance Team</option>
                    </select>
                    
                    <div className="flex items-center space-x-2 bg-slate-800/50 px-3 py-1.5 rounded-md border border-slate-700/50">
                      <input type="checkbox" id={`req-${step.id}`} defaultChecked={step.required} className="w-3.5 h-3.5 rounded border-slate-600 bg-transparent text-blue-500 focus:ring-blue-500/50" />
                      <label htmlFor={`req-${step.id}`} className="text-xs font-medium text-slate-300 cursor-pointer">Required</label>
                    </div>

                    {steps.length > 1 && (
                      <button type="button" onClick={() => removeStep(step.id)} className="text-slate-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity absolute -right-8">
                         Remove
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* 🧩 Section 5: Conditional Approval */}
            <div className="bg-[#1E293B] rounded-xl border border-slate-700/50 p-6 space-y-4">
              <h2 className="text-lg font-semibold text-white flex items-center border-b border-slate-700/50 pb-3">
                <span className="w-6 h-6 rounded bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs mr-3">5</span>
                Minimum Approval Limit
              </h2>
              <div>
                <label className="text-sm font-medium text-slate-300 mb-1.5 block">Minimum Approval Percentage (%)</label>
                <div className="flex items-center space-x-4 max-w-sm">
                  <input type="range" min="0" max="100" defaultValue="100" className="flex-1 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500" />
                  <div className="w-16 px-3 py-1.5 bg-[#0F172A] border border-slate-700/50 rounded-lg text-center font-semibold text-white text-sm">
                    100%
                  </div>
                </div>
              </div>
            </div>

          </form>
        </div>

        {/* 🧩 Section 6: Helper Text Sidebar */}
        <div className="space-y-6">
          <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5 sticky top-24">
            <h3 className="flex items-center text-blue-400 font-semibold mb-3">
              <Info className="w-5 h-5 mr-2" /> Rule Guidelines
            </h3>
            
            <div className="space-y-4">
               <div>
                 <h4 className="text-sm font-medium text-blue-300 mb-1">Required Approvers</h4>
                 <p className="text-xs text-blue-200/60 leading-relaxed">If checked, this specific person MUST approve the request, regardless of the percentage logic or parallel setups.</p>
               </div>
               
               <div>
                 <h4 className="text-sm font-medium text-blue-300 mb-1">Sequential Flow</h4>
                 <p className="text-xs text-blue-200/60 leading-relaxed">Approvals request moves one by one. Step 2 requires Step 1 to approve first. Rejection immediately ends the chain.</p>
               </div>

               <div>
                 <h4 className="text-sm font-medium text-blue-300 mb-1">Parallel Flow</h4>
                 <p className="text-xs text-blue-200/60 leading-relaxed">All approvers in the chain get the request immediately. Great for percentage-based general consensus (e.g. 60% of team).</p>
               </div>
            </div>
          </div>
        </div>

      </div>

      <div className="flex justify-end pt-6 border-t border-slate-800">
        <button type="button" onClick={() => navigate(-1)} className="px-6 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors mr-3">
          Cancel
        </button>
        <button form="ruleForm" type="submit" className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg flex items-center transition-colors shadow-sm">
          <Save className="w-4 h-4 mr-2" />
          Create Rule Structure
        </button>
      </div>

    </div>
  );
}
