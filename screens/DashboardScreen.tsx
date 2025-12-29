
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FLIGHTS, GATES, ACTIVITIES } from '../constants';

const DashboardScreen: React.FC = () => {
  const navigate = useNavigate();

  const totalFlights = FLIGHTS.length;
  const onTimeFlights = FLIGHTS.filter(f => f.status !== 'Delayed' && f.status !== 'Cancelled').length;
  const otp = totalFlights > 0 ? ((onTimeFlights / totalFlights) * 100).toFixed(1) : "0";
  const cancelledFlights = FLIGHTS.filter(f => f.status === 'Cancelled').length;

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
            <span className="material-symbols-outlined filled">account_circle</span>
          </div>
          <div>
            <p className="text-[10px] text-secondary font-black uppercase tracking-widest leading-none mb-1">Cán bộ trực ban</p>
            <h1 className="text-lg font-black text-slate-900 dark:text-white">Admin SGN</h1>
          </div>
        </div>
        <button 
          onClick={() => navigate('/notifications')}
          className="size-10 flex items-center justify-center rounded-full bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-800 relative shadow-sm"
        >
          <span className="material-symbols-outlined text-slate-600 dark:text-slate-300">notifications</span>
          <span className="absolute top-2.5 right-2.5 size-2 bg-red-500 rounded-full border border-white dark:border-card-dark"></span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div onClick={() => navigate('/schedule')} className="col-span-2 bg-white dark:bg-card-dark p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between cursor-pointer active:scale-[0.98] transition-all">
          <div>
            <p className="text-[10px] text-secondary font-black uppercase tracking-widest mb-2">Tổng chuyến bay trong ngày</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-4xl font-black text-slate-900 dark:text-white">{totalFlights}</h3>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-lg flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> 12%
              </span>
            </div>
          </div>
          <div className="size-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-3xl filled">flight_takeoff</span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-card-dark p-5 rounded-[28px] border border-gray-100 dark:border-gray-800 shadow-sm">
          <p className="text-[10px] text-secondary font-black uppercase tracking-widest mb-3">Chỉ số OTP</p>
          <p className="text-3xl font-black text-primary">{otp}%</p>
          <div className="h-1.5 w-full bg-slate-100 dark:bg-gray-800 rounded-full mt-3 overflow-hidden">
             <div className="h-full bg-primary" style={{width: `${otp}%`}}></div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-card-dark p-5 rounded-[28px] border border-gray-100 dark:border-gray-800 shadow-sm">
          <p className="text-[10px] text-secondary font-black uppercase tracking-widest mb-3">Đã hủy</p>
          <p className="text-3xl font-black text-red-500">{cancelledFlights}</p>
          <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase">Yêu cầu xác minh</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: 'map', label: 'Bản đồ', path: '/map', color: 'bg-emerald-500 shadow-emerald-200' },
          { icon: 'inventory_2', label: 'Kho ULD', path: '/uld', color: 'bg-amber-500 shadow-amber-200' },
          { icon: 'person', label: 'Nhân sự', path: '/staff', color: 'bg-indigo-500 shadow-indigo-200' },
        ].map(action => (
          <button 
            key={action.path}
            onClick={() => navigate(action.path)}
            className="flex flex-col items-center gap-2.5 p-4 bg-white dark:bg-card-dark rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 transition-all active:scale-95"
          >
            <div className={`size-12 rounded-2xl ${action.color} flex items-center justify-center text-white shadow-lg`}>
              <span className="material-symbols-outlined text-[24px] filled">{action.icon}</span>
            </div>
            <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-tighter">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="pb-10">
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-base font-black uppercase tracking-tight">Hoạt động gần đây</h3>
          <button onClick={() => navigate('/history')} className="text-xs font-black text-primary uppercase tracking-widest">Tất cả</button>
        </div>
        <div className="flex flex-col gap-3">
          {ACTIVITIES.slice(0, 4).map(activity => (
            <div key={activity.id} className="flex gap-4 p-4 bg-white dark:bg-card-dark rounded-3xl border border-gray-50 dark:border-gray-800 shadow-sm items-center">
              <div className="relative">
                <img src={activity.avatar} className="size-10 rounded-full object-cover border-2 border-slate-50 shadow-sm" alt="" />
                <div className="absolute -bottom-1 -right-1 size-5 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm">
                   <span className="material-symbols-outlined text-[10px] text-primary filled">
                      {activity.type === 'Status' ? 'sync' : activity.type === 'Gate' ? 'meeting_room' : 'add'}
                   </span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-baseline mb-0.5">
                  <p className="text-sm font-black text-slate-900 dark:text-white">{activity.description}</p>
                  <span className="text-[9px] font-bold text-slate-400 uppercase">{activity.time}</span>
                </div>
                <p className="text-xs font-medium text-slate-400 line-clamp-1">{activity.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
