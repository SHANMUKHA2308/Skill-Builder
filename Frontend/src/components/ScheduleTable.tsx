import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, Target, Play } from 'lucide-react';
import './ScheduleTable.css';

interface ScheduleItem {
  id: number;
  day: string;
  date: string;
  tasks: {
    id: number;
    title: string;
    duration: string;
    type: 'study' | 'practice' | 'project' | 'review';
    completed: boolean;
  }[];
}

interface ScheduleTableProps {
  schedule: ScheduleItem[];
  title: string;
}

const ScheduleTable: React.FC<ScheduleTableProps> = ({ schedule, title }) => {
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());

  const toggleTaskCompletion = (taskId: number) => {
    const newCompletedTasks = new Set(completedTasks);
    if (newCompletedTasks.has(taskId)) {
      newCompletedTasks.delete(taskId);
    } else {
      newCompletedTasks.add(taskId);
    }
    setCompletedTasks(newCompletedTasks);
  };

  const getTaskTypeColor = (type: string) => {
    switch (type) {
      case 'study': return '#3b82f6';
      case 'practice': return '#10b981';
      case 'project': return '#f59e0b';
      case 'review': return '#8b5cf6';
      default: return '#6b7280';
    }
  };

  const getTaskTypeIcon = (type: string) => {
    switch (type) {
      case 'study': return '📚';
      case 'practice': return '💻';
      case 'project': return '🚀';
      case 'review': return '📝';
      default: return '📋';
    }
  };

  const calculateProgress = (dayTasks: ScheduleItem['tasks']) => {
    const completedCount = dayTasks.filter(task => completedTasks.has(task.id)).length;
    return Math.round((completedCount / dayTasks.length) * 100);
  };

  return (
    <div className="schedule-container">
      <div className="schedule-header">
        <Calendar className="schedule-icon" />
        <h2 className="schedule-title">{title}</h2>
        <p className="schedule-subtitle">
          Your personalized daily learning schedule
        </p>
      </div>

      <div className="schedule-grid">
        {schedule.map((daySchedule) => (
          <div key={daySchedule.id} className="day-card">
            <div className="day-header">
              <div className="day-info">
                <h3 className="day-name">{daySchedule.day}</h3>
                <p className="day-date">{daySchedule.date}</p>
              </div>
              <div className="day-progress">
                <div className="progress-circle">
                  <div 
                    className="progress-fill"
                    style={{ 
                      background: `conic-gradient(#667eea ${calculateProgress(daySchedule.tasks)}%, #e5e7eb 0%)` 
                    }}
                  >
                    <span className="progress-text">
                      {calculateProgress(daySchedule.tasks)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="tasks-list">
              {daySchedule.tasks.map((task) => (
                <div 
                  key={task.id}
                  className={`task-item ${completedTasks.has(task.id) ? 'completed' : ''}`}
                >
                  <div className="task-content">
                    <div className="task-header">
                      <span className="task-type-icon">
                        {getTaskTypeIcon(task.type)}
                      </span>
                      <div className="task-info">
                        <h4 className="task-title">{task.title}</h4>
                        <div className="task-meta">
                          <span className="task-duration">
                            <Clock className="meta-icon" />
                            {task.duration}
                          </span>
                          <span 
                            className="task-type"
                            style={{ color: getTaskTypeColor(task.type) }}
                          >
                            <Target className="meta-icon" />
                            {task.type.charAt(0).toUpperCase() + task.type.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="task-actions">
                      <button
                        onClick={() => toggleTaskCompletion(task.id)}
                        className={`task-btn ${completedTasks.has(task.id) ? 'completed' : ''}`}
                      >
                        {completedTasks.has(task.id) ? (
                          <CheckCircle className="btn-icon" />
                        ) : (
                          <Play className="btn-icon" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="day-summary">
              <div className="summary-stat">
                <span className="stat-label">Total Tasks</span>
                <span className="stat-value">{daySchedule.tasks.length}</span>
              </div>
              <div className="summary-stat">
                <span className="stat-label">Completed</span>
                <span className="stat-value">
                  {daySchedule.tasks.filter(task => completedTasks.has(task.id)).length}
                </span>
              </div>
              <div className="summary-stat">
                <span className="stat-label">Total Time</span>
                <span className="stat-value">
                  {daySchedule.tasks.reduce((total, task) => {
                    const duration = parseInt(task.duration.split(' ')[0]);
                    return total + duration;
                  }, 0)} min
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleTable;