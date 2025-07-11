import axios from 'axios';

export const handleSkillBuilder = async (req, res) => {
  const { skill } = req.body;
  if (!skill) {
    return res.status(400).json({ error: 'Skill is required in the request body.' });
  }

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama3-70b-8192',
        messages: [
          {
            role: 'user',
            content: `Create a detailed step-by-step roadmap to become a ${skill}. Format your response with numbered steps (1., 2., 3., etc.) and include specific skills, tools, and resources for each step. Make it practical and actionable.`
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

    const aiMessage = response.data.choices?.[0]?.message?.content || 'No response from AI.';
    res.json({ result: aiMessage });
  } catch (error) {
    console.error('GROQ API error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch data from GROQ API.' });
  }
}; 