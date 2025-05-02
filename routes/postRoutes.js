const express = require('express');
const { createPost, getUserPosts, deletePost } = require('../controllers/postController');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/createPost', auth, createPost);
router.get('/getUserPosts', auth, getUserPosts);
router.delete('/:id', auth, deletePost);

module.exports = router;