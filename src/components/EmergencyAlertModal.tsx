import React from 'react';
import { AlertTriangle, PhoneCall, ArrowRight, ShieldAlert, X } from 'lucide-react';
import { DangerSignEvaluation, Language } from '../types';
import { useTranslation } from '../services/i18n';

interface EmergencyAlertModalProps {
  evaluation: DangerSignEvaluation;
  onClose: () => void;
  language: Language;
}

export const EmergencyAlertModal: React.FC<EmergencyAlertModalProps> = ({
  evaluation,
  onClose,
  language
}) => {
  const t = useTranslation(language);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border-2 border-[#B42318] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="emergency-modal-title"
      >
        {/* Urgent Red Header */}
        <div className="bg-[#B42318] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-6 h-6 text-white animate-bounce" />
            </div>
            <div>
              <h2 id="emergency-modal-title" className="text-base font-extrabold tracking-wide uppercase">
                {t.emergencyTitle}
              </h2>
              <p className="text-xs text-red-100 font-medium">
                {evaluation.category ? `${evaluation.category} EMERGENCY` : t.emergencyDetected}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg focus:outline-none"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Danger sign banner */}
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <span className="text-xs font-bold text-[#B42318] uppercase tracking-wider block">
              {t.dangerSignsList}
            </span>
            <p className="text-base font-bold text-[#183247] mt-1">
              {evaluation.dangerSignName}
            </p>
          </div>

          {/* Mandatory Referral Requirement */}
          <div className="border border-[#D8E5EA] rounded-xl p-4 bg-[#EEF4F8]">
            <span className="text-xs font-bold text-[#0B3558] uppercase tracking-wider block">
              {t.immediateReferralRequired}
            </span>
            <p className="text-sm font-semibold text-[#183247] mt-1 leading-relaxed">
              {evaluation.referralInstruction}
            </p>
          </div>

          {/* Action Steps Checklist */}
          {evaluation.immediateActions && evaluation.immediateActions.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-[#0B3558] uppercase tracking-wider mb-2">
                {t.actionProtocol}
              </h4>
              <ul className="space-y-2">
                {evaluation.immediateActions.map((action, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs text-[#183247] bg-white border border-[#D8E5EA] p-2.5 rounded-lg"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#0B3558] text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                      {idx + 1}
                    </span>
                    <span className="leading-snug">{action}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Emergency Ambulance CTA button */}
          <div className="pt-2">
            <a
              href="tel:108"
              className="w-full min-h-[48px] bg-[#B42318] hover:bg-red-800 text-white font-bold rounded-xl shadow-lg flex items-center justify-center gap-2 py-3 px-4 text-center text-sm transition-transform active:scale-[0.98]"
            >
              <PhoneCall className="w-5 h-5 animate-pulse" />
              <span>{t.callAmbulance108}</span>
            </a>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#EEF4F8] border-t border-[#D8E5EA] px-6 py-3 flex items-center justify-between">
          <span className="text-xs text-[#607887]">
            MoHFW Frontline Safety Escalation Protocol
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold text-[#0B3558] hover:bg-white rounded-lg transition-colors border border-[#D8E5EA]"
          >
            {t.closeAlert}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmergencyAlertModal;
