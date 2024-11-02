const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
    domain: String,
    questions: [String],
});

module.exports = mongoose.model('Question', QuestionSchema);
