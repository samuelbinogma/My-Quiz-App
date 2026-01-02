import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

function Navbar() {
    const { currentUser, logout } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const handleLogout = async () => {
        try {
            await logout();
            setMobileMenuOpen(false);
            alert('Logged out successfully!');
        } catch (error) {
            alert('Logout failed: ' + error.message);
        }
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen)
    }

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link className='navbar-logo'>
                    <h2>QueryPopQuiz</h2>
                </Link>

                {/* Hamburger Button for mobile only */}
                <button
                    className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}
                    onClick={toggleMobileMenu}
                    aria-label='Toggle menu'
                    aria-expanded={mobileMenuOpen}
                >
                    <span className='hamburger-line'></span>
                    <span className='hamburger-line'></span>
                    <span className='hamburger-line'></span>
                </button>

                <div className={`navbar-links ${mobileMenuOpen ? 'open' : ''}`}>
                    {currentUser ? (
                        <>
                            <span className='nav-text mobile-greeting'>
                                Hello, {currentUser.email}
                            </span>
                            <Link to='/quiz' className='nav-btn' onClick={() => setMobileMenuOpen(false)}>
                                Play Quiz
                            </Link>
                            <Link to='/dashboard' className='nav-btn' onClick={() => setMobileMenuOpen(false)}>
                                My History
                            </Link>
                            <button onClick={handleLogout} className="nav-btn logout">
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className='nav-btn' onClick={() => setMobileMenuOpen(false)}>
                                Login
                            </Link>
                            <Link to="/signup" className='nav-btn signup' onClick={() => setMobileMenuOpen(false)}>
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;