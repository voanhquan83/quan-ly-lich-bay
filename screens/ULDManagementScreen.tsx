
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ULDS as INITIAL_ULDS } from '../constants';
import { ULD } from '../types';

const ULDManagementScreen: React.FC = () => {
  const navigate = useNavigate();
  const [ulds, setUlds] = useState<ULD[]>(INITIAL_ULDS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingUld, setEditingUld] = useState<ULD | null>(null);
  
  // State cho form
  const [formData, setFormData] = useState({
    id: '',
    type: 'Container',
    description: '',
    total: 100,
    available: 80
  });

  const stats = useMemo(() => {
    const total = ulds.reduce((acc, curr) => acc + curr.total, 0);
    const available = ulds.reduce((acc, curr) => acc + curr.available, 0);
    const inUse = total - available;
    return { total, available, inUse };
  }, [ulds]);

  const handleAddOrUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUld) {
      setUlds(prev => prev.map(u => u.id === editingUld.id ? { 
        ...u, 
        type: formData.type, 
        description: formData.description,
        total: formData.total,
        available: formData.available,
        status: formData.available / formData.total < 0.2 ? 'Low' : 'Ready'
      } : u));
    } else {
      const newUld: ULD = {
        id: formData.id.toUpperCase(),
        type: formData.type,
        description: formData.description,
        total: formData.total,
        available: formData.available,
        status: formData.available / formData.total < 0.2 ? 'Low' : 'Ready'
      };
      setUlds(prev => [newUld, ...prev]);
    }
    closeModal();
  };

  const openEdit = (uld: ULD) => {
    setEditingUld(uld);
    setFormData({
      id: uld.id,
      type: uld.type,
      description: uld.description,
      total: uld.total,
      available: uld.available
    });
    setShowAddModal(true);
  };

  const closeModal = () => {
    setShowAddModal(false);
    setEditingUld(null);
    setFormData({ id: '', type: 'Container', description: '', total: 100, available: 80 });
  };

  const deleteUld = (id: string) => {
    if(window.confirm('Bạn có chắc chắn muốn xóa ULD này?')) {
      setUlds(prev => prev.filter(u => u.id !== id));
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-light dark:bg-bg-dark">
      <header className="sticky top-0 z-20 bg-bg-light/95 dark:bg-bg-dark/95 backdrop-blur-md px-4 py-3 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center justify-between mb-2">
           <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-start active:scale-90 transition-transform">
             <span className="material-symbols-outlined font-bold">arrow_back</span>
           </button>
           <h1 className="text-base font-black uppercase tracking-tight text-primary">Kho ULD - SGN</h1>
           <button 
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-primary text-white text-xs font-black rounded-xl flex items-center gap-1.5 shadow-lg shadow-primary/20 active:scale-95 transition-all"
           >
              <span className="material-symbols-outlined text-sm font-bold">add</span> THÊM MỚI
           </button>
        </div>
        <div className="mt-1">
           <h2 className="text-2xl font-black tracking-tight">Quản lý Thùng mâm</h2>
           <p className="text-[10px] text-secondary font-black uppercase tracking-widest mt-1">Cập nhật thời gian thực</p>
        </div>
      </header>

      {/* Stats Dashboard */}
      <div className="p-4 grid grid-cols-3 gap-3">
         {[
           { label: 'Tổng số', value: stats.total, icon: 'inventory_2', color: 'text-primary bg-blue-50 dark:bg-blue-900/20' },
           { label: 'Sẵn sàng', value: stats.available, icon: 'check_circle', color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' },
           { label: 'Đang dùng', value: stats.inUse, icon: 'local_shipping', color: 'text-orange-600 bg-orange-50 dark:bg-orange-900/20' }
         ].map(s => (
            <div key={s.label} className="bg-white dark:bg-card-dark p-4 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
               <div className="flex items-center gap-2 mb-2">
                  <div className={`size-6 rounded-full flex items-center justify-center ${s.color}`}>
                     <span className="material-symbols-outlined text-[14px]">{s.icon}</span>
                  </div>
                  <p className="text-[8px] font-black text-secondary uppercase tracking-tighter">{s.label}</p>
               </div>
               <p className="text-xl font-black tracking-tight">{s.value}</p>
            </div>
         ))}
      </div>

      <div className="px-4 pb-32">
         <div className="flex items-center justify-between mb-5 px-1 pt-2">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Danh mục lưu kho ({ulds.length})</h3>
            <button onClick={() => navigate('/history')} className="text-[10px] font-black text-primary uppercase tracking-widest">Lịch sử điều động</button>
         </div>

         <div className="flex flex-col gap-5">
            {ulds.map(uld => (
               <div key={uld.id} className="bg-white dark:bg-card-dark p-5 rounded-[28px] border border-gray-100 dark:border-gray-800 shadow-sm relative overflow-hidden group">
                  <div className="flex items-start justify-between mb-5">
                     <div className="flex gap-4">
                        <div className="size-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-xl font-black text-primary border border-slate-100 dark:border-slate-700">
                           {uld.id.substring(0, 3)}
                        </div>
                        <div>
                           <div className="flex items-center gap-2">
                              <h4 className="text-base font-black">{uld.id}</h4>
                              <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider ${
                                uld.status === 'Ready' ? 'bg-emerald-50 text-emerald-700' : 
                                uld.status === 'Low' ? 'bg-amber-50 text-amber-700' : 
                                'bg-red-50 text-red-700'
                              }`}>
                                {uld.status === 'Ready' ? 'Khả dụng' : uld.status === 'Low' ? 'Sắp hết' : 'Đầy'}
                              </span>
                           </div>
                           <p className="text-xs font-bold text-slate-400 mt-0.5">{uld.type} • {uld.description}</p>
                        </div>
                     </div>
                     <button onClick={() => deleteUld(uld.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined">delete_outline</span>
                     </button>
                  </div>
                  
                  <div className="space-y-2">
                     <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className="text-slate-400">Hiện có: <span className="text-slate-900 dark:text-white">{uld.available}</span></span>
                        <span className="text-slate-400">Định mức: {uld.total}</span>
                     </div>
                     <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-700 ${uld.available / uld.total < 0.2 ? 'bg-amber-500' : 'bg-primary'}`} 
                          style={{width: `${(uld.available / uld.total) * 100}%`}}
                        ></div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6 pt-5 border-t border-slate-50 dark:border-gray-800">
                     <button 
                        onClick={() => openEdit(uld)}
                        className="flex items-center justify-center gap-2 text-[10px] font-black text-primary uppercase tracking-widest py-2 bg-primary/5 rounded-xl active:scale-95 transition-all"
                     >
                        <span className="material-symbols-outlined text-[16px] filled">edit_square</span> Cập nhật
                     </button>
                     <button 
                        onClick={() => navigate('/history')}
                        className="flex items-center justify-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl active:scale-95 transition-all"
                     >
                        <span className="material-symbols-outlined text-[16px]">history</span> Chi tiết
                     </button>
                  </div>
               </div>
            ))}
         </div>
      </div>

      {/* Add/Edit Modal (Bottom Sheet Style) */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal}></div>
            <div className="relative w-full max-w-md bg-white dark:bg-card-dark rounded-t-[40px] p-8 shadow-2xl animate-slide-up overflow-y-auto max-h-[90vh]">
                <div className="w-12 h-1.5 bg-slate-200 dark:bg-gray-800 rounded-full mx-auto mb-8"></div>
                
                <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-3xl">{editingUld ? 'edit_note' : 'add_box'}</span>
                    {editingUld ? 'Cập nhật ULD' : 'Thêm Thùng mâm'}
                </h3>

                <form onSubmit={handleAddOrUpdate} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mã ULD (Số hiệu)</label>
                        <input 
                            required
                            disabled={!!editingUld}
                            type="text" 
                            placeholder="VD: AKE 12345 VN"
                            value={formData.id}
                            onChange={e => setFormData({...formData, id: e.target.value.toUpperCase()})}
                            className="w-full h-14 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-5 font-black text-lg focus:ring-2 focus:ring-primary disabled:opacity-50"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Loại</label>
                            <select 
                                value={formData.type}
                                onChange={e => setFormData({...formData, type: e.target.value})}
                                className="w-full h-14 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-5 font-bold text-sm focus:ring-2 focus:ring-primary"
                            >
                                <option value="Container">Container</option>
                                <option value="Pallet">Pallet</option>
                                <option value="Cooltainer">Cooltainer</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mô tả</label>
                            <input 
                                type="text" 
                                placeholder="LD3..."
                                value={formData.description}
                                onChange={e => setFormData({...formData, description: e.target.value})}
                                className="w-full h-14 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-5 font-bold text-sm"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tổng số</label>
                            <input 
                                type="number" 
                                value={formData.total}
                                onChange={e => setFormData({...formData, total: parseInt(e.target.value) || 0})}
                                className="w-full h-14 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-5 font-black text-lg text-center"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Khả dụng</label>
                            <input 
                                type="number" 
                                value={formData.available}
                                onChange={e => setFormData({...formData, available: parseInt(e.target.value) || 0})}
                                className="w-full h-14 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-5 font-black text-lg text-center text-primary"
                            />
                        </div>
                    </div>

                    <div className="pt-6 flex gap-3">
                        <button 
                            type="button"
                            onClick={closeModal}
                            className="flex-1 h-14 rounded-2xl bg-slate-100 dark:bg-slate-800 font-black text-xs uppercase tracking-widest active:scale-95 transition-all"
                        >
                            Hủy
                        </button>
                        <button 
                            type="submit"
                            className="flex-[2] h-14 rounded-2xl bg-primary text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 active:scale-95 transition-all"
                        >
                            {editingUld ? 'LƯU THAY ĐỔI' : 'XÁC NHẬN THÊM'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
      )}

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up {
          animation: slide-up 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>
    </div>
  );
};

export default ULDManagementScreen;
