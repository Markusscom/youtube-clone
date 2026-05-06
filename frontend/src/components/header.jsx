import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header({ toggleTheme }) {
    const [dropdown, setDropdown] = useState(false);

    return (
        <header className="header-wrapper">
            <Link to="/" className="logo">YouTube Clone</Link>
            <div className="dropdown">
                <button onClick={() => setDropdown(!dropdown)}>Profile</button>
                {dropdown && (
                    <div className="dropdown-menu">
                        <button onClick={toggleTheme}>Toggle Theme</button>
                        <Link to="/upload">Upload</Link>
                        <button onClick={() => { localStorage.removeItem('token'); window.location.reload(); }}>Logout</button>
                    </div>
                )}
            </div>
        </header>
    );
}
