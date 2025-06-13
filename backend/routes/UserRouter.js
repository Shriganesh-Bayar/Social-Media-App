const jwt = require('jsonwebtoken');
const router = require('express').Router();
const authenticate = require('../middleware/authentication');
const {register, login, getPost, getMyPost, changeProfile} = require('../controller/UserController');

router.get('/', async (req, res, next) => {
    res.json({ message: "In the User router" })
});

router.post('/login', login);
router.post('/register', register);
router.get('/post/:user_id', authenticate, getPost);
router.get('/myPost/:user_id', authenticate, getMyPost);
router.post('/changeProfile/', authenticate, changeProfile);