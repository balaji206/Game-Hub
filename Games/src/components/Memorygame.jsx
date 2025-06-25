import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdMusicOff, MdMusicNote } from "react-icons/md";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";

const icons = ['🐶', '🐱', '🦊', '🐸', '🐵', '🐰', '🐯', '🐼'];

function MemoryGame() {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    initializeCards();
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  const initializeCards = () => {
    const shuffled = shuffle([...icons, ...icons]);
    const initialCards = shuffled.map((icon, index) => ({
      id: index,
      icon,
      flipped: false,
    }));
    setCards(initialCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  const handleClick = (card) => {
    if (
      flipped.length === 2 ||
      flipped.includes(card.id) ||
      matched.includes(card.icon)
    )
      return;

    const newFlipped = [...flipped, card.id];
    setFlipped(newFlipped);
    setCards((prev) =>
      prev.map((c) =>
        c.id === card.id ? { ...c, flipped: true } : c
      )
    );

    if (newFlipped.length === 2) {
      const [firstId, secondId] = newFlipped;
      const firstCard = cards.find((c) => c.id === firstId);
      const secondCard = cards.find((c) => c.id === secondId);

      if (firstCard.icon === secondCard.icon) {
        setMatched([...matched, firstCard.icon]);
        setFlipped([]);
      } else {
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === firstId || c.id === secondId
                ? { ...c, flipped: false }
                : c
            )
          );
          setFlipped([]);
        }, 1000);
      }

      setMoves((m) => m + 1);
    }
  };

  const resetGame = () => {
    initializeCards();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setMusicPlaying(false);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (musicPlaying) {
        audioRef.current.pause();
        setMusicPlaying(false);
      } else {
        audioRef.current.play().catch(() => {});
        setMusicPlaying(true);
      }
    }
  };

  return (
    <div>
      <audio ref={audioRef} src="/8-bit-gaming-background-music-358443.mp3" loop />

      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative app-container">

        <div className="absolute top-4 left-4 z-10">
          <Link to='/'>
            <button className="bg-emerald-600 p-2 rounded hover:bg-emerald-700">
              <IoMdArrowRoundBack size={24} />
            </button>
          </Link>
        </div>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-4 right-4 text-white text-2xl bg-gray-700 p-2 rounded-full hover:bg-gray-600 z-10"
        >
          {darkMode ? <BsSunFill /> : <BsMoonStarsFill />}
        </button>

        <h1 className="text-3xl font-bold mb-4">🧠 Card Clash</h1>

        <div className="mb-4 flex items-center gap-4">
          <button
            onClick={resetGame}
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            🔁 Restart
          </button>
          <button
            onClick={toggleMusic}
            className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600"
          >
            {musicPlaying ? <MdMusicNote size={24}/> : <MdMusicOff size={24}/>}
          </button>
          <div className="text-lg font-mono">Moves: {moves}</div>
        </div>

        <div className="grid grid-cols-4 gap-4">
  {cards.map((card) => (
    <div
      key={card.id}
      onClick={() => handleClick(card)}
      className={`card w-16 h-16 flex items-center justify-center text-2xl rounded shadow-lg cursor-pointer transition-all duration-200 ${
        !card.flipped ? 'text-transparent' : ''
      }`}
    >
      {card.flipped ? card.icon : "❓"}
    </div>
  ))}
</div>

{matched.length === icons.length && (
  <div className="message-box mt-6 text-2xl text-center">
    🎉 You Won!
  </div>
)}

        {matched.length === icons.length && (
          <div className="text-green-400 text-2xl font-bold mt-6">🎉 You Won!</div>
        )}
      </div>
    </div>
  );
}

export default MemoryGame;
