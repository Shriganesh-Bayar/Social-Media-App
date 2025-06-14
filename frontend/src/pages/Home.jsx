import React, { useEffect, useState } from 'react';
import { FaHeart, FaCommentAlt, FaShare } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import axios from "axios";


const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    // setPosts([...data]);
  const fetchPosts = async () => {
    try {
      const res = await axios.get("http://localhost:8080/user/allPost");
      console.log(res);
      setPosts(res.data.result); // use res.data instead of 'data'
    } catch (err) {
      console.error("Failed to fetch posts", err);
    }
  };

  fetchPosts();
}, []);


  return (
    <div className="p-4 flex justify-center">
      <div className="w-full max-w-3xl space-y-6">
        {posts.map(post => (
          <div key={post._id} className="bg-[#1a1a1a] border border-zinc-800 rounded-2xl shadow-lg p-4" >
            <div className="flex items-center gap-4 mb-2">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover border border-zinc-700"
              />
              <div>
                <p className="text-gray-100 font-medium">{post.userId.userName}</p>
                <p className="text-gray-400 text-xs italic">{new Date(post.postTime).toLocaleString()}</p>
              </div>
            </div>
            <div onClick={()=>navigate(`/post/${post._id}`)}>
            <p className="text-gray-100 text-base mb-4 whitespace-pre-wrap">{post.postDescription}</p>
            {post.postImage && (
              <img
              src={post.postImage}
              alt="Post Visual"
              className="w-full max-h-96 object-cover rounded-xl mb-4 border border-zinc-800"
              />
            )}
            </div>
            <div className="flex items-center justify-between text-gray-400">
              <button className="flex items-center gap-2 hover:text-green-400">
                <FaHeart /> {post.likes.length}
              </button>
              <button className="flex items-center gap-2 hover:text-cyan-400" onClick={()=>navigate(`/post/${post._id}`)}>
                <FaCommentAlt /> Comment
              </button>
              <button className="flex items-center gap-2 hover:text-yellow-400">
                <FaShare /> Share
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
