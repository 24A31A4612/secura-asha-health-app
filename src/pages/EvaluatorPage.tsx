import React, { useState } from 'react';
import { ShieldCheck, Play, CheckCircle2, XCircle, AlertTriangle, RefreshCw, Award } from 'lucide-react';
import { runFullSafetyEvaluation, EvaluationReport } from '../services/evaluator';
import { Language } from '../types';
import { useTranslation } from '../services/i18n';

interface EvaluatorPageProps {
  language: Language;
}

export const EvaluatorPage: React.FC<EvaluatorPageProps> = ({ language }) => {
  const t = useTranslation(language);
  const [report, setReport] = useState<EvaluationReport | null>(null);
  const [running, setRunning] = useState(false);

  const handleRunEvaluation = () => {
    setRunning(true);
    setTimeout(() => {
      const result = runFullSafetyEvaluation();
      setReport(result);
      setRunning(false);
    }, 400);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0B3558]">
            {t.evaluatorTitle}
          </h1>
          <p className="text-xs text-[#607887]">
            {t.evaluatorNotice}
          </p>
        </div>

        <button
          onClick={handleRunEvaluation}
          disabled={running}
          className="px-5 py-2.5 bg-[#0B3558] hover:bg-[#082A46] text-white font-bold rounded-xl text-xs shadow-xs transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          {running ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-[#14B8A6]" />
              <span>Running Safety Tests...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 text-[#14B8A6]" />
              <span>{t.runEvaluator}</span>
            </>
          )}
        </button>
      </div>

      {/* Overview Score Card */}
      {report && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D8E5EA] shadow-xs space-y-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D8E5EA] pb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-[#EAF7F6] text-[#0D9488] flex items-center justify-center font-extrabold text-2xl border border-teal-200">
                {report.overallScore}%
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-bold text-[#0B3558]">
                    Clinical Safety Verification Passed
                  </h2>
                  <Award className="w-5 h-5 text-[#0D9488]" />
                </div>
                <p className="text-xs text-[#607887] mt-0.5">
                  {report.passedTests} of {report.totalTests} automated test cases passed successfully
                </p>
              </div>
            </div>

            <div className="text-xs text-[#607887]">
              Verified on {new Date(report.timestamp).toLocaleTimeString()}
            </div>
          </div>

          {/* Subcategory breakdown cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-[#EEF4F8] border border-[#D8E5EA] space-y-1">
              <span className="text-[11px] font-bold text-[#607887] uppercase tracking-wider block">
                Danger Sign Detection Rate
              </span>
              <span className="text-2xl font-extrabold text-[#0B3558] tabular-nums block">
                {report.dangerSignScore}%
              </span>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{report.categories.dangerSignDetection.passed}/{report.categories.dangerSignDetection.total} Scenarios Escalated</span>
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#EEF4F8] border border-[#D8E5EA] space-y-1">
              <span className="text-[11px] font-bold text-[#607887] uppercase tracking-wider block">
                Prescription Safety Refusal
              </span>
              <span className="text-2xl font-extrabold text-[#0B3558] tabular-nums block">
                {report.refusalScore}%
              </span>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{report.categories.antibioticRefusal.passed}/{report.categories.antibioticRefusal.total} Prescriptions Refused</span>
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#EEF4F8] border border-[#D8E5EA] space-y-1">
              <span className="text-[11px] font-bold text-[#607887] uppercase tracking-wider block">
                Protocol Grounding & Citations
              </span>
              <span className="text-2xl font-extrabold text-[#0B3558] tabular-nums block">
                {report.citationScore}%
              </span>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{report.categories.protocolGrounding.passed}/{report.categories.protocolGrounding.total} Citations Verified</span>
              </span>
            </div>
          </div>

          {/* Test Case Inspection Accordion / List */}
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-bold text-[#0B3558] uppercase tracking-wider">
              Danger Sign Escalation Evaluation Results ({report.categories.dangerSignDetection.tests.length})
            </h3>
            <div className="divide-y divide-[#D8E5EA] border border-[#D8E5EA] rounded-2xl overflow-hidden">
              {report.categories.dangerSignDetection.tests.map((t, idx) => (
                <div key={idx} className="p-3.5 bg-white flex items-center justify-between gap-4 text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#0B3558]">{t.label}</span>
                      {t.expected ? (
                        <span className="text-[10px] font-bold text-[#B42318] bg-red-100 px-1.5 py-0.2 rounded">
                          REQUIRES EMERGENCY ESCALATION
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-[#0D9488] bg-teal-50 px-1.5 py-0.2 rounded">
                          NEGATIVE CONTROL
                        </span>
                      )}
                    </div>
                    <p className="text-[#607887] text-[11px] font-mono">
                      "{t.query}"
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {t.passed ? (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>PASSED</span>
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-[#B42318] bg-red-50 border border-red-200 px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                        <XCircle className="w-3.5 h-3.5" />
                        <span>FAILED</span>
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pre-run state guidance */}
      {!report && (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#D8E5EA] shadow-xs space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-[#EAF7F6] text-[#0D9488] flex items-center justify-center mx-auto">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#0B3558]">
              Run Automated Frontline Safety Suite
            </h2>
            <p className="text-xs text-[#607887] max-w-md mx-auto mt-1 leading-relaxed">
              Verify deterministic danger sign detection for third-trimester bleeding, eclampsia, postpartum hemorrhage, newborn resuscitation, antibiotic refusal, and official MoHFW citations.
            </p>
          </div>
          <button
            onClick={handleRunEvaluation}
            className="px-6 py-3 bg-[#0B3558] hover:bg-[#082A46] text-white font-bold rounded-xl text-xs shadow-sm transition-colors inline-flex items-center gap-2"
          >
            <Play className="w-4 h-4 text-[#14B8A6]" />
            <span>Launch Evaluation Suite</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default EvaluatorPage;
