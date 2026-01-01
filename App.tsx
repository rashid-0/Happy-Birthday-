
import React, { useState, useEffect, useRef } from 'react';
import { AppSection } from './types';
import Section1Landing from './components/Section1Landing';
import Section2StickyNotes from './components/Section2StickyNotes';
import Section3Story from './components/Section3Story';
import SectionGames from './components/SectionGames';
import Section4Cake from './components/Section4Cake';
import Section5Final from './components/Section5Final';
import { AUDIO_ASSETS } from './constants';
import { Music, Music2 } from 'lucide-react';

const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<AppSection>(AppSection.LANDING);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize global background music using placeholder from constants
    audioRef.current = new Audio(AUDIO_ASSETS.BACKGROUND_MUSIC);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(console.error);
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const startApp = () => {
    // Ensure music starts on first user interaction
    if (audioRef.current && !isMusicPlaying) {
      audioRef.current.play().catch(console.error);
      setIsMusicPlaying(true);
    }
    navigateTo(AppSection.STICKY_NOTES);
  };

  const navigateTo = (section: AppSection) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSection(section);
      setIsTransitioning(false);
      window.scrollTo(0, 0);
    }, 1000); // Sync with book turn duration
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-white bg-slate-950">
      {/* Background stars (persistent across sections for atmosphere) */}
      <StarsBackground />

      {/* Global Music Toggle */}
      <button
        onClick={toggleMusic}
        className={`fixed top-6 right-6 z-50 p-3 rounded-full border border-white/20 backdrop-blur-md transition-all ${isMusicPlaying ? 'bg-yellow-500 text-slate-950 scale-110 shadow-lg shadow-yellow-500/20' : 'bg-slate-800 text-slate-400'}`}
        title={isMusicPlaying ? "Pause Music" : "Play Music"}
      >
        {isMusicPlaying ? <Music2 size={24} className="animate-pulse" /> : <Music size={24} />}
      </button>

      {/* Main Content Sections */}
      <div className={`transition-all duration-1000 transform ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        {currentSection === AppSection.LANDING && (
          <Section1Landing onNext={startApp} />
        )}
        {currentSection === AppSection.STICKY_NOTES && (
          <Section2StickyNotes onNext={() => navigateTo(AppSection.STORY)} />
        )}
        {currentSection === AppSection.STORY && (
          <Section3Story onNext={() => navigateTo(AppSection.GAMES)} />
        )}
        {currentSection === AppSection.GAMES && (
          <SectionGames onNext={() => navigateTo(AppSection.CAKE)} />
        )}
        {currentSection === AppSection.CAKE && (
          <Section4Cake onNext={() => navigateTo(AppSection.FINAL_NOTE)} />
        )}
        {currentSection === AppSection.FINAL_NOTE && (
          <Section5Final />
        )}
      </div>

      {/* Book Opening Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 flex pointer-events-none">
          <div className="w-1/2 h-full bg-slate-900 border-r border-slate-700 transition-transform duration-1000 transform -translate-x-full origin-right" />
          <div className="w-1/2 h-full bg-slate-900 border-l border-slate-700 transition-transform duration-1000 transform translate-x-full origin-left" />
        </div>
      )}
    </div>
  );
};

const StarsBackground: React.FC = () => {
  const [stars, setStars] = useState<{ top: string; left: string; size: string; duration: string }[]>([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 150 }).map(() => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 1}px`,
      duration: `${Math.random() * 3 + 2}s`,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {stars.map((star, i) => (
        <div
          key={i}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            '--duration': star.duration,
          } as any}
        />
      ))}
    </div>
  );
};

export default App;
