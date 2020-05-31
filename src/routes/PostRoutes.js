const express = require('express')
const router = express.Router()
const postController = require('../controllers/PostController')
const auth = require('../middlewares/Authenticated')


router.use(auth.protect)
router.post('/create', postController.insert)
router.get('/getAll', postController.getAll)
router.post('/like', postController.like)
router.post('/unlike', postController.unlike)
router.post('/addFavoritePost', postController.addFavoritePost)
router.post('/removeFavoritePost', postController.removeFavoritePost)
module.exports = router