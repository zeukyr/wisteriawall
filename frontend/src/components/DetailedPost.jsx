import axios from "axios";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RecursiveComment from "./RecursiveComment";

const DetailedPost = () => {
  const [activeReplyId, setActiveReplyId] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [reply, setReply] = useState("");
  const [pinned, setPinned] = useState(false);
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/posts/${id}/pin`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setPinned(res.data.pin))
      .catch((error) => {
        console.log(error)});
  }, [id]);
  
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((res) => setPost(res.data))
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem("access_token");
          navigate('/login');
        } else {
        console.log(error)}});
  }, [id]);

  const toggleButton = () => {
    axios
    .post(`http://127.0.0.1:8000/api/posts/${id}/pin`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((res) => setPinned(res.data.pin))
    .catch((error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("access_token");
        navigate('/login');
      } else {
      console.log(error)}})
  }

  const submitReply = () => {
    axios
      .post(
        `http://127.0.0.1:8000/api/posts/${id}/replies`,
        { space: post.space, body: reply },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => setReply(""))
      .catch((error) => {if (error.response && error.response.status === 401) {
        localStorage.removeItem("access_token");
        navigate('/login');
      } else {
        console.log(error);
      }});
  };

  if (!post)
    return (
      <div className="text-center text-gray-500 py-20 text-xl">Loading...</div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center block">
      
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl">
      {pinned ? 
        (<button 
          className="mb-5 ml-auto bg-purple-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-purple-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          onClick = {toggleButton}> Pinned <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
          <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
        </svg>
        </button> )
          : (<button className="mb-5 ml-auto bg-purple-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-purple-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          onClick={toggleButton}> Pin Post </button>)}
        <h2 className="text-2xl font-bold text-gray-800 mb-3">{post.title}</h2>
        <p className="text-gray-700 mb-4">{post.body}</p>
        <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-sm block mb-4">
          Posted at {new Date(post.created_at).toLocaleString()} by {post.author?.display_name || "Anonymous"}
        </span>
        


        <textarea 
            value={reply}
            onChange={(e) => setReply(e.target.value)}
            placeholder="Write a reply..."
            className="mt-6 w-full border border-gray-300 rounded-xl p-3 mb-3 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-colors"
            required
          />
          <button
            onClick={submitReply}
            className="bg-purple-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-purple-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
          >
            Reply
          </button>

        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-3">Replies</h3>
          <div className="space-y-4 mb-6">
            {post.replies?.length > 0 ? (
              post.replies.map((r) => <RecursiveComment 
              key={r.id}
              id={r.id}
              body={r.body}
              author={r.author}
              created_at={r.created_at}
              replies={r.replies}
              depth={0}
              activeReplyId={activeReplyId}
              setActiveReplyId={setActiveReplyId}
              post={post}
             />)
            ) : (
            <p className="text-gray-500">No replies yet.</p>
            )}          
            </div>

          
        </div>
      </div>
    </div>
  );
};

export default DetailedPost;
