import React, { useState, useEffect } from 'react';
import { X, Play, ExternalLink } from 'lucide-react';
import './VideoModal.css';

interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  duration: string;
}

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  stepTitle: string;
  skill: string;
}

const VideoModal: React.FC<VideoModalProps> = ({ isOpen, onClose, stepTitle, skill }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen && stepTitle) {
      fetchVideos();
    }
  }, [isOpen, stepTitle]);

  const fetchVideos = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log('Fetching videos for:', stepTitle);
      const url = `http://localhost:5001/api/videos/search?query=${encodeURIComponent(stepTitle)}&maxResults=4`;
      console.log('Request URL:', url);
      
      // Call backend API to get real videos
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log('Response data:', data);
      
      if (data.videos && Array.isArray(data.videos)) {
        setVideos(data.videos);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('Error fetching videos:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      setError(`Failed to load videos: ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  };

  const openVideo = (videoId: string) => {
    window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            <Play className="modal-icon" />
            Learning Videos for: {stepTitle}
          </h2>
          <button className="close-btn" onClick={onClose}>
            <X className="close-icon" />
          </button>
        </div>

        <div className="modal-content">
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Finding the best videos for you...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <p className="error-message">{error}</p>
              <button className="retry-btn" onClick={fetchVideos}>
                Try Again
              </button>
            </div>
          ) : (
            <div className="videos-grid">
              {videos.map((video) => (
                <div key={video.id} className="video-card">
                  <div className="video-thumbnail">
                    <img src={video.thumbnail} alt={video.title} />
                    <div className="video-duration">{video.duration}</div>
                    <button 
                      className="play-btn"
                      onClick={() => openVideo(video.id)}
                    >
                      <Play className="play-icon" />
                    </button>
                  </div>
                  
                  <div className="video-info">
                    <h3 className="video-title">{video.title}</h3>
                    <p className="video-description">{video.description}</p>
                    
                    <div className="video-meta">
                      <span className="channel-name">{video.channelTitle}</span>
                      <span className="publish-date">
                        {new Date(video.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <button 
                      className="watch-btn"
                      onClick={() => openVideo(video.id)}
                    >
                      <ExternalLink className="watch-icon" />
                      Watch on YouTube
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal; 