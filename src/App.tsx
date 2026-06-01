import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import LandingPage from './components/LandingPage';
import TopControls from './components/TopControls';
import { Location } from './types';
import { ArrowLeft } from 'lucide-react';
import { useAppContext } from './AppContext';

export default function App() {
  const [activeLocation, setActiveLocation] = useState<Location | null>(null);
  const [showMap, setShowMap] = useState(false);
  const { t } = useAppContext();

  const handleLocationSelect = (location: Location) => {
    setActiveLocation(location);
  };

  if (!showMap) {
    return (
      <>
        <TopControls />
        <LandingPage onEnter={() => setShowMap(true)} />
      </>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-white dark:bg-slate-900 overflow-hidden text-slate-900 dark:text-slate-100 font-sans">
      <TopControls />
      <button 
        onClick={() => setShowMap(false)}
        className="absolute top-4 left-4 md:left-auto md:right-[150px] z-[1000] bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 py-2 px-4 rounded-full shadow-md border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 font-bold text-sm"
        title="Go Back"
      >
        <ArrowLeft size={16} className="text-blue-600 dark:text-blue-400" />
        <span className="hidden sm:inline">{t('back')}</span>
      </button>

      {/* Sidebar - Mobile: Bottom sheet behavior or stacking, Desktop: fixed left panel */}
      <div className="w-full md:w-96 lg:w-[400px] h-[50vh] md:h-full shrink-0 order-2 md:order-1 transition-all z-10 dark:border-r dark:border-slate-800">
        <Sidebar 
          activeLocation={activeLocation} 
          onLocationSelect={handleLocationSelect} 
        />
      </div>
      
      {/* Map Area */}
      <div className="flex-1 h-[50vh] md:h-full order-1 md:order-2 relative z-0">
        <Map 
          activeLocation={activeLocation} 
          onLocationSelect={handleLocationSelect} 
        />
      </div>
    </div>
  );
}
