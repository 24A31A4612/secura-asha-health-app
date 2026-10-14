import React from 'react';
import { ArrowLeft, Home, User, Heart, Baby, Calendar, Plus, Phone, MapPin, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Household, Language } from '../types';
import { useTranslation } from '../services/i18n';

interface HouseholdDetailPageProps {
  household: Household;
  onBack: () => void;
  language: Language;
}

export const HouseholdDetailPage: React.FC<HouseholdDetailPageProps> = ({
  household,
  onBack,
  language
}) => {
  const t = useTranslation(language);
  const isHighRisk = household.riskLevel === 'HIGH' || household.riskLevel === 'CRITICAL';

  return (
    <div className="space-y-6 pb-12">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-xs font-bold text-[#0B3558] hover:text-[#0D9488] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Household Register</span>
      </button>

      {/* Household Overview Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#D8E5EA] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D8E5EA] pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#0D9488] bg-[#EAF7F6] px-2.5 py-1 rounded-lg">
                {household.householdNumber}
              </span>
              {isHighRisk && (
                <span className="text-xs font-bold text-[#B42318] bg-red-100 px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  HIGH RISK HOUSEHOLD
                </span>
              )}
            </div>
            <h1 className="text-2xl font-bold text-[#0B3558]">
              {household.headOfFamily}'s Household
            </h1>
            <p className="text-xs text-[#607887]">
              {household.village} · Registered on {new Date(household.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`tel:${household.phone}`}
              className="px-4 py-2 bg-[#EAF7F6] text-[#0B3558] font-bold rounded-xl text-xs hover:bg-teal-100 transition-colors flex items-center gap-1.5 border border-teal-200"
            >
              <Phone className="w-3.5 h-3.5 text-[#0D9488]" />
              <span>Call Family</span>
            </a>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <span className="text-[#607887] block font-medium">Address</span>
            <span className="text-[#183247] font-semibold mt-0.5 block">{household.address}</span>
          </div>
          <div>
            <span className="text-[#607887] block font-medium">Socioeconomic</span>
            <span className="text-[#183247] font-semibold mt-0.5 block">{household.socioeconomicCategory}</span>
          </div>
          <div>
            <span className="text-[#607887] block font-medium">Next Follow-Up</span>
            <span className="text-[#183247] font-semibold mt-0.5 block">{household.nextScheduledVisit}</span>
          </div>
          <div>
            <span className="text-[#607887] block font-medium">Sync Status</span>
            <span className="text-[#0D9488] font-semibold mt-0.5 block">
              {household.syncedToCloud ? 'Saved to Cloud' : 'Cached Locally'}
            </span>
          </div>
        </div>

        {household.notes && (
          <div className="p-3.5 bg-[#EEF4F8] rounded-2xl border border-[#D8E5EA] text-xs">
            <span className="font-bold text-[#0B3558] block mb-1">ASHA Field Observations:</span>
            <p className="text-[#183247] leading-relaxed">{household.notes}</p>
          </div>
        )}
      </div>

      {/* Household Members */}
      <div className="bg-white rounded-3xl p-6 border border-[#D8E5EA] shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#0B3558] border-b border-[#D8E5EA] pb-3">
          Family Members & Health Status ({household.members.length})
        </h2>

        <div className="space-y-4">
          {household.members.map((member) => (
            <div
              key={member.id}
              className="p-4 rounded-2xl border border-[#D8E5EA] bg-[#EEF4F8]/30 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#0B3558] text-white flex items-center justify-center font-bold text-xs">
                    {member.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0B3558]">
                      {member.name}
                    </h3>
                    <p className="text-[11px] text-[#607887]">
                      {member.relationship} · {member.age} yrs · {member.gender}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {member.isPregnant && (
                    <span className="text-[11px] font-bold text-white bg-[#0B3558] px-2.5 py-0.5 rounded-lg flex items-center gap-1">
                      <Heart className="w-3 h-3 text-red-400" />
                      Pregnant (Week {member.pregnancyWeek || '—'})
                    </span>
                  )}
                  {member.highRisk && (
                    <span className="text-[11px] font-bold text-[#B42318] bg-red-100 px-2 py-0.5 rounded-lg">
                      High Risk
                    </span>
                  )}
                  {member.infantDetails && (
                    <span className="text-[11px] font-bold text-[#0D9488] bg-[#EAF7F6] px-2 py-0.5 rounded-lg flex items-center gap-1">
                      <Baby className="w-3 h-3" />
                      Infant
                    </span>
                  )}
                </div>
              </div>

              {/* Pregnant Details */}
              {member.isPregnant && (
                <div className="p-3 bg-red-50/50 rounded-xl border border-red-200 text-xs space-y-1.5">
                  <span className="font-bold text-[#0B3558]">Maternal Care Details:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                    <span>LMP: {member.lmpDate || 'Recorded'}</span>
                    <span>EDD: {member.eddDate || 'Calculated'}</span>
                    <span>Gestation: {member.pregnancyWeek} Weeks</span>
                  </div>
                  {member.riskFactors && member.riskFactors.length > 0 && (
                    <div className="pt-1">
                      <span className="font-semibold text-[#B42318]">Identified Risk Factors: </span>
                      <span className="text-[#183247]">{member.riskFactors.join(', ')}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Infant Details */}
              {member.infantDetails && (
                <div className="p-3 bg-[#EAF7F6] rounded-xl border border-teal-200 text-xs space-y-1.5">
                  <span className="font-bold text-[#0B3558]">Child Immunization & Birth Profile:</span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px]">
                    <span>DOB: {member.infantDetails.birthDate}</span>
                    <span>Birth Wt: {member.infantDetails.birthWeight} kg</span>
                    <span>Delivery: {member.infantDetails.deliveryType}</span>
                  </div>
                  {member.infantDetails.immunizationsDue && member.infantDetails.immunizationsDue.length > 0 && (
                    <div className="pt-1 text-[#B42318] font-semibold text-[11px]">
                      Due Vaccines: {member.infantDetails.immunizationsDue.join(', ')}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HouseholdDetailPage;
