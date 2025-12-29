
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { STAFF_LIST as INITIAL_STAFF } from '../constants';
import { Staff } from '../types';

const StaffManagementScreen: React.FC = () => {
  const navigate = useNavigate();
  const [staffs, setStaffs] = useState<Staff[]>(INITIAL_STAFF);
  const [activeFilter, setActiveFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const filters = ['All', 'Quản trị viên', 'Điều phối bay', 'Quản lý cổng'];

  const filteredStaff = useMemo(() => {
    return staffs.filter(s => {
      const matchFilter = activeFilter === 'All' || s.role === activeFilter;
      const matchSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          s.id.toLowerCase().includes(searchQuery.toLowerCase());
      return matchFilter && matchSearch;
    });
  }, [staffs, activeFilter, searchQuery]);

  const [formData, setFormData] = useState({
    name: '',
    role: 'Điều phối bay',
    email: '',
    id: ''
  });

  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    const newStaff: Staff = {
      id: formData.id || `NV${Math.floor(Math.random() * 9000) + 1000}`,
      name: formData.name,
      role: formData.role,
      email: formData.email,
      status: 'Online',
      avatar: `https://i.pravatar.cc/150?u=${Math.random()}`
    };
    setStaffs([newStaff, ...staffs]);
    setShowAddModal(false);
    setFormData({ name: '', role: 'Điều phối bay', email: '', id: '' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-light dark:bg-bg-dark">
      <header className="sticky top-0 z-20 bg-bg-light/95 dark:bg-bg-dark/95 backdrop-blur-md px-4 pt-4 pb-2 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-4">
           <div className="flex items-center gap-3">
              <button onClick={() => navigate(-1)} className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors">
                <span className="material-symbols-outlined font-black">arrow_back</span>
              </button>
              <h2 className="text-xl font-black tracking-tight">Nhân sự SGN</h2>
           </div>
           <button 
            onClick={() => setShowAddModal(true)}
            className="size-11 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/30 active:scale-90 transition-all"
           >
              <span className="material-symbols-outlined font-black">add</span>
           </button>
        </div>
        
        <div className="relative mb-2">
           <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-secondary text-[20px]">search</span>
           <input 
             type="text" 
             placeholder="Tìm tên, mã nhân viên..." 
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full h-12 bg-white dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 rounded-2xl pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-primary shadow-sm" 
           />
        </div>
      </header>

      <div className="flex gap-2 p-4 overflow-x-auto no-scrollbar">
        {filters.map(f => (
          <button 
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`flex h-9 shrink-0 items-center justify-center px-6 rounded-full text-[11px] font-black uppercase tracking-widest transition-all ${
              activeFilter === f ? 'bg-primary text-white shadow-lg' : 'bg-white dark:bg-card-dark border border-gray-100 dark:border-gray-700 text-secondary'
            }`}
          >
            {f === 'All' ? 'Tất cả' : f}
          </button>
        ))}
      </div>

      <main className="p-4 flex flex-col gap-4 pb-24">
        <div className="flex items-center justify-between px-1">
           <h3 className="text-[10px] font-black uppercase tracking-[2px] text-secondary">Hồ sơ công tác ({filteredStaff.length})</h3>
           <span className="text-[10px] font-black text-primary uppercase tracking-widest">Sắp xếp: A-Z</span>
        </div>

        {filteredStaff.map(staff => (
          <div key={staff.id} className="bg-white dark:bg-card-dark p-5 rounded-[28px] border border-gray-100 dark:border-gray-800 shadow-sm transition-all active:scale-[0.98] cursor-pointer">
            <div className="flex items-start justify-between">
               <div className="flex gap-4">
                  <div className="relative">
                    <img src={staff.avatar} className="size-14 rounded-2xl object-cover border-2 border-slate-50 dark:border-slate-800 shadow-sm" alt="" />
                    <span className={`absolute -bottom-1 -right-1 size-4 rounded-full border-2 border-white dark:border-slate-800 ${staff.status === 'Online' ? 'bg-emerald-500' : 'bg-gray-400'}`}></span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="text-base font-black text-slate-900 dark:text-white">{staff.name}</h4>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: {staff.id} • {staff.email}</p>
                    <div className="flex items-center gap-2 mt-2">
                        <span className="inline-flex items-center rounded-lg bg-indigo-50 dark:bg-indigo-900/20 px-2 py-1 text-[10px] font-black text-indigo-700 uppercase tracking-wider">
                            {staff.role}
                        </span>
                        <span className={`text-[10px] font-black uppercase tracking-widest ${staff.status === 'Online' ? 'text-emerald-600' : 'text-slate-400'}`}>
                            {staff.status === 'Online' ? 'Đang trực' : 'Nghỉ ca'}
                        </span>
                    </div>
                  </div>
               </div>
               <button className="text-slate-300"><span className="material-symbols-outlined">more_horiz</span></button>
            </div>
          </div>
        ))}
      </main>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddModal(false)}></div>
            <div className="relative w-full max-w-md bg-white dark:bg-card-dark rounded-t-[40px] p-8 shadow-2xl animate-slide-up">
                <div className="w-12 h-1.5 bg-slate-200 dark:bg-gray-800 rounded-full mx-auto mb-8"></div>
                <h3 className="text-2xl font-black mb-6">Thêm nhân viên</h3>
                <form onSubmit={handleAddStaff} className="space-y-6">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Họ và tên</label>
                        <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full h-14 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-5 font-black text-base" />
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Chức vụ</label>
                        <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full h-14 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-5 font-bold">
                            <option>Điều phối bay</option>
                            <option>Quản lý cổng</option>
                            <option>Quản trị viên</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email nội bộ</label>
                        <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full h-14 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-5 font-bold" />
                    </div>
                    <button type="submit" className="w-full h-14 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 mt-4 active:scale-95 transition-all">
                        XÁC NHẬN LƯU
                    </button>
                </form>
            </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default StaffManagementScreen;
