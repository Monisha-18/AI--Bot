const axios = require('axios');

const verifyAnswer = async (req, res) => {
    const { question, answer } = req.body;
    try {
        const response = await axios.post(`https://gemini.api.url/verify`, { question, answer }, {
            headers: { 'Authorization': `Bearer ${process.env.GEMINI_API_KEY}` }
        });
        const verification = response.data.verification;
        res.json({ verification });
    } catch (error) {
        res.status(500).json({ error: 'Error verifying answer' });
    }
};

module.exports = { verifyAnswer };
