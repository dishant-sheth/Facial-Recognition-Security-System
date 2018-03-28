const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost/IOT');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    mobile_number: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        required: true,
        enum: ['owner', 'family', 'guest', 'temp'],
    },
    permissions: {
        start_time: {
            type: String,
        },
        end_time: {
            type: String,
        },
        start_date: {
            type: String,
        },
        end_date: {
            type: String,
        }
    },
    facial_images: {
        type: Array,
    },
    fcm_token: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
});

module.exports = mongoose.model('User', userSchema, 'Users');