import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import aiRoutes from './routes/aiRoutes.js';
import videoRoutes from './routes/videoRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({ 
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.json({
    message: 'Skill Builder Backend API',
    version: '1.0.0',
    endpoints: {
      'GET /': 'API information',
      'POST /api/skill-builder': 'Generate skill roadmap with AI',
      'GET /api/videos/search': 'Search for learning videos'
    },
    example: {
      method: 'POST',
      url: '/api/skill-builder',
      body: { skill: 'Data Scientist' }
    }
  });
});

// Routes
app.use('/api/skill-builder', aiRoutes);
app.use('/api/videos', videoRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API URL: http://localhost:${PORT}`);
  console.log(`🔗 Test endpoint: http://localhost:${PORT}/`);
  console.log(`🤖 Skill Builder: http://localhost:${PORT}/api/skill-builder`);
}); 