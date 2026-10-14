import React, { useState } from 'react';
import { X, Plus, Trash2, Home, Check } from 'lucide-react';
import { Household, Member, Language, RiskLevel } from '../types';
import { useTranslation } from '../services/i18n';

interface AddHouseholdModalProps {
  onClose: () => void;
  onSave: (household: Household) => Promise<void>;
  language: Language;
}

export const AddHouseholdModal: React.FC<AddHouseholdModalProps> = ({
  onClose,
  onSave,
  language
}) => {
  const t = useTranslation(language);

  const [householdNo, setHouseholdNo] = useState(`H-${Math.floor(100 + Math.random() * 900)}`);
  const [headOfFamily, setHeadOfFamily] = useState('');
  const [village, setVillage] = useState('Rampur Sub-Centre');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [socioeconomic, setSocioeconomic] = useState<'BPL' | 'APL' | 'NFSA'>('BPL');
  const [riskLevel, setRiskLevel] = useState<RiskLevel>('NORMAL');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);

  // Members list
  const [members, setMembers] = useState<Member[]>([
    {
      id: `mem-${Date.now()}-1`,
      name: '',
      relationship: 'Head',
      age: 30,
      gender: 'MALE'
    }
  ]);

  const addMember = () => {
    setMembers([
      ...members,
      {
        id: `mem-${Date.now()}-${members.length + 1}`,
        name: '',
        relationship: 'Member',
        age: 25,
        gender: 'FEMALE',
        isPregnant: false
      }
    ]);
  };

  const removeMember = (index: number) => {
    if (members.length <= 1) return;
    setMembers(members.filter((_, idx) => idx !== index));
  };

  const updateMember = (index: number, updates: Partial<Member>) => {
    setMembers(members.map((m, idx) => (idx === index ? { ...m, ...updates } : m)));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!headOfFamily.trim() || !address.trim()) {
      alert(t.allFieldsRequired);
      return;
    }

    setSaving(true);
    // Check if any member is high risk pregnancy or infant
    let calculatedRisk = riskLevel;
    const hasPregnant = members.some(m => m.isPregnant);
    const hasHighRiskPregnancy = members.some(m => m.isPregnant && m.highRisk);
    if (hasHighRiskPregnancy) calculatedRisk = 'HIGH';

    const newHousehold: Household = {
      id: `hh-${Date.now()}`,
      householdNumber: householdNo.trim(),
      headOfFamily: headOfFamily.trim(),
      village: village.trim(),
      address: address.trim(),
      phone: phone.trim() || '+91 90000 00000',
      totalMembers: members.length,
      socioeconomicCategory: socioeconomic,
      riskLevel: calculatedRisk,
      nextScheduledVisit: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
      notes: notes.trim(),
      syncedToCloud: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      members
    };

    await onSave(newHousehold);
    setSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#D8E5EA] overflow-hidden my-8">
        {/* Header */}
        <div className="bg-[#0B3558] text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Home className="w-5 h-5 text-[#14B8A6]" />
            <h2 className="text-base font-bold">{t.addHouseholdTitle}</h2>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {/* General Information Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#0B3558] uppercase mb-1">
                {t.householdNo} *
              </label>
              <input
                type="text"
                value={householdNo}
                onChange={e => setHouseholdNo(e.target.value)}
                required
                className="w-full px-3 py-2 border border-[#D8E5EA] rounded-lg text-sm text-[#183247] focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B3558] uppercase mb-1">
                {t.headOfFamily} *
              </label>
              <input
                type="text"
                value={headOfFamily}
                onChange={e => {
                  setHeadOfFamily(e.target.value);
                  if (members[0]) updateMember(0, { name: e.target.value });
                }}
                required
                placeholder="e.g., Rameshwar Verma"
                className="w-full px-3 py-2 border border-[#D8E5EA] rounded-lg text-sm text-[#183247] focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B3558] uppercase mb-1">
                {t.villageLabel} *
              </label>
              <input
                type="text"
                value={village}
                onChange={e => setVillage(e.target.value)}
                required
                className="w-full px-3 py-2 border border-[#D8E5EA] rounded-lg text-sm text-[#183247] focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B3558] uppercase mb-1">
                {t.phoneLabel}
              </label>
              <input
                type="text"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 border border-[#D8E5EA] rounded-lg text-sm text-[#183247] focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#0B3558] uppercase mb-1">
                Address / Landmark *
              </label>
              <input
                type="text"
                value={address}
                onChange={e => setAddress(e.target.value)}
                required
                placeholder="e.g., Near Primary School, Ward 2"
                className="w-full px-3 py-2 border border-[#D8E5EA] rounded-lg text-sm text-[#183247] focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B3558] uppercase mb-1">
                {t.socioeconomicStatus}
              </label>
              <select
                value={socioeconomic}
                onChange={e => setSocioeconomic(e.target.value as any)}
                className="w-full px-3 py-2 border border-[#D8E5EA] rounded-lg text-sm text-[#183247] focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
              >
                <option value="BPL">BPL (Below Poverty Line)</option>
                <option value="NFSA">NFSA Priority Card</option>
                <option value="APL">APL</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0B3558] uppercase mb-1">
                Household Health Risk Status
              </label>
              <select
                value={riskLevel}
                onChange={e => setRiskLevel(e.target.value as any)}
                className="w-full px-3 py-2 border border-[#D8E5EA] rounded-lg text-sm text-[#183247] focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
              >
                <option value="NORMAL">Normal / Routine</option>
                <option value="MODERATE">Moderate Risk</option>
                <option value="HIGH">High Risk (Pregnant / Overdue Immunization)</option>
              </select>
            </div>
          </div>

          {/* Members Subsection */}
          <div className="border-t border-[#D8E5EA] pt-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-bold text-[#0B3558] uppercase tracking-wider">
                Household Members ({members.length})
              </h3>
              <button
                type="button"
                onClick={addMember}
                className="flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-[#0D9488] bg-[#EAF7F6] hover:bg-teal-100 rounded-md transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Member</span>
              </button>
            </div>

            <div className="space-y-3">
              {members.map((member, idx) => (
                <div key={member.id} className="p-3 bg-[#EEF4F8] border border-[#D8E5EA] rounded-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#0B3558]">Member #{idx + 1}</span>
                    {idx > 0 && (
                      <button
                        type="button"
                        onClick={() => removeMember(idx)}
                        className="text-red-500 hover:text-red-700 p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      placeholder="Name"
                      value={member.name}
                      onChange={e => updateMember(idx, { name: e.target.value })}
                      required
                      className="px-2.5 py-1.5 bg-white border border-[#D8E5EA] rounded-md text-xs"
                    />
                    <input
                      type="text"
                      placeholder="Relationship (e.g. Wife, Son)"
                      value={member.relationship}
                      onChange={e => updateMember(idx, { relationship: e.target.value })}
                      className="px-2.5 py-1.5 bg-white border border-[#D8E5EA] rounded-md text-xs"
                    />
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Age"
                        value={member.age}
                        onChange={e => updateMember(idx, { age: Number(e.target.value) })}
                        className="w-16 px-2.5 py-1.5 bg-white border border-[#D8E5EA] rounded-md text-xs"
                      />
                      <select
                        value={member.gender}
                        onChange={e => updateMember(idx, { gender: e.target.value as any })}
                        className="flex-1 px-2.5 py-1.5 bg-white border border-[#D8E5EA] rounded-md text-xs"
                      >
                        <option value="FEMALE">Female</option>
                        <option value="MALE">Male</option>
                      </select>
                    </div>
                  </div>

                  {/* Maternal & Infant specific toggles */}
                  {member.gender === 'FEMALE' && member.age >= 15 && member.age <= 49 && (
                    <div className="pt-1 flex items-center gap-4 text-xs">
                      <label className="flex items-center gap-1.5 font-medium text-[#183247]">
                        <input
                          type="checkbox"
                          checked={member.isPregnant || false}
                          onChange={e => updateMember(idx, { isPregnant: e.target.checked })}
                          className="rounded text-[#0D9488]"
                        />
                        <span>Currently Pregnant</span>
                      </label>
                      {member.isPregnant && (
                        <label className="flex items-center gap-1.5 font-medium text-[#B42318]">
                          <input
                            type="checkbox"
                            checked={member.highRisk || false}
                            onChange={e => updateMember(idx, { highRisk: e.target.checked })}
                            className="rounded text-[#B42318]"
                          />
                          <span>High-Risk Pregnancy Flag</span>
                        </label>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-bold text-[#0B3558] uppercase mb-1">
              {t.visitNotes}
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Clinical or socioeconomic field notes..."
              className="w-full px-3 py-2 border border-[#D8E5EA] rounded-lg text-xs text-[#183247] focus:outline-none focus:ring-2 focus:ring-[#0D9488]"
            />
          </div>

          {/* Submit Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#D8E5EA]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#607887] hover:text-[#183247] rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#0B3558] hover:bg-[#082A46] rounded-xl shadow transition-colors flex items-center gap-2"
            >
              {saving ? 'Saving...' : 'Save Household Record'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddHouseholdModal;
