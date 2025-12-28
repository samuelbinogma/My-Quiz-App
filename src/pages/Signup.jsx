import { Link, useNavigate } from 'react-router-dom'

function Signup() {
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        navigate('/quiz')
    };

    return (
        <div className='auth-page'>
            <div className='auth-card'>
                <h2>Create Your Account</h2>
                <p>Join thousands of quiz lovers</p>

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input 
                            type="text"
                            id='name'
                            placeholder='Jason Momoa'
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id='email'
                            placeholder='jasonmomoa@gmail.com'
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id='password'
                            placeholder='********'
                            required
                        />
                    </div>

                    <button type="submit" className="auth-button">
                        Sign Up
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account? <Link to="/login">Log In</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;