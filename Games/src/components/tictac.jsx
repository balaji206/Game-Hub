import React, { useState, useRef, useEffect } from 'react';
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdMusicOff, MdMusicNote } from "react-icons/md";
import { BsSunFill, BsMoonStarsFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [winner, setWinner] = useState(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // local toggle
  const audioRef = useRef(null);

  useEffect(() => {
    let interval;
    if (gameStarted && !winner) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [gameStarted, winner]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const formatTime = (s) => {
    const min = Math.floor(s / 60);
    const sec = s % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const startGame = () => {
    setGameStarted(true);
    setSeconds(0);
    if (audioRef.current) {
      audioRef.current.play();
      setMusicPlaying(true);
    }
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicPlaying) {
      audioRef.current.pause();
      setMusicPlaying(false);
    } else {
      audioRef.current.play();
      setMusicPlaying(true);
    }
  };

  const checkWinner = (newBoard) => {
    const winPatterns = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return newBoard[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || winner || !gameStarted) return;
    const newBoard = [...board];
    newBoard[index] = isXTurn ? 'X' : 'O';
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
    const win = checkWinner(newBoard);
    if (win) {
      setWinner(win);
    } else if (!newBoard.includes(null)) {
      setWinner("Tie");
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setWinner(null);
    setSeconds(0);
  };

  return (
    <div className={darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}>
      <audio ref={audioRef} src="/roblox-minecraft-fortnite-video-game-music-358426.mp3" loop />
      <div className="min-h-screen flex flex-col items-center justify-center p-6 relative transition-all duration-300">
        
        {/* Top buttons */}
        <div className="absolute top-4 left-4 z-10 flex gap-3">
          <Link to='/'>
            <button className="bg-emerald-600 p-2 rounded hover:bg-emerald-700">
              <IoMdArrowRoundBack size={24} />
            </button>
          </Link>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="text-white p-3 rounded-full bg-gray-700 hover:bg-gray-600 z-10"
          >
            {darkMode ? <BsSunFill /> : <BsMoonStarsFill />}
          </button>
        </div>

        {!gameStarted ? (
          <button
            onClick={startGame}
            className="mt-20 mb-6 bg-green-600 px-6 py-3 rounded hover:bg-green-700"
          >
            Start Game
          </button>
        ) : (
          <>
            <div className="flex gap-4 items-center mb-4 mt-20">
              <button
                onClick={toggleMusic}
                className="bg-yellow-500 px-4 py-2 rounded hover:bg-yellow-600"
              >
                {musicPlaying ? <MdMusicNote size={24} /> : <MdMusicOff size={24} />}
              </button>
              <div className="text-xl font-mono">
                Timer: ⏱ {formatTime(seconds)}
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-4">Tic Tac Toe</h1>

            {winner ? (
              <h2 className="text-2xl font-semibold mb-4">
                {winner === "Tie" ? "It's a Tie! 🤝" : `${winner} wins! 🎉`}
              </h2>
            ) : (
              <h2 className="text-xl mb-4">Turn: {isXTurn ? 'X' : 'O'}</h2>
            )}

            <div className="grid grid-cols-3 gap-2 mb-6">
              {board.map((cell, index) => (
                <button
                  key={index}
                  onClick={() => handleClick(index)}
                  className={`w-20 h-20 text-3xl font-bold border-2 rounded ${
                    darkMode
                      ? "bg-gray-800 border-gray-600 hover:bg-gray-700"
                      : "bg-gray-100 border-gray-400 hover:bg-gray-200"
                  }`}
                >
                  {cell}
                </button>
              ))}
            </div>

            <button
              onClick={resetGame}
              className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
            >
              Reset Game
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default TicTacToe;
