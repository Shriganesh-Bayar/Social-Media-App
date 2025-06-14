import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Addpost = () => {
    let navigate=useNavigate();
    const [userId,setUserId]=useState();
    useEffect(()=>{
        if(!localStorage.getItem("user") || !JSON.parse(localStorage.getItem("user"))._id){
            navigate("/user/login");
        }
        setUserId(JSON.parse(localStorage.getItem("user"))._id);
        // console.log(JSON.parse(localStorage.getItem("user"))._id);
    },[])
  const [formData, setFormData] = useState({
    postTitle: '',
    postDescription: '',
    postImage: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://social-media-app-o3tu.onrender.com/post/add', {...formData,userId}); // adjust URL to match your backend
      setMessage('Post created successfully!');
      setFormData({
        postTitle: '',
        postDescription: '',
        postImage: '',
      });
      navigate("/");
    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || 'Failed to create post.');
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex justify-center px-4 py-8">
      <div className="w-full max-w-xl bg-[#2a2a2a] rounded-2xl p-8 shadow-lg text-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Create New Post</h2>
        {message && (
          <div className="mb-4 text-sm text-center text-green-400">{message}</div>
        )}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1">Post Title</label>
            <input
              type="text"
              name="postTitle"
              value={formData.postTitle}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-xl bg-[#1a1a1a] border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Post Description</label>
            <textarea
              name="postDescription"
              value={formData.postDescription}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 rounded-xl bg-[#1a1a1a] border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Image URL (optional)</label>
            <input
              type="text"
              name="postImage"
              value={formData.postImage}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl bg-[#1a1a1a] border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-green-600 hover:bg-green-700 transition rounded-xl font-semibold"
          >
            Submit Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addpost;
