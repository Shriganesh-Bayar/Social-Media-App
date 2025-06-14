import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Post = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isPosting, setIsPosting] = useState(false);

  const userId = JSON.parse(localStorage.getItem("user"))._id;
  // console.log(userId);

  const fetchPost = async () => {
    try {
      const res = await axios.get(`https://social-media-app-o3tu.onrender.com/user/onePost/${id}`);
      setPost(res.data.result);
      setComments(res.data.result.comments || []);
    } catch (err) {
      console.error("Error fetching post:", err);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [id]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) return;
    try {
      setIsPosting(true);
      await axios.post(`https://social-media-app-o3tu.onrender.com/post/comment`, {
        postId: id,
        userId: userId,
        commentMessage: newComment
      });
      setNewComment('');
      fetchPost(); // Refresh comments after posting
    } catch (err) {
      console.error("Failed to post comment:", err);
    } finally {
      setIsPosting(false);
    }
  };

  if (!post) return <div className="text-white p-4">Loading post...</div>;

  return (
    <div className="p-4 flex justify-center">
      <div className="w-full max-w-3xl space-y-6">
        {/* Post Content */}
        <div className="bg-[#1a1a1a] border border-zinc-800 rounded-2xl shadow-lg p-4">
          <div className="flex items-center gap-4 mb-2">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover border border-zinc-700"
            />
            <div>
              <p className="text-gray-100 font-medium">{post.userId.userName}</p>
              <p className="text-gray-400 text-xs italic">{formatDate(post.postTime)}</p>
            </div>
          </div>
          <p className="text-gray-100 text-base mb-4 whitespace-pre-wrap">{post.postDescription}</p>
          {post.postImage && (
            <img
              src={post.postImage}
              alt="Post Visual"
              className="w-full max-h-96 object-cover rounded-xl mb-4 border border-zinc-800"
            />
          )}
        </div>

        {/* Comments Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-200 border-b border-zinc-700 pb-2">Comments</h2>
          {comments.length > 0 ? comments.map((comment, index) => (
            <div key={index} className="bg-[#1e1e1e] border border-zinc-700 rounded-xl px-4 py-3 flex gap-3">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt="avatar"
                className="w-9 h-9 rounded-full object-cover border border-zinc-600"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-gray-100 font-semibold">{comment.commenterId.userName}</p>
                  <p className="text-gray-500 text-xs italic">{formatDate(comment.commentTime)}</p>
                </div>
                <p className="text-gray-300 mt-1 whitespace-pre-wrap">{comment.commentMessage}</p>
              </div>
            </div>
          )) : (
            <p className="text-gray-500 italic">No comments yet.</p>
          )}

          {/* New Comment Box */}
          <div className="mt-6">
            <textarea
              rows={3}
              className="w-full p-3 rounded-xl bg-[#1a1a1a] border border-zinc-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={handleCommentSubmit}
              disabled={isPosting}
              className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 transition rounded-xl font-semibold text-white disabled:opacity-50"
            >
              {isPosting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
