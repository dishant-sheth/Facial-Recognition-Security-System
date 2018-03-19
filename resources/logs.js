const mongoose = require('mongoose');
const { Schema } = mongoose;

const logSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    time: {
        type: Date,
        required: true,
        default: Date.now,
    }
});

module.exports = mongoose.model('Log', logSchema, 'Logs');