import post from "../models/post.js";
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

export const getPost = async (req, res) => {
    try {
        const id = req.params.id;

        PostModel.findOneAndUpdate({ _id: id }, {$inc: {views: 1}}, {returnDocument: 'after'}, (err, doc) => {
            if(err){
                console.log(err);
                return res.status(500).json({
                    message: 'Не удалось получить статью'
                });
            };
            if(!doc){
                return res.status(404).json({   
                    message: 'Статья не найдена'
                })
            };
            res.json(doc);
        }).populate('author');
    } catch (error) {
        console.log(error);
        res.status(404).json({message: 'Error!'})
    }
};

export const removePost = async (req, res) => {
    try {
        const { id } = req.body;

        PostModel.findOneAndDelete({ _id: id }).exec();
        res.json({message: 'success'})
    } catch (error) {
        console.log(error);
        res.status(404).json({message: 'Error!'})
    }
};

export const getMyPosts = async (req, res) => {
    const {id} = req.body;
    try {
        const posts = await PostModel.find().populate('author').exec();
        res.json(posts.filter((post) => post.author._id == id)); 
    } catch (error) {
        console.log(error);
        res.status(404).json({message: 'Error!'})
    }
}