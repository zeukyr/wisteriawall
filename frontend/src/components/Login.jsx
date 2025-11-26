import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ( { } ) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://127.0.0.1:8000/api/login', {
            username: username,
            password: password,
          })
          .then(function (response) {
            console.log(response.data);
            if (response.data.message === "success") {
                localStorage.setItem('access_token', response.data.access_token);
                navigate("/board");
            }

          })
          .catch(function (error) {
            if (error.response) {
                if (error.response.status === 404) {
                    setError("Username not found");
                }
                else if (error.response.status === 401) {
                    setError("Password is wrong");
                }
                else { 
                    setError("An error occurred.")
                }
            }
            else {
                setError("Network error. Check server or CORS.");
            }
            
          });
        
    }

    return (
        <div className="m-8">
            <h1 className="text-lg font-bold mb-5"> Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label className="block"> Username 
                </label>
                <input 
                    type="text" 
                    name="username" 
                    placeholder="enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />

                <label className="block"> Password 
                </label>
                <input 
                    type="password" 
                    name="password" 
                    placeholder="enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>

                <button type="submit" className="block"> Log In </button>
            </form>
            {error && <p className="text-red-500"> {error} </p>}
        </div>
        )
    }

export default Login
