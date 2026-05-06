import { useState } from 'react';
import api from '../logic/api';
import { useNavigate } from 'react-router-dom';

export default function UploadVideo() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('video', file);

        await api.post('/videos', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        navigate('/');
    };

    return (
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', margin: '0 auto'}}>
            <input type="text" placeholder="Title" required onChange={e => setTitle(e.target.value)} />
            <textarea placeholder="Description" onChange={e => setDescription(e.target.value)} />
            <input type="file" accept="video/*" required onChange={e => setFile(e.target.files[0])} />
            <button type="submit">Upload</button>
        </form>
    );
}
