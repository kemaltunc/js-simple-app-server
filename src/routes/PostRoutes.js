const express = require('express')
const router = express.Router()
const postController = require('../controllers/PostController')
const auth = require('../middlewares/Authenticated')


router.use(auth.protect)
router.get('/posts', postController.getPosts)

module.exports = router