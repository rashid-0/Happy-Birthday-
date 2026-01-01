
import React, { useState } from 'react';
import { CHAPTERS } from '../constants';
import { ChevronRight, ArrowLeft } from 'lucide-react';

interface Props {
  onNext: () => void;
}

const Section3Story: React.FC<Props> = ({ onNext }) => {
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const chapter = CHAPTERS[currentChapterIndex];

  const handleNext = () => {
    if (currentChapterIndex < CHAPTERS.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onNext();
    }
  };

  const handlePrev = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4 md:px-12 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        {/* Navigation Breadcrumbs */}
        <div className="flex justify-between items-center mb-8">
          <button 
            onClick={handlePrev}
            disabled={currentChapterIndex === 0}
            className={`flex items-center gap-1 text-yellow-200/60 hover:text-yellow-200 transition-colors ${currentChapterIndex === 0 ? 'invisible' : ''}`}
          >
            <ArrowLeft size={20} />
            Previous Chapter
          </button>
          <span className="text-sm font-serif italic text-yellow-100/40">
            Chapter {chapter.id} of {CHAPTERS.length}
          </span>
        </div>

        {/* Chapter Title */}
        <div className="text-center mb-12">
          <p className="text-yellow-500 font-bold tracking-widest uppercase text-sm mb-2">{chapter.year}</p>
          <h2 className="text-4xl md:text-6xl font-serif text-white">{chapter.title}</h2>
        </div>

        {/* Story Content with Central Image */}
        <div className="relative group">
          {/* Image */}
          <div className="w-full h-64 md:h-96 mb-12 rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-800 transform transition-transform group-hover:scale-[1.02]">
            <img 
              src={chapter.imageUrl} 
              alt={chapter.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
          </div>

          {/* Narrative */}
          <div className="prose prose-invert prose-lg max-w-none text-slate-300 font-light leading-relaxed whitespace-pre-wrap">
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:text-yellow-500 first-letter:mr-3 first-letter:float-left">
              {chapter.content}
            </p>
          </div>
        </div>

        {/* Next Button */}
        <div className="mt-16 flex justify-center">
          <button 
            onClick={handleNext}
            className="group relative px-10 py-4 bg-transparent border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-slate-950 font-bold rounded-full transition-all flex items-center gap-2 overflow-hidden"
          >
            <span className="relative z-10">
              {currentChapterIndex === CHAPTERS.length - 1 ? "Start the Celebration" : "Next Chapter"}
            </span>
            <ChevronRight className="relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Section3Story;
