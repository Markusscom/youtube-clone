import { Link } from 'react-router-dom';

export default function Sidebar() {
    return (
        <aside className="sidebar">
            <nav>
                <Link to="/">Home</Link>
                <Link to="/trending">Trending</Link>
                <Link to="/subscriptions">Subscriptions</Link>
            </nav>
        </aside>
    );
}
