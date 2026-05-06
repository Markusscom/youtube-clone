import { useState } from 'react';
import api from '../logic/api';
import { useNavigate } from 'react-router-dom';

export default function UploadVideo() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) return setError('Please select a video file.');
        
        setLoading(true);
        setError(null);
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('video', file);

        try {
            await api.post('/videos', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            navigate('/');
        } catch (err) {
            setError('Upload failed. Please check your network and file size.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="upload-container">
            <h2>Upload Video</h2>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmit} className="upload-form">
                <input type="text" placeholder="Title" required onChange={e => setTitle(e.target.value)} />
                <textarea placeholder="Description" onChange={e => setDescription(e.target.value)} />
                <input type="file" accept="video/mp4,video/mov,video/avi" required onChange={e => setFile(e.target.files[0])} />
                <button type="submit" disabled={loading}>{loading ? 'Uploading...' : 'Upload Video'}</button>
            </form>
        </div>
    );
}
