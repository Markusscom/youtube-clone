import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/header.jsx';
import AuthForms from './components/AuthForms.jsx';
import VideoFeed from './components/VideoFeed.jsx';
import VideoDetail from './components/VideoDetail.jsx';
import UploadVideo from './components/UploadVideo.jsx';

function App()
{
    return (
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<VideoFeed />} />
          <Route path="/auth" element={<AuthForms />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/upload" element={<UploadVideo />} />
        </Routes>
      </BrowserRouter>
    )
}

export default App;