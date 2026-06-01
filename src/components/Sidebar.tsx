import React from 'react';
import { locations } from '../data';
import { Location } from '../types';
import { MapPin, Utensils, Star, Info, Phone } from 'lucide-react';
import logoUrl from '../assets/images/istanbul_lezzet_logo_premium_1780316932972.png';
import { useAppContext } from '../AppContext';

interface SidebarProps {
  activeLocation: Location | null;
  onLocationSelect: (location: Location) => void;
}

export default function Sidebar({ activeLocation, onLocationSelect }: SidebarProps) {
  const { t, language } = useAppContext();

  return (
    <div className="w-full h-full bg-white dark:bg-slate-900 flex flex-col z-10 shadow-2xl relative transition-colors">
      <div className="p-6 pb-8 md:pb-6 bg-blue-600 dark:bg-blue-800 text-white shadow-md relative pt-12 md:pt-6">
        <h1 className="text-xl md:text-2xl font-bold flex items-center gap-2">
          <Utensils className="h-6 w-6" />
          {t('appTitle')}
        </h1>
        <p className="opacity-90 text-sm mt-2">
          {t('appSubtitle')}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {locations.map((loc, index) => {
          const isActive = activeLocation?.id === loc.id;
          const locNumber = index + 1;
          return (
            <div 
              key={loc.id}
              onClick={() => onLocationSelect(loc)}
              className={`flex flex-col p-4 rounded-xl cursor-pointer transition-all border-2 
                ${isActive 
                  ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-900/20 shadow-md transform scale-[1.02]' 
                  : 'border-transparent bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 hover:shadow-sm'
                }
              `}
            >
              <div className="flex gap-4">
                <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden relative shadow-sm border border-gray-100 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center p-1">
                  <img 
                    src={logoUrl} 
                    alt="Logo" 
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-1 left-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1 text-gray-800 dark:text-gray-200 shadow-sm border border-gray-100 dark:border-slate-700">
                    <Star className="h-3 w-3 text-orange-500 fill-orange-500" />
                    {loc.rating}
                  </div>
                </div>
                
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h3 className={`font-bold leading-tight mb-1 ${isActive ? 'text-blue-700 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
                      <span className="text-blue-500 mr-1.5 text-sm">#{locNumber}</span>
                      {loc.name}
                    </h3>
                    <div className="flex items-start gap-1 text-xs text-blue-600 dark:text-blue-400 font-medium mb-2">
                      <MapPin className="h-3 w-3 shrink-0 mt-0.5" />
                      <span className="leading-snug">{loc.address}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                    {language === 'en' ? loc.enShortDescription || loc.shortDescription : loc.shortDescription}
                  </p>
                </div>
              </div>
              
              {isActive && (
                <div className="mt-4 pt-4 border-t border-blue-100 dark:border-slate-700 animate-in fade-in slide-in-from-top-2">
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {language === 'en' ? loc.enDescription || loc.description : loc.description}
                  </p>
                  {loc.workingHours && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-3 py-2 rounded-md">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{t('workingHours')}:</span> {loc.workingHours}
                    </div>
                  )}
                  {loc.phoneNumber && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-3 py-2 rounded-md">
                      <Phone className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{t('phone')}:</span> {loc.phoneNumber}
                    </div>
                  )}
                  <div className="mt-4 flex items-start gap-2 bg-white dark:bg-slate-800 p-3 rounded-lg border border-blue-50 dark:border-slate-700 relative shadow-sm">
                    <MapPin className="h-4 w-4 text-blue-500 dark:text-blue-400 shrink-0 mt-0.5" />
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 leading-snug">
                      <span className="block text-xs text-gray-500 dark:text-gray-400 mb-0.5 font-normal">{t('openAddress')}</span>
                      {loc.address}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
