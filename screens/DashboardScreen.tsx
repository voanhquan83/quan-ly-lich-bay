
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FLIGHTS, ACTIVITIES } from '../constants';

const DashboardScreen: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined filled">account_circle</span>
          </div>
          <div>
            <p className="text-xs text-secondary font-medium">Xin chào, Admin</p>
            <h1 className="text-lg font-bold">Tổng quan</h1>
          </div>
        </div>
        <button 
          onClick={() => navigate('/notifications')}
          className="size-10 flex items-center justify-center rounded-full bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-800 relative"
        >
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border border-white dark:border-card-dark"></span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 gap-4">
        <div onClick={() => navigate('/reports')} className="col-span-2 bg-white dark:bg-card-dark p-5 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm flex items-center justify-between cursor-pointer">
          <div>
            <p className="text-sm text-secondary font-medium mb-1">Tổng chuyến bay</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold">142</h3>
              <span className="text-xs font-bold text-green-600 bg-green-100 dark:bg-green-900/30 px-1.5 py-0.5 rounded flex items-center">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> 5%
              </span>
            </div>
          </div>
          <div className="size-12 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined">flight_takeoff</span>
          </div>
        </div>
        
        <div className="bg-white dark:bg-card-dark p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <p className="text-xs text-secondary font-medium mb-2">Đúng giờ</p>
          <p className="text-2xl font-bold text-primary">88.5%</p>
          <p className="text-[10px] text-green-600 font-medium mt-1">+1.2% vs yesterday</p>
        </div>
        
        <div className="bg-white dark:bg-card-dark p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
          <p className="text-xs text-secondary font-medium mb-2">Đã hủy</p>
          <p className="text-2xl font-bold text-red-500">2</p>
          <p className="text-[10px] text-red-400 font-medium mt-1">-0.5% vs yesterday</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { icon: 'map', label: 'Bản đồ', path: '/map', color: 'bg-emerald-500' },
          { icon: 'inventory_2', label: 'Kho ULD', path: '/uld', color: 'bg-amber-500' },
          { icon: 'person', label: 'Nhân sự', path: '/staff', color: 'bg-purple-500' },
        ].map(action => (
          <button 
            key={action.path}
            onClick={() => navigate(action.path)}
            className="flex flex-col items-center gap-2 p-3 bg-white dark:bg-card-dark rounded-xl shadow-sm border border-gray-100 dark:border-gray-800 transition-transform active:scale-95"
          >
            <div className={`size-10 rounded-full ${action.color} flex items-center justify-center text-white`}>
              <span className="material-symbols-outlined text-[20px]">{action.icon}</span>
            </div>
            <span className="text-[10px] font-bold text-secondary uppercase">{action.label}</span>
          </button>
        ))}
      </div>

      {/* Recent Activity */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h3 className="text-lg font-bold">Hoạt động gần đây</h3>
          <button onClick={() => navigate('/history')} className="text-sm font-semibold text-primary">Tất cả</button>
        </div>
        <div className="flex flex-col gap-3">
          {ACTIVITIES.slice(0, 3).map(activity => (
            <div key={activity.id} className="flex gap-4 p-3 bg-white dark:bg-card-dark rounded-xl border border-gray-100 dark:border-gray-800">
              <img src={activity.avatar} className="size-10 rounded-full object-cover" alt="" />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <p className="text-sm font-bold">{activity.description}</p>
                  <span className="text-[10px] text-secondary">{activity.time}</span>
                </div>
                <p className="text-xs text-secondary mt-1">{activity.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardScreen;
