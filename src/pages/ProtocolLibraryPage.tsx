import React, { useState } from 'react';
import { BookOpen, Search, ShieldCheck, ArrowRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { ProtocolDocument, Language } from '../types';
import { OFFICIAL_PROTOCOLS } from '../database/protocolsData';
import { useTranslation } from '../services/i18n';

interface ProtocolLibraryPageProps {
  onSelectProtocol: (protocol: ProtocolDocument) => void;
  language: Language;
}

export const ProtocolLibraryPage: React.FC<ProtocolLibraryPageProps> = ({
  onSelectProtocol,
  language
}) => {
  const t = useTranslation(language);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('ALL');

  const filtered = OFFICIAL_PROTOCOLS.filter(p => {
    const q = search.toLowerCase();
    const matchesSearch =
      p.title.toLowerCase().includes(q) ||
      p.titleTe.toLowerCase().includes(q) ||
      p.titleHi.toLowerCase().includes(q) ||
      p.summary.toLowerCase().includes(q) ||
      p.citation.toLowerCase().includes(q);

    const matchesCategory = categoryFilter === 'ALL' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0B3558]">
            {t.protocolsTitle}
          </h1>
          <p className="text-xs text-[#607887]">
            {t.protocolsSubtitle}
          </p>
        </div>

        {/* Category Pills / Filter bar */}
        <div className="flex items-center gap-1 p-1 bg-white border border-[#D8E5EA] rounded-xl overflow-x-auto">
          {['ALL', 'MATERNAL', 'NEWBORN', 'IMMUNIZATION', 'COMMUNICABLE'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-[#0B3558] text-white shadow-xs'
                  : 'text-[#607887] hover:text-[#183247]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#607887] absolute left-3.5 top-3" />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={t.searchProtocols}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#D8E5EA] rounded-2xl text-xs text-[#183247] focus:outline-none focus:ring-2 focus:ring-[#0D9488] shadow-2xs"
        />
      </div>

      {/* Protocols Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map(protocol => {
          const displayTitle = language === 'te' ? protocol.titleTe : language === 'hi' ? protocol.titleHi : protocol.title;
          const displaySummary = language === 'te' ? protocol.summaryTe : language === 'hi' ? protocol.summaryHi : protocol.summary;

          return (
            <div
              key={protocol.id}
              onClick={() => onSelectProtocol(protocol)}
              className="bg-white rounded-3xl border border-[#D8E5EA] hover:border-[#0D9488] p-5 shadow-xs transition-all hover:shadow-md cursor-pointer flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#0D9488] bg-[#EAF7F6] px-2.5 py-1 rounded-lg">
                    {protocol.category} · {protocol.module}
                  </span>
                  <span className="text-[10px] text-[#607887] font-mono">
                    {protocol.section}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-[#0B3558] group-hover:text-[#0D9488] transition-colors leading-snug">
                  {displayTitle}
                </h3>

                <p className="text-xs text-[#607887] leading-relaxed line-clamp-2">
                  {displaySummary}
                </p>

                <div className="p-2.5 bg-[#EEF4F8] rounded-xl border border-[#D8E5EA] text-[11px] font-semibold text-[#0B3558] flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                  <span className="truncate">{protocol.citation}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between text-xs text-[#0D9488] font-bold border-t border-[#D8E5EA]">
                <span>Read Full MoHFW Clinical Guideline</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProtocolLibraryPage;
