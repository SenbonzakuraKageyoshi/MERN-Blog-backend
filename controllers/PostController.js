import PostModel from "../models/post.js";

export const addPost = async (req, res) => {
    try {
        const { title, text, author } = req.body;
        
        const doc = new PostModel({
            title,
            text,
            author
        });

        const post = await doc.save();
        res.json(post);
    } catch (error) {
        console.log(error);
        res.status(400).json({message: 'Error!'})
    }
};

export const getAll = async (req, res) => {
    try {
        const posts = await PostModel.find().populate('author').exec();

        res.json(posts);
    } catch (error) {
        console.log(error);
        res.status(404).json({message: 'Error!'})
    }
};