import React from 'react';
import { Brain, Sparkles } from 'lucide-react';
import './Loader.css';

interface LoaderProps {
  message?: string;
}

const Loader: React.FC<LoaderProps> = ({ message = 'Generating your personalized learning path...' }) => {
  return (
    <div className="loader-container">
      <div className="loader-content">
        <div className="loader-icon">
          <Brain className="brain-icon" />
          <Sparkles className="sparkles-icon" />
        </div>
        
        <div className="loader-animation">
          <div className="pulse-ring"></div>
          <div className="pulse-ring pulse-ring-2"></div>
          <div className="pulse-ring pulse-ring-3"></div>
        </div>
        
        <h2 className="loader-title">AI is working its magic</h2>
        <p className="loader-message">{message}</p>
        
        <div className="progress-bar">
          <div className="progress-fill"></div>
        </div>
        
        <div className="loader-steps">
          <div className="step">
            <div className="step-icon">🎯</div>
            <span className="step-text">Analyzing your goal</span>
          </div>
          <div className="step">
            <div className="step-icon">🗺️</div>
            <span className="step-text">Creating roadmap</span>
          </div>
          <div className="step">
            <div className="step-icon">📚</div>
            <span className="step-text">Finding resources</span>
          </div>
          <div className="step">
            <div className="step-icon">📅</div>
            <span className="step-text">Building schedule</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;