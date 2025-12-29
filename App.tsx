
import React, { useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import DashboardScreen from './screens/DashboardScreen';
import GateManagementScreen from './screens/GateManagementScreen';
import FlightDetailScreen from './screens/FlightDetailScreen';
import FlightEditScreen from './screens/FlightEditScreen';
import StaffManagementScreen from './screens/StaffManagementScreen';
import LoginScreen from './screens/LoginScreen';
import MapViewScreen from './screens/MapViewScreen';
import ReportsScreen from './screens/ReportsScreen';
import ActivityHistoryScreen from './screens/ActivityHistoryScreen';
import ULDManagementScreen from './screens/ULDManagementScreen';
import NotificationsScreen from './screens/NotificationsScreen';
import FlightScheduleScreen from './screens/FlightScheduleScreen';
import BottomNav from './components/BottomNav';

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simple authentication guard
  if (!isLoggedIn && location.pathname !== '/login') {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  // Paths that shouldn't show the bottom nav
  const hideNavPaths = ['/login', '/map', '/flight/edit', '/flight/add'];
  const showNav = !hideNavPaths.some(p => location.pathname.startsWith(p));

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-bg-light dark:bg-bg-dark shadow-2xl relative overflow-hidden">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-20">
        <Routes>
          <Route path="/" element={<DashboardScreen />} />
          <Route path="/login" element={<LoginScreen onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/gates" element={<GateManagementScreen />} />
          <Route path="/schedule" element={<FlightScheduleScreen />} />
          <Route path="/flight/detail/:id" element={<FlightDetailScreen />} />
          <Route path="/flight/edit/:id" element={<FlightEditScreen />} />
          <Route path="/flight/add" element={<FlightEditScreen mode="add" />} />
          <Route path="/staff" element={<StaffManagementScreen />} />
          <Route path="/map" element={<MapViewScreen />} />
          <Route path="/reports" element={<ReportsScreen />} />
          <Route path="/history" element={<ActivityHistoryScreen />} />
          <Route path="/uld" element={<ULDManagementScreen />} />
          <Route path="/notifications" element={<NotificationsScreen />} />
        </Routes>
      </div>

      {showNav && <BottomNav />}
      
      {/* Floating Action Button for some screens */}
      {location.pathname === '/gates' && (
        <button 
          onClick={() => navigate('/flight/add')}
          className="fixed bottom-24 right-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/40 active:scale-95 transition-transform z-50"
        >
          <span className="material-symbols-outlined text-[28px]">add</span>
        </button>
      )}
    </div>
  );
};

export default App;
