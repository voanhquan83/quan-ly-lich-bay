
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { STAFF_LIST } from '../constants';

const StaffManagementScreen: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Quản trị viên', 'Điều phối bay', 'Quản lý cổng', 'Người xem'];

  return (
    <div className="flex flex-col min-h-screen bg-bg-light dark:bg-bg-dark">
      <header className="sticky top-0 z-20 bg-bg-light/95 dark:bg-bg-dark/95 backdrop-blur-md px-4 pt-4 pb-2 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-3">
              <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors">
                <span className="material-symbols-outlined">arrow_back</span>
              </button>
              <h2 className="text-xl font-bold tracking-tight">Nhân viên</h2>
           </div>
           <button className="size-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all">
              <span className="material-symbols-outlined">add</span>
           </button>
        </div>
        
        <div className="relative mb-2">
           <span className="absolute left-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-secondary text-[20px]">search</span>
           <input 
             type="text" 
             placeholder="Tìm tên, mã nhân viên..." 
             className="w-full h-11 bg-gray-200/50 dark:bg-gray-800/50 border-none rounded-xl pl-10 pr-4 text-sm font-medium focus:ring-primary" 
           />
           <button className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-md bg-slate-300/50 text-secondary">
              <span className="material-symbols-outlined text-sm">tune</span>
           </button>
        </div>
      </header>

      {/* Chips */}
      <div className="flex gap-2 p-4 overflow-x-auto no-scrollbar border-b border-gray-200/50 dark:border-gray-800/50">
        {filters.map(f => (
          <button 
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`flex h-8 shrink-0 items-center justify-center px-4 rounded-full text-xs font-bold transition-all ${
              activeFilter === f ? 'bg-primary text-white shadow-md' : 'bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 text-secondary'
            }`}
          >
            {f === 'All' ? 'Tất cả' : f}
          </button>
        ))}
      </div>

      <main className="p-4 flex flex-col gap-4 pb-24">
        <div className="flex items-center justify-between px-1">
           <h3 className="text-[10px] font-bold uppercase tracking-widest text-secondary">Danh sách nhân viên (24)</h3>
           <span className="text-[10px] font-bold text-primary cursor-pointer uppercase tracking-widest">Sắp xếp: Mới nhất</span>
        </div>

        {STAFF_LIST.map(staff => (
          <div key={staff.id} className="bg-white dark:bg-card-dark p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm transition-transform active:scale-[0.99] cursor-pointer">
            <div className="flex items-start justify-between">
               <div className="flex gap-4">
                  <div className="relative">
                    <img src={staff.avatar} className="size-12 rounded-full object-cover border-2 border-white dark:border-slate-800" alt="" />
                    <span className={`absolute bottom-0 right-0 size-3 rounded-full border-2 border-white dark:border-slate-800 ${staff.status === 'Online' ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-base font-bold leading-tight">{staff.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                       <span className="text-[10px] font-bold text-secondary">ID: {staff.id}</span>
                       <span className="size-1 bg-gray-300 dark:bg-gray-600 rounded-full"></span>
                       <span className="text-[10px] font-bold text-secondary truncate max-w-[120px]">{staff.email}</span>
                    </div>
                  </div>
               </div>
               <button className="text-secondary"><span className="material-symbols-outlined">more_vert</span></button>
            </div>
            <div className="flex items-center gap-2 mt-4">
               <span className="inline-flex items-center rounded-lg bg-purple-50 dark:bg-purple-900/20 px-2 py-1 text-[10px] font-bold text-purple-700 dark:text-purple-300 ring-1 ring-inset ring-purple-700/10">
                  <span className="material-symbols-outlined text-[14px] mr-1">admin_panel_settings</span>
                  {staff.role}
               </span>
               <span className={`inline-flex items-center rounded-lg px-2 py-1 text-[10px] font-bold ring-1 ring-inset ${
                 staff.status === 'Online' ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-slate-50 text-slate-600 ring-slate-500/10'
               }`}>
                  {staff.status === 'Online' ? 'Hoạt động' : 'Ngoại tuyến'}
               </span>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default StaffManagementScreen;
