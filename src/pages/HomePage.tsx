import React from 'react';
import {
  Calendar,
  AlertTriangle,
  Users,
  ShieldCheck,
  Plus,
  MessageSquareQuote,
  BookOpen,
  ArrowRight,
  Activity,
  Heart,
  Baby
} from 'lucide-react';
import { User, Household, Visit, Language } from '../types';
import { useTranslation } from '../services/i18n';
import SecuraLogo from '../components/SecuraLogo';

interface HomePageProps {
  user: User;
  households: Household[];
  visits: Visit[];
  onNavigate: (tab: string) => void;
  onOpenAddHousehold: () => void;
  onSelectVisit: (visit: Visit) => void;
  language: Language;
}

export const HomePage: React.FC<HomePageProps> = ({
  user,
  households,
  visits,
  onNavigate,
  onOpenAddHousehold,
  onSelectVisit,
  language
}) => {
  const t = useTranslation(language);

  // Computed metrics
  const todaysVisits = visits.filter(v => v.status === 'DUE_TODAY' || v.status === 'OVERDUE');
  const overdueVisits = visits.filter(v => v.status === 'OVERDUE');
  const highRiskHouseholds = households.filter(h => h.riskLevel === 'HIGH' || h.riskLevel === 'CRITICAL');
  const pregnantCount = households.reduce((sum, h) => sum + h.members.filter(m => m.isPregnant).length, 0);
  const infantsCount = households.reduce((sum, h) => sum + h.members.filter(m => !!m.infantDetails).length, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Welcome Banner Card */}
      <div className="bg-gradient-to-r from-[#0B3558] to-[#082A46] text-white rounded-3xl p-6 sm:p-8 shadow-md border border-[#0B3558]">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-teal-200">
              <ShieldCheck className="w-3.5 h-3.5 text-[#14B8A6]" />
              <span>{user.subCentre} · {user.village}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t.greeting}, {user.fullName}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              {t.todaysVisitsSubtitle}. Frontline maternal & child health register is synchronized and ready offline.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={onOpenAddHousehold}
              className="px-4 py-2.5 bg-[#0D9488] hover:bg-[#14B8A6] text-white font-bold rounded-xl text-xs shadow-sm transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>{t.newHousehold}</span>
            </button>
            <button
              onClick={() => onNavigate('ask-seva')}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-xs border border-white/20 transition-colors flex items-center gap-2"
            >
              <MessageSquareQuote className="w-4 h-4 text-[#14B8A6]" />
              <span>{t.askGuidance}</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Metric Strips (Zero-Pill Discipline, Clean Unboxed Typography) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Due Today */}
        <div className="bg-white p-5 rounded-2xl border border-[#D8E5EA] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#607887]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B3558]">
              {t.dueToday}
            </span>
            <Calendar className="w-4 h-4 text-[#0D9488]" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-[#0B3558] tabular-nums">
              {todaysVisits.length}
            </span>
            <span className="text-xs text-[#607887] block mt-1">
              {overdueVisits.length} overdue follow-ups
            </span>
          </div>
        </div>

        {/* Metric 2: High Risk Mothers */}
        <div className="bg-white p-5 rounded-2xl border border-[#D8E5EA] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#607887]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B3558]">
              {t.highRiskHouseholds}
            </span>
            <Heart className="w-4 h-4 text-[#B42318]" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-[#B42318] tabular-nums">
              {highRiskHouseholds.length}
            </span>
            <span className="text-xs text-[#607887] block mt-1">
              Active gestational risk flags
            </span>
          </div>
        </div>

        {/* Metric 3: Pregnant Women Registered */}
        <div className="bg-white p-5 rounded-2xl border border-[#D8E5EA] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#607887]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B3558]">
              {t.pregnantWomen}
            </span>
            <Activity className="w-4 h-4 text-[#0D9488]" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-[#0B3558] tabular-nums">
              {pregnantCount}
            </span>
            <span className="text-xs text-[#607887] block mt-1">
              Mandatory ANC follow-ups
            </span>
          </div>
        </div>

        {/* Metric 4: Infants & Immunization */}
        <div className="bg-white p-5 rounded-2xl border border-[#D8E5EA] shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between text-[#607887]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B3558]">
              {t.infants}
            </span>
            <Baby className="w-4 h-4 text-[#0D9488]" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-extrabold text-[#0B3558] tabular-nums">
              {infantsCount}
            </span>
            <span className="text-xs text-[#607887] block mt-1">
              NIS schedule monitoring
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Today's Visits & Frontline Health Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Prioritized Today's Visits */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-[#D8E5EA] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[#D8E5EA] pb-3">
            <div>
              <h2 className="text-base font-bold text-[#0B3558]">
                {t.todaysVisitsTitle}
              </h2>
              <p className="text-xs text-[#607887]">
                Visits prioritized by medical urgency and due dates
              </p>
            </div>
            <button
              onClick={() => onNavigate('visits')}
              className="text-xs font-bold text-[#0D9488] hover:text-teal-700 flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {todaysVisits.length === 0 ? (
              <p className="text-xs text-[#607887] py-6 text-center">
                All daily visits completed for today!
              </p>
            ) : (
              todaysVisits.slice(0, 4).map(visit => {
                const isOverdue = visit.status === 'OVERDUE';
                const isCritical = visit.priority === 'CRITICAL';

                return (
                  <div
                    key={visit.id}
                    onClick={() => onSelectVisit(visit)}
                    className="p-4 rounded-2xl border border-[#D8E5EA] hover:border-[#0D9488] bg-[#EEF4F8]/40 hover:bg-[#EAF7F6]/50 transition-colors cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-[#0B3558]">
                          {visit.memberName}
                        </span>
                        <span className="text-[11px] text-[#607887]">
                          · {visit.householdNumber}
                        </span>
                        {isOverdue && (
                          <span className="text-[10px] font-bold text-[#B42318] bg-red-100 px-2 py-0.5 rounded-md">
                            OVERDUE
                          </span>
                        )}
                        {isCritical && (
                          <span className="text-[10px] font-bold text-[#B42318] bg-red-100 px-2 py-0.5 rounded-md">
                            URGENT
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[#183247] font-medium leading-snug">
                        {visit.reason}
                      </p>
                      <span className="text-[11px] text-[#607887] block">
                        Type: {visit.visitType} · Scheduled: {visit.scheduledDate}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectVisit(visit);
                      }}
                      className="px-3 py-1.5 bg-[#0B3558] group-hover:bg-[#0D9488] text-white rounded-xl text-xs font-bold transition-colors whitespace-nowrap self-end sm:self-center shrink-0"
                    >
                      {t.markCompleted}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Col: High-Risk Mothers & Safety Protocols */}
        <div className="space-y-6">
          {/* High-Risk Pregnancy Spotlight */}
          <div className="bg-white rounded-3xl p-6 border border-[#D8E5EA] shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#D8E5EA] pb-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#B42318]" />
                <h3 className="text-xs font-bold text-[#0B3558] uppercase tracking-wider">
                  High-Risk Mothers
                </h3>
              </div>
              <span className="text-xs font-bold text-[#B42318]">
                {highRiskHouseholds.length} Flagged
              </span>
            </div>

            <div className="space-y-2.5">
              {highRiskHouseholds.map(hh => (
                <div key={hh.id} className="p-3 bg-red-50/50 rounded-xl border border-red-200 space-y-1 text-xs">
                  <span className="font-bold text-[#0B3558] block">
                    {hh.headOfFamily} ({hh.householdNumber})
                  </span>
                  <p className="text-[#183247] leading-tight text-[11px]">
                    {hh.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Frontline Tools */}
          <div className="bg-white rounded-3xl p-6 border border-[#D8E5EA] shadow-xs space-y-3">
            <h3 className="text-xs font-bold text-[#0B3558] uppercase tracking-wider border-b border-[#D8E5EA] pb-2">
              {t.quickActions}
            </h3>

            <div className="space-y-2">
              <button
                onClick={() => onNavigate('ask-seva')}
                className="w-full text-left p-3 rounded-xl border border-[#D8E5EA] hover:bg-[#EAF7F6] hover:border-teal-300 transition-colors flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5 text-[#0B3558]">
                  <MessageSquareQuote className="w-4 h-4 text-[#0D9488]" />
                  <span className="font-bold">{t.askGuidance}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#607887]" />
              </button>

              <button
                onClick={() => onNavigate('protocols')}
                className="w-full text-left p-3 rounded-xl border border-[#D8E5EA] hover:bg-[#EAF7F6] hover:border-teal-300 transition-colors flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5 text-[#0B3558]">
                  <BookOpen className="w-4 h-4 text-[#0D9488]" />
                  <span className="font-bold">{t.browseProtocols}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#607887]" />
              </button>

              <button
                onClick={() => onNavigate('evaluator')}
                className="w-full text-left p-3 rounded-xl border border-[#D8E5EA] hover:bg-[#EAF7F6] hover:border-teal-300 transition-colors flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5 text-[#0B3558]">
                  <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
                  <span className="font-bold">{t.runEvaluator}</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-[#607887]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
