import { useEffect, useState } from 'react';
import api, { BACKEND_URL } from '../logic/api';
import { Link } from 'react-router-dom';

export default function VideoFeed() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        api.get('/videos').then(res => setVideos(res.data));
    }, []);

    return (
        <div className="video-grid">
            {videos.map(video => (
                <div key={video.id} className="video-card">
                    <Link to={`/video/${video.id}`} style={{textDecoration: 'none', color: 'inherit'}}>
                        {video.thumbnail_url && video.thumbnail_url.length > 0 ? (
                            <img 
                                src={`${BACKEND_URL}${video.thumbnail_url}`} 
                                alt={video.title} 
                                className="thumbnail" 
                            />
                        ) : (
                            <div style={{background:'#eee', height:'160px', borderRadius:'12px', display:'flex', alignItems:'center', justifyContent:'center'}}>No Thumbnail</div>
                        )}
                        <h3 className="video-title">{video.title}</h3>
                        <p className="channel-name">{video.user?.name || 'Channel'}</p>
                    </Link>
                </div>
            ))}
        </div>
    );
}
