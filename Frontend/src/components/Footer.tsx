import React from 'react';
import { Heart, Github, Twitter, Linkedin } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">AI Skill Builder</h3>
            <p className="footer-description">
              Empowering your learning journey with AI-driven skill development
            </p>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/roadmap">Roadmap</a></li>
              <li><a href="/schedule">Schedule</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Connect</h4>
            <div className="social-links">
              <a href="#" className="social-link">
                <Github size={20} />
              </a>
              <a href="#" className="social-link">
                <Twitter size={20} />
              </a>
              <a href="#" className="social-link">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-text">
            Made with <Heart className="heart-icon" size={16} /> for learners worldwide
          </p>
          <p className="footer-text">
            © 2024 AI Skill Builder. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;