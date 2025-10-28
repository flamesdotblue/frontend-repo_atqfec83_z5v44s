import React, { useEffect } from 'react';
import { X, ExternalLink, FileText } from 'lucide-react';

const IntegrationModal = ({ open, onClose, data }) => {
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <div
        className="relative bg-white w-full md:w-[640px] max-h-[520px] rounded-t-2xl md:rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.08)] overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        <div className="p-5 md:p-6 border-b border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-3">
            {data.logo && (
              <div className="w-10 h-10 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] flex items-center justify-center overflow-hidden">
                <img src={data.logo} alt="" className="w-8 h-8 object-contain" />
              </div>
            )}
            <div>
              <h3 className="text-[20px] leading-[30px] font-semibold text-[#1D2939]">{data.name}</h3>
              <p className="text-[13px] leading-[20px] text-[#667085]">{data.type} • {data.category}</p>
            </div>
          </div>
          <button onClick={onClose} aria-label="Close" className="p-2 rounded-lg hover:bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#004EEB]">
            <X size={18} />
          </button>
        </div>

        <div className="p-6 space-y-4 overflow-y-auto">
          <p className="text-[14px] leading-6 text-[#344054]">{data.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl border border-[#E5E7EB] p-4">
              <div className="text-[13px] font-medium text-[#101828]">Supported Platforms</div>
              <div className="mt-2 text-[13px] text-[#667085]">{data.platforms?.join(', ') || 'Web, iOS, Android'}</div>
            </div>
            <div className="rounded-xl border border-[#E5E7EB] p-4">
              <div className="text-[13px] font-medium text-[#101828]">Example Brands</div>
              <div className="mt-2 text-[13px] text-[#667085]">{data.brands?.join(', ')}</div>
            </div>
          </div>

          {data.metric && (
            <div className="rounded-xl border border-[#E5E7EB] p-4 bg-[#F8FAFC]">
              <div className="text-[13px] font-medium text-[#101828]">Impact</div>
              <div className="mt-1 text-[14px] text-[#027A48] font-medium">{data.metric}</div>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <a href="#" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#004EEB] text-white text-[14px] font-medium hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[#004EEB]">
              <FileText size={16} /> Docs
            </a>
            <a href="#" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E5E7EB] text-[#101828] text-[14px] font-medium hover:bg-[#F8FAFC] focus:outline-none focus:ring-2 focus:ring-[#004EEB]">
              <ExternalLink size={16} /> View Case Study
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationModal;
