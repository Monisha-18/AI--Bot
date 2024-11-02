
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const connectDB = require('./my-app/database');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Constants
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyCqxpCtMJE5xG-L3pClDHn6fNvLF-VlBs4"; // Replace with actual API URL
const API_KEY = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


// Fetch question based on domain
app.post('/api/get-question', async (req, res) => {
    const { domain } = req.body;
    try {
        const response = await axios.post(`${GEMINI_API_URL}/generate_question`, {
            domain,
        }, {
            headers: { Authorization: `Bearer ${API_KEY}` }
        });
        res.json({ question: response.data.question });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching question' });
    }
});

// Grade user answer
app.post('/api/grade-answer', async (req, res) => {
    const { domain, question, userAnswer } = req.body;
    try {
        const response = await axios.post(`${GEMINI_API_URL}/grade_answer`, {
            domain,
            question,
            user_answer: userAnswer,
        }, {
            headers: { Authorization: `Bearer ${API_KEY}` }
        });
        const { score, feedback } = response.data;
        res.json({ score, feedback });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error grading answer' });
    }
});

async function generateQuestions(domain) {
    const prompt = `Generate 10-15 interview questions related to ${domain}.`;
    const result = await model.generateContent(prompt);
    const response = result.response;
    return response.text(); // Assuming the response is text-based
  }
  
  // Example usage:
  generateQuestions("web development")
    .then(questions => console.log(questions));

connectDB().then(() => {
    console.log("Connection successful");
    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
}).catch((err) => {
    console.log("Connection not successful");
});

