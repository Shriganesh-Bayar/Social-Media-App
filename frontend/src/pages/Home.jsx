import React, { useEffect, useState } from 'react';
import { FaHeart, FaCommentAlt, FaShare } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const data = [
  {
    id: 1234,
    createdBy: {
      id: 321,
      name: "Joe doe",
    },
    text: "hello hi bye, very large text hello hi bye, very large text hello hi bye, very large text hello hi bye, very large text hello hi bye, very large text hello hi bye, very large text hello hi bye, very large text hello hi bye, very large text hello hi bye, very large text hello hi bye, very large text hello hi bye, very large text ",
    image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg",
    likes: 56,
    date: "2025-06-14 15:30:00"
  },
  {
    id: 1235,
    createdBy: {
      id: 321,
      name: "Joe doe",
    },
    text: "hello hi bye, very large text                                         till here",
    image: "https://images.pexels.com/photos/1485548/pexels-photo-1485548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    likes: 56,
    date: "2025-06-14 15:30:00"
  },
  {
    id: 1236,
    createdBy: {
      id: 321,
      name: "Joe doe",
    },
    text: "hello hi bye, very large text                                         till here",
    image: "https://images.pexels.com/photos/1659438/pexels-photo-1659438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    likes: 56,
    date: "2025-06-14 15:30:00"
  },
];

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};



const Home = () => {
  const [posts, setPosts] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    setPosts([...data]);
  }, []);

  return (
    <div className="p-4 flex justify-center">
      <div className="w-full max-w-3xl space-y-6">
        {posts.map(post => (
          <div key={post.id} className="bg-[#1a1a1a] border border-zinc-800 rounded-2xl shadow-lg p-4" onClick={()=>navigate(`/post/${post.id}`)}>
            <div className="flex items-center gap-4 mb-2">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover border border-zinc-700"
              />
              <div>
                <p className="text-gray-100 font-medium">{post.createdBy.name}</p>
                <p className="text-gray-400 text-xs italic">{formatDate(post.date)}</p>
              </div>
            </div>
            <p className="text-gray-100 text-base mb-4 whitespace-pre-wrap">{post.text}</p>
            {post.image && (
              <img
                src={post.image}
                alt="Post Visual"
                className="w-full max-h-96 object-cover rounded-xl mb-4 border border-zinc-800"
              />
            )}
            <div className="flex items-center justify-between text-gray-400">
              <button className="flex items-center gap-2 hover:text-green-400">
                <FaHeart /> {post.likes}
              </button>
              <button className="flex items-center gap-2 hover:text-cyan-400">
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
