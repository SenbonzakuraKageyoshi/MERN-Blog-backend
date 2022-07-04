import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';

export const register = async (req, res) => {
    try {
        const { name, email, password, imageUrl } = req.body;

        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            name,
            email,
            passwordHash,
            imageUrl
        });

        const user = await doc.save();

        const userData = user._doc;

        const token = jwt.sign({
            id: user._id
        }, 'secret123', {expiresIn: '30d'});

        res.json({
            ...userData,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({message: 'Не удалось зарегистрироваться'})
    };
};

export const login = async (req, res) => {
    try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email: email });

    if(!user){
        return res.status(404).json({message: 'Пользователь не найден'})
    }

    const isValidPass = await bcrypt.compare(password, user.passwordHash);

    if(!isValidPass){
        return resres.status(404).json({message: 'Неверный логин или пароль!'})
    }

    const token = jwt.sign({
        id: user._id
    }, 'secret123', {expiresIn: '30d'});

    res.json({
        ...user._doc,
        token
    })
    } catch (error) {
        console.log(error);
        res.status(500).json({message: 'Ошибка'})
    }
};

export const getMe = async (req, res) => {
        try {
            const { token } = req.body;
            const decoded = jwt.verify(token, 'secret123');
            console.log(decoded)
            const user = await UserModel.findOne({ _id: decoded.id });
            res.json(user)
        } catch (err) {
            console.log(err)
            return res.status(404).json({
                message: 'Нет доступа',
            }); 
        }
};