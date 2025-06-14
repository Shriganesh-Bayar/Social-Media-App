const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Post = require('../models/Post')

const register = async (req, res) => {
    try {
        // console.log(req.body)
        const result = await User.register(req.body);
        if (result.error) return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
};

const login = async (req, res) => {
    try {
        // console.log(req.body);
        const result = await User.login(req.body);
        if (result.error) return res.json({ error: result.error });

        const token = jwt.sign({
            user_id: result.user_id,
            user_name: result.user_name,
            email_id: result.email_id
        }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, user: result });
    } catch (error) {
        res.json({ error: error.message });
    }
};

const getPost = async (req, res) => {
    try {
        const result = await Post.getPost(req.params.user_id);
        if (result.error) return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        res.json({ error: error.message });
    }
};

const getMyPost = async (req, res) => {
    try {
        const result = await Post.getMyPost(req.params.user_id);
        if (result.error) return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        res.json({ error: error.message });
    }
};

const changeProfile = async (req, res) => {
    try {
        const result = await User.changeProfile(req.body.data);
        if (result.error) return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        res.json({ error: error.message });
    }
};

module.exports = { register, login, getPost, getMyPost, changeProfile };