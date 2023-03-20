import { Timestamp } from 'bson';
import crypto from 'crypto';
import mongoose from 'mongoose';

const userChema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    salt: {
        type: String,
        required: true,
        select: false,
    },
    timestamp: true,
});

userChema.methods.setPassword = function (password) {
    this.salt = crypto.randomBytes(16).toString('hex');

    this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userChema.methods.validPassword = function (password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');

    return this.password === hash;
};

const User = mongoose.model('User', userChema);

export default User;
