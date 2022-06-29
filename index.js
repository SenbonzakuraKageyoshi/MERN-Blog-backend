import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { loginValidation, registerValidation, createPostValidation } from './validations/validations.js';
import { register, login, getMe } from './controllers/userController.js';
import { getAll, addPost } from './controllers/PostController.js';
import { handleValidationErrors } from './utils/handleValidationErrors.js';

const app = express();
const PORT = 5000;
app.listen(PORT, (err) => err ? console.log(erros) : console.log(`Server has started on port: ${PORT}`));
mongoose.connect('mongodb+srv://mark:kaccel2010@cluster0.yfahk.mongodb.net/blog?retryWrites=true&w=majority')
    .then(() => console.log('Connected to DB'))
    .catch((err) => console.log(err));

app.use(express.json());
app.use(cors());

app.post('/auth/register', registerValidation, handleValidationErrors, register);
app.post('/auth/login', loginValidation, handleValidationErrors, login);
app.post('/auth/me', getMe);

app.post('/posts/create', createPostValidation, addPost);
app.get('/posts', getAll);