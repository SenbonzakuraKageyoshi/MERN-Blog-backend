import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { loginValidation, registerValidation, createPostValidation } from './validations/validations.js';
import { register, login, getMe } from './controllers/userController.js';
import { getAll, addPost, getPost, removePost, getMyPosts } from './controllers/PostController.js';
import { handleValidationErrors } from './utils/handleValidationErrors.js';

const app = express();
const PORT = 5000;
app.listen(PORT, (err) => err ? console.log(erros) : console.log(`Server has started on port: ${PORT}`));
mongoose.connect('mongodb+srv://mark:kaccel2010@cluster0.yfahk.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err));

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});
    
const upload = multer({ storage });

app.use(express.json());
app.use(cors());

app.use('/uploads', express.static('uploads'));

app.post('/upload', upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.post('/upload/delete', (req, res) => {
    const filePath = path.resolve() + `${req.body.imageUrl}`;
    fs.unlink(filePath, function (err) {        
        if (err) throw err;
        console.log('File deleted!');
    })
});

app.post('/auth/register', registerValidation, handleValidationErrors, register);
app.post('/auth/login', loginValidation, handleValidationErrors, login);
app.post('/auth/me', getMe);

app.post('/posts/create', createPostValidation, addPost);
app.get('/posts', getAll);
app.post('/my-posts', getMyPosts);
app.get('/posts/:id', getPost);
app.post('/posts/delete', removePost);