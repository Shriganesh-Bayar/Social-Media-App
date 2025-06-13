const Post = require('../models/Post');
const router = require('express').Router();
const authenticate = require('../middleware/authentication')
const {addPost, editPost, deletePost} = require('../controller/PostController')

router.get('/', async (req, res, next) => {
    res.json({ message: "In the post router" })
});

router.post('/add', authenticate, addPost);
router.post('/edit', authenticate, editPost);
router.get('/delete/:post_id', authenticate, deletePost);