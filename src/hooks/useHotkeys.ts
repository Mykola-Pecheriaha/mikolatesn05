'use client';

import { useEffect, useCallback } from 'react';

type HotkeyCallback = (event: KeyboardEvent) => void;
type HotkeyConfig = {
  key: string;
  ctrlKey?: boolean;
  altKey?: boolean;
  shiftKey?: boolean;
};

export function useHotkeys(config: HotkeyConfig, callback: HotkeyCallback) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const matchesKey = event.key.toLowerCase() === config.key.toLowerCase();
      const matchesCtrl = config.ctrlKey ? event.ctrlKey : !event.ctrlKey;
      const matchesAlt = config.altKey ? event.altKey : !event.altKey;
      const matchesShift = config.shiftKey ? event.shiftKey : !event.shiftKey;

      if (matchesKey && matchesCtrl && matchesAlt && matchesShift) {
        event.preventDefault();
        callback(event);
      }
    },
    [config, callback]
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
