import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import LandingPage from './components/LandingPage';
import TopControls from './components/TopControls';
import { Location } from './types';

export default function App() {
  const [activeLocation, setActiveLocation] = useState<Location | null>(null);
  const [showMap, setShowMap] = useState(false);

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
