import { useEffect, useState } from 'react';
import api from '../logic/api';
import { Link } from 'react-router-dom';

export default function VideoFeed() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        api.get('/videos').then(res => setVideos(res.data));
    }, []);

    return (
        <div className="video-feed">
            {videos.map(video => (
                <div key={video.id} className="video-card">
                    <Link to={`/video/${video.id}`}>
                        <img src={video.thumbnail_url} alt={video.title} />
                        <h3>{video.title}</h3>
                    </Link>
                </div>
            ))}
        </div>
    );
}
