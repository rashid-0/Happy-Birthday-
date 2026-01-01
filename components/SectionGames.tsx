
import React, { useState, useEffect } from 'react';
import { ChevronRight, RefreshCw } from 'lucide-react';

interface Props {
  onNext: () => void;
}

const SectionGames: React.FC<Props> = ({ onNext }) => {
  const [activeGame, setActiveGame] = useState<'TIC_TAC_TOE' | 'MEMORY'>('TIC_TAC_TOE');
  const [gamesCompleted, setGamesCompleted] = useState({ ticTacToe: false, memory: false });

  const handleGameComplete = (game: 'ticTacToe' | 'memory') => {
    setGamesCompleted(prev => ({ ...prev, [game]: true }));
  };

  return (
    <div className="min-h-screen py-20 px-4 flex flex-col items-center">
      <div className="max-w-4xl w-full text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-romantic text-yellow-200 mb-4">A Little Fun Before the Big Surprise</h2>
        <p className="text-slate-400">Complete both games to unlock the next chapter!</p>
      </div>

      {/* Game Selector Tabs */}
      <div className="flex gap-4 mb-12">
        <button
          onClick={() => setActiveGame('TIC_TAC_TOE')}
          className={`px-6 py-2 rounded-full transition-all ${activeGame === 'TIC_TAC_TOE' ? 'bg-yellow-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}
        >
          Tic-Tac-Toe {gamesCompleted.ticTacToe && '✅'}
        </button>
        <button
          onClick={() => setActiveGame('MEMORY')}
          className={`px-6 py-2 rounded-full transition-all ${activeGame === 'MEMORY' ? 'bg-yellow-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-400'}`}
        >
          Memory Match {gamesCompleted.memory && '✅'}
        </button>
      </div>

      {/* Game Container */}
      <div className="w-full max-w-2xl bg-slate-900/50 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl flex justify-center items-center min-h-[500px]">
        {activeGame === 'TIC_TAC_TOE' ? (
          <TicTacToe onComplete={() => handleGameComplete('ticTacToe')} />
        ) : (
          <MemoryGame onComplete={() => handleGameComplete('memory')} />
        )}
      </div>

      {/* Next Button Logic */}
      {gamesCompleted.ticTacToe && gamesCompleted.memory && (
        <div className="mt-12 animate-bounce">
          <button
            onClick={onNext}
            className="px-10 py-4 bg-yellow-500 text-slate-950 font-bold rounded-full transition-all transform hover:scale-110 flex items-center gap-2 shadow-xl shadow-yellow-500/20"
          >
            Unlock the Celebration
            <ChevronRight />
          </button>
        </div>
      )}
    </div>
  );
};

// --- Tic Tac Toe Component ---
const TicTacToe: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const computerMove = (currentBoard: (string | null)[]) => {
    const emptySquares = currentBoard.map((s, i) => s === null ? i : null).filter(s => s !== null) as number[];
    if (emptySquares.length === 0) return;
    
    // Simple AI: Try to win or block
    const randomMove = emptySquares[Math.floor(Math.random() * emptySquares.length)];
    const newBoard = [...currentBoard];
    newBoard[randomMove] = 'O';
    setBoard(newBoard);
    setIsXNext(true);

    const win = calculateWinner(newBoard);
    if (win) {
      setWinner(win);
      if (win === 'X') onComplete();
    } else if (newBoard.every(s => s !== null)) {
      setWinner('Draw');
    }
  };

  useEffect(() => {
    if (!isXNext && !winner) {
      const timeout = setTimeout(() => computerMove(board), 600);
      return () => clearTimeout(timeout);
    }
  }, [isXNext, winner]);

  const handleClick = (i: number) => {
    if (board[i] || winner || !isXNext) return;
    const newBoard = [...board];
    newBoard[i] = 'X';
    setBoard(newBoard);
    setIsXNext(false);

    const win = calculateWinner(newBoard);
    if (win) {
      setWinner(win);
      if (win === 'X') onComplete();
    } else if (newBoard.every(s => s !== null)) {
      setWinner('Draw');
    }
  };

  const reset = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-romantic text-yellow-100 mb-6">X: You | O: Computer</h3>
      <div className="grid grid-cols-3 gap-2 bg-slate-800 p-2 rounded-xl shadow-inner">
        {board.map((val, i) => (
          <div
            key={i}
            onClick={() => handleClick(i)}
            className={`w-20 h-20 md:w-24 md:h-24 bg-slate-900 border border-slate-700 flex items-center justify-center text-4xl font-bold cursor-pointer transition-all hover:bg-slate-800
              ${val === 'X' ? 'text-yellow-500' : 'text-pink-500'}
            `}
          >
            {val}
          </div>
        ))}
      </div>
      {winner && (
        <div className="mt-8 text-center">
          <p className="text-xl font-bold text-yellow-200">
            {winner === 'Draw' ? "It's a tie!" : winner === 'X' ? "You won! 💖" : "Computer won! Try again."}
          </p>
          <button onClick={reset} className="mt-4 flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <RefreshCw size={16} /> Play Again
          </button>
        </div>
      )}
    </div>
  );
};

// --- Memory Game Component ---
const MemoryGame: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const emojis = ['✨', '💖', '🌟', '🎁', '🎂', '💌', '🍭', '🦋'];
  const [cards, setCards] = useState<{ id: number; emoji: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedIds, setFlippedIds] = useState<number[]>([]);

  useEffect(() => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, idx) => ({ id: idx, emoji, flipped: false, matched: false }));
    setCards(shuffled);
  }, []);

  const handleFlip = (id: number) => {
    if (flippedIds.length === 2 || cards[id].flipped || cards[id].matched) return;

    const newCards = [...cards];
    newCards[id].flipped = true;
    setCards(newCards);

    const newFlipped = [...flippedIds, id];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        newCards[first].matched = true;
        newCards[second].matched = true;
        setCards(newCards);
        setFlippedIds([]);
        if (newCards.every(c => c.matched)) onComplete();
      } else {
        setTimeout(() => {
          newCards[first].flipped = false;
          newCards[second].flipped = false;
          setCards(newCards);
          setFlippedIds([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h3 className="text-2xl font-romantic text-yellow-100 mb-6">Find the Matching Pairs</h3>
      <div className="grid grid-cols-4 gap-3">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => handleFlip(card.id)}
            className={`w-14 h-20 md:w-20 md:h-28 rounded-xl cursor-pointer transition-all duration-500 perspective-1000 transform
              ${card.flipped || card.matched ? 'rotate-y-180' : ''}
            `}
          >
            <div className={`relative w-full h-full transition-all duration-500 transform-style-3d shadow-xl
              ${card.flipped || card.matched ? 'rotate-y-180' : ''}
            `}>
              <div className="absolute inset-0 w-full h-full backface-hidden bg-slate-800 rounded-xl border-2 border-slate-700 flex items-center justify-center text-slate-600 font-bold">
                ?
              </div>
              <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-yellow-500 rounded-xl border-2 border-yellow-400 flex items-center justify-center text-3xl">
                {card.emoji}
              </div>
            </div>
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        .perspective-1000 { perspective: 1000px; }
        .backface-hidden { backface-visibility: hidden; }
        .transform-style-3d { transform-style: preserve-3d; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}} />
    </div>
  );
};

export default SectionGames;
