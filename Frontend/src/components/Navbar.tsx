import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Brain } from 'lucide-react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <Brain className="logo-icon" />
          <span className="logo-text">AI Skill Builder</span>
        </Link>
        
        <div className="navbar-menu">
          <Link 
            to="/" 
            className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/roadmap" 
            className={`navbar-link ${location.pathname === '/roadmap' ? 'active' : ''}`}
          >
            Roadmap
          </Link>
          <Link 
            to="/schedule" 
            className={`navbar-link ${location.pathname === '/schedule' ? 'active' : ''}`}
          >
            Schedule
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;