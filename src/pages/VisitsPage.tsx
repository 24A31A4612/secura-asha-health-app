import React, { useState } from 'react';
import { Calendar, Filter, CheckCircle2, Clock, AlertTriangle, ArrowRight } from 'lucide-react';
import { Visit, Language } from '../types';
import { useTranslation } from '../services/i18n';

interface VisitsPageProps {
  visits: Visit[];
  onSelectVisit: (visit: Visit) => void;
  language: Language;
}

export const VisitsPage: React.FC<VisitsPageProps> = ({
  visits,
  onSelectVisit,
  language
}) => {
  const t = useTranslation(language);
  const [filter, setFilter] = useState<'ALL' | 'ANC' | 'PNC' | 'IMMUNIZATION' | 'OVERDUE'>('ALL');

  const filteredVisits = visits.filter(v => {
    if (filter === 'OVERDUE') return v.status === 'OVERDUE';
    if (filter === 'ANC') return v.visitType === 'ANC';
    if (filter === 'PNC') return v.visitType === 'PNC';
    if (filter === 'IMMUNIZATION') return v.visitType === 'IMMUNIZATION';
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0B3558]">
            {t.visitListTitle}
          </h1>
          <p className="text-xs text-[#607887]">
            {t.todaysVisitsSubtitle}
          </p>
        </div>

        {/* Filter Tabs (Interactive Segmented Control adhering to Zero-Pill) */}
        <div className="flex items-center gap-1 p-1 bg-white border border-[#D8E5EA] rounded-xl self-start sm:self-auto overflow-x-auto max-w-full">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              filter === 'ALL'
                ? 'bg-[#0B3558] text-white shadow-xs'
                : 'text-[#607887] hover:text-[#183247]'
            }`}
          >
            {t.filterAll}
          </button>
          <button
            onClick={() => setFilter('OVERDUE')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              filter === 'OVERDUE'
                ? 'bg-[#B42318] text-white shadow-xs'
                : 'text-[#B42318] hover:bg-red-50'
            }`}
          >
            {t.filterOverdue}
          </button>
          <button
            onClick={() => setFilter('ANC')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              filter === 'ANC'
                ? 'bg-[#0B3558] text-white shadow-xs'
                : 'text-[#607887] hover:text-[#183247]'
            }`}
          >
            {t.filterAnc}
          </button>
          <button
            onClick={() => setFilter('PNC')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              filter === 'PNC'
                ? 'bg-[#0B3558] text-white shadow-xs'
                : 'text-[#607887] hover:text-[#183247]'
            }`}
          >
            {t.filterPnc}
          </button>
          <button
            onClick={() => setFilter('IMMUNIZATION')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              filter === 'IMMUNIZATION'
                ? 'bg-[#0B3558] text-white shadow-xs'
                : 'text-[#607887] hover:text-[#183247]'
            }`}
          >
            {t.filterImm}
          </button>
        </div>
      </div>

      {/* Visits List Container */}
      <div className="bg-white rounded-3xl border border-[#D8E5EA] shadow-xs divide-y divide-[#D8E5EA] overflow-hidden">
        {filteredVisits.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#607887]">
            No visits matching the selected filter.
          </div>
        ) : (
          filteredVisits.map(visit => {
            const isCompleted = visit.status === 'COMPLETED';
            const isOverdue = visit.status === 'OVERDUE';
            const isCritical = visit.priority === 'CRITICAL';

            return (
              <div
                key={visit.id}
                onClick={() => onSelectVisit(visit)}
                className="p-5 hover:bg-[#EAF7F6]/40 transition-colors cursor-pointer flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-sm font-bold text-[#0B3558]">
                      {visit.memberName}
                    </span>
                    <span className="text-xs text-[#607887]">
                      · House {visit.householdNumber}
                    </span>
                    <span className="text-[11px] font-semibold text-[#0D9488] bg-[#EAF7F6] px-2 py-0.5 rounded-md">
                      {visit.visitType}
                    </span>
                    {isOverdue && (
                      <span className="text-[10px] font-bold text-[#B42318] bg-red-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        OVERDUE
                      </span>
                    )}
                    {isCritical && (
                      <span className="text-[10px] font-bold text-[#B42318] bg-red-100 px-2 py-0.5 rounded-md">
                        CRITICAL PRIORITY
                      </span>
                    )}
                    {isCompleted && (
                      <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        COMPLETED
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#183247] font-medium leading-relaxed max-w-2xl">
                    {visit.reason}
                  </p>

                  <div className="text-[11px] text-[#607887] flex items-center gap-3">
                    <span>Scheduled: {visit.scheduledDate}</span>
                    {visit.completedDate && (
                      <span>· Completed: {new Date(visit.completedDate).toLocaleDateString()}</span>
                    )}
                    {visit.vitals?.bpSystolic && (
                      <span>· BP: {visit.vitals.bpSystolic}/{visit.vitals.bpDiastolic} mmHg</span>
                    )}
                  </div>
                </div>

                <div className="self-end md:self-center shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectVisit(visit);
                    }}
                    className={`px-4 py-2 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 ${
                      isCompleted
                        ? 'bg-[#EEF4F8] text-[#0B3558] hover:bg-[#D8E5EA]'
                        : 'bg-[#0B3558] text-white hover:bg-[#0D9488]'
                    }`}
                  >
                    <span>{isCompleted ? 'Update Vitals' : t.markCompleted}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default VisitsPage;
