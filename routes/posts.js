const express = require('express')
const router = express.Router()

const { addPost, getPosts, getPost, updatePost, deletePost } = require('../controllers/posts')

router.get('/', getPosts)
router.post('/', addPost)
router.get('/:id', getPost)
router.put('/:id', updatePost)
router.delete('/:id', deletePost)

module.exports = router