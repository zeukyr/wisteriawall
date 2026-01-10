import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const YourPosts = () => {
  const [messageData, setMessageData] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

    useEffect(() => {
        axios
          .get(`${import.meta.env.VITE_API_URL}/api/posts/yours`, { 
            headers: { Authorization: `Bearer ${token}` }})
          .then((response) =>                 
            setMessageData(response.data.data))
          .catch((error) => {
            console.log(error);
            if (error.response && error.response.status === 401) {
                localStorage.removeItem("access_token");
                navigate('/login'); } else {
                    console.log(error);
                }
                });
      }, []);


  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-purple-600 text-center md:text-left">
        Your Posts
        </h1>
        <div className="flex gap-3 mb-6 flex-wrap">
            <button
                onClick={() => navigate('/board')}
                className="mt-2 sm:mt-0 bg-white text-purple-700 font-semibold py-2 px-4 rounded-xl border-2 border-purple-500 shadow-md hover:bg-purple-50 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                >
                Back to Board
                </button>
            </div>



        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {messageData.length > 0 ? (
            messageData.map((message) => (
              <div
                key={message.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 flex flex-col justify-between transition-transform transform hover:-translate-y-1 hover:shadow-2xl"
              >
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 truncate">
                    {message.title || "No Title"}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {message.body}
                  </p>
                </div>

                <div className="mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm">
                    Posted at {new Date(message.created_at).toLocaleString()} by{" "}
                    {message.author?.display_name || "Anonymous"}
                  </span>

                  <button
                    onClick={() => navigate(`/posts/${message.id}`)}
                    className="mt-2 sm:mt-0 bg-white text-purple-700 font-semibold py-2 px-4 rounded-xl border-2 border-purple-500 shadow-md hover:bg-purple-50 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
                  >
                    Expand
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 text-xl py-20">
              No posts so far.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default YourPosts;
