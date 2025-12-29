
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface MapFeature {
  id: string;
  type: 'aircraft' | 'gate' | 'service';
  label: string;
  status: string;
  top: string;
  left: string;
  rotation?: number;
  details: {
    title: string;
    subtitle: string;
    info1: string;
    info1Label: string;
    info2: string;
    info2Label: string;
    info3: string;
    info3Label: string;
    color: string;
  };
}

const MAP_FEATURES: MapFeature[] = [
  {
    id: 'VN256',
    type: 'aircraft',
    label: 'VN256',
    status: 'Đang lăn',
    top: '42%',
    left: '35%',
    rotation: 115,
    details: {
      title: 'VN256',
      subtitle: 'Vietnam Airlines • A321',
      info1: 'Đang lăn',
      info1Label: 'Trạng thái',
      info2: '12 kts',
      info2Label: 'Tốc độ',
      info3: 'G08',
      info3Label: 'Cửa đến',
      color: 'text-emerald-500'
    }
  },
  {
    id: 'QH102',
    type: 'aircraft',
    label: 'QH102',
    status: 'Tiếp cận',
    top: '15%',
    left: '85%',
    rotation: 255,
    details: {
      title: 'QH102',
      subtitle: 'Bamboo Airways • B787',
      info1: 'Hạ cánh',
      info1Label: 'Trạng thái',
      info2: '145 kts',
      info2Label: 'Tốc độ',
      info3: '14:45',
      info3Label: 'Dự kiến',
      color: 'text-blue-500'
    }
  },
  {
    id: 'G08',
    type: 'gate',
    label: 'Gate 08',
    status: 'Bận',
    top: '55%',
    left: '42%',
    details: {
      title: 'Cổng G08',
      subtitle: 'Nhà ga T2 - Quốc tế',
      info1: 'VN256',
      info1Label: 'Chuyến bay',
      info2: 'Chuẩn bị',
      info2Label: 'Trạng thái',
      info3: '172',
      info3Label: 'Khách',
      color: 'text-amber-500'
    }
  },
  {
    id: 'G12',
    type: 'gate',
    label: 'Gate 12',
    status: 'Trống',
    top: '55%',
    left: '48%',
    details: {
      title: 'Cổng G12',
      subtitle: 'Nhà ga T2 - Quốc tế',
      info1: '--',
      info1Label: 'Chuyến bay',
      info2: 'Sẵn sàng',
      info2Label: 'Trạng thái',
      info3: '15:10',
      info3Label: 'Kế hoạch',
      color: 'text-green-500'
    }
  },
  {
    id: 'SGN-FUEL',
    type: 'service',
    label: 'Fuel-01',
    status: 'Hoạt động',
    top: '62%',
    left: '43%',
    details: {
      title: 'Xe nhiên liệu 01',
      subtitle: 'Khu vực phục vụ T2',
      info1: 'Đang nạp',
      info1Label: 'Tình trạng',
      info2: 'G08',
      info2Label: 'Vị trí',
      info3: '82%',
      info3Label: 'Tiến độ',
      color: 'text-primary'
    }
  }
];

const MapViewScreen: React.FC = () => {
  const navigate = useNavigate();
  const [zoom, setZoom] = useState(1);
  const [activeFilter, setActiveFilter] = useState<'all' | 'aircraft' | 'gate' | 'service'>('all');
  const [selectedFeature, setSelectedFeature] = useState<MapFeature>(MAP_FEATURES[0]);
  const [viewMode, setViewMode] = useState<'satellite' | 'standard'>('standard');

  const handleZoom = (delta: number) => {
    setZoom(prev => Math.min(Math.max(prev + delta, 0.5), 3));
  };

  const filteredFeatures = MAP_FEATURES.filter(f => 
    activeFilter === 'all' || f.type === activeFilter
  );

  return (
    <div className="relative h-screen w-full bg-[#0b0e14] overflow-hidden text-white font-sans select-none">
      {/* Map Canvas Layer */}
      <div 
        className="absolute inset-0 z-0 transition-transform duration-700 ease-out flex items-center justify-center origin-center"
        style={{ transform: `scale(${zoom})` }}
      >
        {/* Real SGN Map Background */}
        <div className="absolute inset-0 w-[200%] h-[200%] -left-1/2 -top-1/2">
          {viewMode === 'satellite' ? (
            <div 
              className="w-full h-full bg-cover bg-center transition-opacity duration-500 opacity-60"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542202229-7d93c33f5d07?auto=format&fit=crop&q=80&w=2000")' }}
            ></div>
          ) : (
            <div className="w-full h-full bg-[#111827] relative">
              {/* Runway 07L/25R */}
              <div className="absolute top-[35%] left-[10%] w-[80%] h-12 bg-slate-800/80 border-y border-white/10 flex items-center justify-between px-10 -rotate-2">
                 <span className="text-white/20 font-black text-2xl tracking-widest">07L</span>
                 <div className="flex-1 h-1 border-t border-dashed border-white/20 mx-4"></div>
                 <span className="text-white/20 font-black text-2xl tracking-widest">25R</span>
              </div>
              {/* Runway 07C/25L */}
              <div className="absolute top-[45%] left-[10%] w-[80%] h-12 bg-slate-800/80 border-y border-white/10 flex items-center justify-between px-10 -rotate-2">
                 <span className="text-white/20 font-black text-2xl tracking-widest">07C</span>
                 <div className="flex-1 h-1 border-t border-dashed border-white/20 mx-4"></div>
                 <span className="text-white/20 font-black text-2xl tracking-widest">25L</span>
              </div>
              {/* Terminal Buildings Area */}
              <div className="absolute top-[60%] left-[30%] w-[40%] h-40 bg-slate-800/40 rounded-t-[100px] border-t border-x border-white/5">
                 <div className="absolute top-4 left-1/2 -translate-x-1/2 text-white/10 font-black text-4xl uppercase">Terminal 2</div>
              </div>
            </div>
          )}
        </div>

        {/* Radar Pulse Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,rgba(25,93,230,0.1)_90deg,transparent_91deg)] animate-[spin_4s_linear_infinite]"></div>
        </div>

        {/* Render Features Markers */}
        {filteredFeatures.map((feature) => (
          <div 
            key={feature.id}
            onClick={() => setSelectedFeature(feature)}
            className={`absolute flex flex-col items-center cursor-pointer transition-all duration-300 ${
              selectedFeature.id === feature.id ? 'z-30 scale-125' : 'z-20'
            }`}
            style={{ 
              top: feature.top, 
              left: feature.left,
              transform: feature.type === 'aircraft' ? `rotate(${feature.rotation}deg)` : 'none'
            }}
          >
            {/* Marker Icon */}
            <div className={`relative flex items-center justify-center h-10 w-10 rounded-full shadow-2xl transition-all ${
              selectedFeature.id === feature.id 
                ? 'bg-white text-primary ring-4 ring-primary/40' 
                : feature.type === 'aircraft' ? 'bg-primary text-white border border-white/20' : 
                  feature.type === 'gate' ? 'bg-amber-500 text-white' : 'bg-slate-600 text-white'
            }`}>
              <span className="material-symbols-outlined text-xl">
                {feature.type === 'aircraft' ? 'flight' : feature.type === 'gate' ? 'meeting_room' : 'local_shipping'}
              </span>
              {feature.type === 'aircraft' && (
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></div>
              )}
            </div>

            {/* Marker Label */}
            <div 
              className="mt-2 flex flex-col items-center bg-black/90 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 shadow-xl"
              style={{ transform: feature.type === 'aircraft' ? `rotate(${-feature.rotation!}deg)` : 'none' }}
            >
              <span className="text-[10px] font-black text-white leading-none">{feature.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Top Floating Controls */}
      <div className="absolute top-8 left-4 right-4 z-40 pointer-events-none flex flex-col gap-4">
        {/* Header bar */}
        <div className="flex items-center p-1.5 rounded-2xl bg-black/70 backdrop-blur-2xl border border-white/10 pointer-events-auto shadow-2xl">
          <button onClick={() => navigate(-1)} className="h-11 w-11 flex items-center justify-center text-white active:scale-90 transition-transform">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="flex-1 flex items-center px-4">
            <span className="material-symbols-outlined text-slate-500 mr-3 text-xl">search</span>
            <input 
              type="text" 
              placeholder="SGN Ops: Chuyến bay, Cổng..." 
              className="bg-transparent border-none focus:ring-0 text-sm font-bold h-11 w-full placeholder:text-slate-600" 
            />
          </div>
          <button className="h-11 w-11 text-primary active:rotate-45 transition-transform">
            <span className="material-symbols-outlined">tune</span>
          </button>
        </div>

        {/* Filter Tabs (Functional) */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pointer-events-auto">
          {[
            { id: 'all', label: 'Tất cả', icon: 'apps' },
            { id: 'aircraft', label: 'Máy bay', icon: 'flight' },
            { id: 'gate', label: 'Cổng', icon: 'meeting_room' },
            { id: 'service', label: 'Dịch vụ', icon: 'local_shipping' }
          ].map((tag) => (
            <button 
              key={tag.id} 
              onClick={() => setActiveFilter(tag.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border shadow-lg ${
                activeFilter === tag.id 
                  ? 'bg-primary border-primary text-white scale-105' 
                  : 'bg-slate-900/80 border-white/10 text-slate-400 hover:bg-slate-800'
              }`}
            >
               <span className="material-symbols-outlined text-sm filled">{tag.icon}</span>
               {tag.label}
            </button>
          ))}
        </div>
      </div>

      {/* Side Tools (Zoom, Mode, Reset) */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-40">
        <button 
          onClick={() => setViewMode(viewMode === 'satellite' ? 'standard' : 'satellite')}
          className={`h-12 w-12 flex items-center justify-center rounded-2xl backdrop-blur-xl border border-white/10 transition-all shadow-2xl ${
            viewMode === 'satellite' ? 'bg-primary text-white border-primary' : 'bg-slate-900/80 text-white'
          }`}
        >
          <span className="material-symbols-outlined">{viewMode === 'satellite' ? 'satellite' : 'map'}</span>
        </button>
        
        <div className="flex flex-col rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 overflow-hidden shadow-2xl">
          <button onClick={() => handleZoom(0.2)} className="h-12 w-12 flex items-center justify-center border-b border-white/5 active:bg-white/10"><span className="material-symbols-outlined">add</span></button>
          <button onClick={() => handleZoom(-0.2)} className="h-12 w-12 flex items-center justify-center active:bg-white/10"><span className="material-symbols-outlined">remove</span></button>
        </div>

        <button 
          onClick={() => { setZoom(1); setActiveFilter('all'); }}
          className="h-12 w-12 flex items-center justify-center rounded-2xl bg-slate-900/80 backdrop-blur-xl border border-white/10 text-primary active:scale-90 transition-transform shadow-2xl"
        >
          <span className="material-symbols-outlined filled">near_me</span>
        </button>
      </div>

      {/* Bottom Info Panel (Updates on selection) */}
      <div className={`absolute bottom-0 left-0 right-0 z-50 bg-[#161b22]/95 backdrop-blur-3xl border-t border-white/10 rounded-t-[40px] p-6 transition-all duration-500 transform ${selectedFeature ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="flex justify-center -mt-2 mb-6">
          <div className="w-12 h-1 bg-slate-700/50 rounded-full"></div>
        </div>

        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${
                selectedFeature.type === 'aircraft' ? 'bg-primary/20 text-primary' : 
                selectedFeature.type === 'gate' ? 'bg-amber-500/20 text-amber-500' : 'bg-slate-500/20 text-slate-400'
              }`}>
                {selectedFeature.type}
              </span>
              <span className="text-[11px] text-slate-500 font-bold uppercase">{selectedFeature.details.subtitle.split('•')[0]}</span>
            </div>
            <h2 className="text-3xl font-black tracking-tight">{selectedFeature.details.title}</h2>
            <p className="text-sm text-slate-400 mt-0.5 font-medium">{selectedFeature.details.subtitle}</p>
          </div>
          <div className={`size-14 rounded-2xl flex items-center justify-center shadow-xl ${
            selectedFeature.type === 'aircraft' ? 'bg-white text-primary' : 
            selectedFeature.type === 'gate' ? 'bg-amber-500 text-white' : 'bg-slate-700 text-white'
          }`}>
             <span className="material-symbols-outlined text-3xl">
                {selectedFeature.type === 'aircraft' ? 'airlines' : 
                 selectedFeature.type === 'gate' ? 'meeting_room' : 'local_shipping'}
             </span>
          </div>
        </div>
        
        {/* Info Stats Grid */}
        <div className="grid grid-cols-3 gap-2 border-y border-white/5 py-5 mb-8">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{selectedFeature.details.info1Label}</span>
            <span className={`text-sm font-black ${selectedFeature.details.color}`}>{selectedFeature.details.info1}</span>
          </div>
          <div className="flex flex-col gap-1 border-l border-white/5 pl-4">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{selectedFeature.details.info2Label}</span>
            <span className="text-sm font-black text-white">{selectedFeature.details.info2}</span>
          </div>
          <div className="flex flex-col gap-1 border-l border-white/5 pl-4">
            <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{selectedFeature.details.info3Label}</span>
            <span className="text-sm font-black text-white">{selectedFeature.details.info3}</span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-4 pb-4">
          <button className="h-14 rounded-2xl bg-white/5 text-sm font-bold border border-white/10 active:scale-95 transition-all">
            Xem Nhật Ký
          </button>
          <button className="h-14 rounded-2xl bg-primary text-white text-sm font-bold shadow-2xl shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-lg filled">videocam</span>
            Camera Live
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapViewScreen;
