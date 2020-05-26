
const Response = require('../utils/BaseResponse')
const base = require('./BaseController')
const Post = require('../models/PostModel')


exports.insert = base.createOne(Post)
exports.getAll=base.getAll(Post)