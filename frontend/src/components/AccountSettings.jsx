import axios from "axios";
import { useEffect, useState } from "react";
import defaultAvatar from "../assets/default-avatar.png";

const AccountSettings = ({ }) => {
    const [displayName, setDisplayName] = useState(null)
    const [profilePictureUrl, setProfilePictureUrl] = useState("")
    const [username, setUserName] = useState("")
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        axios.get("http://127.0.0.1:8000/api/current_profile", {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then((res) => {
            setDisplayName(res.data.display_name)
            setProfilePictureUrl(res.data.avatar_url)
            setUserName(res.data.username)
            setLoading(false)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    const handleSave = () => {
        setEditing(false);
        const token = localStorage.getItem("access_token");

        axios.put("http://127.0.0.1:8000/api/update_avatar", 
            {
                display_name: displayName,
                avatar_url: profilePictureUrl,          
            },
            {
            headers: { Authorization: `Bearer ${token}` },
    }
)
        .then((res) => {
            console.log("Profile updated:", res.data);
        })
        .catch((err) => {
            console.log(err)
        })
    }

    if (loading) {
        return (
          <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
            Loading...
          </div>
        );
      }
      const AvatarSrc = profilePictureUrl ? profilePictureUrl : defaultAvatar;

      return (
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-3xl mx-auto p-6">
            <h1 className="text-4xl font-bold text-purple-600 mb-8 text-center">
              Account Settings
            </h1>
            
            <div className="flex flex-col items-center">
                {editing ? (
                <input
                    value={profilePictureUrl}
                    onChange={(e) => setProfilePictureUrl(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-300 mb-4"
                    placeholder="Enter the URL of the photo you would like on your profile picture"
                    />
                ) :
              (<img 
                src={ AvatarSrc }
                alt="Profile Avatar"
                className="w-32 h-32 rounded-full object-cover border-2 mb-4"           
              />)}
        
              <div className="mb-6">
                
                {editing ? (
                <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border-2 border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-300"
                placeholder="Enter display name"
                />
                ) : (

                <label className="block text-2xl font-semibold text-gray-700">
                  {displayName ? displayName : "No Display Name"}
                </label>
                )}
        
                <span className="text-gray-500 text-center block text-center">@{username}</span>
              </div>
            </div>

            {editing ? (
                <button 
                onClick={() => handleSave()}
                className="w-full bg-purple-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-purple-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                Save Changes
                </button>
            ) :
            <button
                onClick={() => setEditing(true)}
                className="w-full bg-purple-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-purple-700 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                Edit Profile 
            </button>}

          </div>
        </div>
      )
    }

export default AccountSettings
