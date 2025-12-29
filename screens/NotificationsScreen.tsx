
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NotificationsScreen: React.FC = () => {
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'CẢNH BÁO: An ninh Nhà ga T1',
      msg: 'Phát hiện hành lý vô chủ tại Khu vực B. Đội an ninh đang xử lý.',
      time: 'Vừa xong',
      type: 'critical',
      icon: 'gpp_maybe',
      isRead: false
    },
    {
      id: 2,
      title: 'Cảnh báo thời tiết xấu',
      msg: 'Sương mù dày đặc dự kiến từ 14:00. Các chuyến bay có thể bị hoãn.',
      time: '12p trước',
      type: 'warning',
      icon: 'foggy',
      isRead: false
    },
    {
      id: 3,
      title: 'Thay đổi cổng: VJ582',
      msg: 'Chuyến bay đi Đà Nẵng đã chuyển sang Cổng 12.',
      time: '25p trước',
      type: 'info',
      icon: 'flight_takeoff',
      isRead: false
    }
  ]);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const [activeFilter, setActiveFilter] = useState('Tất cả');

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'Tất cả') return true;
    if (activeFilter === 'Khẩn cấp') return n.type === 'critical';
    if (activeFilter === 'Chuyến bay') return n.type === 'info' || n.type === 'warning';
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen bg-bg-light dark:bg-bg-dark">
      <header className="sticky top-0 z-20 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-md px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full active:scale-90 transition-transform">
            <span className="material-symbols-outlined font-bold">arrow_back</span>
          </button>
          <h1 className="text-xl font-black tracking-tight">Thông báo</h1>
        </div>
        <button 
          onClick={markAllRead}
          className="text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 bg-primary/5 rounded-lg active:opacity-50"
        >
          Đã đọc hết
        </button>
      </header>

      <div className="p-4 flex flex-col gap-5">
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {['Tất cả', 'Khẩn cấp', 'Chuyến bay', 'Hệ thống'].map((f) => (
            <button 
              key={f} 
              onClick={() => setActiveFilter(f)}
              className={`h-9 px-6 rounded-full text-[11px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                activeFilter === f 
                  ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                  : 'bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-700 text-slate-400'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between mt-2 mb-1 px-1">
          <h3 className="text-[10px] font-black uppercase tracking-[2px] text-slate-400">Gần đây nhất</h3>
          <span className="text-[9px] font-bold text-slate-300">{filteredNotifications.length} thông báo</span>
        </div>

        {filteredNotifications.length > 0 ? (
          <div className="flex flex-col gap-4">
            {filteredNotifications.map(n => (
              <div 
                key={n.id} 
                className={`p-5 rounded-3xl bg-white dark:bg-card-dark shadow-sm border-l-[6px] transition-all relative group ${
                  n.isRead ? 'opacity-60 grayscale-[0.3]' : 'opacity-100'
                } ${
                  n.type === 'critical' ? 'border-red-500' : n.type === 'warning' ? 'border-orange-500' : 'border-primary'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`size-12 shrink-0 rounded-2xl flex items-center justify-center ${
                        n.type === 'critical' ? 'bg-red-50 text-red-600' : n.type === 'warning' ? 'bg-orange-50 text-orange-600' : 'bg-blue-50 text-primary'
                    }`}>
                        <span className="material-symbols-outlined text-[24px]">{n.icon}</span>
                    </div>
                    <div className="flex flex-col gap-1.5 overflow-hidden">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-black text-slate-900 dark:text-white leading-tight">{n.title}</h4>
                          {!n.isRead && <span className="size-2 bg-primary rounded-full animate-pulse shrink-0"></span>}
                        </div>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed pr-2">{n.msg}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="text-[10px] font-black text-slate-300 uppercase">{n.time}</span>
                          <span className="text-[10px] font-black text-primary uppercase">Chi tiết</span>
                        </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeNotification(n.id)}
                    className="p-1 text-slate-200 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 opacity-20">
            <span className="material-symbols-outlined text-6xl mb-4">notifications_off</span>
            <p className="font-black uppercase tracking-widest text-sm">Không có thông báo mới</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsScreen;
