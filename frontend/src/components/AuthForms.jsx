import { useState } from 'react';
import api from '../logic/api';
import { useNavigate } from 'react-router-dom';

export default function AuthForms() {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', password_confirmation: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            if (isLogin) {
                const res = await api.post('/login', { email: formData.email, password: formData.password });
                localStorage.setItem('token', res.data.token);
                window.location.href = '/'; 
            } else {
                await api.post('/register', formData);
                alert('Account created! Please login.');
                setIsLogin(true);
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Authentication failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-form">
            <h2>{isLogin ? 'Login' : 'Create Account'}</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit}>
                {!isLogin && <input type="text" placeholder="Name" required onChange={e => setFormData({...formData, name: e.target.value})} />}
                <input type="email" placeholder="Email" required onChange={e => setFormData({...formData, email: e.target.value})} />
                <input type="password" placeholder="Password" required onChange={e => setFormData({...formData, password: e.target.value})} />
                {!isLogin && <input type="password" placeholder="Confirm Password" required onChange={e => setFormData({...formData, password_confirmation: e.target.value})} />}
                <button type="submit" disabled={loading}>{loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}</button>
            </form>
            <button className="link-button" onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Register now' : 'Login instead'}</button>
        </div>
    );
}
