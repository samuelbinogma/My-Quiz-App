import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import QuizStart from '../components/QuizStart';
import QuestionCard from '../components/QuestionCard';
import '../styles/global.css'
import '../styles/QuizStart.css'
import '../styles/QuestionCard.css'

function QuizPage() {
    const { currentUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser, navigate])

    if (!currentUser) {
        return (
            <div className="loading-screen">
                <p>Redirecting to login...</p>
            </div>
        );
    }


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

    const [isAnswered, setIsAnswered] = useState(false)

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
        setQuizFinished(false);
        setIsAnswered(false);
    
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

    const handleSelectedAnswer = (answer) => {
        setSelectedAnswer(answer);
        setIsAnswered(true);

        if (answer === questions[currentQuestionIndex].correct_answer) {
        setScore(score + 1);
        }
    };

    const goToNextQuestion = () => {
        if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
        } else {
        setQuizFinished(true)
        }
    };

    const restartQuiz = () => {
        setQuizStarted(false);
        setQuizFinished(false);
        setCurrentQuestionIndex(0);
        setScore(0);
        setQuestions([]);
    };

    // Saving the score to Firebase/Firestore when quiz ends
    useEffect(() => {
        if (quizFinished && currentUser && questions.length > 0) {
            const saveScore = async () => {
                try {
                    await addDoc(collection(db, 'scores'), {
                        userId: currentUser.uid,
                        userEmail: currentUser.email,
                        score: score,
                        total: questions.length,
                        percentage: Math.round((score / questions.length) * 100),
                        category: questions[0]?.category || 'Unknown',
                        difficulty: questions[0]?.difficulty || 'Unknown',
                        timestamp: new Date(),
                    });
                    console.log('Score saved to Firestore!')
                } catch (err) {
                    console.error('Failed to save score:', err)
                }
            };
            saveScore();
        }
    }, [quizFinished, currentUser, questions, score]);


    let mainContent; 

    if (loadingCategories) {
        mainContent = <p>Loading categories...</p>
    } else if (error) {
        mainContent = <p className='error'>Error: {error}</p>;
    } else if (!quizStarted) {
        mainContent = <QuizStart categories={categories} onStartQuiz={handleStartQuiz} />
    } else if (loadingQuestions) {
        mainContent = <p>Loading questions...</p>;
    } else if (quizFinished) {
        const percentage = Math.round((score / questions.length) * 100);

        mainContent = (
            <div className="quiz-finished">
                <h2>Quiz Completed!</h2>
                <div className="final-score">
                    <p>
                        Your Score: <strong>{score} / {questions.length}</strong>
                    </p>
                    <p className='percentage'>{percentage}%</p>
                    <p>
                        {percentage >= 80
                            ? 'Excellent'
                            : percentage >= 60
                            ? 'Very Good'
                            : percentage >= 40
                            ? 'Not bad! Keep trying!'
                            : 'Practice more!'
                        }
                    </p>
                </div>
                <button className='restart-button' onClick={restartQuiz}>
                    Play Again
                </button>
            </div>
        );
    } else {
        mainContent = (
            <QuestionCard 
                question={questions[currentQuestionIndex]}
                onAnswerSelected={handleAnswerSelected}
                onNextQuestion={goToNextQuestion}
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={questions.length}
                score={score}
            />
        );
    }

    return (
        <div className="quiz-app">
        <main className="main">
            {mainContent}
        </main>
        </div>
    );
}

export default QuizPage;