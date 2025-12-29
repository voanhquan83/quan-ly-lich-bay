
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FLIGHTS } from '../constants';
import { FlightStatus } from '../types';

const FlightDetailScreen: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(FLIGHTS.find(f => f.id === id) || FLIGHTS[0]);
  const [showStatusMenu, setShowStatusMenu] = useState(false);

  const statuses: FlightStatus[] = ['Scheduled', 'Boarding', 'Taxiing', 'Active', 'Arrived', 'Delayed', 'Cancelled'];

  const handleStatusChange = (newStatus: FlightStatus) => {
    setFlight(prev => ({ ...prev, status: newStatus }));
    setShowStatusMenu(false);
  };

  const getStatusStyle = (status: FlightStatus) => {
    switch (status) {
      case 'Active': return 'bg-emerald-50 border-emerald-200 text-emerald-700';
      case 'Delayed': return 'bg-amber-50 border-amber-200 text-amber-700';
      case 'Cancelled': return 'bg-red-50 border-red-200 text-red-700';
      case 'Boarding': return 'bg-primary/10 border-primary/20 text-primary';
      default: return 'bg-slate-50 border-slate-200 text-slate-700';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-light dark:bg-bg-dark">
      <header className="sticky top-0 z-20 bg-bg-light/90 dark:bg-bg-dark/90 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-gray-200 dark:border-gray-800">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-start"><span className="material-symbols-outlined">arrow_back</span></button>
        <h2 className="text-lg font-bold">Chi tiết {flight.id}</h2>
        <button onClick={() => navigate(`/flight/edit/${flight.id}`)} className="size-10 flex items-center justify-end"><span className="material-symbols-outlined">edit</span></button>
      </header>

      <main className="flex-1 p-4 flex flex-col gap-6 pb-32">
        <section className="bg-white dark:bg-card-dark rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-gray-800">
           <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                 <div className="size-12 rounded-full bg-slate-100 flex items-center justify-center p-2 border border-slate-200">
                    <img src={flight.airlineLogo} className="w-full h-full object-contain" alt={flight.airline} />
                 </div>
                 <div>
                    <p className="text-xs font-medium text-secondary">{flight.airline}</p>
                    <h3 className="text-xl font-bold">{flight.id}</h3>
                 </div>
              </div>
              <div className={`px-3 py-1 rounded-full flex items-center gap-1.5 border ${getStatusStyle(flight.status)}`}>
                 <span className="relative flex h-2 w-2">
                    {flight.status === 'Active' && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${flight.status === 'Active' ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                 </span>
                 <p className="text-[10px] font-bold uppercase tracking-wider">{flight.status}</p>
              </div>
           </div>

           <div className="flex items-center justify-between">
              <div className="text-center w-1/3">
                 <p className="text-3xl font-extrabold">{flight.origin}</p>
                 <p className="text-[10px] font-bold text-secondary uppercase mt-1">Khởi hành</p>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center relative px-2">
                 <div className="w-full h-[2px] bg-slate-200 dark:bg-slate-700 relative">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-card-dark p-1">
                       <span className="material-symbols-outlined text-primary rotate-90 text-[20px]">flight</span>
                    </div>
                 </div>
              </div>
              <div className="text-center w-1/3">
                 <p className="text-3xl font-extrabold">{flight.destination}</p>
                 <p className="text-[10px] font-bold text-secondary uppercase mt-1">Điểm đến</p>
              </div>
           </div>
        </section>

        <section className="bg-white dark:bg-card-dark rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 divide-y dark:divide-gray-800">
           <div className="grid grid-cols-2 divide-x dark:divide-gray-800">
              <div className="p-4">
                 <p className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Cửa (Gate)</p>
                 <p className="text-xl font-bold">{flight.gate}</p>
              </div>
              <div className="p-4">
                 <p className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-1">Nhà ga</p>
                 <p className="text-xl font-bold">{flight.terminal}</p>
              </div>
           </div>
        </section>
      </main>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/95 dark:bg-card-dark/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 p-4 pb-8 z-30">
        <button 
          onClick={() => setShowStatusMenu(true)}
          className="w-full h-14 rounded-2xl bg-primary text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-primary/30 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span className="material-symbols-outlined">sync_alt</span>
          Cập nhật trạng thái
        </button>
      </div>

      {showStatusMenu && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
           <div className="absolute inset-0 bg-black/60" onClick={() => setShowStatusMenu(false)}></div>
           <div className="relative w-full max-w-md bg-white dark:bg-card-dark rounded-t-[32px] p-6 shadow-2xl animate-slide-up">
              <div className="w-12 h-1.5 bg-slate-200 dark:bg-gray-800 rounded-full mx-auto mb-6"></div>
              <h3 className="text-lg font-black text-center mb-6">Chọn trạng thái mới</h3>
              <div className="grid grid-cols-1 gap-2">
                 {statuses.map(s => (
                    <button 
                      key={s} 
                      onClick={() => handleStatusChange(s)}
                      className={`h-14 w-full rounded-2xl flex items-center px-6 text-sm font-bold transition-all ${
                        flight.status === s ? 'bg-primary text-white' : 'bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                       {s}
                       {flight.status === s && <span className="material-symbols-outlined ml-auto">check_circle</span>}
                    </button>
                 ))}
              </div>
           </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default FlightDetailScreen;
