# 🚀 Skill Builder - AI-Powered Learning Platform

A modern MERN stack application that generates personalized learning roadmaps using AI. Built with React, TypeScript, Express.js, and GROQ API.

## ✨ Features

- **🤖 AI-Generated Roadmaps** - Personalized learning paths using GROQ API
- **📚 Curated Resources** - Hand-picked learning materials and courses
- **📅 Daily Schedules** - Structured learning plans that fit your lifestyle
- **🎬 YouTube Integration** - Relevant video tutorials for each learning step
- **📱 Responsive Design** - Works perfectly on desktop and mobile
- **⚡ Real-time Updates** - Instant feedback and progress tracking

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Lucide React** for icons

### Backend
- **Express.js** with ES6+ modules
- **GROQ API** for AI-powered responses
- **CORS** enabled for frontend communication
- **Nodemon** for development

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- GROQ API key (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Skill_Builder
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd Frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../backend
   npm install
   ```

4. **Set up Environment Variables**
   ```bash
   # In backend/.env
   GROQ_API_KEY=your_groq_api_key_here
   ```

5. **Start the Development Servers**

   **Backend (Terminal 1):**
   ```bash
   cd backend
   npm run dev
   ```

   **Frontend (Terminal 2):**
   ```bash
   cd Frontend
   npm start
   ```

6. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001

## 📁 Project Structure

```
Skill_Builder/
├── Frontend/                 # React frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   ├── utils/          # API utilities
│   │   └── styles/         # CSS files
│   └── package.json
├── backend/                 # Express backend
│   ├── controllers/        # API controllers
│   ├── routes/            # API routes
│   ├── index.js           # Main server file
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### Skill Builder API
- `POST /api/skill-builder` - Generate AI roadmap
- `GET /api/videos/search` - Search learning videos

### Example Usage
```bash
# Generate roadmap
curl -X POST http://localhost:5001/api/skill-builder \
  -H "Content-Type: application/json" \
  -d '{"skill": "Data Scientist"}'

# Search videos
curl "http://localhost:5001/api/videos/search?query=JavaScript&maxResults=4"
```

## 🎯 How to Use

1. **Enter a Skill** - Type any skill you want to learn
2. **Get AI Roadmap** - Receive personalized learning path
3. **Explore Resources** - Browse curated learning materials
4. **Watch Videos** - Click "Start Learning" for relevant tutorials
5. **Follow Schedule** - Use the daily learning schedule

## 🔑 Environment Variables

### Backend (.env)
```env
GROQ_API_KEY=your_groq_api_key_here
YOUTUBE_API_KEY=your_youtube_api_key_here  # Optional
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd Frontend
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Render)
```bash
cd backend
npm start
# Set environment variables
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **GROQ API** for AI-powered responses
- **YouTube API** for video integration
- **React & Express** communities
- **Tailwind CSS** for beautiful styling

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Made with ❤️ for learners worldwide** 