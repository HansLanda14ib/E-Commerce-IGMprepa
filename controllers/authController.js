const User = require('../models/User');
const {StatusCodes} = require('http-status-codes');
const CustomError = require('../errors');
const {attachCookiesToResponse, createTokenUser} = require('../utils')

const register = async (req, res) => {
    const {email, name, password} = req.body
    const isEmailExists = await User.findOne({email})
    if (isEmailExists) {
        throw new CustomError.BadRequestError("Email is already exists")
    }
    const user = await User.create({name, email, password});
    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({res, user: tokenUser})
    res.status(StatusCodes.CREATED).json({user: tokenUser});
};

const login = async (req, res) => {
    const {email, password} = req.body;

    if (!email || !password) {
        throw new CustomError.BadRequestError('Please provide email and password');
    }
    const user = await User.findOne({email});
    if (!user) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    const isPasswordCorrect = await user.comparePassword(password);
    // compare password
    if (!isPasswordCorrect) {
        throw new CustomError.UnauthenticatedError('Invalid Credentials');
    }
    const tokenUser = createTokenUser(user)
    attachCookiesToResponse({res, user: tokenUser})
    res.status(StatusCodes.OK).json({user: tokenUser});

};

const logout = async (req, res) => {
    res.cookie('token', 'logout', {httpOnly: true, expires: new Date(Date.now())})
    res.status(StatusCodes.OK).json({msg: 'user logged out'})
}
module.exports = {
    register, login, logout,
};
