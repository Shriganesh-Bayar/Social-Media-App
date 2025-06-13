import React from 'react';
import { useParams } from 'react-router';

const data1 = {
  id: 1234,
  createdBy: {
    id: 321,
    name: "Joe doe",
  },
  text: "hello hi bye, very large text hello hi bye, very large text hello hi bye, very large text hello hi bye, very large text hello hi bye, very large text hello hi bye, very large text hello hi bye, very large text hello hi bye, very large text hello hi bye, very large text hello hi bye, very large text hello hi bye, very large text ",
  image: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg",
  likes: 56,
  date: "2025-06-14 15:30:00"
};

const data2 = [
  {
    from: {
      id: 321,
      name: "sachin"
    },
    text: "with great power comes great responsibility",
    date: "2025-06-14 15:30:00"
  },
  {
    from: {
      id: 321,
      name: "sham"
    },
    text: "God is great",
    date: "2025-06-14 15:30:00"
  },
  {
    from: {
      id: 321,
      name: "Tom"
    },
    text: "i am fine how are you",
    date: "2025-06-14 15:30:00"
  }
];

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const Post = () => {
  let { id } = useParams();

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
              <p className="text-gray-100 font-medium">{data1.createdBy.name}</p>
              <p className="text-gray-400 text-xs italic">{formatDate(data1.date)}</p>
            </div>
          </div>
          <p className="text-gray-100 text-base mb-4 whitespace-pre-wrap">{data1.text}</p>
          {data1.image && (
            <img
              src={data1.image}
              alt="Post Visual"
              className="w-full max-h-96 object-cover rounded-xl mb-4 border border-zinc-800"
            />
          )}
        </div>

        {/* Comments Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-200 border-b border-zinc-700 pb-2">Comments</h2>
          {data2.map((comment, index) => (
            <div key={index} className="bg-[#1e1e1e] border border-zinc-700 rounded-xl px-4 py-3 flex gap-3">
              <img
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt="avatar"
                className="w-9 h-9 rounded-full object-cover border border-zinc-600"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-gray-100 font-semibold">{comment.from.name}</p>
                  <p className="text-gray-500 text-xs italic">{formatDate(comment.date)}</p>
                </div>
                <p className="text-gray-300 mt-1 whitespace-pre-wrap">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
