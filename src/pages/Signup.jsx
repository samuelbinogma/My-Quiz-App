import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

function Signup() {
    const { signup } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value.trim();
        const password = e.target.password.value;

        if (!email || !password) {
            alert('Please fill in all fields');
            return;
        }

        setLoading(true);

        try {
            await signup(email, password);
            alert('Account created successfully!');
            navigate('/quiz');
        } catch (error) {
            console.error('Signup failed:', error); 
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
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id='email'
                            placeholder='jasonmomoa@gmail.com'
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input 
                            type="password"
                            id='password'
                            placeholder='********'
                            required
                            minLength="8"
                            disabled={loading}
                        />
                    </div>

                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? 'Creating Account...' : 'Sign Up'}
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