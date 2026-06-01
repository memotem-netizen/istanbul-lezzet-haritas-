import React from 'react';
import { useAppContext } from '../AppContext';
import { Moon, Sun, Languages } from 'lucide-react';

export default function TopControls() {
  const { language, setLanguage, theme, setTheme } = useAppContext();

  return (
    <div className="absolute top-4 right-4 z-[1000] flex gap-2">
      <button 
        onClick={() => setLanguage(language === 'tr' ? 'en' : 'tr')}
        className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 p-2 rounded-full shadow-md border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center font-bold text-xs w-10 h-10"
        title="Toggle Language"
      >
        {language.toUpperCase()}
      </button>
      <button 
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 p-2 rounded-full shadow-md border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center w-10 h-10"
        title="Toggle Theme"
      >
        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
      </button>
    </div>
  );
}
