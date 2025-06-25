import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-900 text-white px-6 py-10">
        <Link to='/'>
      <button className="absolute top-4 left-4 z-10 bg-emerald-600 py-2 px-4 rounded hover:bg-emerald-700">Back</button>
      </Link>
      <h1 className="text-3xl md:text-4xl font-bold mb-4">About the Developer</h1>

      <p className="max-w-xl text-lg mb-4">
        Hi, I'm <span className="text-blue-400 font-semibold">Balaji S</span>, a passionate Full Stack Developer currently studying at Kalvium. I love building fun, interactive web applications that not only entertain but also sharpen skills.
      </p>

      <p className="max-w-xl text-lg mb-4">
        This project, <span className="text-purple-400 italic">Game Hub</span>, is a collection of mini-games like Tic Tac Toe, Typing Speed Test, and Card Clash — built using <span className="text-yellow-300">React</span>, <span className="text-green-300">Tailwind CSS</span>, and other modern web tools.
      </p>

      <p className="max-w-xl text-lg mb-6">
        The goal of this project is to blend learning and fun, and to showcase how powerful and beautiful React apps can be.
      </p>

      <div className="space-x-4">
        <a
          href="https://github.com/balaji206"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black px-4 py-2 rounded hover:bg-gray-200"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/balaji-s-486b53318/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}

export default About;
