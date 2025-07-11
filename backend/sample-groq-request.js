import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

async function fetchSkillRoadmap(skill) {
  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192',
        messages: [
          {
            role: 'user',
            content: `Give me a detailed roadmap, tools, and resources to become a ${skill}.`
          }
        ],
        max_tokens: 1024
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('AI Response:', response.data.choices?.[0]?.message?.content);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
}

fetchSkillRoadmap('Data Scientist'); 