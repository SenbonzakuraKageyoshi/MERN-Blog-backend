import { body } from 'express-validator';

export const registerValidation = [
    body('name', 'Введите имя').isLength({ min: 2 }),
    body('email', 'Неверный формат почты').isEmail(),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({ min: 5 }),
];

export const loginValidation = [
    body('email', 'Неверно введены пароль или почта').isEmail(),
    body('password', 'Неверно введены пароль или почта').isLength({ min: 5 }),
];