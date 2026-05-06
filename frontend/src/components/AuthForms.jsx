import { useState } from 'react';
import api from '../logic/api';
import { useNavigate } from 'react-router-dom';

export default function AuthForms() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', password_confirmation: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const endpoint = isLogin ? '/login' : '/register';
            const response = await api.post(endpoint, formData);
            if (isLogin) {
                localStorage.setItem('token', response.data.token);
                navigate('/');
            } else {
                alert('Registration successful! Please login.');
                setIsLogin(true);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred.');
        }
    };

    return (
        <div className="auth-container" style={{maxWidth: '400px', margin: '0 auto', padding: '20px'}}>
            <h2>{isLogin ? 'Login' : 'Register'}</h2>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                {!isLogin && <input type="text" placeholder="Name" required onChange={e => setFormData({...formData, name: e.target.value})} />}
                <input type="email" placeholder="Email" required onChange={e => setFormData({...formData, email: e.target.value})} />
                <input type="password" placeholder="Password" required onChange={e => setFormData({...formData, password: e.target.value})} />
                {!isLogin && <input type="password" placeholder="Confirm Password" required onChange={e => setFormData({...formData, password_confirmation: e.target.value})} />}
                <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
                <button type="button" onClick={() => { setIsLogin(!isLogin); setError(null); }}>
                    {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
                </button>
            </form>
        </div>
    );
}
