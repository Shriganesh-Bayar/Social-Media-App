const Post = require('../models/Post');
const { addPost, editPost, deletePost, toggleLike, addComment } = require('../models/Post');

const addPostController = async (req, res) => {
    try {
        const result = await Post.addPost(req.body);
        if (result.error) return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        res.json({ error: error.message });
    }
};

const editPostController = async (req, res) => {
    try {
        const result = await Post.editPost(req.body);
        if (result.error) return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        res.json({ error: error.message });
    }
};

const deletePostController = async (req, res) => {
    try {
        const result = await Post.deletePost({
            postId: req.params.post_id,
            userId: req.params.user_id
        });
        if (result.error) return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        res.json({ error: error.message });
    }
};

const toggleLikeController = async (req, res) => {
    try {
        const result = await toggleLike({
            postId: req.params.post_id,
            userId: req.params.user_id
        });
        if (result.error) return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        res.json({ error: error.message });
    }
};

const commentPostController = async (req, res) => {
    try {
        const result = await addComment(req.body);
        if (result.error) return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        res.json({ error: error.message });
    }
};

module.exports = { addPostController, editPostController, deletePostController, toggleLikeController, commentPostController };
