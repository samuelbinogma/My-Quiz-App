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

  const handleStartQuiz = async (config) => {
    setQuizStarted(true);
    setLoadingQuestions(true);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setQuizFinished(false)
  
  // Building the API URL with user's choices
    const apiURL = `https://opentdb.com/api.php?amount=${config.amount}&category=${config.category}
      &difficulty=${config.difficulty}&type=multiple`;

    try {
      const response = await fetch(apiURL);
      if (!response.ok) throw new Error('Failed to fetch questions');

      const data = await response.json();

      if (data.response_code !== 0) {
        throw new Error('No questions found for this selection. Try different options');
      }

      setQuestions(data.results);
      setLoadingQuestions(false);
    } catch (err) {
      setError(err.message);
      setLoadingQuestions(false);
      setQuizStarted(false);
    }
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer(null);
  };

  let mainContent;

  if (loading) {
    mainContent = <p>Loading categories...</p>;
  } else if (error) {
    mainContent = <p className='error'>Error: {error}</p>;
  } else if (!quizStarted) {
    mainContent = <QuizStart categories={categories} onStartQuiz={handleStartQuiz} />
  } else if (loadingQuestions) {
    mainContent = <p>Loading questions...</p>;
  } else if (quizFinished) {
    mainContent = <p>Quiz finished! Next is the results page.</p>;
  } else {
    const currentQuestion = questions[currentQuestionIndex];

    mainContent = (
      <div className='quiz-active'>
        <div className='progress'>
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <h2 dangerouslySetInnerHTML={{ __html: currentQuestion.question }}></h2>
        <p>Score: {score}</p>
        <p>Select an answer below (would be building it later!)</p>
      </div>
    )
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

        {/* {!quizStarted ? (
          <QuizStart categories={categories} onStartQuiz={handleStartQuiz}/>
        ) : (
          <p>Quiz is starting soon! </p>
        )} */}

        {mainContent}
      </main>
    </div>
  );
}

export default App