import React from 'react';
import { Map, Mail } from 'lucide-react';
import logoUrl from '../assets/images/istanbul_lezzet_logo_premium_1780316932972.png';
import { useAppContext } from '../AppContext';

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  const { t } = useAppContext();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col justify-center items-center relative overflow-hidden font-sans transition-colors">
      {/* Background image with overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1541432901042-2b8cbc77d818?auto=format&fit=crop&w=1920&q=80")' }}
      >
        <div className="absolute inset-0 bg-white/85 dark:bg-slate-900/90 backdrop-blur-[4px] transition-colors"></div>
      </div>
      
      <div className="z-10 text-center px-6 max-w-4xl w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-1000">
        <div className="w-48 h-48 md:w-56 md:h-56 bg-white rounded-3xl flex items-center justify-center mb-8 shadow-xl transform -rotate-6 overflow-hidden border-4 border-blue-100 dark:border-slate-800 p-2">
          <img src={logoUrl} alt="Logo" className="w-full h-full object-contain" />
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tighter text-slate-900 dark:text-white">
          {t('appTitle').replace('Haritası', '').replace('Map', '')}
          <br/>
          <span className="text-blue-600 dark:text-blue-500">
            {t('appTitle').includes('Haritası') ? 'Haritası' : 'Map'}
          </span>
        </h1>
        <p className="text-lg md:text-2xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed max-w-2xl font-medium">
          {t('appDesc')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={onEnter}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full text-lg shadow-[0_0_40px_rgba(37,99,235,0.4)] hover:shadow-[0_0_60px_rgba(37,99,235,0.6)] transition-all transform hover:scale-105 flex items-center justify-center gap-3 cursor-pointer"
          >
            <Map className="w-6 h-6" />
            {t('exploreBtn')}
          </button>
          
          <a href="mailto:mehmet.kader10@icloud.com"
            className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold py-4 px-10 rounded-full text-lg border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3 cursor-pointer"
          >
            <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            {t('suggestions')}
          </a>
        </div>
      </div>
    </div>
  );
}
