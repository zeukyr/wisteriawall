import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const AddPostForm = ({ }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [space, setSpace] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access_token");

    axios
      .post(
        "http://127.0.0.1:8000/api/posts",
        { title, body, space },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        if (response.data.message === "success") {
          navigate("/board");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("access_token");
          navigate('/login');
          
        }
        else {
          setError("An error occurred while posting.");
        }      
      });
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-gray-50 p-6 pt-20">
      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">
          Create a New Post
        </h1>
        <p className="text-gray-500 text-center mb-6">
          Share your thoughts or ideas with your community.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              placeholder="Enter post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Space</label>
            <input
              type="text"
              placeholder="whatever you want"
              value={space}
              onChange={(e) => setSpace(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-colors"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700 mb-1">Post Content</label>
            <textarea
              placeholder="Write your post here (max 500 characters)"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-colors resize-none h-40"
              required
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mt-1 text-center">{error}</p>
          )}

          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-purple-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-purple-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Post
            </button>
            <button
              type="button"
              onClick={() =>
                navigate("/board")}
              className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl shadow-md hover:bg-gray-300 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPostForm;
