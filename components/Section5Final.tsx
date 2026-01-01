
import React, { useEffect, useRef } from 'react';
import { AUDIO_ASSETS } from '../constants';
import confetti from 'canvas-confetti';

const Section5Final: React.FC = () => {
  const finalSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Sound for final celebration using placeholder from constants
    finalSoundRef.current = new Audio(AUDIO_ASSETS.FINAL_CELEBRATION);
    finalSoundRef.current.play().catch(e => console.log("Sound play prevented", e));

    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => {
      clearInterval(interval);
      if (finalSoundRef.current) {
        finalSoundRef.current.pause();
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-slate-950">
      <div className="max-w-2xl w-full bg-[#fdf6e3] text-slate-900 p-8 md:p-12 rounded-lg shadow-2xl transform rotate-1 relative overflow-hidden">
        {/* Paper texture and lines */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{ 
               backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px)',
               backgroundSize: '100% 1.5rem'
             }}></div>
        
        <div className="relative z-10 font-romantic text-2xl md:text-3xl space-y-6 leading-relaxed">
          <p className="text-slate-500 italic text-sm mb-4">January 2026</p>
          
          <h2 className="text-4xl font-bold border-b-2 border-slate-300 pb-2 mb-6">Dear Anisha,</h2>
          
          <p>
            Looking back at these six years, it's funny how a single message in a YouTube class changed everything. 
            From "Annie" to "Anisha," from UPSC prep to 3 AM heart-to-hearts.
          </p>
          
          <p>
            You've seen me at my worst, and you chose to stay. You've been the constant in a world where everything else felt temporary. 
            I don't know what the future holds, or what label we'll eventually put on "us."
          </p>
          
          <p className="font-bold">
            But I know that today, your smile is the most important thing to me.
          </p>
          
          <p>
            May this year bring you as much light as you've brought into my life. 
            Keep being your beautiful, complicated, real self. 
            You are more special than words can capture.
          </p>
          
          <div className="pt-8 text-right">
            <p className="text-lg text-slate-500">Always yours,</p>
            <p className="text-3xl font-bold mt-2">Rashid</p>
          </div>
        </div>

        {/* Decorative Stamps/Doodles */}
        <div className="absolute bottom-8 left-8 w-16 h-16 border-4 border-red-200/50 rounded-full flex items-center justify-center text-red-200/50 -rotate-12 select-none pointer-events-none">
          <span className="text-[10px] font-bold text-center">CERTIFIED<br/>SOULMATE</span>
        </div>
      </div>
      
      <div className="mt-12 text-center animate-bounce">
        <p className="text-yellow-500 font-romantic text-2xl">Happy Birthday, Anisha! 💛</p>
      </div>

      {/* Background visual detail */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50"></div>
    </div>
  );
};

export default Section5Final;
