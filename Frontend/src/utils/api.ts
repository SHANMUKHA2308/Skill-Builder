// Real API functions that connect to the Express backend
const API_BASE_URL = 'http://localhost:5001/api';

export const fetchRoadmap = async (skill: string) => {
  try {
    const response = await fetch(`${API_BASE_URL}/skill-builder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ skill }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Parse the AI response and create structured steps
    const aiResponse = data.result;
    
    // Split the AI response into sections and create proper roadmap steps
    const sections = aiResponse.split(/\d+\.\s+/).filter(Boolean);
    
    const steps = sections.map((section: string, index: number) => {
      const lines = section.trim().split('\n').filter((line: string) => line.trim());
      const title = lines[0]?.replace(/[:：]/, '').trim() || `Step ${index + 1}`;
      const description = lines.slice(1).join('\n').trim() || section.trim();
      
      return {
        id: index + 1,
        title: title,
        description: description,
        duration: index === 0 ? '2-3 weeks' : index === 1 ? '4-6 weeks' : '3-4 weeks',
        difficulty: index === 0 ? 'Beginner' as const : index === 1 ? 'Intermediate' as const : 'Advanced' as const,
        skills: [title],
        completed: false
      };
    });

    // If parsing failed, create a single step with the full AI response
    if (steps.length === 0) {
      steps.push({
        id: 1,
        title: 'AI Generated Roadmap',
        description: aiResponse,
        duration: 'Varies',
        difficulty: 'Custom' as const,
        skills: ['AI Generated'],
        completed: false
      });
    }

    return {
      skill,
      roadmap: aiResponse,
      steps: steps
    };
  } catch (error) {
    console.error('Error fetching roadmap:', error);
    // Fallback to mock data if API fails
    return {
      skill,
      roadmap: 'Failed to fetch AI roadmap',
      steps: [
        {
          id: 1,
          title: 'Foundation & Basics',
          description: 'Master the fundamental concepts and terminology. Build a solid understanding of core principles and basic tools.',
          duration: '2-3 weeks',
          difficulty: 'Beginner' as const,
          skills: ['Basic concepts', 'Terminology', 'Tools setup', 'Environment'],
          completed: false
        },
        {
          id: 2,
          title: 'Core Skills Development',
          description: 'Develop practical skills through hands-on exercises and real-world applications.',
          duration: '4-6 weeks',
          difficulty: 'Intermediate' as const,
          skills: ['Practical application', 'Problem solving', 'Best practices', 'Core techniques'],
          completed: false
        },
        {
          id: 3,
          title: 'Advanced Concepts',
          description: 'Explore advanced topics and specialized areas. Learn optimization and advanced methodologies.',
          duration: '3-4 weeks',
          difficulty: 'Advanced' as const,
          skills: ['Advanced techniques', 'Optimization', 'Specialized knowledge', 'Complex problems'],
          completed: false
        }
      ]
    };
  }
};

export const fetchResources = async (skill: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  // Return mock resources data
  return {
    skill,
    resources: [
      {
        id: 1,
        title: `Complete Guide to ${skill}`,
        description: 'Comprehensive guide covering all aspects from beginner to advanced level with practical examples.',
        type: 'book' as const,
        url: 'https://example.com/book1',
        author: 'Expert Author',
        rating: 5,
        price: '$29.99'
      },
      {
        id: 2,
        title: `${skill} Crash Course`,
        description: 'Intensive video course designed to get you up to speed quickly with hands-on projects.',
        type: 'video' as const,
        url: 'https://youtube.com/watch?v=example',
        author: 'YouTube Expert',
        rating: 4,
        price: 'Free'
      },
      {
        id: 3,
        title: `Professional ${skill} Certification`,
        description: 'Industry-recognized certification program with real-world projects and career support.',
        type: 'course' as const,
        url: 'https://example.com/course1',
        author: 'Professional Academy',
        rating: 5,
        price: '$199.99'
      },
      {
        id: 4,
        title: `${skill} Best Practices`,
        description: 'Learn industry best practices and common pitfalls to avoid in your learning journey.',
        type: 'website' as const,
        url: 'https://example.com/guide',
        author: 'Industry Blog',
        rating: 4,
        price: 'Free'
      },
      {
        id: 5,
        title: `Advanced ${skill} Techniques`,
        description: 'Deep dive into advanced techniques and cutting-edge approaches used by experts.',
        type: 'book' as const,
        url: 'https://example.com/book2',
        author: 'Advanced Expert',
        rating: 5,
        price: '$49.99'
      },
      {
        id: 6,
        title: `${skill} Workshop Series`,
        description: 'Interactive workshop series with live sessions and peer collaboration opportunities.',
        type: 'course' as const,
        url: 'https://example.com/workshop',
        author: 'Workshop Academy',
        rating: 4,
        price: '$149.99'
      }
    ]
  };
};

export const fetchSchedule = async (skill: string) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // Return mock schedule data
  return {
    skill,
    schedule: [
      {
        id: 1,
        day: 'Monday',
        date: 'Week 1',
        tasks: [
          {
            id: 1,
            title: 'Introduction and Setup',
            duration: '30 min',
            type: 'study' as const,
            completed: false
          },
          {
            id: 2,
            title: 'Basic Concepts Practice',
            duration: '45 min',
            type: 'practice' as const,
            completed: false
          },
          {
            id: 3,
            title: 'Read Chapter 1',
            duration: '20 min',
            type: 'study' as const,
            completed: false
          }
        ]
      },
      {
        id: 2,
        day: 'Tuesday',
        date: 'Week 1',
        tasks: [
          {
            id: 4,
            title: 'Fundamental Principles',
            duration: '40 min',
            type: 'study' as const,
            completed: false
          },
          {
            id: 5,
            title: 'Hands-on Exercise 1',
            duration: '60 min',
            type: 'practice' as const,
            completed: false
          },
          {
            id: 6,
            title: 'Review Yesterday\'s Material',
            duration: '15 min',
            type: 'review' as const,
            completed: false
          }
        ]
      },
      {
        id: 3,
        day: 'Wednesday',
        date: 'Week 1',
        tasks: [
          {
            id: 7,
            title: 'Core Concepts Deep Dive',
            duration: '50 min',
            type: 'study' as const,
            completed: false
          },
          {
            id: 8,
            title: 'Practice Problems',
            duration: '40 min',
            type: 'practice' as const,
            completed: false
          },
          {
            id: 9,
            title: 'Weekly Review',
            duration: '25 min',
            type: 'review' as const,
            completed: false
          }
        ]
      },
      {
        id: 4,
        day: 'Thursday',
        date: 'Week 1',
        tasks: [
          {
            id: 10,
            title: 'Advanced Topics Introduction',
            duration: '35 min',
            type: 'study' as const,
            completed: false
          },
          {
            id: 11,
            title: 'Mini Project Start',
            duration: '90 min',
            type: 'project' as const,
            completed: false
          }
        ]
      },
      {
        id: 5,
        day: 'Friday',
        date: 'Week 1',
        tasks: [
          {
            id: 12,
            title: 'Project Development',
            duration: '120 min',
            type: 'project' as const,
            completed: false
          },
          {
            id: 13,
            title: 'Weekly Progress Review',
            duration: '30 min',
            type: 'review' as const,
            completed: false
          }
        ]
      },
      {
        id: 6,
        day: 'Saturday',
        date: 'Week 1',
        tasks: [
          {
            id: 14,
            title: 'Practical Application',
            duration: '60 min',
            type: 'practice' as const,
            completed: false
          },
          {
            id: 15,
            title: 'Community Learning',
            duration: '45 min',
            type: 'study' as const,
            completed: false
          }
        ]
      },
      {
        id: 7,
        day: 'Sunday',
        date: 'Week 1',
        tasks: [
          {
            id: 16,
            title: 'Rest and Reflection',
            duration: '30 min',
            type: 'review' as const,
            completed: false
          },
          {
            id: 17,
            title: 'Plan Next Week',
            duration: '20 min',
            type: 'review' as const,
            completed: false
          }
        ]
      }
    ]
  };
};