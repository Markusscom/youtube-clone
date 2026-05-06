import { useState } from 'react';
import api from '../logic/api';
import { useNavigate } from 'react-router-dom';

export default function AuthForms() {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ name: '', email: '', password: '', password_confirmation: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const endpoint = isLogin ? '/login' : '/register';
            const response = await api.post(endpoint, formData);
            if (isLogin) {
                localStorage.setItem('token', response.data.token);
                navigate('/');
            } else {
                setIsLogin(true);
            }
        } catch (error) {
            console.error('Auth error', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {!isLogin && <input type="text" placeholder="Name" onChange={e => setFormData({...formData, name: e.target.value})} />}
            <input type="email" placeholder="Email" onChange={e => setFormData({...formData, email: e.target.value})} />
            <input type="password" placeholder="Password" onChange={e => setFormData({...formData, password: e.target.value})} />
            {!isLogin && <input type="password" placeholder="Confirm Password" onChange={e => setFormData({...formData, password_confirmation: e.target.value})} />}
            <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
            <button type="button" onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Switch to Register' : 'Switch to Login'}</button>
        </form>
    );
}
