import React, { useState } from 'react';
import { Users, Search, Plus, Home, ArrowRight, Heart, Baby, ShieldAlert } from 'lucide-react';
import { Household, Language } from '../types';
import { useTranslation } from '../services/i18n';

interface HouseholdsPageProps {
  households: Household[];
  onSelectHousehold: (household: Household) => void;
  onOpenAddHousehold: () => void;
  language: Language;
}

export const HouseholdsPage: React.FC<HouseholdsPageProps> = ({
  households,
  onSelectHousehold,
  onOpenAddHousehold,
  language
}) => {
  const t = useTranslation(language);
  const [search, setSearch] = useState('');

  const filtered = households.filter(h => {
    const q = search.toLowerCase();
    return (
      h.headOfFamily.toLowerCase().includes(q) ||
      h.householdNumber.toLowerCase().includes(q) ||
      h.village.toLowerCase().includes(q) ||
      h.address.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header and Add Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0B3558]">
            {t.householdRegisterTitle}
          </h1>
          <p className="text-xs text-[#607887]">
            {households.length} total registered frontline households in village
          </p>
        </div>

        <button
          onClick={onOpenAddHousehold}
          className="px-4 py-2.5 bg-[#0D9488] hover:bg-teal-700 text-white font-bold rounded-xl text-xs shadow-xs transition-colors flex items-center gap-2 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>{t.newHousehold}</span>
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#607887] absolute left-3.5 top-3" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t.searchHouseholdsPlaceholder}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D8E5EA] rounded-2xl text-xs text-[#183247] focus:outline-none focus:ring-2 focus:ring-[#0D9488] shadow-2xs"
        />
      </div>

      {/* Household Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(hh => {
          const pregnantMember = hh.members.find(m => m.isPregnant);
          const infantMember = hh.members.find(m => !!m.infantDetails);
          const isHighRisk = hh.riskLevel === 'HIGH' || hh.riskLevel === 'CRITICAL';

          return (
            <div
              key={hh.id}
              onClick={() => onSelectHousehold(hh)}
              className="bg-white rounded-3xl border border-[#D8E5EA] hover:border-[#0D9488] p-5 shadow-xs transition-all hover:shadow-md cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0D9488] bg-[#EAF7F6] px-2.5 py-1 rounded-lg">
                    {hh.householdNumber}
                  </span>
                  {isHighRisk && (
                    <span className="text-[10px] font-bold text-[#B42318] bg-red-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                      <ShieldAlert className="w-3 h-3" />
                      HIGH RISK
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-[#0B3558] group-hover:text-[#0D9488] transition-colors">
                    {hh.headOfFamily}
                  </h3>
                  <p className="text-xs text-[#607887] line-clamp-1 mt-0.5">
                    {hh.address}
                  </p>
                </div>

                {/* Key indicators */}
                <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                  <span className="text-[#607887]">
                    {hh.totalMembers} members
                  </span>
                  <span className="text-[#607887]">· {hh.socioeconomicCategory}</span>
                </div>

                {/* Pregnant woman or infant tag */}
                {(pregnantMember || infantMember) && (
                  <div className="pt-2 border-t border-[#D8E5EA] space-y-1.5">
                    {pregnantMember && (
                      <div className="flex items-center gap-1.5 text-xs text-[#0B3558] bg-[#EEF4F8] p-2 rounded-lg">
                        <Heart className="w-3.5 h-3.5 text-[#B42318] shrink-0" />
                        <span className="font-semibold truncate">
                          {pregnantMember.name} (Pregnant, Week {pregnantMember.pregnancyWeek || '—'})
                        </span>
                      </div>
                    )}
                    {infantMember && (
                      <div className="flex items-center gap-1.5 text-xs text-[#0B3558] bg-[#EAF7F6] p-2 rounded-lg">
                        <Baby className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                        <span className="font-semibold truncate">
                          {infantMember.name} ({infantMember.infantDetails?.immunizationsDue?.length || 0} vaccine due)
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-[#0D9488] font-bold border-t border-[#D8E5EA]">
                <span>{t.viewDetails}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HouseholdsPage;
