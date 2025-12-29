
import React, { useState } from 'react';

interface Props {
  onLogin: () => void;
}

const LoginScreen: React.FC<Props> = ({ onLogin }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanStatus, setScanStatus] = useState<'scanning' | 'success' | 'none'>('none');

  const handleFaceID = () => {
    setIsScanning(true);
    setScanStatus('scanning');
    
    // Giả lập quá trình quét 1.5 giây
    setTimeout(() => {
      setScanStatus('success');
      setTimeout(() => {
        onLogin();
      }, 800);
    }, 1500);
  };

  return (
    <div className="h-screen flex flex-col justify-between bg-bg-light dark:bg-bg-dark overflow-hidden">
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <div className="flex items-center justify-between px-4 py-4 sticky top-0 bg-bg-light/80 backdrop-blur-md z-10">
          <div className="size-10 rounded-full bg-white dark:bg-card-dark shadow-sm border border-gray-100 dark:border-gray-800 flex items-center justify-center cursor-pointer active:scale-95 transition-transform">
             <span className="material-symbols-outlined text-slate-900 dark:text-white">arrow_back</span>
          </div>
          <div className="text-[10px] font-bold text-primary tracking-widest uppercase">Staff Portal</div>
        </div>

        {/* Hero Section */}
        <div className="px-4 pb-4">
           <div className="relative h-[220px] rounded-2xl overflow-hidden shadow-xl bg-slate-900">
             <img 
               src="https://images.unsplash.com/photo-1542202229-7d93c33f5d07?auto=format&fit=crop&q=80&w=1000" 
               alt="Airport Interior" 
               className="w-full h-full object-cover opacity-60"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
             <div className="absolute bottom-6 left-6 right-6">
                <div className="flex items-center gap-3 mb-2">
                   <div className="size-10 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg">
                      <span className="material-symbols-outlined">flight_takeoff</span>
                   </div>
                   <div className="h-px flex-1 bg-white/20"></div>
                </div>
                <h2 className="text-white text-2xl font-bold">Quản lý lịch bay</h2>
                <p className="text-white/70 text-sm mt-1">Kết nối hệ thống sân bay thông minh</p>
             </div>
           </div>
        </div>

        {/* Welcome Section */}
        <div className="px-5 pt-4 pb-2">
           <h1 className="text-3xl font-extrabold tracking-tight mb-2">Xin chào! 👋</h1>
           <p className="text-secondary text-base">Vui lòng đăng nhập để truy cập lịch trình và thông báo mới nhất.</p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-5 px-5 py-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
          <div className="space-y-1">
             <label className="text-xs font-bold text-slate-700 dark:text-slate-400 ml-1">Mã nhân viên / Email</label>
             <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-secondary group-focus-within:text-primary transition-colors">badge</span>
                <input 
                  type="text" 
                  placeholder="VD: NV8892" 
                  className="w-full h-14 bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-800 rounded-xl pl-12 pr-4 focus:ring-primary focus:border-primary transition-all text-base font-medium dark:text-white" 
                />
             </div>
          </div>
          <div className="space-y-1">
             <label className="text-xs font-bold text-slate-700 dark:text-slate-400 ml-1">Mật khẩu</label>
             <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-secondary group-focus-within:text-primary transition-colors">lock</span>
                <input 
                  type="password" 
                  placeholder="Nhập mật khẩu" 
                  className="w-full h-14 bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-800 rounded-xl pl-12 pr-12 focus:ring-primary focus:border-primary transition-all text-base font-medium dark:text-white" 
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary">
                  <span className="material-symbols-outlined">visibility_off</span>
                </button>
             </div>
          </div>

          <div className="flex justify-end -mt-2">
            <button type="button" className="text-xs font-bold text-primary">Quên mật khẩu?</button>
          </div>

          <button 
            type="submit"
            className="w-full h-14 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 active:scale-[0.98] transition-all"
          >
            Đăng nhập
          </button>

          <div className="flex flex-col items-center gap-4 mt-2">
             <div className="w-full flex items-center gap-3">
               <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800"></div>
               <span className="text-[10px] text-secondary font-bold uppercase tracking-widest">Hoặc đăng nhập với</span>
               <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800"></div>
             </div>
             <button 
               type="button" 
               onClick={handleFaceID}
               className="flex items-center gap-3 px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-card-dark hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95 transition-all shadow-sm"
             >
                <span className="material-symbols-outlined text-primary text-3xl">fingerprint</span>
                <span className="text-sm font-bold dark:text-white">Face ID</span>
             </button>
          </div>
        </form>
      </div>

      {/* FaceID Scanning Overlay */}
      {isScanning && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="flex flex-col items-center gap-8">
            <div className={`relative size-40 rounded-full border-4 ${scanStatus === 'success' ? 'border-emerald-500' : 'border-primary'} flex items-center justify-center overflow-hidden`}>
              {/* Scan animation lines */}
              {scanStatus === 'scanning' && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/30 to-transparent h-1/2 w-full animate-face-scan"></div>
              )}
              <span className={`material-symbols-outlined text-7xl ${scanStatus === 'success' ? 'text-emerald-500' : 'text-primary'}`}>
                {scanStatus === 'success' ? 'check_circle' : 'face'}
              </span>
              
              {/* Pulse effect */}
              {scanStatus === 'scanning' && (
                <div className="absolute inset-0 rounded-full border-4 border-primary animate-ping opacity-20"></div>
              )}
            </div>
            <div className="text-center">
               <h3 className="text-white text-xl font-black uppercase tracking-widest">
                 {scanStatus === 'success' ? 'Thành công' : 'Đang quét khuôn mặt'}
               </h3>
               <p className="text-white/50 text-xs font-bold mt-2">Staff ID: NV-SGN-2024</p>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="p-8 text-center">
         <p className="text-xs text-secondary font-medium dark:text-slate-500">Bạn chưa có tài khoản? <button className="text-primary font-bold">Tạo tài khoản mới</button></p>
      </div>

      <style>{`
        @keyframes face-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .animate-face-scan {
          animation: face-scan 2s infinite linear;
        }
      `}</style>
    </div>
  );
};

export default LoginScreen;
