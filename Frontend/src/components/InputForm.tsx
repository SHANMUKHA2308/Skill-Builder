import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sparkles } from 'lucide-react';
import './InputForm.css';

interface InputFormProps {
  onSubmit: (skill: string) => void;
  isLoading?: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [skill, setSkill] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (skill.trim()) {
      onSubmit(skill.trim());
      navigate('/roadmap');
    }
  };

  const suggestions = [
    'Become a Data Scientist',
    'Learn Web Development',
    'Master Machine Learning',
    'Build Mobile Apps',
    'Learn Digital Marketing',
    'Become a UX Designer'
  ];

  return (
    <div className="input-form-container">
      <div className="input-form-header">
        <Sparkles className="header-icon" />
        <h2 className="form-title">What skill do you want to master?</h2>
        <p className="form-subtitle">
          Enter your learning goal and we'll create a personalized roadmap for you
        </p>
      </div>

      <form onSubmit={handleSubmit} className="input-form">
        <div className="input-group">
          <div className="input-wrapper">
            <Search className="input-icon" />
            <input
              type="text"
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
              placeholder="e.g., Become a Data Scientist"
              className="skill-input"
              required
            />
          </div>
          <button 
            type="submit" 
            className="submit-btn"
            disabled={isLoading || !skill.trim()}
          >
            {isLoading ? 'Generating...' : 'Get My Roadmap'}
          </button>
        </div>
      </form>

      <div className="suggestions">
        <p className="suggestions-title">Popular skills to learn:</p>
        <div className="suggestions-grid">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => setSkill(suggestion)}
              className="suggestion-chip"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InputForm;