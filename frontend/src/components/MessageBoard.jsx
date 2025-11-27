import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const MessageBoard = () => {
    const [messageData, setMessageData] = useState([])
    const navigate = useNavigate();
    console.log(messageData)
    
    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/posts?space=general")
            .then(function (response) {
            setMessageData(response.data.data)
          })
          .catch(function (error) {
            console.log(error);
          })
        }, [])

    return (
        <div className="min-h-screen bg-white p-8">
            <h1 className="text-4xl font-bold text-left mb-8 text-purple-600 block">
                General Message Board
            </h1>
            <button className="w-72 mb-5 bg-white text-purple-700 font-semibold py-4 px-6 rounded-xl border-2 border-purple-500 shadow-md hover:bg-purple-50 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200" onClick={() => navigate("/new-post")}>
            + Create New Post </button>
            
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {messageData.length > 0 ? (
                    messageData.map(message => (
                        <div 
                            key={message.id} 
                            className="bg-white rounded-lg shadow-md transition-shadow p-6 border border-gray-200"
                        >
                            <h3 className="text-xl font-bold text-gray-800 mb-3">
                                {message.title}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {message.body}
                            </p>
                            <div className="flex items-center text-sm text-gray-500">
                                <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
                                    Created at {new Date(message.created_at).toLocaleString()}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center text-gray-500 text-xl">
                        Loading...
                    </div>
                )}
            </div>
        </div>
    )}
        
    
export default MessageBoard
