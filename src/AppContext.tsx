import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'tr' | 'en';
type Theme = 'light' | 'dark';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  t: (key: string) => string;
}

const translations = {
  tr: {
    appTitle: "İstanbul Lezzet Haritası",
    appSubtitle: "Şehrin Görünmez Lezzet Durakları",
    appDesc: "Yüzlerce yıllık tarihi mekanlardan, sokak arasındaki salaş lezzet efsanelerine kadar İstanbul'un gizli kalmış gastronomi haritasını keşfedin.",
    exploreBtn: "Keşfe Başla",
    foodGuideLabel: "Gastronomi Rehberi",
    searchPlaceholder: "Mekan, semt veya kategori ara...",
    openAddress: "Açık Adres",
    address: "Adres",
    workingHours: "Çalışma Saatleri",
    hours: "Saat",
    phone: "Telefon",
    categories: "Kategoriler",
    all: "Tümü"
  },
  en: {
    appTitle: "Istanbul Food Map",
    appSubtitle: "The City's Hidden Culinary Stops",
    appDesc: "Discover Istanbul's hidden gastronomic map, from centuries-old historical venues to legendary unsung street food spots.",
    exploreBtn: "Start Exploring",
    foodGuideLabel: "Gastronomy Guide",
    searchPlaceholder: "Search venue, neighborhood or category...",
    openAddress: "Full Address",
    address: "Address",
    workingHours: "Working Hours",
    hours: "Hours",
    phone: "Phone",
    categories: "Categories",
    all: "All"
  }
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('tr');
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const t = (key: string) => {
    return translations[language][key as keyof typeof translations['tr']] || key;
  };

  return (
    <AppContext.Provider value={{ language, setLanguage, theme, setTheme, t }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useAppContext must be used within AppProvider");
  return context;
};
