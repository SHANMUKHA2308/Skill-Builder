import React, { useState } from 'react';
import { CheckCircle, Clock, Star, ArrowRight } from 'lucide-react';
import VideoModal from './VideoModal';
import './RoadmapCard.css';

interface RoadmapStep {
  id: number;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  skills: string[];
  completed?: boolean;
}

interface RoadmapCardProps {
  steps: RoadmapStep[];
  title: string;
  skill?: string;
}

const RoadmapCard: React.FC<RoadmapCardProps> = ({ steps, title, skill }) => {
  const [selectedStep, setSelectedStep] = useState<string | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const handleStartLearning = (stepTitle: string) => {
    setSelectedStep(stepTitle);
    setIsVideoModalOpen(true);
  };
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return '#4ade80';
      case 'Intermediate': return '#f59e0b';
      case 'Advanced': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div className="roadmap-container">
      <div className="roadmap-header">
        <h2 className="roadmap-title">{title}</h2>
        <p className="roadmap-subtitle">
          Follow this step-by-step roadmap to achieve your learning goals
        </p>
      </div>

      <div className="roadmap-steps">
        {steps.map((step, index) => (
          <div key={step.id} className="roadmap-step">
            <div className="step-connector">
              <div className={`step-number ${step.completed ? 'completed' : ''}`}>
                {step.completed ? (
                  <CheckCircle className="step-icon" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              {index < steps.length - 1 && (
                <div className="step-line"></div>
              )}
            </div>

            <div className="step-content">
              <div className="step-card">
                <div className="step-header">
                  <div className="step-info">
                    <h3 className="step-title">{step.title}</h3>
                    <div className="step-meta">
                      <span className="step-duration">
                        <Clock className="meta-icon" />
                        {step.duration}
                      </span>
                      <span 
                        className="step-difficulty"
                        style={{ color: getDifficultyColor(step.difficulty) }}
                      >
                        <Star className="meta-icon" />
                        {step.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="step-description">{step.description}</p>

                <div className="step-skills">
                  <h4 className="skills-title">Skills you'll learn:</h4>
                  <div className="skills-list">
                    {step.skills.map((skill, skillIndex) => (
                      <span key={skillIndex} className="skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="step-action">
                  <button 
                    className="start-step-btn"
                    onClick={() => handleStartLearning(step.title)}
                  >
                    Start Learning
                    <ArrowRight className="btn-icon" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        stepTitle={selectedStep || ''}
        skill={skill || ''}
      />
    </div>
  );
};

export default RoadmapCard;