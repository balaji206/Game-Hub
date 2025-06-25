import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdMusicOff, MdMusicNote } from "react-icons/md";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";

const sentences = [
  "The quick brown fox jumps over the lazy dog.",
  "Typing is a skill that improves with practice.",
  "Code like there's no tomorrow.",
  "React makes UI development fun and simple.",
  "Practice makes perfect in coding."
];

function TypingSpeed() {
  const [sentence, setSentence] = useState('');
  const [words, setWords] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [started, setStarted] = useState(false);
  const [wpm, setWpm] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => resetTest(), []);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  useEffect(() => {
    let timer;
    if (started && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (started && timeLeft === 0) {
      endTest();
    }
    return () => clearInterval(timer);
  }, [started, timeLeft]);

  const resetTest = () => {
    const s = sentences[Math.floor(Math.random() * sentences.length)];
    const w = s.trim().split(/\s+/);
    setSentence(s);
    setWords(w);
    setTimeLeft(Math.ceil(w.length * 1.5));
    setCurrentWordIndex(0);
    setUserInput('');
    setWpm(null);
    setAccuracy(null);
    setStarted(false);
  };

  const startTest = () => {
    resetTest();
    setStarted(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
      setMusicPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setMusicPlaying(true);
    }
  };

  const endTest = () => {
    setStarted(false);
    const trimmedInput = userInput.trim();
    if (!trimmedInput) {
      setWpm(0);
      setAccuracy(0);
      if (audioRef.current) {
        audioRef.current.pause();
        setMusicPlaying(false);
      }
      return;
    }

    const typed = trimmedInput.split(/\s+/);
    const wpmCalc = typed.length;
    let matchCount = 0;
    const length = Math.min(userInput.length, sentence.length);
    for (let i = 0; i < length; i++) {
      if (userInput[i] === sentence[i]) matchCount++;
    }
    const accuracyCalc = length ? Math.round((matchCount / length) * 100) : 0;
    setWpm(wpmCalc);
    setAccuracy(accuracyCalc);

    if (audioRef.current) {
      audioRef.current.pause();
      setMusicPlaying(false);
    }
  };

  const handleInput = (e) => {
    const v = e.target.value;
    setUserInput(v);
    setCurrentWordIndex(v.trim().split(/\s+/).length - 1);
  };

  const renderInputHighlight = () => {
    const chars = userInput.split('').map((ch, idx) => {
      const correctChar = sentence[idx] || '';
      return (
        <span key={idx} className={ch === correctChar ? '' : 'text-red-500'}>
          {ch}
        </span>
      );
    });
    return chars;
  };

  return (
    <div className="min-h-screen app-container flex flex-col items-center justify-center p-6 relative">
      <audio ref={audioRef} src="/2021-08-30_-_Boss_Time_-_www.FesliyanStudios.com.mp3" loop />
      
      {/* Back Button */}
      <div className="absolute top-4 left-4 z-10">
        <Link to='/'>
          <button className="bg-emerald-600 p-2 rounded hover:bg-emerald-700">
            <IoMdArrowRoundBack size={24} />
          </button>
        </Link>
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="absolute top-4 right-4 text-white text-2xl bg-gray-700 p-2 rounded-full hover:bg-gray-600 z-10"
      >
        {darkMode ? <BsSunFill /> : <BsMoonStarsFill />}
      </button>

      {/* Start / Timer + Music */}
      {!started ? (
        <button
          onClick={startTest}
          className="mb-6 bg-green-600 px-6 py-3 rounded hover:bg-green-700"
        >
          Start Typing Test
        </button>
      ) : (
        <div className="flex gap-4 items-center mb-4">
          <button onClick={toggleMusic} className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600">
            {musicPlaying ? <MdMusicNote size={24} /> : <MdMusicOff size={24} />}
          </button>
          <div className="text-xl font-mono">
            Time Left: ⏱ {timeLeft}s
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-4">Typing Master</h1>

      <div className="sentence-box p-4 rounded mb-4 max-w-xl text-lg flex flex-wrap gap-2">
        {words.map((word, i) => (
          <span
            key={i}
            className={i === currentWordIndex ? 'bg-yellow-400 text-black px-1 rounded' : ''}
          >
            {word}
          </span>
        ))}
      </div>

      <div className="output w-full max-w-xl mb-4 border rounded p-3">
        {renderInputHighlight()}
      </div>

      <textarea 
        disabled={!started}
        rows="4"
        value={userInput}
        onChange={handleInput}
        className="typing-area w-full max-w-xl border p-3 rounded"
        placeholder="Start typing here..."
      />

      {wpm !== null && (
        <div className="mt-6 text-center space-y-2">
          {wpm === 0 ? (
            <div className="text-red-500 text-lg font-bold">
              ⚠️ You have not typed anything!
            </div>
          ) : (
            <>
              <div className="text-xl font-bold text-green-400">🧠 Your Speed: {wpm} WPM</div>
              <div className="text-lg">🎯 Accuracy: {accuracy}%</div>
              <div className="text-lg font-semibold">📝 Quick Tips to Improve:</div>
              <ul className="list-disc list-inside space-y-1">
                {accuracy < 90 && <li>Focus on typing slowly to reduce mistakes.</li>}
                {wpm < 30 && <li>Try typing regularly to build muscle memory.</li>}
                <li>Maintain proper hand posture and use all fingers.</li>
              </ul>
            </>
          )}
          <button
            onClick={startTest}
            className="mt-4 bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            🎮 Retake Test
          </button>
        </div>
      )}
    </div>
  );
}

export default TypingSpeed;
