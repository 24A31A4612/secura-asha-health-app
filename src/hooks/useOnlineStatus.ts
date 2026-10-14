import { useState, useEffect, useCallback } from 'react';
import { Repository } from '../database/repository';

export const useOnlineStatus = () => {
  const [isBrowserOnline, setIsBrowserOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const [isManualOffline, setIsManualOffline] = useState<boolean>(() => {
    try {
      return localStorage.getItem('secura_manual_offline') === 'true';
    } catch {
      return false;
    }
  });
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  // Effective status: online only if browser is online AND manual offline is off
  const isOnline = isBrowserOnline && !isManualOffline;

  const refreshPendingCount = useCallback(async () => {
    try {
      const queue = await Repository.getSyncQueue();
      setPendingSyncCount(queue.length);
    } catch {
      setPendingSyncCount(0);
    }
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      setIsBrowserOnline(true);
      refreshPendingCount();
    };

    const handleOffline = () => {
      setIsBrowserOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    refreshPendingCount();

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, [refreshPendingCount]);

  const toggleManualOffline = () => {
    const nextVal = !isManualOffline;
    setIsManualOffline(nextVal);
    try {
      localStorage.setItem('secura_manual_offline', String(nextVal));
    } catch {}
    refreshPendingCount();
  };

  const syncNow = async () => {
    if (!isOnline) return { success: false, processed: 0, reason: 'offline' };
    setIsSyncing(true);
    try {
      const res = await Repository.processSyncQueue();
      await refreshPendingCount();
      setIsSyncing(false);
      return res;
    } catch (err) {
      setIsSyncing(false);
      return { success: false, processed: 0 };
    }
  };

  return {
    isOnline,
    isBrowserOnline,
    isManualOffline,
    toggleManualOffline,
    pendingSyncCount,
    isSyncing,
    syncNow,
    refreshPendingCount
  };
};
