const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const questionRoutes = require('./routes/questions');
const answerRoutes = require('./routes/answers');

dotenv.config();
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((error) => console.log(error));

// Routes
app.use('/api/questions', questionRoutes);
app.use('/api/answers', answerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
