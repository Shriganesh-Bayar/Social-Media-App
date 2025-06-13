const router = require('express').Router();
const Activity = require('../models/Activity');
const authenticate = require('../middleware/authentication')
const {likePost, commentPost} = require('../controller/ActivityController')

router.get('/', async (req, res, next) => {
    res.json({ message: "In the comment router" })
});

router.get('/like/:post_id', authenticate, likePost);
router.post('/comment', authenticate, commentPost);

