import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [display, setDisplay] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); 

        axios.post('http://127.0.0.1:8000/api/signup', {
            username: username,
            password: password,
            display_name: display,
          })
          .then(function (response) {
            console.log(response.data);
            navigate("/login");
          })
          .catch(function (error) {
            if (error.response?.data?.detail) {
                setError(error.response.data.detail);
            } else if (error.response?.data?.message) {
                setError(error.response.data.message);
            } else if (error.response?.data?.error) {
                setError(error.response.data.error);
            } else {
                setError('Failed to create account. Please try again.');
            }        
            console.log(error);
          });
        
    }

    return (
        <div className="m-8">
            <h1 className="text-3xl font-bold text-left text-gray-800 mb-2"> Create an Account </h1>
            <form onSubmit={handleSubmit}>
                    <label className="block text-large font-semibold text-gray-700 mb-2"> Username 
                    </label>
                    <input 
                        type="text" 
                        name="username" 
                        placeholder="enter username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-72 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors mb-4"
                        required
                        />

                    <label className="block text-large font-semibold text-gray-700 mb-3"> Password 
                    </label>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-72 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors mb-4"
                        required
    />

                    <label className="block text-large font-semibold text-gray-700 mb-3"> Display name (optional) 
                    </label>
                    <input
                        type="text" 
                        name="display" 
                        placeholder="enter display name"
                        value={display}
                        onChange={(e) => setDisplay(e.target.value)}
                        className="block w-72 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-colors mb-4"/>
                    
                    <button type="submit" className="w-72 bg-white text-purple-700 font-semibold py-4 px-6 rounded-xl border-2 border-purple-500 shadow-md hover:bg-purple-50 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"> Create an Account </button>
                </form>
            {error && <p className="text-red-500"> {error} </p>}
        </div>
        )
    }

export default Signup
