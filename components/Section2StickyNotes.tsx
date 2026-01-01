
import React, { useState, useRef, useEffect } from 'react';
import { STICKY_NOTES, AUDIO_ASSETS } from '../constants';
import confetti from 'canvas-confetti';

interface Props {
  onNext: () => void;
}

const Section2StickyNotes: React.FC<Props> = ({ onNext }) => {
  const [clickedIds, setClickedIds] = useState<number[]>([]);
  const [activeNote, setActiveNote] = useState<number | null>(null);
  const whooshSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    whooshSoundRef.current = new Audio(AUDIO_ASSETS.STICKY_NOTE_WHOOSH);
  }, []);

  const handleClick = (id: number) => {
    if (clickedIds.includes(id)) return;
    
    // Play "Whoosh" placeholder sound
    if (whooshSoundRef.current) {
      whooshSoundRef.current.currentTime = 0;
      whooshSoundRef.current.play().catch(e => console.log("Sound play prevented", e));
    }
    
    setActiveNote(id);
    
    setTimeout(() => {
      setActiveNote(null);
      const newClicked = [...clickedIds, id];
      setClickedIds(newClicked);
      
      if (newClicked.length === STICKY_NOTES.length) {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 }
        });
        setTimeout(onNext, 3000);
      }
    }, 2500);
  };

  return (
    <div className="min-h-screen py-20 px-4 flex flex-col items-center">
      <div className="max-w-4xl w-full text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-romantic text-yellow-200 mb-4">Affirmation Wall</h2>
        <p className="text-slate-400">Click each note to feel the breeze of positivity...</p>
      </div>

      <div className="relative max-w-5xl w-full bg-[#3d1d11] p-6 rounded-lg border-8 border-[#2d150c] shadow-2xl grid grid-cols-2 md:grid-cols-4 gap-6 min-h-[500px]">
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ 
               backgroundImage: 'linear-gradient(90deg, transparent 5px, rgba(0,0,0,0.5) 5px), linear-gradient(0deg, transparent 5px, rgba(0,0,0,0.5) 5px)',
               backgroundSize: '80px 40px'
             }}></div>

        {STICKY_NOTES.map((note) => {
          const isClicked = clickedIds.includes(note.id);
          const isActive = activeNote === note.id;

          return (
            <div 
              key={note.id}
              onClick={() => handleClick(note.id)}
              className={`
                relative h-40 w-full p-4 flex flex-col items-center justify-center text-center cursor-pointer
                transition-all duration-500 transform
                ${note.color} text-slate-900 shadow-lg font-romantic text-xl
                ${isClicked ? 'opacity-0 scale-50 rotate-12 pointer-events-none' : 'hover:scale-105 hover:-rotate-1 hover:shadow-2xl'}
                ${isActive ? 'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 scale-150 rotate-0 animate-wind-flow' : ''}
              `}
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 90%, 90% 100%, 0 100%)'
              }}
            >
              <span className="text-3xl mb-2">{note.emoji}</span>
              <p className="leading-tight">{note.text}</p>
              
              {isActive && (
                <div className="absolute -inset-4 bg-white/20 rounded-full blur-xl animate-pulse"></div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-12 w-full max-w-md bg-slate-800 rounded-full h-3 overflow-hidden">
        <div 
          className="bg-yellow-500 h-full transition-all duration-500"
          style={{ width: `${(clickedIds.length / STICKY_NOTES.length) * 100}%` }}
        ></div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes windFlow {
          0% { transform: translate(-50%, -50%) scale(0.5) rotate(0deg); opacity: 0; }
          20% { transform: translate(-50%, -60%) scale(1.5) rotate(-5deg); opacity: 1; }
          80% { transform: translate(-50%, -40%) scale(1.5) rotate(5deg); opacity: 1; }
          100% { transform: translate(100vw, -100vh) scale(0.5) rotate(45deg); opacity: 0; }
        }
        .animate-wind-flow {
          animation: windFlow 2.5s forwards ease-in-out;
        }
      `}} />
    </div>
  );
};

export default Section2StickyNotes;
