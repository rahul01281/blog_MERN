const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: String,

    text: String,

    image: String,
    
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

module.exports = Post = mongoose.model('post', PostSchema);