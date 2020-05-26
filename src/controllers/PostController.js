
const Response = require('../utils/BaseResponse')
const base = require('./BaseController')
const Post = require('../models/PostModel')
const AppError = require('../utils/AppError')


exports.insert = base.createOne(Post)

exports.getAll = async (req, res, next) => {
    const doc = await base.getAll(Post, req, res, next)

    doc.forEach(element => {
        element.likeCount = element.like.length
        element.like = undefined
    })
    new Response(res).success(doc)

}

exports.like = async (req, res, next) => {
    try {

        const doc = await Post.find({ '_id': req.query.postId }).find({ 'like': req.user })

        if (!doc || doc.length == 0) {
            await Post.update({ _id: req.query.postId }, { $push: { like: req.user } })
        }
        new Response(res).successBoolean(true)

    } catch (error) {
        next(error)
    }
}

exports.unlike = async (req, res, next) => {
    try {
        const doc = await Post.find({ '_id': req.query.postId }).find({ 'like': req.user })
        if (doc || doc.length > 0) {
            await Post.update({ _id: req.query.postId }, { $pull: { like: req.user } })
        }
        new Response(res).successBoolean(true)

    } catch (error) {
        next(error)
    }
}