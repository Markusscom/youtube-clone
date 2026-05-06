import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../logic/api';

export default function VideoDetail() {
    const { id } = useParams();
    const [video, setVideo] = useState(null);

    useEffect(() => {
        api.get(`/videos/${id}`).then(res => setVideo(res.data));
    }, [id]);

    const handleLike = () => {
        api.post(`/videos/${id}/like`);
    };

    const handleSubscribe = () => {
        api.post(`/channels/${video.user_id}/subscribe`);
    };

    if (!video) return <div>Loading...</div>;

    return (
        <div className="video-detail">
            <h1>{video.title}</h1>
            <video src={video.video_url} controls width="100%" />
            <p>{video.description}</p>
            <button onClick={handleLike}>Like</button>
            <button onClick={handleSubscribe}>Subscribe</button>
        </div>
    );
}
