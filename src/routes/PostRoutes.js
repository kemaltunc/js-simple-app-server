const express = require('express')
const router = express.Router()
const postController = require('../controllers/PostController')
const auth = require('../middlewares/Authenticated')


router.use(auth.protect)
router.post('/create', postController.insert)
router.get('/getAll', postController.getAll)
router.get('/like', postController.like)
router.get('/unlike', postController.unlike)
module.exports = router