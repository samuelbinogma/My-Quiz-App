import { useState, useEffect } from 'react'
import './styles/global.css'
import QuizStart from './components/QuizStart';
import './styles/QuizStart.css';
import './styles/QuestionCard.css'
import QuestionCard from './components/QuestionCard';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
    </div>
  )
}

export default App