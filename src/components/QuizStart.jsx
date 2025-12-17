import { useState } from 'react';

function QuizStart({ categories, onStartQuiz }) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
    const [numberOfQuestions, setnumberOfQuestions] = useState(10);

    // Function for when yser clicks "Start Quiz"
    const handleStart = () => {
        if (!selectedCategory) {
            alert('Please select a category!');
            return;
        }

        // Sends the choices to the parent (App.jsx)
        onStartQuiz({
        category: selectedCategory,
        difficulty: selectedDifficulty,
        amount: numberOfQuestions,
    });
    };

    return (
        <div className="quiz-start">
            <h2>Configure Your Quiz</h2>


            {/* Category Selection Section */}
            <div className="form-group">
                <label htmlFor="category">Choose a Category:</label>
                <select 
                    name="category" 
                    id="category"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">-- Select a category --</option>
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
                </select>
            </div>
            

            {/* Difficulty Selection Section */}
            <div className="form-group">
                <label htmlFor="difficulty">Difficulty:</label>
                <select 
                    name="difficulty" 
                    id="difficulty"
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>

            {/* BNumber of Questions Selection Section */}
            <div className="form-group">
                <label htmlFor="amount">Number of Questions:</label>
                <select 
                    name="amount" 
                    id="amount"
                    value={numberOfQuestions}
                    onChange={(e) => setnumberOfQuestions(Number(e.target.value))}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                </select>
            </div>


            {/* Start Button */}
            <button className='start-button' onClick={handleStart}>
                Start Quiz
            </button>
        </div>
    );
}

export default QuizStart;
