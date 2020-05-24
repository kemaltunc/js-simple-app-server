const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')
const AppError = require('../utils/AppError')
const Response = require('../utils/BaseResponse')

const {
    promisify
} = require('util')

const createToken = id => {
    return jwt.sign({
        id
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

exports.login = async (req, res, next) => {
    try {
        const {
            email,
            password
        } = req.body;

        if (!email || !password) {
            return new Response(res).error('fail', 'Please provide email or password')
        }

        const user = await User.findOne({
            email
        }).select('+password')

        if (!user || !await user.correctPassword(password, user.password)) {
            return new Response(res).error('fail', 'Email or Password is wrongd')
        }

        const token = createToken(user.id)
        user.password = undefined
        var data = {
            "token": token,
            "user": user
        }

        return new Response(res).success(data)

    } catch (err) {
        next(err)
    }

}

exports.signup = async (req, res, next) => {
    try {
        var data = req.body;
        const user = await User.create({
            name: data.name,
            email: data.email,
            password: data.password
        })

        const token = createToken(user.id)
        user.password = undefined

        var data = {
            "token": token,
            "user": user
        }

        return new Response(res).success(data)

    } catch (err) {
        next(err)
    }
}

exports.protect = async (req, res, next) => {
    try {
        let token

        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1]
        }
        if (!token) {
            return next(new AppError(401, 'fail', 'Unauthorized'), req, res, next)
        }
        const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
        req.id = decode.id
        next()

    } catch (err) {
        next(err)
    }
}

