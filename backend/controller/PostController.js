const Post = require('../models/Post');

const addPost = async (req, res) => {
    try {
        const result = await Post.addPost(req.body.data);
        if (result.error) return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        res.json({ error: error.message });
    }
};

const editPost = async (req, res) => {
    try {
        const result = await Post.editPost(req.body.data);
        if (result.error) return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        res.json({ error: error.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const result = await Post.deletePost(req.params.post_id);
        if (result.error) return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        res.json({ error: error.message });
    }
};

module.exports = { addPost, editPost, deletePost };
