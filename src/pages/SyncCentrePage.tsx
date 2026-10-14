import React, { useState, useEffect } from 'react';
import { RefreshCw, Wifi, WifiOff, CheckCircle2, Clock, CloudUpload, AlertCircle, Database } from 'lucide-react';
import { SyncQueueItem, Language } from '../types';
import { Repository } from '../database/repository';
import { useTranslation } from '../services/i18n';

interface SyncCentrePageProps {
  isOnline: boolean;
  onToggleOnline: () => void;
  pendingSyncCount: number;
  onSyncCompleted: () => void;
  language: Language;
}

export const SyncCentrePage: React.FC<SyncCentrePageProps> = ({
  isOnline,
  onToggleOnline,
  pendingSyncCount,
  onSyncCompleted,
  language
}) => {
  const t = useTranslation(language);
  const [queue, setQueue] = useState<SyncQueueItem[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState<string | null>(null);

  const loadQueue = async () => {
    const items = await Repository.getSyncQueue();
    setQueue(items);
  };

  useEffect(() => {
    loadQueue();
  }, [pendingSyncCount]);

  const handleSyncNow = async () => {
    if (!isOnline) {
      setSyncStatusMsg('Cannot sync while offline. Please connect to internet or switch to Online Mode.');
      return;
    }

    setSyncing(true);
    setSyncStatusMsg(null);

    const res = await Repository.processSyncQueue();
    setSyncing(false);

    if (res.success) {
      setSyncStatusMsg(`Successfully synchronized ${res.processed} records with cloud server!`);
      await loadQueue();
      onSyncCompleted();
    } else {
      setSyncStatusMsg('Sync failed due to network communication. Items remain safely queued locally.');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#0B3558]">
          {t.navSync}
        </h1>
        <p className="text-xs text-[#607887]">
          Manage offline storage cache and synchronize pending frontline records with the cloud
        </p>
      </div>

      {/* Network & Cache Status Card */}
      <div className="bg-white rounded-3xl p-6 border border-[#D8E5EA] shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                isOnline ? 'bg-[#EAF7F6] text-[#0D9488]' : 'bg-amber-100 text-amber-800'
              }`}
            >
              {isOnline ? <Wifi className="w-6 h-6" /> : <WifiOff className="w-6 h-6" />}
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#607887]">
                Current Connection Status
              </span>
              <h2 className="text-base font-bold text-[#0B3558]">
                {isOnline ? t.onlineStatusText : t.offlineStatusText}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onToggleOnline}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-colors ${
                isOnline
                  ? 'border-[#D8E5EA] text-[#0B3558] hover:bg-[#EEF4F8]'
                  : 'bg-[#0D9488] text-white border-transparent hover:bg-teal-700'
              }`}
            >
              {isOnline ? t.switchToOffline : t.switchToOnline}
            </button>

            <button
              onClick={handleSyncNow}
              disabled={syncing || queue.length === 0 || !isOnline}
              className="px-5 py-2 bg-[#0B3558] hover:bg-[#082A46] disabled:opacity-40 text-white font-bold rounded-xl text-xs shadow-xs transition-colors flex items-center gap-2"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
              <span>{syncing ? 'Synchronizing...' : t.syncNow}</span>
            </button>
          </div>
        </div>

        {syncStatusMsg && (
          <div
            className={`p-3 rounded-xl border text-xs flex items-center gap-2 ${
              syncStatusMsg.includes('Successfully')
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-amber-50 border-amber-200 text-amber-900'
            }`}
          >
            {syncStatusMsg.includes('Successfully') ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            )}
            <span>{syncStatusMsg}</span>
          </div>
        )}
      </div>

      {/* Queue Items */}
      <div className="bg-white rounded-3xl p-6 border border-[#D8E5EA] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#D8E5EA] pb-3">
          <div className="flex items-center gap-2">
            <Database className="w-4 h-4 text-[#0D9488]" />
            <h3 className="text-sm font-bold text-[#0B3558]">
              {t.pendingSync} ({queue.length})
            </h3>
          </div>
          <span className="text-xs text-[#607887]">
            Encrypted local offline repository
          </span>
        </div>

        {queue.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#607887] space-y-1">
            <CheckCircle2 className="w-8 h-8 text-[#0D9488] mx-auto mb-2" />
            <p className="font-bold text-[#0B3558]">All local records are synchronized!</p>
            <p>New household registrations and completed visits recorded while offline will appear here.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {queue.map(item => (
              <div
                key={item.id}
                className="p-4 bg-[#EEF4F8] border border-[#D8E5EA] rounded-2xl flex items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#0B3558]">
                      {item.type === 'ADD_HOUSEHOLD'
                        ? `Add Household: ${item.payload?.householdNumber}`
                        : item.type === 'COMPLETE_VISIT'
                        ? `Visit Completed: ${item.payload?.memberName}`
                        : item.type}
                    </span>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                      PENDING SYNC
                    </span>
                  </div>
                  <p className="text-[11px] text-[#607887]">
                    Queued: {new Date(item.timestamp).toLocaleString()}
                  </p>
                </div>

                <CloudUpload className="w-4 h-4 text-[#607887]" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SyncCentrePage;
