
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { FLIGHTS, GATES, STAFF_LIST, ULDS } from '../constants';

const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Chào bạn! Tôi là trợ lý AI vận hành SGN. Tôi có thể giúp bạn kiểm tra lịch bay, cổng đỗ, nhân sự hoặc tình trạng ULD. Bạn cần hỗ trợ gì?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Chuẩn bị dữ liệu context để AI "nắm được" tình hình sân bay
      const airportContext = {
        flights: FLIGHTS.map(f => ({
          id: f.id, 
          airline: f.airline, 
          status: f.status, 
          from: f.origin, 
          to: f.destination, 
          gate: f.gate, 
          dep: f.scheduledDeparture, 
          arr: f.scheduledArrival
        })),
        gates: GATES.map(g => ({ id: g.id, status: g.status, flight: g.currentFlightId })),
        staff: STAFF_LIST.map(s => ({ name: s.name, role: s.role, status: s.status })),
        ulds: ULDS.map(u => ({ id: u.id, type: u.type, available: u.available, total: u.total }))
      };

      const systemInstruction = `
        Bạn là trợ lý AI chuyên nghiệp cho trung tâm điều hành sân bay Tân Sơn Nhất (SGN).
        Dưới đây là dữ liệu vận hành hiện tại (Real-time Data):
        ${JSON.stringify(airportContext, null, 2)}

        Nhiệm vụ:
        1. Trả lời các câu hỏi về chuyến bay (giờ bay, trạng thái, cổng đỗ).
        2. Cung cấp thông tin nhân sự đang trực.
        3. Kiểm tra số lượng ULD (thùng mâm) trong kho.
        4. Trả lời ngắn gọn, súc tích, chuyên nghiệp bằng tiếng Việt.
        5. Nếu thông tin không có trong dữ liệu, hãy trả lời là "Tôi chưa có dữ liệu về vấn đề này".
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
        }
      });

      const aiText = response.text || "Xin lỗi, tôi gặp trục trặc khi xử lý yêu cầu.";
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, { role: 'ai', text: "Đã có lỗi xảy ra khi kết nối với AI. Vui lòng thử lại sau." }]);
    } finally {
      setIsTyping(false);
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-4 z-50 size-14 rounded-full bg-primary text-white shadow-2xl shadow-primary/40 flex items-center justify-center animate-bounce hover:animate-none active:scale-90 transition-all"
      >
        <span className="material-symbols-outlined text-2xl filled">smart_toy</span>
      </button>
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-0 top-0 z-[100] sm:relative sm:inset-auto">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm sm:hidden" onClick={() => setIsOpen(false)}></div>
      <div className="absolute bottom-0 left-0 right-0 h-[80vh] sm:h-[600px] bg-white dark:bg-card-dark rounded-t-[32px] shadow-2xl flex flex-col overflow-hidden animate-slide-up">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between bg-primary text-white">
          <div className="flex items-center gap-3">
             <div className="size-10 rounded-xl bg-white/20 flex items-center justify-center">
                <span className="material-symbols-outlined filled">bolt</span>
             </div>
             <div>
                <h3 className="font-black text-sm uppercase tracking-widest">SGN AI Assistant</h3>
                <div className="flex items-center gap-1.5 mt-0.5">
                   <span className="size-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                   <span className="text-[10px] font-bold opacity-80">AI đang trực tuyến</span>
                </div>
             </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="size-10 flex items-center justify-center rounded-full hover:bg-white/10">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-slate-100 dark:bg-gray-800 text-slate-800 dark:text-slate-200 rounded-tl-none shadow-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
               <div className="bg-slate-100 dark:bg-gray-800 p-4 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    <div className="size-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="size-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                    <div className="size-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                  </div>
               </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-slate-50 dark:bg-bg-dark">
          <div className="flex gap-3">
            <input 
              type="text" 
              placeholder="Hỏi về chuyến bay, ULD, nhân sự..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 h-12 bg-white dark:bg-card-dark border border-gray-200 dark:border-gray-700 rounded-xl px-4 text-sm font-medium focus:ring-2 focus:ring-primary dark:text-white"
            />
            <button 
              onClick={handleSendMessage}
              disabled={!input.trim() || isTyping}
              className="size-12 rounded-xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 active:scale-95 disabled:opacity-50 transition-all"
            >
              <span className="material-symbols-outlined filled">send</span>
            </button>
          </div>
          <p className="text-[9px] text-center text-slate-400 mt-3 uppercase tracking-widest font-bold">Powered by Gemini AI Engine</p>
        </div>
      </div>

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

export default AIChatbot;
