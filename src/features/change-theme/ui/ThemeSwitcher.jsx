import { useEffect, useState } from 'react';

const THEME_STORAGE_KEY = 'parts-theme';
const THEME_MODES = ['light', 'dark', 'system'];

const getSavedTheme = () => {
  try {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return THEME_MODES.includes(savedTheme) ? savedTheme : 'system';
  } catch {
    return 'system';
  }
};

export const ThemeSwitcher = () => {
  const [themeMode, setThemeMode] = useState(getSavedTheme);

  useEffect(() => {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
    const applyTheme = () => {
      const activeTheme =
        themeMode === 'system' ? (systemTheme.matches ? 'dark' : 'light') : themeMode;
      document.documentElement.setAttribute('data-bs-theme', activeTheme);
    };

    applyTheme();

    systemTheme.addEventListener('change', applyTheme);

    return () => systemTheme.removeEventListener('change', applyTheme);
  }, [themeMode]);

  const handleChange = (event) => {
    const selectedTheme = event.target.value;

    setThemeMode(selectedTheme);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, selectedTheme);
    } catch {
      // Без localStorage тема действует до перезагрузки страницы.
    }
  };

  return (
    <div className="theme-control">
      <label htmlFor="theme-mode" className="form-label small fw-semibold mb-1">
        Тема
      </label>
      <select
        id="theme-mode"
        className="form-select form-select-sm"
        value={themeMode}
        onChange={handleChange}
      >
        <option value="light">Светлая</option>
        <option value="dark">Тёмная</option>
        <option value="system">Системная</option>
      </select>
    </div>
  );
};
