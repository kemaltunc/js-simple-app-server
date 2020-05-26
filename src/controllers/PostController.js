
const Response = require('../utils/BaseResponse')
const base = require('./BaseController')
const Post = require('../models/PostModel')
const AppError = require('../utils/AppError')


exports.insert = base.createOne(Post)
exports.getAll = base.getAll(Post)

exports.like = async (req, res, next) => {
    try {
        const doc = await Post.find({
            like: "5ecd0f503f4beb608601da02"
        })
        if (!doc || doc.length == 0) {
            await Post.update({ _id: "5ecd79ecef4913753fc2a4d6" }, { $push: { like: "5ecd0f503f4beb608601da02" } })
        }
        new Response(res).successBoolean(true)

    } catch (error) {
        next(error)
    }
}

exports.unlike = async (req, res, next) => {
    try {
        const doc = await Post.find({
            like: "5ecd0f503f4beb608601da02"
        })
        if (doc || doc.length > 0) {
            await Post.update({ _id: "5ecd79ecef4913753fc2a4d6" }, { $pull: { like: "5ecd0f503f4beb608601da02" } })
        }
        new Response(res).successBoolean(true)

    } catch (error) {
        next(error)
    }
}