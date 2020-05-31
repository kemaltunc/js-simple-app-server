
const Response = require('../utils/BaseResponse')
const base = require('./BaseController')
const Post = require('../models/PostModel')
const User = require('../models/UserModel')
const AppError = require('../utils/AppError')


exports.insert = base.createOne(Post)

exports.getAll = async (req, res, next) => {
    const doc = await base.getAll(Post, req, res, next)

    doc.forEach(element => {
        element.likeCount = element.like.length
        element.isLike = (element.like.indexOf(req.user) > -1)
        element.isFavorite = (element.favorites.indexOf(req.user) > -1)
        element.like = undefined
    })

    doc.reverse()

    new Response(res).success(doc)

}

exports.like = async (req, res, next) => {
    try {

        const doc = await Post.find({ '_id': req.body.postId }).find({ 'like': req.user })

        if (!doc || doc.length == 0) {
            await Post.updateOne({ _id: req.body.postId }, { $push: { like: req.user } })
        }
        new Response(res).successBoolean(true)

    } catch (error) {
        next(error)
    }
}

exports.unlike = async (req, res, next) => {
    try {
        const doc = await Post.find({ '_id': req.body.postId }).find({ 'like': req.user })
        if (doc || doc.length > 0) {
            await Post.updateOne({ _id: req.body.postId }, { $pull: { like: req.user } })
        }
        new Response(res).successBoolean(true)

    } catch (error) {
        next(error)
    }
}

exports.addFavoritePost = async (req, res, next) => {
    try {
        const doc = await User.find({ '_id': req.user }).find({ 'favorite': req.body.postId })
        if (!doc || doc.length == 0) {
            await User.updateOne({ _id: req.user }, { $push: { favorite: req.body.postId } })
            await Post.updateOne({ _id: req.body.postId }, { $push: { favorites: req.user } })
        }
        new Response(res).successBoolean(true)

    } catch (error) {
        next(error)
    }
}


exports.removeFavoritePost = async (req, res, next) => {
    try {
        const doc = await User.find({ '_id': req.user }).find({ 'favorite': req.body.postId })
        if (doc || doc.length > 0) {
            await User.updateOne({ _id: req.user }, { $pull: { favorite: req.body.postId } })
            await Post.updateOne({ _id: req.body.postId }, { $pull: { favorites: req.user } })
        }
        new Response(res).successBoolean(true)

    } catch (error) {
        next(error)
    }
}