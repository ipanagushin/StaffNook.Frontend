import { atom, AtomEffect } from 'recoil';
import { AlertState } from '../config/SystemAlertConstants';

export type ThemeMode = 'light' | 'dark';

const themeLocalStorageEffect =
  (key: string): AtomEffect<ThemeMode> => ({ setSelf, onSet }) => {
    const stored = localStorage.getItem(key);
    if (stored === 'dark' || stored === 'light') {
      setSelf(stored);
    }
    onSet((value, _, isReset) => {
      if (isReset) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value || _);
      }
    });
  };

  const workLogIsTableLocalStorageEffect =
  (key: string): AtomEffect<boolean> => ({ setSelf, onSet }) => {
    const stored = localStorage.getItem(key);
    if (stored === 'true' || stored === 'false') {
      setSelf(stored === 'true');
    }
    onSet((value, _, isReset) => {
      if (isReset) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, value.toString());
      }
    });
  };

export const appThemeMode = atom<ThemeMode>({
  key: 'AppThemeMode',
  default: 'dark',
  effects: [themeLocalStorageEffect('theme-mode')],
});

export const alertState = atom<AlertState | null>({
  key: 'SystemAlert',
  default: null,
});

export const workLogRefresh = atom<boolean>({
  key: 'WorkLogRefreshNeeded',
  default: false,
});

export const workLogIsTable = atom<boolean>({
  key: 'WorkLogIsTable',
  default: false,
  effects: [workLogIsTableLocalStorageEffect('table-mode')],
});