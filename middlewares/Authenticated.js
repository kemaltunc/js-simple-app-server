
const jwt = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const Response = require('../utils/BaseResponse')

const {
    promisify
} = require('util')


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

