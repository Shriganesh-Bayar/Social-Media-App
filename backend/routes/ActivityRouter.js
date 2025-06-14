const router = require('express').Router();
const Post = require('../models/Post');
const authenticate = require('../middleware/authentication');
const { likePost, commentPost } = require('../controller/ActivityController');

router.get('/', async (req, res, next) => {
    res.json({ message: "In the comment router" })
});

router.get('/like/:post_id', authenticate, likePost);
router.post('/comment', authenticate, commentPost);

module.exports = router;