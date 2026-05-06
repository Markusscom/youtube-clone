import { useState } from 'react';
import api from '../logic/api';
import { useNavigate } from 'react-router-dom';

export default function UploadVideo() {
    const [formData, setFormData] = useState({ title: '', description: '', video_url: '', thumbnail_url: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await api.post('/videos', formData);
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Title" onChange={e => setFormData({...formData, title: e.target.value})} />
            <textarea placeholder="Description" onChange={e => setFormData({...formData, description: e.target.value})} />
            <input type="text" placeholder="Video URL" onChange={e => setFormData({...formData, video_url: e.target.value})} />
            <input type="text" placeholder="Thumbnail URL" onChange={e => setFormData({...formData, thumbnail_url: e.target.value})} />
            <button type="submit">Upload</button>
        </form>
    );
}
