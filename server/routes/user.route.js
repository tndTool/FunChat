import express from 'express';
import { body } from 'express-validator';
import { userRegister, userSignIn } from '../controllers/user.controller.js';
import { tokenAuth } from '../middlewares/token.middleware.js';
import { validate } from '../utils/validator.js';

const router = express.Router();

router.post(
    '/signup',
    body('username')
        .exists()
        .withMessage('Username is required')
        .isLength({ min: 6 })
        .withMessage('Username at least 6 characters')
        .isLength({ max: 20 })
        .withMessage('Username must have maxium 20 characters'),
    body('password')
        .exists()
        .withMessage('password is required')
        .isLength({ min: 6 })
        .withMessage('password at least 6 characters'),

    validate,
    userRegister,
);

router.post(
    '/signin',
    body('username')
        .exists()
        .withMessage('Username is required')
        .isLength({ min: 6 })
        .withMessage('Username at least 6 characters')
        .isLength({ max: 20 })
        .withMessage('Username must have maxium 20 characters'),
    body('password')
        .exists()
        .withMessage('password is required')
        .isLength({ min: 6 })
        .withMessage('password at least 6 characters'),
    validate,
    userSignIn,
);

router.get('/check-token', tokenAuth, (req, res) =>
    res.status(200).json({
        username: req.user.username,
    }),
);

export default router;
