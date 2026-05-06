import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header.jsx';
import Sidebar from './components/Sidebar.jsx';
import AuthForms from './components/AuthForms.jsx';
import VideoFeed from './components/VideoFeed.jsx';
import VideoDetail from './components/VideoDetail.jsx';
import UploadVideo from './components/UploadVideo.jsx';

function App() {
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

    return (
        <BrowserRouter>
            <div className="layout">
                <Header toggleTheme={toggleTheme} />
                <Sidebar />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<VideoFeed />} />
                        <Route path="/auth" element={<AuthForms />} />
                        <Route path="/video/:id" element={<VideoDetail />} />
                        <Route path="/upload" element={<UploadVideo />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;