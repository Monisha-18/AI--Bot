const axios = require('axios');
const Question = require('../models/Question');

const generateQuestions = async (req, res) => {
    const { domain } = req.body;
    try {
        const response = await axios.post(`https://gemini.api.url/generate`, { domain }, {
            headers: { 'Authorization': `Bearer ${process.env.GEMINI_API_KEY}` }
        });
        const questions = response.data.questions;

        const newQuestionSet = new Question({ domain, questions });
        await newQuestionSet.save();

        res.json({ questions });
    } catch (error) {
        res.status(500).json({ error: 'Error generating questions' });
    }
};

module.exports = { generateQuestions };
