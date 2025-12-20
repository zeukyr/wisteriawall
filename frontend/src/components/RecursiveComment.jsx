import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RecursiveComment = ({ id, body, author, created_at, replies, depth, activeReplyId, setActiveReplyId, post }) => {
    const [reply, setReply] = useState("");
    const token = localStorage.getItem("access_token");

    const navigate = useNavigate(); 
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

    return (
      <div className="ml-4 mt-4">
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 transition-shadow hover:shadow-md">
          <p className="text-gray-700 mb-2">{body}</p>
          <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full text-xs">
            Posted at {new Date(created_at).toLocaleString()} by {author?.display_name || "Anonymous"}
          </span>
          <button className="ml-4 text-purple-600 font-semibold text-sm hover:underline" onClick={() => setActiveReplyId(id)}>
           Reply </button>
        </div>
        {activeReplyId === id && (
            <div>
                <textarea 
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Write a reply..."
                    className="mt-6 w-full border border-gray-300 rounded-xl p-3 mb-3 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-colors"
                    required/>
                <button onClick={submitReply}
                    className="bg-purple-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-purple-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
        Reply
      </button>
      </div>
            )}

  
        {replies?.length > 0 && (
          <div className="ml-4 mt-2 space-y-2" style={{ marginLeft: depth * 40 }}>
            {replies.map((r) => (
              <RecursiveComment 
              key={r.id}
              id={r.id}
              body={r.body}
              author={r.author}
              created_at={r.created_at}
              replies={r.replies}
              depth={depth + 1}
              activeReplyId={activeReplyId}
              setActiveReplyId={setActiveReplyId}            
            />
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default RecursiveComment;