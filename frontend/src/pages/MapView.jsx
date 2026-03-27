import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Shield, Navigation, Info, Zap, Target } from 'lucide-react';
import L from 'leaflet';

// [Policed-Theme Markers]
const createTowerIcon = (color) => L.divIcon({
  html: `<div style="background-color: ${color}; width: 12px; height: 12px; border: 2px solid white; border-radius: 50%; box-shadow: 0 0 10px ${color}"></div>`,
  className: 'custom-tower-icon',
});

const locations = [
  { id: 1, name: 'Mumbai Tower B-4', coords: [19.0760, 72.8777], activity: 'Critical', towerId: 'CID-9912', carrier: 'Telco Global' },
  { id: 2, name: 'Delhi Cell Site 02', coords: [28.6139, 77.2090], activity: 'Warning', towerId: 'CID-4402', carrier: 'Sky Net' },
  { id: 3, name: 'Bangalore Hub', coords: [12.9716, 77.5946], activity: 'Normal', towerId: 'CID-2210', carrier: 'Prime Connect' },
];

const MapView = () => {
  const pathCoordinates = locations.map(l => l.coords);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-orange-500 p-3 rounded-2xl shadow-lg shadow-orange-500/20">
            <Target className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Geospatial Intelligence</h1>
            <p className="text-slate-500 text-sm font-medium">Mapping cell tower locations and suspect movement patterns.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 h-[650px] rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden relative z-0">
          <MapContainer center={[20.5937, 78.9629]} zoom={5} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Polyline positions={pathCoordinates} pathOptions={{ color: '#f97316', dashArray: '10, 10', weight: 2 }} />
            {locations.map((loc) => (
              <React.Fragment key={loc.id}>
                <Marker position={loc.coords} icon={createTowerIcon(loc.activity === 'Critical' ? '#ef4444' : '#f97316')}>
                  <Popup>
                    <div className="p-2 min-w-[150px]">
                      <p className="font-bold text-slate-900 text-sm border-b pb-1 mb-2">{loc.name}</p>
                      <div className="space-y-1">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Tower ID: <span className="text-slate-700">{loc.towerId}</span></p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Carrier: <span className="text-slate-700">{loc.carrier}</span></p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Status: <span className={loc.activity === 'Critical' ? 'text-rose-500' : 'text-orange-500'}>{loc.activity}</span></p>
                      </div>
                    </div>
                  </Popup>
                </Marker>
                <Circle center={loc.coords} radius={80000} pathOptions={{ color: loc.activity === 'Critical' ? '#ef4444' : '#f97316', fillOpacity: 0.1 }} />
              </React.Fragment>
            ))}
          </MapContainer>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 text-white p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
            <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
              <Zap size={20} className="text-orange-500" />
              Movement Insights
            </h3>
            <div className="space-y-6">
              {locations.map(loc => (
                <div key={loc.id} className="relative pl-6 border-l-2 border-slate-800">
                  <div className={`absolute -left-[6px] top-1 w-2.5 h-2.5 rounded-full border-2 border-slate-900 ${loc.activity === 'Critical' ? 'bg-rose-500' : 'bg-orange-500'}`}></div>
                  <p className="text-xs font-bold text-white mb-1 uppercase tracking-wider">{loc.name}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Tower Seq: {loc.towerId}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl">
             <div className="flex items-center gap-2 mb-4">
               <Shield size={18} className="text-orange-600" />
               <h4 className="font-bold text-slate-900 text-sm">Active Geofencing</h4>
             </div>
             <p className="text-xs text-slate-500 leading-relaxed mb-6 font-medium">Real-time alerts will trigger if the target IMSI crosses specified terminal zones.</p>
             <button className="w-full py-4 bg-slate-50 text-orange-600 rounded-2xl text-xs font-extrabold uppercase tracking-widest hover:bg-orange-50 transition-all border border-slate-100">
               Configure Precincts
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
