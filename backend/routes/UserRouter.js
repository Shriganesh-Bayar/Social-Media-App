const jwt = require('jsonwebtoken');
const router = require('express').Router();
const authenticate = require('../middleware/authentication');
const { register, login, getPost, getMyPost,getOnePost, changeProfile } = require('../controller/UserController');

router.get('/', async (req, res, next) => {
    res.json({ message: "In the User router" })
});

router.post('/login', login);
router.post('/register', register);
router.get('/allPost', authenticate, getPost);
router.get('/onePost/:postid', authenticate, getOnePost);
router.get('/myPost/:user_id', authenticate, getMyPost);
router.post('/changeProfile/', authenticate, changeProfile);

module.exports = router;