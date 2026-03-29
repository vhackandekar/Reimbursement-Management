import React, { useState } from 'react';
import { X, UploadCloud, Calendar, DollarSign, FileText, Tag, Loader2 } from 'lucide-react';

export default function AddRequestModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    category: '',
    requestDate: '',
    totalAmount: '',
    remarks: ''
  });
  
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onSubmit({ ...formData, file, status: 'Pending', id: `EXP-${Math.floor(Math.random() * 10000)}` });
      setIsSubmitting(false);
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1E293B] rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-[#0F172A]">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">New Expense Request</h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto">
          <form id="add-request-form" onSubmit={handleSubmit} className="space-y-5">
            
            {/* Category */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Category
              </label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select 
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0B0F19] border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 dark:text-white transition-colors appearance-none"
                >
                  <option value="" disabled>Select category...</option>
                  <option value="Travel">Travel</option>
                  <option value="Meals">Meals/Entertainment</option>
                  <option value="Supplies">Office Supplies</option>
                  <option value="Software">Software/Subscriptions</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Request Date */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Request Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="date" 
                    name="requestDate"
                    required
                    value={formData.requestDate}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0B0F19] border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 dark:text-white transition-colors"
                  />
                </div>
              </div>

              {/* Total Amount */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                  Total Amount (USD)
                </label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="number"
                    step="0.01" 
                    name="totalAmount"
                    required
                    min="1"
                    placeholder="0.00"
                    value={formData.totalAmount}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0B0F19] border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 dark:text-white transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Remarks */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Remarks / Description
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <textarea 
                  name="remarks"
                  required
                  rows="3"
                  placeholder="Provide detailed reasoning for this expense..."
                  value={formData.remarks}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-[#0B0F19] border border-slate-300 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-slate-900 dark:text-white transition-colors resize-none"
                ></textarea>
              </div>
            </div>

            {/* File Upload */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Attach Receipt (Max 5MB)
              </label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-emerald-300 border-dashed rounded-xl cursor-pointer bg-emerald-50/50 dark:bg-emerald-900/10 dark:hover:bg-emerald-900/20 hover:bg-emerald-50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  {file ? (
                     <div className="flex flex-col items-center text-emerald-600 dark:text-emerald-400">
                        <FileText className="w-8 h-8 mb-2" />
                        <p className="text-sm font-semibold text-center px-4 truncate w-full max-w-[200px]">{file.name}</p>
                     </div>
                  ) : (
                     <>
                        <UploadCloud className="w-8 h-8 mb-3 text-emerald-500" />
                        <p className="mb-2 text-sm text-slate-600 dark:text-slate-400 font-semibold"><span className="text-emerald-600 dark:text-emerald-400">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-slate-500 dark:text-slate-500">PNG, JPG, PDF up to 5MB</p>
                     </>
                  )}
                </div>
                <input 
                   type="file" 
                   className="hidden" 
                   accept=".png,.jpg,.jpeg,.pdf" 
                   onChange={handleFileChange} 
                   required
                />
              </label>
            </div>

          </form>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#0F172A] flex justify-end space-x-3 shrink-0">
          <button 
            type="button" 
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            form="add-request-form"
            disabled={isSubmitting}
            className="flex items-center space-x-2 px-5 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 shadow-sm shadow-emerald-500/30 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
            <span>{isSubmitting ? 'Submitting...' : 'Submit Request'}</span>
          </button>
        </div>

      </div>
    </div>
  );
}
