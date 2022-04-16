const mongoose = require('mongoose');

const qCardSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    options: {
        type: [String]
    },
    category: {
        type: String,
        lowercase: true,
        enum: ['easy', 'moderate', 'hard']
    }
})

const qCard = mongoose.model('QuestionCard', qCardSchema);
module.exports = qCard;