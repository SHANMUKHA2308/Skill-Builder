import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import RoadmapCard from '../components/RoadmapCard';
import ResourceList from '../components/ResourceList';
import Loader from '../components/Loader';
import { fetchRoadmap, fetchResources } from '../utils/api';
import './Roadmap.css';

const Roadmap: React.FC = () => {
  const [roadmapData, setRoadmapData] = useState<any>(null);
  const [resourcesData, setResourcesData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSkill, setCurrentSkill] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      const skill = localStorage.getItem('currentSkill');
      
      if (!skill) {
        navigate('/');
        return;
      }
      
      setCurrentSkill(skill);
      
      try {
        const [roadmap, resources] = await Promise.all([
          fetchRoadmap(skill),
          fetchResources(skill)
        ]);
        
        setRoadmapData(roadmap);
        setResourcesData(resources);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [navigate]);

  if (isLoading) {
    return <Loader message="Loading your personalized roadmap..." />;
  }

  if (!roadmapData || !resourcesData) {
    return (
      <div className="roadmap-error">
        <h2>Unable to load roadmap</h2>
        <p>Please try going back to the home page and submitting your skill again.</p>
      </div>
    );
  }

  return (
    <div className="roadmap-page">
      <div className="roadmap-intro">
        <h1 className="page-title">Your Learning Roadmap</h1>
        <p className="page-subtitle">
          Here's your personalized path to mastering <strong>{currentSkill}</strong>
        </p>
      </div>

      <RoadmapCard 
        steps={roadmapData.steps} 
        title={`${currentSkill} Roadmap`}
        skill={currentSkill}
      />

      <div className="section-divider"></div>

      <ResourceList 
        resources={resourcesData.resources} 
        title="Recommended Learning Resources"
      />
    </div>
  );
};

export default Roadmap;