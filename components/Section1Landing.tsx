
import React, { useState, useEffect } from 'react';
import { TARGET_DATE } from '../constants';
import { ChevronRight } from 'lucide-react';

interface Props {
  onNext: () => void;
}

const Section1Landing: React.FC<Props> = ({ onNext }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0, hours: 0, minutes: 0, seconds: 0
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const distance = TARGET_DATE.getTime() - now.getTime();
      
      if (distance < 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden bg-slate-950">
      {/* Animated Moon: Moves right to left */}
      <div 
        className="absolute top-20 right-[-100px] w-32 h-32 rounded-full bg-yellow-50 shadow-[0_0_60px_rgba(255,255,224,0.6)] animate-moon-move"
        style={{
          animation: 'moonMove 60s linear infinite'
        }}
      >
        <div className="absolute inset-0 bg-yellow-100 opacity-20 rounded-full blur-md"></div>
      </div>

      {/* Desert Landscape */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none z-10">
        <div className="absolute bottom-0 w-full h-[300px] bg-orange-950/40 rounded-t-[100%] scale-x-150 -translate-x-1/4 translate-y-20"></div>
        <div className="absolute bottom-0 w-full h-[250px] bg-amber-900/40 rounded-t-[100%] scale-x-150 translate-x-1/4 translate-y-10"></div>
        
        <div className="absolute bottom-20 left-[15%] w-1 h-20 bg-emerald-950">
          <div className="absolute -top-10 -left-6 w-12 h-16 bg-emerald-900/60 rounded-full blur-sm"></div>
        </div>
        <div className="absolute bottom-16 right-[20%] w-1 h-16 bg-emerald-950">
          <div className="absolute -top-8 -left-5 w-10 h-14 bg-emerald-900/60 rounded-full blur-sm"></div>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-48 h-24 flex flex-col items-center">
          <div className="w-40 h-16 bg-slate-300 rounded-t-xl relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex gap-4">
                 <div className="w-4 h-6 bg-slate-900 rounded-full"></div>
                 <div className="w-4 h-6 bg-slate-900 rounded-full"></div>
              </div>
              <div className="absolute top-2 left-2 w-10 h-6 bg-slate-100/30 rounded"></div>
              <div className="absolute bottom-0 left-4 w-6 h-6 bg-slate-800 rounded-full translate-y-3"></div>
              <div className="absolute bottom-0 right-4 w-6 h-6 bg-slate-800 rounded-full translate-y-3"></div>
          </div>
        </div>
      </div>

      {/* Text Overlay */}
      <div className="relative z-20 text-center space-y-8 max-w-2xl px-6 bg-black/40 backdrop-blur-lg p-10 rounded-3xl border border-white/10 shadow-2xl">
        <h1 className="text-4xl md:text-6xl font-romantic text-yellow-100 drop-shadow-lg mb-4">
          A special day for a special soul.
        </h1>
        
        <div className="grid grid-cols-4 gap-4 text-center">
          <CountdownUnit value={timeLeft.days} label="Days" />
          <CountdownUnit value={timeLeft.hours} label="Hours" />
          <CountdownUnit value={timeLeft.minutes} label="Mins" />
          <CountdownUnit value={timeLeft.seconds} label="Secs" />
        </div>

        <div className="pt-4">
          <button 
            onClick={onNext}
            className="group relative px-10 py-5 bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold rounded-full transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto shadow-2xl shadow-yellow-500/40 text-lg"
          >
            Click to see magic
            <ChevronRight className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes moonMove {
          from { transform: translateX(120vw); }
          to { transform: translateX(-120vw); }
        }
      `}} />
    </div>
  );
};

const CountdownUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col bg-white/5 p-3 rounded-xl border border-white/5">
    <span className="text-3xl md:text-5xl font-bold font-serif text-white">{value.toString().padStart(2, '0')}</span>
    <span className="text-[10px] md:text-xs uppercase tracking-widest text-yellow-200/60 mt-1">{label}</span>
  </div>
);

export default Section1Landing;
