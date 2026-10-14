import React, { useState } from 'react';
import { X, CheckCircle, AlertTriangle } from 'lucide-react';
import { Visit, Language } from '../types';
import { useTranslation } from '../services/i18n';
import { evaluateDangerSigns } from '../services/dangerSignEngine';

interface VisitCompletionModalProps {
  visit: Visit;
  onClose: () => void;
  onComplete: (visitId: string, notes: string, vitals?: Visit['vitals'], dangerSigns?: string[]) => Promise<void>;
  language: Language;
}

export const VisitCompletionModal: React.FC<VisitCompletionModalProps> = ({
  visit,
  onClose,
  onComplete,
  language
}) => {
  const t = useTranslation(language);

  const [notes, setNotes] = useState('');
  const [bpSystolic, setBpSystolic] = useState<string>('');
  const [bpDiastolic, setBpDiastolic] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [temperature, setTemperature] = useState<string>('');
  const [hemoglobin, setHemoglobin] = useState<string>('');
  const [observedDangerSigns, setObservedDangerSigns] = useState<string>('');
  const [completing, setCompleting] = useState(false);

  // Check if vitals trigger danger signs
  const systolicNum = Number(bpSystolic);
  const diastolicNum = Number(bpDiastolic);
  const isHighBp = systolicNum >= 140 || diastolicNum >= 90;
  const isSevereHypertension = systolicNum >= 160 || diastolicNum >= 110;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCompleting(true);

    const vitalsData: Visit['vitals'] = {
      bpSystolic: bpSystolic ? Number(bpSystolic) : undefined,
      bpDiastolic: bpDiastolic ? Number(bpDiastolic) : undefined,
      weight: weight ? Number(weight) : undefined,
      temperature: temperature ? Number(temperature) : undefined,
      hemoglobin: hemoglobin ? Number(hemoglobin) : undefined
    };

    const dangerSignsList: string[] = [];
    if (isSevereHypertension) {
      dangerSignsList.push(`Severe Hypertension (${systolicNum}/${diastolicNum} mmHg)`);
    } else if (isHighBp) {
      dangerSignsList.push(`Hypertension in pregnancy (${systolicNum}/${diastolicNum} mmHg)`);
    }

    if (observedDangerSigns.trim()) {
      dangerSignsList.push(observedDangerSigns.trim());
    }

    await onComplete(
      visit.id,
      notes.trim() || 'Visit completed successfully. Vitals documented.',
      vitalsData,
      dangerSignsList.length > 0 ? dangerSignsList : undefined
    );

    setCompleting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#D8E5EA] overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B3558] text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold">{t.recordVitals}</h2>
            <p className="text-xs text-teal-200 mt-0.5">
              {visit.memberName} · {visit.householdNumber} ({visit.visitType})
            </p>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Reason review */}
          <div className="p-3 bg-[#EEF4F8] border border-[#D8E5EA] rounded-xl text-xs">
            <span className="font-bold text-[#0B3558] block mb-1">Reason for Visit:</span>
            <p className="text-[#183247]">{visit.reason}</p>
          </div>

          {/* Vitals Recording Grid */}
          <div>
            <h4 className="text-xs font-bold text-[#0B3558] uppercase tracking-wider mb-2">
              Clinical Vitals & Measurements
            </h4>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-[#607887] mb-1">
                  Blood Pressure (Systolic)
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    placeholder="120"
                    value={bpSystolic}
                    onChange={e => setBpSystolic(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-[#D8E5EA] rounded-lg text-xs"
                  />
                  <span className="text-[11px] text-[#607887] ml-1.5">mmHg</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#607887] mb-1">
                  Blood Pressure (Diastolic)
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    placeholder="80"
                    value={bpDiastolic}
                    onChange={e => setBpDiastolic(e.target.value)}
                    className="w-full px-2.5 py-1.5 border border-[#D8E5EA] rounded-lg text-xs"
                  />
                  <span className="text-[11px] text-[#607887] ml-1.5">mmHg</span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#607887] mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="55.0"
                  value={weight}
                  onChange={e => setWeight(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-[#D8E5EA] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#607887] mb-1">
                  Temperature (°C)
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="37.0"
                  value={temperature}
                  onChange={e => setTemperature(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-[#D8E5EA] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#607887] mb-1">
                  Hemoglobin (Hb g/dL)
                </label>
                <input
                  type="number"
                  step="0.1"
                  placeholder="11.5"
                  value={hemoglobin}
                  onChange={e => setHemoglobin(e.target.value)}
                  className="w-full px-2.5 py-1.5 border border-[#D8E5EA] rounded-lg text-xs"
                />
              </div>
            </div>
          </div>

          {/* Blood Pressure Warning Indicator */}
          {isHighBp && (
            <div className="p-3 bg-red-50 border border-red-300 rounded-xl flex items-start gap-2 text-xs text-[#B42318]">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Elevated Blood Pressure ({systolicNum}/{diastolicNum}): </span>
                <span>Requires immediate counseling on warning signs and referral to Medical Officer / ANM.</span>
              </div>
            </div>
          )}

          {/* Danger signs observation */}
          <div>
            <label className="block text-xs font-bold text-[#0B3558] uppercase mb-1">
              Any Danger Signs Observed?
            </label>
            <input
              type="text"
              placeholder="e.g. Swelling in feet, mild fever, blurred vision..."
              value={observedDangerSigns}
              onChange={e => setObservedDangerSigns(e.target.value)}
              className="w-full px-3 py-2 border border-[#D8E5EA] rounded-lg text-xs text-[#183247] focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
            />
          </div>

          {/* Visit Notes */}
          <div>
            <label className="block text-xs font-bold text-[#0B3558] uppercase mb-1">
              {t.visitNotes}
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Summary of counseling, IFA distribution, diet advice, baby breastfed..."
              className="w-full px-3 py-2 border border-[#D8E5EA] rounded-lg text-xs text-[#183247] focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#D8E5EA]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#607887] hover:text-[#183247]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={completing}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#0D9488] hover:bg-teal-700 rounded-xl shadow transition-colors flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              <span>{completing ? 'Recording...' : t.markCompleted}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VisitCompletionModal;
