import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import TicTacToe from './components/tictac'
import TypingSpeed from './components/Typingspeed'
import Memorygame from './components/Memorygame'
import About from './components/About'
import { Routes,Route } from 'react-router-dom'
function App() {


  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/tictac' element={<TicTacToe/>}/>
        <Route path='/Typing' element={<TypingSpeed/>}/>
        <Route path='/Memory' element={<Memorygame/>}/>
      </Routes>
    </div>
  )
}

export default App
