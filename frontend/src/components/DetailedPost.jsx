import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const DetailedPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [reply, setReply] = useState("");
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const submitReply = () => {
    axios
      .post(
        `http://127.0.0.1:8000/api/posts/${id}/replies`,
        { space: post.space, body: reply },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => setReply(""))
      .catch((err) => console.log(err));
  };

  if (!post)
    return (
      <div className="text-center text-gray-500 py-20 text-xl">Loading...</div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl">
        {/* Post Content */}
        <h2 className="text-2xl font-bold text-gray-800 mb-3">{post.title}</h2>
        <p className="text-gray-700 mb-4">{post.body}</p>
        <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
          Posted at {new Date(post.created_at).toLocaleString()} by{" "}
          {post.author?.display_name || "Anonymous"}
        </span>

        {/* Replies */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3">Replies</h3>
          <div className="space-y-4 mb-6">
            {post.replies?.length > 0 ? (
              post.replies.map((r) => (
                <div
                  key={r.id}
                  className="bg-gray-50 border border-gray-200 rounded-xl p-4 transition-shadow hover:shadow-md"
                >
                  <p className="text-gray-700 mb-2">{r.body}</p>
                  <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs">
                    Posted at {new Date(r.created_at).toLocaleString()} by{" "}
                    {r.author?.display_name || "Anonymous"}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No replies yet.</p>
            )}
          </div>

          {/* Reply Form */}
          <textarea
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Write a reply..."
            className="w-full border border-gray-300 rounded-xl p-3 mb-3 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-colors"
            required
          />
          <button
            onClick={submitReply}
            className="bg-purple-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-purple-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Reply
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailedPost;
