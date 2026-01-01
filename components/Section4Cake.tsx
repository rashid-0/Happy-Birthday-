
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  onNext: () => void;
}

const Section4Cake: React.FC<Props> = ({ onNext }) => {
  const [candlesLit, setCandlesLit] = useState(true);
  const [micActive, setMicActive] = useState(false);
  const [micLevel, setMicLevel] = useState(0);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      stopMic();
    };
  }, []);

  const toggleMic = async () => {
    if (micActive) {
      stopMic();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const source = audioContextRef.current.createMediaStreamSource(stream);
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);
      
      const bufferLength = analyserRef.current.frequencyBinCount;
      dataArrayRef.current = new Uint8Array(bufferLength);
      
      setMicActive(true);
      monitorAudio();
    } catch (err) {
      console.error("Mic access denied", err);
      alert("Please allow microphone access to blow the candles! Or just click the candles.");
    }
  };

  const stopMic = () => {
    setMicActive(false);
    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setMicLevel(0);
  };

  const monitorAudio = () => {
    if (!analyserRef.current || !dataArrayRef.current) return;
    
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    const average = dataArrayRef.current.reduce((a, b) => a + b) / dataArrayRef.current.length;
    setMicLevel(average);

    if (average > 70) { // Threshold for "blowing"
      handleBlow();
    } else {
      animationFrameRef.current = requestAnimationFrame(monitorAudio);
    }
  };

  const handleBlow = () => {
    setCandlesLit(false);
    stopMic();
    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
      colors: ['#fbbf24', '#f59e0b', '#d97706']
    });
    
    // Auto-advance after some time to the final section
    setTimeout(onNext, 4000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-950">
      <div className="text-center mb-12 space-y-4">
        <h2 className="text-4xl md:text-6xl font-romantic text-yellow-300">Make a Wish, Anisha!</h2>
        <p className="text-slate-400">Click the mic and blow or click the candles to celebrate</p>
      </div>

      <div className="relative group cursor-pointer" onClick={() => candlesLit && handleBlow()}>
        {/* Cake Visual */}
        <div className="relative w-64 h-64 flex flex-col items-center justify-end">
          {/* Candles */}
          <div className="flex gap-4 mb-[-10px] z-20">
            {[1, 2, 3].map((i) => (
              <div key={i} className="relative w-3 h-16 bg-pink-400 rounded-t-sm border-b-2 border-pink-500 shadow-lg">
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-[2px] h-3 bg-black"></div>
                {candlesLit && (
                   <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-4 h-6 bg-yellow-400 rounded-full animate-flame shadow-[0_0_15px_#facc15]"></div>
                )}
              </div>
            ))}
          </div>

          {/* Top Layer */}
          <div className="w-48 h-20 bg-pink-100 rounded-t-3xl relative z-10 border-b-4 border-pink-200 shadow-md">
            <div className="absolute top-4 left-4 w-4 h-4 bg-red-500 rounded-full"></div>
            <div className="absolute top-6 right-8 w-4 h-4 bg-red-500 rounded-full"></div>
            <div className="absolute top-2 right-12 w-4 h-4 bg-red-500 rounded-full"></div>
            {/* Drips */}
            <div className="absolute bottom-[-10px] left-8 w-4 h-8 bg-pink-100 rounded-full"></div>
            <div className="absolute bottom-[-15px] left-24 w-4 h-12 bg-pink-100 rounded-full"></div>
            <div className="absolute bottom-[-5px] right-8 w-4 h-6 bg-pink-100 rounded-full"></div>
          </div>

          {/* Base Layer */}
          <div className="w-64 h-24 bg-white rounded-t-2xl border-b-8 border-slate-200 relative shadow-2xl">
             <div className="absolute top-4 left-1/2 -translate-x-1/2 text-pink-300 font-romantic text-2xl font-bold italic w-full text-center">
                Happy Birthday
             </div>
          </div>
          
          {/* Plate */}
          <div className="w-80 h-4 bg-slate-300 rounded-full mt-[-2px] shadow-lg"></div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-16 flex items-center gap-6">
        <button 
          onClick={toggleMic}
          className={`p-6 rounded-full transition-all transform hover:scale-110 shadow-xl ${micActive ? 'bg-red-500 animate-pulse' : 'bg-slate-800 text-yellow-500'}`}
          title={micActive ? "Stop Listening" : "Start Listening to Blow Candles"}
        >
          {micActive ? <Mic size={32} /> : <MicOff size={32} />}
        </button>

        <div className="flex flex-col items-center">
            <span className="text-xs uppercase tracking-widest text-slate-500 mb-2">Blowing Intensity</span>
            <div className="w-32 h-2 bg-slate-800 rounded-full overflow-hidden">
               <div className="h-full bg-yellow-500 transition-all duration-75" style={{ width: `${Math.min(100, (micLevel / 100) * 100)}%` }}></div>
            </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes flame {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 0.9; }
          50% { transform: translateX(-50%) scale(1.1) rotate(2deg); opacity: 1; }
        }
        .animate-flame {
          animation: flame 0.5s infinite ease-in-out;
        }
      `}} />
    </div>
  );
};

export default Section4Cake;
