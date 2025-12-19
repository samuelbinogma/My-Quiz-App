import { useState, useEffect } from 'react'
import './styles/global.css'
import QuizStart from './components/QuizStart';
import './styles/QuizStart.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // New States for the quiz

  const [quizStarted, setQuizStarted] = useState(false);
  // To hold the fetched questions
  const [questions, setQuestions] = useState([]);
  //Shows loading while fetching questions
  const [loadingQuestions, setLoadingQuestions] = useState(false) 
  // To know which question we are on 
  const [ currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // Shows user's choice for the current question
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  // Number of correct answers so far
  const [score, setScore] = useState(0);
  // This sets to true when all questions are answered
  const [quizFinished, setQuizFinished] = useState(false)

  // This to fetch categories on start of the app
  useEffect(() => {
    //Fetch trivia categories
    fetch('https://opentdb.com/api_category.php')
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch categories');
        return response.json();
      })
      .then(data => {
        setCategories(data.trivia_categories);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false)
      })
  }, []);

  const handleStartQuiz = (config) => {
    setQuizStarted(true);
    setLoadingQuestions(true);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setQuizFinished(false)
  };
  
  // Building the API URL with user's choices

  if (loading) {
    return (
      <div className='app'>
        <header className='header'>
          <h1>Quiz App</h1>
        </header>
        <main className='main'>
          <p>Loading categories...</p>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <header className="header">
          <h1>Quiz App</h1>
        </header>
        <main className="main">
          <p className="error">Error: {error}</p>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Quiz App</h1>
      </header>
      <main className="main">
        {/* <h2>Available Categories</h2>
        <ul className="category-list">
          {categories.map(cat => (
            <li key={cat.id} className="category-item">
              {cat.name}
            </li>
          ))}
        </ul>
        <p>{categories.length}categories loaded successfully</p> */}

        {!quizStarted ? (
          <QuizStart categories={categories} onStartQuiz={handleStartQuiz}/>
        ) : (
          <p>Quiz is starting soon! </p>
        )}
      </main>
    </div>
  );
}

export default App