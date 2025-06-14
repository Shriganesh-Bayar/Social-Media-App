const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

let postSchema = new mongoose.Schema({
    postTitle: {
        type: String,
        required: true,
        unique: true
    },
    postDescription: {
        type: String,
        required: true,
        unique: true
    },
    postImage:{
        type: String,
    },
    postTime: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        commenterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        commentMessage: {
            type: String,
            required: true
        },
        commentTime: {
            type: Date,
            default: Date.now
        }
    }]
});

const Post = mongoose.model("Post", postSchema);

module.exports = {
    addPost: async ({ postTitle, postDescription, userId, postImage }) => {
        const post = new Post({ postTitle, postDescription, userId, postImage });
        await post.save();
        return post;
    },

    deletePost: async ({ postId, userId }) => {
        const post = await Post.findOneAndDelete({ _id: postId, userId });
        if (!post) throw new Error("Post not found or unauthorized");
        return { message: "Post deleted successfully", postId };
    },

    editPost: async ({ postId, postTitle, postDescription, userId }) => {
        const post = await Post.findOne({ _id: postId, userId });
        if (!post) throw new Error("Post not found or unauthorized");

        post.postTitle = postTitle || post.postTitle;
        post.postDescription = postDescription || post.postDescription;
        await post.save();
        return post;
    },

    toggleLike: async ({ postId, userId }) => {
        const post = await Post.findById(postId);
        if (!post) throw new Error("Post not found");
        const liked = post.likes.includes(userId);
        if (liked) {
            post.likes.pull(userId);
        } else {
            post.likes.push(userId);
        }
        await post.save();
        return {
            liked: !liked,
            totalLikes: post.likes.length
        };
    },

    addComment: async ({ postId, userId, commentMessage }) => {
        const post = await Post.findById(postId);
        if (!post) throw new Error("Post not found");

        post.comments.unshift({ commenterId: userId, commentMessage });
        await post.save();
        return post.comments;
    },



    getPost: async () => {
        try {
            const posts = await Post.find({})
                .populate('userId', 'userName email') // populate basic user info
                .populate('comments.commenterId', 'userName') // populate commenter info
                .sort({ postTime: -1 }); // newest first
            return posts;
        } catch (error) {
            throw new Error("Could not fetch posts");
        }
    },
    getOnePost: async (postid) => {
        try {
            console.log(postid);
            const posts = await Post.findById(postid)
                .populate('userId', 'userName email') // populate basic user info
                .populate('comments.commenterId', 'userName') // populate commenter info
            
                // console.log(posts);
            return posts;
        } catch (error) {
            // console.log(error);
            throw new Error("Could not fetch posts");
        }
    },

    getMyPost: async (userId) => {
        try {
            const posts = await Post.find({ userId })
                .populate('comments.commenterId', 'userName')
                .sort({ postTime: -1 });
            return posts;
        } catch (error) {
            console.log(userId);
            throw new Error("Could not fetch user's posts");
        }
    }
};