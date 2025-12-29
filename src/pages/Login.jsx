import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        try {
            await login(email, password);
            navigate('/quiz');
        } catch (error) {
            let message = 'Something went wrong. Try again.';

            if (error.code === 'auth/invalid-credential') {
                message = 'Incorrect email or password.';
            } else if (error.code === 'auth/email-already-in-use') {
                message = 'This email is already registered. Try logging in.';
            } else if (error.code === 'auth/weak-password') {
                message = 'Password should be at least 6 characters.';
            } else if (error.code === 'auth/network-request-failed') {
                message = 'Network error. Check your internet connection.';
            } else {
                message = error.message;
            }

            alert(message);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Welcome Back!</h2>
                <p>Log in to start quizzes</p>

                <form onSubmit={handleSubmit} className='auth-form'>
                    <div className="form-group">
                        <label>Email</label>
                        <input type="text" name='email' required />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name='password' required />
                    </div>
                    <button type='submit' className='auth-button'>
                        Login
                    </button>
                </form>

                <p className='auth-footer'>
                    No account? <Link to='/signup'>Sign Up</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;