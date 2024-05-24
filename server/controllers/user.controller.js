import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const userRegister = async (req, res) => {
    try {
        const { username, password } = req.body;

        const checkUser = await User.findOne({ username });

        if (checkUser) {
            return res.status(400).json({
                message: 'Username already used',
            });
        }

        const user = new User({ username, password });

        await user.save();

        res.status(201).json({});
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};

export const userSignIn = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username }).select('username password id');

        if (!user) {
            return res.status(400).json({ message: 'Username or password is incorrect' });
        }

        if (user.password !== password) {
            return res.status(400).json({
                message: 'Username or password is incorrect',
            });
        }

        const token = jwt.sign({ data: user._id }, process.env.TOKEN_SECRET, { expiresIn: '12H' });

        res.status(200).json({
            token,
            username,
            id: user._id,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
};
