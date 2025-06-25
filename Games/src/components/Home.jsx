import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdMusicNote, MdMusicOff } from "react-icons/md";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs"; // Light/Dark mode icons

function Home() {
  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // Dark mode state

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.log("Autoplay prevented:", err);
      });
    }
  }, []);

  useEffect(() => {
    // Apply/remove dark mode class to <body>
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  const toggleMute = () => {
    if (audioRef.current) {
      const newMuteState = !isMuted;
      audioRef.current.muted = newMuteState;
      setIsMuted(newMuteState);
    }
  };

  return (
    <div className="min-h-screen app-container text-white p-6 relative transition-all duration-300">
      {/* 🔊 Background Music */}
      <audio
        ref={audioRef}
        src="/if-i-really-need-you-lofi-beat-121610.mp3"
        loop
        autoPlay
      />

      {/* 🎵 Music Toggle */}
      <button
        onClick={toggleMute}
        className="absolute top-4 right-4 text-white text-2xl bg-gray-700 p-2 rounded-full hover:bg-gray-600 z-10"
      >
        {isMuted ? <MdMusicOff /> : <MdMusicNote />}
      </button>

      {/* 🌞🌙 Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 left-4 text-white text-2xl bg-gray-700 p-2 rounded-full hover:bg-gray-600 z-10"
      >
        {darkMode ? <BsSunFill /> : <BsMoonStarsFill />}
      </button>

      {/* Header */}
      <h1 className="text-4xl font-bold text-center mb-10">Game Hub</h1>
      <p
        className={`text-xl md:text-2xl text-center italic mt-2 mb-12 ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}
      >
        "Where Fun Meets Focus!"
      </p>

      {/* 🎮 Game Cards */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 mt-20">
        {/* Tic Tac Toe */}
        <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-lg m-10">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFQg0kolxc1eNTMrXMntAkN5E7KW6O2xQAEA&s"
            alt="Tic Tac Toe"
            className="w-48 h-48 object-cover rounded mb-4"
          />
          <Link to="/tictac" className="bg-blue-500 px-6 py-2 rounded hover:bg-blue-600">
            Play Tic Tac Toe
          </Link>
        </div>

        {/* Typing Speed Test */}
        <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-lg m-10">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgzyT5gXOm3TMKBfPf2a6cbs4xLQ_ji0m-xQ&s"
            alt="Typing Speed Test"
            className="w-48 h-48 object-cover rounded mb-4"
          />
          <Link to="/Typing" className="bg-green-500 px-6 py-2 rounded hover:bg-green-600">
            Typing Master
          </Link>
        </div>

        {/* Memory Game */}
        <div className="flex flex-col items-center bg-gray-800 p-4 rounded-lg shadow-lg m-10">
          <img
            src="data:image/png;base64,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"
            alt="Memory Flip Game"
            className="w-48 h-48 object-cover rounded mb-4"
          />
          <Link to="/Memory" className="bg-purple-500 px-6 py-2 rounded hover:bg-purple-600">
            Card Clash
          </Link>
        </div>
      </div>
      <footer className="text-center mt-12 text-sm text-gray-400">
  Made with ❤️ by <a href="https://your-portfolio-link.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Balaji S</a>
</footer>

<Link to="/about" className="absolute bottom-4 left-4 text-xs text-white bg-gray-700 px-3 py-1 rounded hover:bg-gray-600">
  About Developer
</Link>

    </div>
  );
}

export default Home;
