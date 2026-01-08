import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const DeleteAccount = () => {
    const [username, setUsername] = useState("")
    const [currentUsername, setCurrentUsername] = useState("")
    const navigate = useNavigate();
    
    const canDelete = username === currentUsername

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        axios.get("http://127.0.0.1:8000/api/current_profile", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            setCurrentUsername(res.data.username)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    const handleDelete = () => {
        const token = localStorage.getItem("access_token");
        axios
        .delete(
          "http://127.0.0.1:8000/api/delete_account",
          { headers: { Authorization: `Bearer ${token}` } }
        )
        .then((response) => {
          if (response.data.message === "success") {
            navigate("/");
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
        }
    return (
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-4xl font-bold text-purple-600 mb-8 text-center">
              Delete Account
            </h1>
            <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-300 mb-4"
                    placeholder="Type your username to confirm account deletion. This action cannot be undone"
                    />
            <button
                onClick={() => handleDelete()}
                disabled={!canDelete}
                className={`w-full font-semibold py-3 rounded-xl shadow-md transition-all duration-200
                    ${canDelete
                      ? "bg-purple-600 text-white hover:bg-purple-700 hover:shadow-lg transform hover:-translate-y-0.5"
                      : "bg-gray-300 text-gray-500 cursor-not-allowed shadow-none transform-none hover:none"
                    }`}>
                         Delete Account 
            </button>

          </div>
        </div>
      )
}

export default DeleteAccount
