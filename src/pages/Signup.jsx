import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Signup() {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            console.log('Trying to sign up with:', email);  // Temporary log
            Signup(email, password);
            console.log('Signup success!');  // If this logs, user created
            navigate('/quiz');
        } catch (error) {
            console.error('Signup failed:', error);  // Check console!
            console.error('Error code:', error.code);
            console.error('Error message:', error.message);
            alert('Signup failed: ' + error.message);
        }
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