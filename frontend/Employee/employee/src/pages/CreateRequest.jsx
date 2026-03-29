import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, CircleDashed, Clock } from 'lucide-react';

export default function CreateRequest() {
  // State: 'draft', 'submitted', 'approved'
  const [requestState, setRequestState] = useState('draft');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    date: '',
    category: '',
    paidBy: '',
    amount: '',
    currency: 'USD',
    remarks: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    setTimeout(() => {
      setRequestState('submitted');
      setIsSubmitting(false);
    }, 800);
  };

  const isReadOnly = requestState !== 'draft';

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      <div className="bg-white dark:bg-[#1E293B] rounded-[24px] shadow-sm border border-slate-200 dark:border-slate-800 p-8 flex flex-col transition-colors duration-200">
        
        {/* Top Header & Pipeline inside the box */}
        <div className="flex flex-col md:flex-row justify-between md:items-center space-y-4 md:space-y-0 mb-10 pb-6 border-b border-slate-100 dark:border-slate-800/60">
           
           <button className="flex items-center space-x-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full transition-colors font-bold text-sm border-2 border-slate-200 dark:border-slate-700 w-fit">
              <UploadCloud className="w-4 h-4" />
              <span>Attach Receipt</span>
           </button>

           {/* Pipeline Tracker */}
           <div className="flex items-center space-x-2 text-sm font-bold">
              <div className={`flex items-center space-x-1 ${requestState === 'draft' ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'} transition-colors`}>
                 <span>Draft</span>
              </div>
              
              <div className="w-4 text-slate-400 font-bold">{`>`}</div>

              <div className={`flex items-center space-x-1 ${requestState === 'submitted' ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'} transition-colors`}>
                 <span>Waiting approval</span>
              </div>

              <div className="w-4 text-slate-400 font-bold">{`>`}</div>

              <div className={`flex items-center space-x-1 ${requestState === 'approved' ? 'text-slate-900 dark:text-white' : 'text-slate-400 dark:text-slate-500'} transition-colors`}>
                 <span>Approved</span>
              </div>
           </div>
        </div>

        {/* Inputs row-based layout block */}
        <div className="flex flex-col md:flex-row gap-12">
            
            {/* Left Column */}
            <div className="flex-1 space-y-8">
               <div>
                 <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Expense Title</label>
                 <input 
                   type="text" 
                   name="title"
                   value={formData.title}
                   onChange={handleChange}
                   disabled={isReadOnly}
                   className="w-full bg-transparent border-b border-slate-300 dark:border-slate-700 focus:border-emerald-500 dark:focus:border-emerald-500 py-1 outline-none text-slate-900 dark:text-white transition-colors disabled:opacity-70 font-medium"
                 />
               </div>

               <div>
                 <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                 <input 
                   type="text" 
                   name="category"
                   value={formData.category}
                   onChange={handleChange}
                   disabled={isReadOnly}
                   className="w-full bg-transparent border-b border-slate-300 dark:border-slate-700 focus:border-emerald-500 dark:focus:border-emerald-500 py-1 outline-none text-slate-900 dark:text-white transition-colors disabled:opacity-70 font-medium"
                 />
               </div>

               <div>
                 <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Total amount in <span className="underline decoration-slate-400">currency selection</span></label>
                 <div className="flex items-center w-full bg-transparent border-b border-slate-300 dark:border-slate-700 focus-within:border-emerald-500 dark:focus-within:border-emerald-500 transition-colors py-1">
                   <input 
                     type="number" 
                     name="amount"
                     value={formData.amount}
                     onChange={handleChange}
                     disabled={isReadOnly}
                     className="flex-1 bg-transparent outline-none text-slate-900 dark:text-white disabled:opacity-70 font-medium"
                   />
                   <select 
                     name="currency"
                     value={formData.currency}
                     onChange={handleChange}
                     disabled={isReadOnly}
                     className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold border border-slate-200 dark:border-slate-700 rounded-lg outline-none disabled:opacity-70 cursor-pointer px-3 py-1.5 ml-3"
                   >
                     <option value="USD">USD ($)</option>
                     <option value="EUR">EUR (€)</option>
                     <option value="GBP">GBP (£)</option>
                     <option value="INR">INR (₹)</option>
                   </select>
                 </div>
               </div>

               <div className="pt-4 border-t border-slate-100 dark:border-slate-800/50">
                 <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Detailed Description</label>
                 <textarea 
                   name="description"
                   value={formData.description}
                   onChange={handleChange}
                   disabled={isReadOnly}
                   rows="4"
                   className="w-full bg-transparent border-b border-slate-300 dark:border-slate-700 focus:border-emerald-500 dark:focus:border-emerald-500 py-1 outline-none text-slate-900 dark:text-white transition-colors disabled:opacity-70 font-medium resize-none"
                 />
               </div>
            </div>

            {/* Right Column */}
            <div className="flex-1 flex flex-col space-y-8">
               <div>
                 <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Expense Date</label>
                 <input 
                   type="text" 
                   name="date"
                   value={formData.date}
                   onChange={handleChange}
                   disabled={isReadOnly}
                   className="w-full bg-transparent border-b border-slate-300 dark:border-slate-700 focus:border-emerald-500 dark:focus:border-emerald-500 py-1 outline-none text-slate-900 dark:text-white transition-colors disabled:opacity-70 font-medium"
                 />
               </div>

               <div>
                 <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Paid by:</label>
                 <select 
                   name="paidBy"
                   value={formData.paidBy}
                   onChange={handleChange}
                   disabled={isReadOnly}
                   className="w-full bg-slate-50 dark:bg-slate-800/50 border-b border-slate-300 dark:border-slate-700 focus:border-emerald-500 dark:focus:border-emerald-500 py-2 px-3 rounded-t-lg outline-none text-slate-900 dark:text-white transition-colors disabled:opacity-70 font-medium cursor-pointer"
                 >
                   <option value="" disabled>Select Payment Method</option>
                   <option value="Employee (Reimbursable)">Employee (Personal Card)</option>
                   <option value="Company Card">Company Card</option>
                 </select>
               </div>

               <div>
                 <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Remarks</label>
                 <input 
                   type="text" 
                   name="remarks"
                   value={formData.remarks}
                   onChange={handleChange}
                   disabled={isReadOnly}
                   className="w-full bg-transparent border-b border-slate-300 dark:border-slate-700 focus:border-emerald-500 dark:focus:border-emerald-500 py-1 outline-none text-slate-900 dark:text-white transition-colors disabled:opacity-70 font-medium"
                 />
               </div>

               {/* Approver Log Table */}
               <div className="flex-1 flex flex-col justify-end pt-8">
                  <table className="w-full text-left text-sm">
                     <thead>
                        <tr className="text-slate-600 dark:text-slate-400 font-semibold border-b-2 border-slate-700">
                           <th className="pb-3 font-medium">Approver</th>
                           <th className="pb-3 font-medium">Status</th>
                           <th className="pb-3 font-medium text-right">Time</th>
                        </tr>
                     </thead>
                     <tbody className="text-sm">
                        {requestState !== 'draft' ? (
                           <tr className="text-slate-900 dark:text-white font-medium border-b border-slate-100 dark:border-slate-800/50">
                              <td className="py-4">Auto-System</td>
                              <td className="py-4 text-slate-600 dark:text-slate-400">Submitted</td>
                              <td className="py-4 text-right text-slate-500">Just now</td>
                           </tr>
                        ) : (
                           <tr>
                              <td colSpan="3" className="py-6 text-center text-slate-400 dark:text-slate-500 italic text-xs">
                                 Submit request to view log history.
                              </td>
                           </tr>
                        )}
                        {requestState === 'approved' && (
                           <tr className="text-slate-900 dark:text-white font-medium">
                             <td className="py-4">Sarah</td>
                             <td className="py-4">Approved</td>
                             <td className="py-4 text-right text-slate-500">12:44 4th Oct, 2025</td>
                          </tr>
                        )}
                     </tbody>
                  </table>
               </div>

               {/* Action Area */}
               <div className="flex justify-end pt-4 mt-auto">
                 {requestState === 'draft' ? (
                    <button 
                      onClick={handleSubmit} 
                      disabled={isSubmitting || !formData.amount || !formData.title}
                      className="px-10 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 border-2 border-slate-900 dark:border-white shadow-xl shadow-slate-900/10 dark:shadow-white/10"
                    >
                      {isSubmitting ? <CircleDashed className="w-5 h-5 animate-spin" /> : <span>Submit</span>}
                    </button>
                 ) : (
                    <div className="px-6 py-3 border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium rounded-xl text-xs sm:text-sm">
                       Once submitted the record becomes readonly for employee and the submit button is invisible.
                    </div>
                 )}
               </div>

            </div>

        </div>

      </div>

    </div>
  );
}
