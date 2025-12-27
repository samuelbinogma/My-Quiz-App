import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="home-page">
            <div className="hero">
                <h1>Welcome to QuizMaster</h1>
                <p>Test your knowledge with thousands of fun trivia questions!</p>
                <div className="hero-buttons">
                    <Link to="/login" className="hero-btn primary">Login to Play</Link>
                    <Link to="/signup" className="hero-btn secondary">Create Free Account</Link>
                </div>
            </div>

            <div className="features">
                <div className="feature">
                    <h3>Thousands of Questions</h3>
                    <p>From science to pop culture - something for everyone</p>
                </div>
                <div className="feature">
                    <h3>Track your Progress</h3>
                    <p>See your scores and improve over time</p>
                </div>
                <div className="feature">
                    <h3>Play Anytime</h3>
                    <p>No downloads needed - just open and play</p>
                </div>
            </div>
        </div>
    )
}

export default Home;