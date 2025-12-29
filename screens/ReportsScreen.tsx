
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, PieChart, Pie, Tooltip } from 'recharts';

type Timeframe = 'day' | 'week' | 'month';

const dataSets = {
  day: {
    bar: [
      { name: '00:00', value: 30 },
      { name: '04:00', value: 15 },
      { name: '08:00', value: 65 },
      { name: '12:00', value: 100 },
      { name: '16:00', value: 80 },
      { name: '20:00', value: 55 },
    ],
    pie: [
      { name: 'Đúng giờ', value: 88.5, color: '#195de6' },
      { name: 'Chậm trễ', value: 10, color: '#f59e0b' },
      { name: 'Hủy chuyến', value: 1.5, color: '#ef4444' },
    ],
    stats: { otp: '88.5%', change: '+1.2%', turn: '42m', turnChange: '-5m' },
    desc: 'Số lượng chuyến bay trong 24h qua'
  },
  week: {
    bar: [
      { name: 'Thứ 2', value: 120 },
      { name: 'Thứ 3', value: 145 },
      { name: 'Thứ 4', value: 130 },
      { name: 'Thứ 5', value: 160 },
      { name: 'Thứ 6', value: 185 },
      { name: 'Thứ 7', value: 210 },
      { name: 'CN', value: 195 },
    ],
    pie: [
      { name: 'Đúng giờ', value: 82.1, color: '#195de6' },
      { name: 'Chậm trễ', value: 15.4, color: '#f59e0b' },
      { name: 'Hủy chuyến', value: 2.5, color: '#ef4444' },
    ],
    stats: { otp: '82.1%', change: '-2.4%', turn: '48m', turnChange: '+3m' },
    desc: 'Số lượng chuyến bay trong 7 ngày qua'
  },
  month: {
    bar: [
      { name: 'Tuần 1', value: 850 },
      { name: 'Tuần 2', value: 920 },
      { name: 'Tuần 3', value: 780 },
      { name: 'Tuần 4', value: 960 },
    ],
    pie: [
      { name: 'Đúng giờ', value: 85.7, color: '#195de6' },
      { name: 'Chậm trễ', value: 12.2, color: '#f59e0b' },
      { name: 'Hủy chuyến', value: 2.1, color: '#ef4444' },
    ],
    stats: { otp: '85.7%', change: '+0.8%', turn: '45m', turnChange: '-1m' },
    desc: 'Lưu lượng vận hành trong tháng hiện tại'
  }
};

const ReportsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState<Timeframe>('day');

  const currentData = dataSets[timeframe];

  return (
    <div className="flex flex-col gap-6 p-4 bg-bg-light dark:bg-bg-dark min-h-screen pb-24">
      <header className="flex items-center justify-between pt-2">
        <button onClick={() => navigate(-1)} className="size-10 flex items-center justify-start active:scale-90 transition-transform">
          <span className="material-symbols-outlined font-bold">arrow_back</span>
        </button>
        <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">Thống kê vận hành</h2>
        <button className="size-10 flex items-center justify-end text-secondary">
          <span className="material-symbols-outlined">share</span>
        </button>
      </header>

      {/* Timeframe Tabs */}
      <div className="flex p-1.5 rounded-2xl bg-slate-200/60 dark:bg-gray-800 shadow-inner">
        {(['day', 'week', 'month'] as Timeframe[]).map((t) => (
          <button 
            key={t}
            onClick={() => setTimeframe(t)}
            className={`flex-1 py-2.5 text-sm font-bold rounded-xl transition-all duration-300 ${
              timeframe === t 
                ? 'bg-white dark:bg-card-dark text-primary shadow-md scale-100' 
                : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 scale-95'
            }`}
          >
            {t === 'day' ? 'Ngày' : t === 'week' ? 'Tuần' : 'Tháng'}
          </button>
        ))}
      </div>

      {/* KPI Overviews */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white dark:bg-card-dark p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
           <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Đúng giờ (OTP)</p>
           <h4 className="text-3xl font-black text-primary tracking-tighter">{currentData.stats.otp}</h4>
           <p className={`text-[10px] font-bold mt-1.5 flex items-center gap-1 ${currentData.stats.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
              <span className="material-symbols-outlined text-sm">
                {currentData.stats.change.startsWith('+') ? 'trending_up' : 'trending_down'}
              </span>
              {currentData.stats.change} so với kỳ trước
           </p>
        </div>
        <div className="bg-white dark:bg-card-dark p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm">
           <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-2">Quay đầu (Avg)</p>
           <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">{currentData.stats.turn}</h4>
           <p className={`text-[10px] font-bold mt-1.5 flex items-center gap-1 ${currentData.stats.turnChange.startsWith('-') ? 'text-emerald-500' : 'text-red-500'}`}>
              <span className="material-symbols-outlined text-sm">
                {currentData.stats.turnChange.startsWith('-') ? 'speed' : 'warning'}
              </span>
              {currentData.stats.turnChange} mục tiêu
           </p>
        </div>
      </div>

      {/* Donut Chart */}
      <section className="bg-white dark:bg-card-dark p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base font-black tracking-tight">Trạng thái chuyến bay</h3>
          <span className="material-symbols-outlined text-slate-300">pie_chart</span>
        </div>
        <div className="flex items-center h-44">
          <div className="w-1/2 h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={currentData.pie}
                  innerRadius={55}
                  outerRadius={75}
                  paddingAngle={8}
                  dataKey="value"
                  animationDuration={800}
                >
                  {currentData.pie.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-1/2 flex flex-col gap-4 pl-4">
            {currentData.pie.map(item => (
              <div key={item.name} className="flex flex-col">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="size-2 rounded-full" style={{backgroundColor: item.color}}></div>
                    <span className="text-[11px] text-slate-500 font-bold uppercase">{item.name}</span>
                  </div>
                  <span className="text-xs font-black">{item.value}%</span>
                </div>
                <div className="h-1 w-full bg-slate-100 dark:bg-gray-800 rounded-full mt-1.5 overflow-hidden">
                  <div className="h-full rounded-full" style={{width: `${item.value}%`, backgroundColor: item.color}}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bar Chart */}
      <section className="bg-white dark:bg-card-dark p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="mb-6">
          <h3 className="text-base font-black tracking-tight">Lưu lượng vận hành</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{currentData.desc}</p>
        </div>
        <div className="h-52 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={currentData.bar}>
              <XAxis 
                dataKey="name" 
                fontSize={10} 
                tickLine={false} 
                axisLine={false} 
                tick={{fill: '#94a3b8', fontWeight: 'bold'}} 
              />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}}
              />
              <Bar dataKey="value" radius={[6, 6, 0, 0]} animationDuration={1000}>
                {currentData.bar.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index === currentData.bar.length - 1 ? '#195de6' : '#e2e8f0'} 
                    className="dark:fill-slate-700 last:dark:fill-primary"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Detailed Table Placeholder */}
      <button className="w-full py-5 rounded-2xl border-2 border-dashed border-slate-200 dark:border-gray-800 text-slate-400 text-xs font-black uppercase tracking-[2px] hover:bg-slate-50 transition-colors">
        Tải xuống báo cáo chi tiết (.PDF)
      </button>
    </div>
  );
};

export default ReportsScreen;
