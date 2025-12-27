import { Link, useLocation} from 'react-router-dom';

function Navbar() {
    const location = useLocation();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to='/' className='navbar-logo'>
                    <h2>QuizMaster</h2>
                </Link>

                <div className='navbar-links'>
                    {location.pathname === '/' ? (
                        <>
                            <Link to="/login" className="nav-btn">Login</Link>
                            <Link to="/signup" className="nav-btn signup">Sign Up</Link>
                        </>
                    ) : location.pathname === '/login' ? (
                        <Link to="/signup" className='nav-btn signup'>Sign Up</Link>
                    ) : location.pathname === '/signup' ? (
                        <Link to="/login" className="nav-btn">Login</Link>
                    ) : (
                        <Link to='/' className='nav-btn'>Home</Link>
                    )} 
                </div>
            </div>
        </nav>
    )
}