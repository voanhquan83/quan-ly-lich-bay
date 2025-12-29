
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FLIGHTS } from '../constants';
import { FlightStatus } from '../types';

const FlightScheduleScreen: React.FC = () => {
  const navigate = useNavigate();
  const [tab, setTab] = useState<'departures' | 'arrivals'>('departures');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [sortBy, setSortBy] = useState<'time' | 'id' | 'gate'>('time');

  // Tạo danh sách 7 ngày
  const dates = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - 2 + i);
      return {
        day: d.toLocaleDateString('vi-VN', { weekday: 'short' }).replace('Th ', 'T'),
        date: d.getDate(),
        full: d
      };
    });
  }, []);

  const displayFlights = useMemo(() => {
    let list = tab === 'departures' 
      ? FLIGHTS.filter(f => f.origin === 'SGN') 
      : FLIGHTS.filter(f => f.destination === 'SGN');

    // Filter by search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(f => f.id.toLowerCase().includes(q) || f.airline.toLowerCase().includes(q) || f.gate?.toLowerCase().includes(q));
    }

    // Sort
    return list.sort((a, b) => {
      if (sortBy === 'time') {
        const timeA = tab === 'departures' ? a.scheduledDeparture : a.scheduledArrival;
        const timeB = tab === 'departures' ? b.scheduledDeparture : b.scheduledArrival;
        return timeA.localeCompare(timeB);
      }
      if (sortBy === 'id') return a.id.localeCompare(b.id);
      if (sortBy === 'gate') return (a.gate || '').localeCompare(b.gate || '');
      return 0;
    });
  }, [tab, searchQuery, sortBy]);

  const getStatusStyle = (status: FlightStatus) => {
    switch (status) {
      case 'Active': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'Boarding': return 'bg-primary/10 text-primary border-primary/20';
      case 'Delayed': return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'Cancelled': return 'bg-red-50 text-red-600 border-red-100';
      case 'Arrived': return 'bg-slate-100 text-slate-600 border-slate-200';
      case 'Taxiing': return 'bg-blue-50 text-blue-600 border-blue-100';
      default: return 'bg-gray-50 text-gray-500 border-gray-100';
    }
  };

  const getStatusText = (status: FlightStatus) => {
    switch (status) {
      case 'Active': return 'Đang bay';
      case 'Boarding': return 'Đang lên khách';
      case 'Delayed': return 'Chậm chuyến';
      case 'Cancelled': return 'Đã hủy';
      case 'Arrived': return 'Đã hạ cánh';
      case 'Taxiing': return 'Đang lăn';
      case 'Scheduled': return 'Đúng giờ';
      default: return status;
    }
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.target as HTMLImageElement;
    target.src = 'https://cdn-icons-png.flaticon.com/512/984/984233.png'; // Icon máy bay mặc định
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] dark:bg-bg-dark">
      <div className="sticky top-0 z-30 bg-[#f8f9fa] dark:bg-bg-dark border-b border-gray-100 dark:border-gray-800">
        <div className="px-4 pt-4 pb-3">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">Lịch bay SGN</h1>
            <button className="size-10 rounded-full bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-700 flex items-center justify-center">
              <span className="material-symbols-outlined text-slate-600">tune</span>
            </button>
          </div>

          {/* Date Picker Strip */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-4 mb-2">
            {dates.map((d) => (
              <button 
                key={d.date}
                onClick={() => setSelectedDate(d.date)}
                className={`flex flex-col items-center justify-center min-w-[50px] h-16 rounded-2xl transition-all ${
                  selectedDate === d.date 
                    ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105' 
                    : 'bg-white dark:bg-card-dark text-slate-400 border border-gray-50 dark:border-gray-800'
                }`}
              >
                <span className="text-[10px] font-black uppercase mb-1">{d.day}</span>
                <span className="text-base font-black">{d.date}</span>
              </button>
            ))}
          </div>

          <div className="relative mb-5">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">search</span>
            <input 
              type="text" 
              placeholder="Tìm chuyến bay, hãng, cổng..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-800 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-primary shadow-sm"
            />
          </div>

          <div className="flex p-1 bg-slate-200/50 dark:bg-gray-800 rounded-2xl">
            <button 
              onClick={() => setTab('departures')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                tab === 'departures' ? 'bg-white dark:bg-gray-700 text-primary shadow-sm' : 'text-slate-500'
              }`}
            >
              <span className="material-symbols-outlined text-lg">flight_takeoff</span>
              ĐI (SGN Out)
            </button>
            <button 
              onClick={() => setTab('arrivals')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                tab === 'arrivals' ? 'bg-white dark:bg-gray-700 text-primary shadow-sm' : 'text-slate-500'
              }`}
            >
              <span className="material-symbols-outlined text-lg">flight_land</span>
              ĐẾN (SGN In)
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-6 pb-28">
        <div className="flex items-center justify-between mb-5 px-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            {displayFlights.length} chuyến bay • {selectedDate} thg 5
          </span>
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-transparent border-none text-[10px] font-black text-primary uppercase tracking-widest focus:ring-0 p-0"
          >
            <option value="time">Giờ bay</option>
            <option value="id">Số hiệu</option>
            <option value="gate">Số cửa</option>
          </select>
        </div>

        <div className="space-y-4">
          {displayFlights.length > 0 ? displayFlights.map((flight) => (
            <div 
              key={flight.id}
              onClick={() => navigate(`/flight/detail/${flight.id}`)}
              className="bg-white dark:bg-card-dark rounded-[24px] p-5 border border-gray-50 dark:border-gray-800 shadow-sm active:scale-[0.98] transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-xl bg-slate-50 dark:bg-slate-800 p-1.5 border border-slate-100 dark:border-slate-700 flex items-center justify-center overflow-hidden">
                    <img 
                      src={flight.airlineLogo} 
                      alt={flight.airline} 
                      className="w-full h-full object-contain" 
                      onError={handleImageError}
                    />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-900 dark:text-white">{flight.id}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{flight.airline}</p>
                  </div>
                </div>
                <div className={`px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wider ${getStatusStyle(flight.status)}`}>
                  {getStatusText(flight.status)}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-black text-slate-900 dark:text-white">
                      {tab === 'departures' ? flight.scheduledDeparture : flight.scheduledArrival}
                    </span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-widest">
                    {flight.origin} ➔ {flight.destination}
                  </p>
                </div>

                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-1 text-slate-900 dark:text-white">
                    <span className="material-symbols-outlined text-lg opacity-30">meeting_room</span>
                    <span className="text-xl font-black">{flight.gate || '--'}</span>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-widest">Gate</p>
                </div>
              </div>
            </div>
          )) : (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
              <span className="material-symbols-outlined text-6xl opacity-10 mb-4">flight_off</span>
              <p className="font-bold">Không có chuyến bay phù hợp</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightScheduleScreen;
