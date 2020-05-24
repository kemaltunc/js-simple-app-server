const express = require('express')
const router = express.Router()
const postController = require('../controllers/PostController')
const auth=require('../controllers/AuthController')


router.use(auth.protect)
router.get('/posts', postController.getPosts)

module.exports = router