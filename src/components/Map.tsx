import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import { locations } from '../data';
import { Location } from '../types';
import logoUrl from '../assets/images/istanbul_lezzet_logo_premium_1780316932972.png';
import { useAppContext } from '../AppContext';

// Fix for default marker icons in Leaflet with bundlers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Custom beautiful SVG icon for active marker
const activeIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `
    <div style="position: relative; width: 36px; height: 36px; display: flex; justify-content: center; align-items: center; transform: translate(-50%, -100%);">
      <div style="position: absolute; bottom: -6px; left: 50%; transform: translateX(-50%); width: 14px; height: 4px; background: rgba(0,0,0,0.3); border-radius: 50%; filter: blur(2px);"></div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 36px; height: 36px; fill: #2563EB; stroke: #fff;">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3" fill="#FBBF24" stroke="none"></circle>
      </svg>
    </div>
  `,
  iconSize: [36, 36],
  iconAnchor: [0, 0],
  popupAnchor: [0, -36],
});

// Custom Icon for default marker
const defaultIcon = L.divIcon({
  className: 'custom-div-icon',
  html: `
    <div style="position: relative; width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; transform: translate(-50%, -100%);">
      <div style="position: absolute; bottom: -4px; left: 50%; transform: translateX(-50%); width: 10px; height: 3px; background: rgba(0,0,0,0.2); border-radius: 50%; filter: blur(1px);"></div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 30px; height: 30px; fill: #94A3B8; stroke: #fff;">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="2" fill="#fff" stroke="none"></circle>
      </svg>
    </div>
  `,
  iconSize: [30, 30],
  iconAnchor: [0, 0],
  popupAnchor: [0, -30],
});

interface MapCenterProps {
  center: [number, number];
  zoom: number;
}

function ChangeView({ center, zoom }: MapCenterProps) {
  const map = useMap();
  useEffect(() => {
    map.flyTo(center, zoom, {
      duration: 1.5
    });
  }, [center, zoom, map]);
  return null;
}

interface MapProps {
  activeLocation: Location | null;
  onLocationSelect: (location: Location) => void;
}

export default function Map({ activeLocation, onLocationSelect }: MapProps) {
  const { t, language } = useAppContext();
  // Center roughly on Galata Tower/Golden Horn for a nice initial view of Istanbul
  const initialCenter: [number, number] = [41.0256, 28.9741];
  const initialZoom = 12;

  const center: [number, number] = activeLocation 
    ? [activeLocation.lat, activeLocation.lng] 
    : initialCenter;
  
  const zoom = activeLocation ? 16 : initialZoom;

  return (
    <div className="w-full h-full relative z-0 dark:[&_.leaflet-tile-pane]:invert dark:[&_.leaflet-tile-pane]:hue-rotate-180 transition-filters duration-500">
      <MapContainer 
        center={initialCenter} 
        zoom={initialZoom} 
        style={{ height: '100%', width: '100%' }}
        className="w-full h-full"
        zoomControl={false}
      >
        <ChangeView center={center} zoom={zoom} />
        <ZoomControl position="bottomright" />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        {locations.map((loc) => (
          <Marker 
            key={loc.id} 
            position={[loc.lat, loc.lng]}
            icon={activeLocation?.id === loc.id ? activeIcon : defaultIcon}
            eventHandlers={{
              click: () => onLocationSelect(loc),
            }}
          >
            <Popup>
              <div className="p-1 min-w-[200px] text-slate-900 border-none">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <h3 className="font-bold text-gray-900 leading-tight m-0 p-0">{loc.name}</h3>
                  <div className="bg-orange-100 text-orange-600 px-1.5 py-0.5 rounded text-xs font-bold flex items-center gap-1 shrink-0 m-0">
                    ★ {loc.rating}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-2 m-0 mt-1">{language === 'en' ? loc.enCategory || loc.category : loc.category}</p>
                <div className="text-xs text-gray-500 mb-2 border-t pt-2 border-gray-100 dark:border-gray-200">
                  <span className="block mb-1"><strong>{t('openAddress')}:</strong> {loc.address}</span>
                  {loc.phoneNumber && (
                    <span className="block text-gray-700 mb-1"><strong>{t('phone')}:</strong> {loc.phoneNumber}</span>
                  )}
                  {loc.workingHours && (
                    <span className="block text-blue-600"><strong>{t('hours')}:</strong> {loc.workingHours}</span>
                  )}
                </div>
                <img 
                  src={logoUrl} 
                  alt="Logo" 
                  className="w-full h-24 object-contain bg-white rounded-md mt-2 border border-gray-100 p-1 block"
                />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
