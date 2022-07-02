import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: false,
    },
    text: {
        type: String,
        required: true,
        unique: false,
    },
    imageUrl: {
        type: String,
    },
    views: {
        type: Number,
        default: 0
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
}, {timestamps: true});

export default mongoose.model('Post', PostSchema);