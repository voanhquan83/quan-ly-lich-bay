
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const BottomNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: 'Tổng quan', icon: 'dashboard', path: '/' },
    { label: 'Cổng & Sân', icon: 'meeting_room', path: '/gates' },
    { label: 'Lịch bay', icon: 'calendar_month', path: '/schedule' },
    { label: 'Cài đặt', icon: 'settings', path: '/staff' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white dark:bg-card-dark border-t border-gray-200 dark:border-gray-800 pb-safe pt-2 px-6 flex justify-between items-center z-40 h-[75px]">
      {navItems.map((item) => (
        <button
          key={item.path}
          onClick={() => navigate(item.path)}
          className={`flex flex-col items-center gap-1 transition-colors ${
            location.pathname === item.path ? 'text-primary' : 'text-secondary'
          }`}
        >
          <span className={`material-symbols-outlined text-[24px] ${location.pathname === item.path ? 'filled' : ''}`}>
            {item.icon}
          </span>
          <span className="text-[10px] font-medium">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNav;
