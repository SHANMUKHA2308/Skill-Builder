import React from 'react';
import { Book, Youtube, Monitor, ExternalLink, Star } from 'lucide-react';
import './ResourceList.css';

interface Resource {
  id: number;
  title: string;
  description: string;
  type: 'book' | 'video' | 'course' | 'website';
  url: string;
  author: string;
  rating: number;
  price: string;
  thumbnail?: string;
}

interface ResourceListProps {
  resources: Resource[];
  title: string;
}

const ResourceList: React.FC<ResourceListProps> = ({ resources, title }) => {
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'book': return <Book className="resource-icon" />;
      case 'video': return <Youtube className="resource-icon" />;
      case 'course': return <Monitor className="resource-icon" />;
      default: return <ExternalLink className="resource-icon" />;
    }
  };

  const getResourceColor = (type: string) => {
    switch (type) {
      case 'book': return '#8b5cf6';
      case 'video': return '#ef4444';
      case 'course': return '#06b6d4';
      default: return '#6b7280';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`star ${i < rating ? 'filled' : ''}`}
        size={16}
      />
    ));
  };

  return (
    <div className="resource-list-container">
      <div className="resource-header">
        <h2 className="resource-title">{title}</h2>
        <p className="resource-subtitle">
          Curated learning resources to help you master your chosen skill
        </p>
      </div>

      <div className="resource-grid">
        {resources.map((resource) => (
          <div key={resource.id} className="resource-card">
            <div className="resource-card-header">
              <div 
                className="resource-type-badge"
                style={{ backgroundColor: getResourceColor(resource.type) }}
              >
                {getResourceIcon(resource.type)}
                <span className="resource-type-text">
                  {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                </span>
              </div>
              <div className="resource-price">
                {resource.price}
              </div>
            </div>

            <div className="resource-content">
              <h3 className="resource-item-title">{resource.title}</h3>
              <p className="resource-author">by {resource.author}</p>
              <p className="resource-description">{resource.description}</p>
              
              <div className="resource-rating">
                <div className="stars">
                  {renderStars(resource.rating)}
                </div>
                <span className="rating-text">
                  {resource.rating}.0 ({Math.floor(Math.random() * 1000) + 100} reviews)
                </span>
              </div>
            </div>

            <div className="resource-footer">
              <a 
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="resource-link"
              >
                View Resource
                <ExternalLink className="link-icon" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceList;