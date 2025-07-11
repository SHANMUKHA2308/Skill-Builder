# Skill Builder Backend

This is the Express.js backend for the Skill Builder MERN stack project. It connects to the GROQ API using the LLaMA model to generate skill roadmaps and resources.

## Features
- Express.js server with CORS support
- POST `/api/skill-builder` endpoint for AI-generated skill roadmaps
- GROQ API integration (LLaMA model)
- Environment variable support via `.env`
- Modern ES6+ syntax and error handling

## Setup Instructions

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Environment Variables**
   - Create a `.env` file in the `backend/` directory:
     ```
     GROQ_API_KEY=your_groq_api_key_here
     ```
   - (Optional) Copy `.env.example` as a template.

3. **Start the server**
   ```bash
   # Production
   npm start
   
   # Development (with auto-restart)
   npm run dev
   ```
   The server will run on port 5001 by default.

## API Usage

### POST `/api/skill-builder`
- **Request Body:**
  ```json
  { "skill": "Data Scientist" }
  ```
- **Response:**
  ```json
  { "result": "AI-generated roadmap and resources..." }
  ```

## Sample GROQ API Request
See `sample-groq-request.js` for a standalone example of calling the GROQ API using axios.

## Notes
- Make sure your frontend is configured to call `http://localhost:5001/api/skill-builder`.
- Requires Node.js 18+ for ES modules support.
- Use `npm run dev` for development with auto-restart on file changes. 