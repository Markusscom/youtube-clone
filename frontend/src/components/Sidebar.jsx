import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <nav>
                <Link to="/" className="sidebar-link">Home</Link>
                <Link to="/trending" className="sidebar-link">Trending</Link>
                <Link to="/subscriptions" className="sidebar-link">Subscriptions</Link>
            </nav>
        </aside>
    );
}
