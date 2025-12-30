import { Link, useLocation} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
    const { currentUser, logout } = useAuth();

    const handleLogout = async () => {
        try {
            await logout();
            alert('Logged out successfully!');
        } catch (error) {
            alert('Logout failed: ' + error.message);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to='/' className='navbar-logo'>
                    <h2>QuizMaster</h2>
                </Link>

                <div className='navbar-links'>
                    {currentUser ? (
                        <>
                            <span className='nav-text'>
                                Hello, {currentUser.email}
                            </span>
                            <Link to='/quiz' className='nav-btn'>
                                Play Quiz
                            </Link>
                            <button onClick={handleLogout} className="nav-btn logout">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className='nav-btn'>Login</Link>
                            <Link to="/signup" className='nav-btn signup'>Sign Up</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;