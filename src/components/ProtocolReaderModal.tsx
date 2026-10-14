import React from 'react';
import { X, BookOpen, AlertCircle, CheckCircle2, ShieldCheck, Share2 } from 'lucide-react';
import { ProtocolDocument, Language } from '../types';
import { useTranslation } from '../services/i18n';

interface ProtocolReaderModalProps {
  protocol: ProtocolDocument;
  onClose: () => void;
  language: Language;
}

export const ProtocolReaderModal: React.FC<ProtocolReaderModalProps> = ({
  protocol,
  onClose,
  language
}) => {
  const t = useTranslation(language);

  const title = language === 'te' ? protocol.titleTe : language === 'hi' ? protocol.titleHi : protocol.title;
  const summary = language === 'te' ? protocol.summaryTe : language === 'hi' ? protocol.summaryHi : protocol.summary;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#D8E5EA] overflow-hidden my-6">
        {/* Header */}
        <div className="bg-[#0B3558] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-[#14B8A6]" />
            <div>
              <span className="text-[10px] font-bold text-teal-300 uppercase tracking-wider block">
                {protocol.code} · {protocol.category}
              </span>
              <h2 className="text-base font-bold leading-tight line-clamp-1">{title}</h2>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Authoritative Citation Banner */}
          <div className="p-3.5 bg-[#EAF7F6] border border-teal-200 rounded-xl flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#0D9488] shrink-0 mt-0.5" />
            <div>
              <span className="text-[11px] font-bold text-[#0B3558] uppercase tracking-wider block">
                {t.officialCitation}
              </span>
              <p className="text-xs font-semibold text-[#0B3558] mt-0.5">
                {protocol.citation}
              </p>
              <p className="text-[10px] text-[#607887] mt-1">
                {t.officialLanguageNote}
              </p>
            </div>
          </div>

          {/* Clinical Summary */}
          <div>
            <h3 className="text-xs font-bold text-[#0B3558] uppercase tracking-wider mb-1.5">
              Clinical Protocol Summary
            </h3>
            <p className="text-sm text-[#183247] leading-relaxed bg-[#EEF4F8] p-3.5 rounded-xl border border-[#D8E5EA]">
              {summary}
            </p>
          </div>

          {/* Mandatory Clinical Steps */}
          <div>
            <h3 className="text-xs font-bold text-[#0B3558] uppercase tracking-wider mb-2">
              {t.clinicalActions}
            </h3>
            <div className="space-y-2">
              {protocol.clinicalSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-white border border-[#D8E5EA] rounded-xl text-xs text-[#183247]"
                >
                  <span className="w-5 h-5 rounded-full bg-[#0B3558] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                    {idx + 1}
                  </span>
                  <span className="leading-snug pt-0.5">{step}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Red Flags / Emergency Warnings */}
          <div>
            <h3 className="text-xs font-bold text-[#B42318] uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4" />
              <span>{t.redFlagsTitle}</span>
            </h3>
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl space-y-1.5">
              {protocol.redFlags.map((rf, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#183247]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B42318] mt-1.5 shrink-0" />
                  <span className="font-medium">{rf}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Do's and Don'ts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
              <h4 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Mandatory Do's</span>
              </h4>
              <ul className="space-y-1 text-xs text-[#183247]">
                {protocol.dosAndDonts.dos.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-700 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl">
              <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <X className="w-4 h-4 text-rose-600" />
                <span>Critical Don'ts</span>
              </h4>
              <ul className="space-y-1 text-xs text-[#183247]">
                {protocol.dosAndDonts.donts.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-700 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#EEF4F8] border-t border-[#D8E5EA] px-6 py-3 flex items-center justify-between">
          <span className="text-xs text-[#607887]">
            MoHFW National Health Mission Guidance
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-white bg-[#0B3558] hover:bg-[#082A46] rounded-xl transition-colors"
          >
            Close Protocol
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProtocolReaderModal;
