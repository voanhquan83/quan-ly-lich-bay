
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ACTIVITIES } from '../constants';

const ActivityHistoryScreen: React.FC = () => {
  const navigate = useNavigate();

  const getIcon = (type: string) => {
    switch (type) {
      case 'Status': return 'schedule';
      case 'Create': return 'add';
      case 'Gate': return 'meeting_room';
      case 'ULD': return 'luggage';
      default: return 'edit_note';
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'Status': return 'bg-orange-100 text-orange-600';
      case 'Create': return 'bg-blue-100 text-primary';
      case 'Gate': return 'bg-purple-100 text-purple-600';
      case 'ULD': return 'bg-teal-100 text-teal-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-light dark:bg-bg-dark">
      <header className="sticky top-0 z-20 bg-bg-light/95 dark:bg-bg-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full"><span className="material-symbols-outlined">arrow_back</span></button>
          <h2 className="text-xl font-bold">Hoạt động</h2>
        </div>
        <div className="flex gap-2">
           <button className="size-10 flex items-center justify-center rounded-full"><span className="material-symbols-outlined">search</span></button>
           <button className="size-10 flex items-center justify-center rounded-full text-primary"><span className="material-symbols-outlined">filter_list</span></button>
        </div>
      </header>

      <div className="p-4">
        <h3 className="text-xs font-bold uppercase tracking-widest text-secondary mb-6 pl-2">Hôm nay</h3>
        <div className="relative pl-6 space-y-8">
           <div className="absolute left-[31px] top-2 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800"></div>
           
           {ACTIVITIES.map((activity) => (
              <div key={activity.id} className="relative flex gap-4">
                 <div className="absolute -left-[14px] top-0 z-10 flex items-center justify-center size-10 rounded-full bg-white dark:bg-bg-dark ring-4 ring-bg-light dark:ring-bg-dark">
                    <div className={`size-8 rounded-full ${getColor(activity.type)} flex items-center justify-center`}>
                       <span className="material-symbols-outlined text-[18px]">{getIcon(activity.type)}</span>
                    </div>
                 </div>
                 
                 <div className="flex-1 bg-white dark:bg-card-dark p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm ml-4">
                    <div className="flex justify-between items-start mb-2">
                       <h4 className="text-sm font-bold">{activity.description}</h4>
                       <span className="text-[10px] text-secondary font-bold">{activity.time}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                       <img src={activity.avatar} className="size-5 rounded-full object-cover" alt="" />
                       <span className="text-[10px] font-bold text-secondary">{activity.user}</span>
                    </div>
                    {activity.details && (
                       <div className="bg-slate-50 dark:bg-bg-dark p-3 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300">
                          {activity.details}
                       </div>
                    )}
                 </div>
              </div>
           ))}
        </div>
        
        <div className="text-center py-8">
           <button className="text-sm font-bold text-primary">Xem thêm hoạt động cũ</button>
        </div>
      </div>
    </div>
  );
};

export default ActivityHistoryScreen;
