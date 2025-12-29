
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { GATES } from '../constants';
import { GateStatus } from '../types';

const GateManagementScreen: React.FC = () => {
  const navigate = useNavigate();
  const [terminal, setTerminal] = useState<'T1' | 'T2'>('T1');
  const [filter, setFilter] = useState<GateStatus | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredGates = useMemo(() => {
    return GATES.filter(g => {
      const matchTerminal = g.terminal === terminal;
      const matchStatus = filter === 'All' || g.status === filter;
      const matchSearch = searchQuery === '' || 
        g.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
        (g.currentFlightId && g.currentFlightId.toLowerCase().includes(searchQuery.toLowerCase()));
      
      return matchTerminal && matchStatus && matchSearch;
    });
  }, [terminal, filter, searchQuery]);

  const statusLabels: Record<GateStatus, string> = {
    'Occupied': 'ĐÃ DÙNG',
    'Available': 'TRỐNG',
    'Maintenance': 'BẢO TRÌ',
    'Delayed': 'TRỄ'
  };

  const statusColors: Record<GateStatus, string> = {
    'Occupied': 'bg-[#e7f0ff] text-[#195de6]',
    'Available': 'bg-[#e6f9f0] text-[#00b341]',
    'Maintenance': 'bg-gray-100 text-gray-500',
    'Delayed': 'bg-[#fff4e6] text-[#ff922b]'
  };

  return (
    <div className="flex flex-col h-full bg-[#f8f9fa] dark:bg-bg-dark">
      <div className="sticky top-0 z-30 bg-[#f8f9fa] dark:bg-bg-dark border-b border-gray-100 dark:border-gray-800">
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center justify-between mb-5">
            <button onClick={() => navigate(-1)} className="p-2 -ml-2">
              <span className="material-symbols-outlined text-slate-900 dark:text-white font-bold">arrow_back</span>
            </button>
            <h2 className="text-lg font-bold text-slate-800 dark:text-white">Quản lý cổng/sân đỗ</h2>
            <button className="p-2 -mr-2">
              <span className="material-symbols-outlined text-slate-900 dark:text-white font-bold">filter_list</span>
            </button>
          </div>

          <div className="relative mb-5">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 text-[22px]">search</span>
            <input 
              type="text" 
              placeholder="Tìm cổng hoặc chuyến bay..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-800 rounded-2xl text-[15px] focus:ring-2 focus:ring-primary shadow-sm"
            />
          </div>

          <div className="flex h-12 items-center justify-center rounded-2xl bg-[#e9ecef] dark:bg-gray-800 p-1.5 mb-4">
            <button 
              onClick={() => setTerminal('T1')}
              className={`flex-1 h-full rounded-xl text-[14px] font-bold transition-all duration-200 ${terminal === 'T1' ? 'bg-white dark:bg-gray-700 text-[#195de6] shadow-sm' : 'text-slate-500'}`}
            >
              T1 - Quốc nội
            </button>
            <button 
              onClick={() => setTerminal('T2')}
              className={`flex-1 h-full rounded-xl text-[14px] font-bold transition-all duration-200 ${terminal === 'T2' ? 'bg-white dark:bg-gray-700 text-[#195de6] shadow-sm' : 'text-slate-500'}`}
            >
              T2 - Quốc tế
            </button>
          </div>

          <div className="flex gap-2 pb-3 overflow-x-auto no-scrollbar">
            {['All', 'Available', 'Occupied', 'Maintenance', 'Delayed'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f as any)}
                className={`flex h-9 shrink-0 items-center justify-center px-6 rounded-full text-[13px] font-bold transition-all ${
                  filter === f 
                    ? 'bg-[#195de6] text-white shadow-md' 
                    : 'bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-700 text-slate-500'
                }`}
              >
                {f === 'All' ? 'Tất cả' : f === 'Available' ? 'Trống' : f === 'Occupied' ? 'Đã dùng' : f === 'Maintenance' ? 'Bảo trì' : 'Trễ'}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 pb-24 pt-4 flex-1">
        <h3 className="text-[11px] font-bold uppercase tracking-[1px] text-slate-400 mb-5 ml-1">Khu vực {terminal === 'T1' ? 'A' : 'C'} - Sảnh đỗ</h3>
        
        <div className="grid grid-cols-2 gap-4">
          {filteredGates.map(gate => (
            <div 
              key={gate.id}
              onClick={() => gate.currentFlightId && navigate(`/flight/detail/${gate.currentFlightId}`)}
              className="relative flex flex-col justify-between rounded-[32px] bg-white dark:bg-card-dark p-6 shadow-sm border border-gray-50 dark:border-gray-800 active:scale-95 transition-all duration-150 cursor-pointer min-h-[160px]"
            >
              <div className="flex justify-between items-start gap-1">
                <div className="flex flex-col">
                  <h4 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
                    {gate.id.split('-')[1]}
                  </h4>
                  <p className="text-[10px] font-black text-slate-400">{gate.id.split('-')[0]}</p>
                </div>
                <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-[10px] font-extrabold tracking-wider whitespace-nowrap ${statusColors[gate.status]}`}>
                  {statusLabels[gate.status]}
                </span>
              </div>
              
              <div className="mt-4">
                {gate.status === 'Available' ? (
                  <p className="text-[13px] font-medium text-slate-400">Sẵn sàng</p>
                ) : (
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <div className="size-6 bg-[#195de6]/10 rounded-md flex items-center justify-center">
                         <span className="material-symbols-outlined text-[#195de6] text-[16px] filled">airlines</span>
                      </div>
                      <span className="text-base font-black text-slate-900 dark:text-white">{gate.currentFlightId || '--'}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GateManagementScreen;
