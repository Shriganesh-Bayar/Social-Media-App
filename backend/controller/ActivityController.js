const Activity = require('../models/Activity');

const likePost = async (req, res) => {
    try {
        const result = await Activity.likePost(req.params.post_id);
        if (result.error) return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        res.json({ error: error.message });
    }
};

const commentPost = async (req, res) => {
    try {
        const result = await Activity.commentPost(req.body.data);
        if (result.error) return res.json({ error: result.error });
        res.json({ result });
    } catch (error) {
        res.json({ error: error.message });
    }
};

module.exports = { likePost, commentPost };
