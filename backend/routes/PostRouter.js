const Post = require('../models/Post');
const router = require('express').Router();
const authenticate = require('../middleware/authentication')
const { addPostController, editPostController, deletePostController, toggleLikeController, commentPostController } = require('../controller/PostController')

router.get('/', async (req, res, next) => {
    res.json({ message: "In the post router" })
});

router.post('/add', authenticate, addPostController);
router.post('/edit', authenticate, editPostController);
router.get('/delete/:post_id/:user_id', authenticate, deletePostController);
router.get('/like/:post_id/:user_id', authenticate, toggleLikeController);
router.post('/comment', authenticate, commentPostController);

module.exports = router;