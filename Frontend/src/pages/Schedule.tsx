import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScheduleTable from '../components/ScheduleTable';
import Loader from '../components/Loader';
import { fetchSchedule } from '../utils/api';
import './Schedule.css';

const Schedule: React.FC = () => {
  const [scheduleData, setScheduleData] = useState<any>(null);
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
        const schedule = await fetchSchedule(skill);
        setScheduleData(schedule);
      } catch (error) {
        console.error('Error loading schedule:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [navigate]);

  if (isLoading) {
    return <Loader message="Creating your personalized schedule..." />;
  }

  if (!scheduleData) {
    return (
      <div className="schedule-error">
        <h2>Unable to load schedule</h2>
        <p>Please try going back to the home page and submitting your skill again.</p>
      </div>
    );
  }

  return (
    <div className="schedule-page">
      <div className="schedule-intro">
        <h1 className="page-title">Your Learning Schedule</h1>
        <p className="page-subtitle">
          A structured daily plan to master <strong>{currentSkill}</strong> efficiently
        </p>
      </div>

      <ScheduleTable 
        schedule={scheduleData.schedule} 
        title={`7-Day ${currentSkill} Schedule`}
      />

      <div className="schedule-tips">
        <h3 className="tips-title">📝 Learning Tips</h3>
        <div className="tips-grid">
          <div className="tip-card">
            <div className="tip-icon">⏰</div>
            <h4 className="tip-title">Stay Consistent</h4>
            <p className="tip-description">
              Dedicate the same time each day to maintain momentum and build lasting habits.
            </p>
          </div>
          
          <div className="tip-card">
            <div className="tip-icon">📱</div>
            <h4 className="tip-title">Minimize Distractions</h4>
            <p className="tip-description">
              Turn off notifications and create a dedicated learning environment.
            </p>
          </div>
          
          <div className="tip-card">
            <div className="tip-icon">🎯</div>
            <h4 className="tip-title">Track Progress</h4>
            <p className="tip-description">
              Mark tasks as complete and celebrate small wins to stay motivated.
            </p>
          </div>
          
          <div className="tip-card">
            <div className="tip-icon">🔄</div>
            <h4 className="tip-title">Review Regularly</h4>
            <p className="tip-description">
              Revisit previous topics to reinforce learning and identify gaps.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;