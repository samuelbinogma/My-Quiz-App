import { useState, useEffect } from 'react'

function QuestionCard({
    question,
    score,
    currentQuestionIndex,
    totalQuestions, 
    onAnswerSelected,
    onNextQuestion,
    selectedAnswer,
    isCorrectAnswer,
    isAnswered
}) {
    const [shuffledAnswers, setShuffledAnswers] = useState([]);

    useEffect(() => {
        const correctAnswer = question.correct_answer;
        const incorrectAnswers = question.incorrect_answers;
        const allAnswers = [correctAnswer, ...incorrectAnswers];

        const shuffled = allAnswers.sort(() => Math.random() - 0.5);
        setShuffledAnswers(shuffled);
    }, [question]);

    const handleAnswerClick = (answer) => {
        onAnswerSelected(answer);
    };

    if (!question) {
        return <div>Loading question...</div>;
    }

    return (
        <div className='question-card'>
            <div className='progress-bar'>
                <div className='progress-text'>
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                </div>
                <div className="progress-fill"
                    style={{ width: `${((currentQuestionIndex +1) / totalQuestions) * 100}%` }}  >
                </div>
            </div>

            <h2 className='question-text'
                dangerouslySetInnerHTML={{ __html: question.question }}>
            </h2>
            <div className="current-score">
                Score: {score} / {currentQuestionIndex} answered
            </div>

            <div className="answers-container">
                {shuffledAnswers.map((answer, index) => (
                    <button
                        key={index}
                        className={`answer-btn
                            ${selectedAnswer === answer ? 'selected' : ''}
                            ${isAnswered && answer === question.correct_answer ? 'correct' : ''}
                            ${isAnswered && selectedAnswer === answer && answer !== question.correct_answer ? 'wrong' : ''}`}
                        onClick={() => handleAnswerClick(answer)}
                        dangerouslySetInnerHTML={{ __html: answer }}
                        disabled={isAnswered}    
                    >
                    </button>
                ))}
            </div>

            {isAnswered && (
                <button className='next-button' onClick={onNextQuestion}>
                    {currentQuestionIndex + 1 === totalQuestions ? 'Finish Quiz' : 'Next Question'}
                </button>
            )}

            
        </div>
    )
}