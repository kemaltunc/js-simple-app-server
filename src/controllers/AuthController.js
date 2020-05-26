const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')
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
            surname:data.surname,
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

