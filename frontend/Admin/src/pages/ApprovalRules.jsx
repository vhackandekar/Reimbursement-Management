import React from 'react';

export default function ApprovalRules() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin view (Approval rules)</h1>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 md:p-8 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Left Column */}
          <div className="space-y-8">
            <div>
              <label className="text-sm font-medium text-slate-500 dark:text-slate-400 mr-4">User</label>
              <input type="text" readOnly value="marc" className="border-b-2 border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-white font-medium px-2 py-1 outline-none w-48" />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Description about rules</label>
              <input type="text" readOnly value="Approval rule for miscellaneous expenses" className="w-full border-b-2 border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-white font-medium px-2 py-1 outline-none" />
            </div>

            <div>
               <div className="flex items-center">
                 <label className="text-sm font-medium text-slate-500 dark:text-slate-400 mr-4 w-16">Manager:</label>
                 <select defaultValue="sarah" className="border-b-2 border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-white font-medium px-2 py-1 outline-none w-48 appearance-none cursor-pointer">
                   <option value="sarah">sarah</option>
                   <option value="john">john</option>
                 </select>
               </div>
               <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 pl-20 leading-relaxed italic">
                 Dynamic dropdown<br/>
                 Initially the manager set on user record should be set, admin can change manager for approval if required.
               </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
             <div className="flex items-center justify-between border-b-2 border-slate-300 dark:border-slate-600 pb-2">
               <span className="text-sm font-medium text-slate-900 dark:text-white">Approvers</span>
               <div className="flex items-center group relative">
                 <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mr-2">Is manager an approver?</span>
                 <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-500 focus:ring-blue-500" />
                 <div className="absolute hidden group-hover:block w-48 p-2 bg-slate-800 text-white text-xs rounded shadow-lg -top-16 right-0 z-10 font-normal">
                   If this field is checked then by default the approve request would go to his/her manager first, before going to other approvers.
                 </div>
               </div>
             </div>

             <div>
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700">
                      <th className="pb-2 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase">User</th>
                      <th className="pb-2 text-xs font-medium text-slate-500 dark:text-slate-400 uppercase text-center relative group">
                        Required
                        <div className="absolute hidden group-hover:block w-48 p-2 bg-slate-800 text-white text-[10px] rounded shadow-lg bottom-full left-1/2 -translate-x-1/2 z-10 normal-case mb-2 font-normal">
                          If this field is ticked, then explicit approval of this approver is required in any approval combination sequence.
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                    {['John', 'Mitchell', 'Andreas'].map((name, index) => (
                      <tr key={name}>
                        <td className="py-3 flex items-center">
                          <span className="text-sm font-bold text-slate-400 mr-4 w-4">{index + 1}</span>
                          <span className="text-sm font-medium text-slate-900 dark:text-white">{name}</span>
                        </td>
                        <td className="py-3 text-center">
                          <input type="checkbox" defaultChecked={index === 0} className="w-4 h-4 rounded border-slate-300 text-blue-500 focus:ring-blue-500" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
             </div>

             <div className="space-y-2">
               <div className="flex items-center">
                 <span className="text-sm font-medium text-slate-500 dark:text-slate-400 mr-3">Approvers Sequence:</span>
                 <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-500 focus:ring-blue-500" />
               </div>
               <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic border-l-2 border-slate-300 dark:border-slate-600 pl-2">
                 If this field is ticked true then the above mentioned sequence of approvers matters, that is first the request goes to John, if he approves/rejects then only request goes to Mitchell and so on.<br/>
                 If the required approver rejects the request, then expense request is auto-rejected.<br/>
                 If not ticked then send approver request to all approvers at the same time.
               </p>
             </div>

             <div className="flex items-end">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Minimum Approval percentage:</span>
                  <div className="relative">
                    <input type="text" className="w-16 border-b-2 border-slate-300 dark:border-slate-600 bg-transparent text-slate-900 dark:text-white font-bold px-1 text-center outline-none" placeholder="__" />
                    <span className="absolute -right-4 bottom-1 text-sm font-bold text-slate-900 dark:text-white">%</span>
                  </div>
                </div>
             </div>
             <p className="text-[10px] text-slate-500 dark:text-slate-400 italic text-right">
               Specify the number of percentage approvers required in order to get the request approved.
             </p>

          </div>

        </div>
      </div>
    </div>
  );
}
