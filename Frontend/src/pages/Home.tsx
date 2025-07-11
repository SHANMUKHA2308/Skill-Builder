import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputForm from '../components/InputForm';
import Loader from '../components/Loader';
import { fetchRoadmap, fetchResources, fetchSchedule } from '../utils/api';
import './Home.css';

const Home: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSkillSubmit = async (skill: string) => {
    setIsLoading(true);
    
    try {
      // Store skill in localStorage first
      localStorage.setItem('currentSkill', skill);
      
      // Fetch all data simultaneously
      const [roadmap, resources, schedule] = await Promise.all([
        fetchRoadmap(skill),
        fetchResources(skill),
        fetchSchedule(skill)
      ]);
      
      // Store all data in localStorage for immediate access
      localStorage.setItem('roadmapData', JSON.stringify(roadmap));
      localStorage.setItem('resourcesData', JSON.stringify(resources));
      localStorage.setItem('scheduleData', JSON.stringify(schedule));
      
      // Navigate to roadmap after all data is fetched
      navigate('/roadmap');
      
    } catch (error) {
      console.error('Error fetching data:', error);
      // Still navigate even if there's an error (fallback data will be used)
      navigate('/roadmap');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loader message="Creating your personalized learning journey..." />;
  }

  return (
    <div className="home-container">
      <div className="home-hero">
        <h1 className="hero-title">
          Master Any Skill with
          <span className="gradient-text"> AI-Powered Learning</span>
        </h1>
        <p className="hero-subtitle">
          Get personalized roadmaps, curated resources, and daily schedules 
          tailored to your learning goals and pace.
        </p>
      </div>

      <InputForm onSubmit={handleSkillSubmit} isLoading={isLoading} />

      <div className="home-features">
        <div className="feature-card">
          <div className="feature-icon">🗺️</div>
          <h3 className="feature-title">Smart Roadmaps</h3>
          <p className="feature-description">
            AI-generated learning paths that adapt to your skill level and goals
          </p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">📚</div>
          <h3 className="feature-title">Curated Resources</h3>
          <p className="feature-description">
            Hand-picked books, courses, and videos from top educators and platforms
          </p>
        </div>
        
        <div className="feature-card">
          <div className="feature-icon">📅</div>
          <h3 className="feature-title">Daily Schedules</h3>
          <p className="feature-description">
            Structured daily plans that fit your lifestyle and maximize learning efficiency
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;