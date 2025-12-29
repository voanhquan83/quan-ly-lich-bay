
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FLIGHTS, STAFF_LIST, ULDS } from '../constants';

interface Props {
  mode?: 'add' | 'edit';
}

const FlightEditScreen: React.FC<Props> = ({ mode = 'edit' }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const existingFlight = FLIGHTS.find(f => f.id === id);

  const [formData, setFormData] = useState({
    id: existingFlight?.id || '',
    airline: existingFlight?.airline || 'Vietnam Airlines',
    origin: existingFlight?.origin || 'SGN',
    destination: existingFlight?.destination || 'HAN',
    gate: existingFlight?.gate || '',
    terminal: existingFlight?.terminal || 'T1',
    scheduledDeparture: existingFlight?.scheduledDeparture || '09:00',
    scheduledArrival: existingFlight?.scheduledArrival || '11:15',
    status: existingFlight?.status || 'Scheduled',
    aircraft: existingFlight?.aircraft || 'A321 Neo',
  });

  const [assignedStaff, setAssignedStaff] = useState([
    { role: 'Điều hành (OPS)', name: 'Nguyễn Quốc Tuấn', code: 'OPS-01' },
    { role: 'Tài liệu', name: 'Trần Thị Mai', code: 'DOC-05' }
  ]);

  const [assignedULDs, setAssignedULDs] = useState([
    { type: 'AKE', qty: 12 },
    { type: 'PMC', qty: 4 }
  ]);

  const removeStaff = (idx: number) => {
    setAssignedStaff(prev => prev.filter((_, i) => i !== idx));
  };

  const updateULDQty = (idx: number, delta: number) => {
    setAssignedULDs(prev => prev.map((uld, i) => 
      i === idx ? { ...uld, qty: Math.max(0, uld.qty + delta) } : uld
    ));
  };

  const addStaffPlaceholder = () => {
    const randomStaff = STAFF_LIST[Math.floor(Math.random() * STAFF_LIST.length)];
    setAssignedStaff(prev => [...prev, { role: 'Bổ sung', name: randomStaff.name, code: randomStaff.id }]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f6f8] dark:bg-bg-dark">
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-bg-dark/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 py-4 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="text-slate-500 text-sm font-bold flex items-center gap-1">
          <span className="material-symbols-outlined text-lg">close</span>
          Hủy
        </button>
        <div className="text-center">
            <h2 className="text-base font-black uppercase tracking-tight">
                {mode === 'add' ? 'Tạo chuyến bay' : 'Điều phối chuyến bay'}
            </h2>
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{formData.id || 'Mới'}</p>
        </div>
        <button 
          onClick={() => navigate(-1)}
          className="bg-primary text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all"
        >
          Lưu
        </button>
      </header>

      <main className="flex-1 p-4 pb-32 space-y-6">
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Thông tin vận hành</h3>
          </div>
          <div className="bg-white dark:bg-card-dark rounded-[28px] p-6 shadow-sm border border-gray-100 dark:border-gray-800 space-y-5">
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Số hiệu</label>
                    <input 
                        type="text" 
                        value={formData.id} 
                        onChange={e => setFormData({...formData, id: e.target.value.toUpperCase()})}
                        className="w-full h-12 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-4 font-black text-lg text-primary"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Loại tàu</label>
                    <input 
                        type="text" 
                        value={formData.aircraft} 
                        className="w-full h-12 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-4 font-bold text-sm"
                    />
                </div>
             </div>
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Khởi hành</label>
                    <input type="time" value={formData.scheduledDeparture} className="w-full h-12 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-4 font-black text-lg" />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Cửa</label>
                    <input type="text" value={formData.gate} className="w-full h-12 bg-slate-50 dark:bg-slate-900 border-none rounded-2xl px-4 font-black text-lg text-center" />
                </div>
             </div>
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Nhân sự đi làm</h3>
            <button onClick={addStaffPlaceholder} className="text-[10px] font-black text-primary uppercase tracking-widest flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">add_circle</span> Thêm
            </button>
          </div>
          <div className="bg-white dark:bg-card-dark rounded-[28px] overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 divide-y dark:divide-gray-800">
             {assignedStaff.map((staff, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                   <div className="flex items-center gap-4">
                      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                         <span className="material-symbols-outlined text-[20px] filled">person</span>
                      </div>
                      <div>
                         <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{staff.role}</p>
                         <p className="text-sm font-black text-slate-900 dark:text-white">{staff.name}</p>
                      </div>
                   </div>
                   <button onClick={() => removeStaff(idx)} className="text-slate-300 hover:text-red-500">
                      <span className="material-symbols-outlined text-xl">remove_circle_outline</span>
                   </button>
                </div>
             ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Thùng mâm (ULD)</h3>
          </div>
          <div className="bg-white dark:bg-card-dark rounded-[28px] p-6 shadow-sm border border-gray-100 dark:border-gray-800">
             <div className="space-y-4">
                {assignedULDs.map((uld, idx) => (
                    <div key={idx} className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900 p-3 rounded-2xl">
                        <div className="size-10 rounded-xl bg-white dark:bg-card-dark flex items-center justify-center font-black text-xs">{uld.type}</div>
                        <div className="flex-1 text-sm font-black">{uld.type} Standard</div>
                        <div className="flex items-center gap-3">
                            <button onClick={() => updateULDQty(idx, -1)} className="size-8 rounded-lg bg-white dark:bg-card-dark border border-slate-100 flex items-center justify-center active:scale-90"><span className="material-symbols-outlined text-lg">remove</span></button>
                            <span className="text-base font-black w-6 text-center">{uld.qty}</span>
                            <button onClick={() => updateULDQty(idx, 1)} className="size-8 rounded-lg bg-white dark:bg-card-dark border border-slate-100 flex items-center justify-center active:scale-90"><span className="material-symbols-outlined text-lg">add</span></button>
                        </div>
                    </div>
                ))}
             </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FlightEditScreen;
