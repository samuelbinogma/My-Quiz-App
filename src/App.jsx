import './styles/global.css'
import './styles/QuizStart.css';
import './styles/QuestionCard.css'
import Navbar from './components/Navbar';
import { Routes, Route, Outlet } from 'react-router-dom';
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import QuizPage from './pages/QuizPage.jsx'

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className='main-content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path='quiz' element={<QuizPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App