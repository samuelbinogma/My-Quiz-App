import { useState, useEffect } from 'react'

function QuestionCard({
    question,
    score,
    currentQuestionIndex,
    totalQuestions, 
    onAnswerSelected,
    onNextQuestion,
}) {
    const [shuffledAnswers, setShuffledAnswers] = useState([]);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showNextButton, setShowNextButton] = useState(false)

    useEffect(() => {
        setSelectedAnswer(null);
        setShowNextButton(false);

        const correct = question.correct_answer;
        const incorrect = question.incorrect_answers;
        const all = [correct, ...incorrect];

        const shuffled = [...all].sort(() => Math.random() - 0.5);
        setShuffledAnswers(shuffled);
    }, [question]);

    const handleAnswerClick = (answer) => {
        if (selectedAnswer !== null) return;

        setSelectedAnswer(answer);

        onAnswerSelected(answer, question.correct_answer);

        setTimeout(() => {
        setShowNextButton(true);
            }, 1000)
    };

    if (!question) {
        return <div>Loading question...</div>
    }

    return (
        <div className='question-card'>
            <div className='progress-bar'>
                <div className='progress-text'>
                    <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                    <span>Score: {score}</span>
                </div>
            </div>

            <div className='question-text'
                dangerouslySetInnerHTML={{ __html: question.question }}
            />

            <div className="answers-container">
                {shuffledAnswers.map((answer, index) => (
                    <button
                        key={index}
                        className={`answer-btn
                            ${selectedAnswer === answer ? 'selected' : ''}
                            ${selectedAnswer && answer === question.correct_answer ? 'correct' : ''}
                            ${selectedAnswer && answer !== question.correct_answer && selectedAnswer === answer ? 'incorrect' : ''}
                        `}

                        onClick={() => handleAnswerClick(answer)}
                        dangerouslySetInnerHTML={{ __html: answer }}
                        disabled={selectedAnswer !== null}    
                    />
                ))}
            </div>

            {showNextButton && (
                <button className='next-button' onClick={onNextQuestion}>
                    Next Question
                </button>
            )};

            {/* {isAnswered && question.correct_answer && (
                <div className="explanation">
                    <strong>Correct Answer:</strong>
                    <span dangerouslySetInnerHTML={{ __html: question.correct_answer}} />
                    {question.correct_answer !== selectedAnswer && selectedAnswer && (
                        <span> (You picked: <span dangerouslySetInnerHTML={{ __html: selectedAnswer}}/>)</span>
                    )}
                </div>
            )} */}
        </div>
    );
}

export default QuestionCard