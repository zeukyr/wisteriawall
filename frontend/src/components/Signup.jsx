import axios from "axios";
import { useState } from "react";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [display, setDisplay] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); 

        axios.post('http://127.0.0.1:8000/api/signup', {
            username: username,
            password: password,
          })
          .then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
        
    }

    return (
        <div className="m-8">
            <h1 className="text-lg font-bold mb-5"> Create an Account</h1>
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
                    type="text" 
                    name="username" 
                    placeholder="enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}/>

                <label className="block"> Display name (optional) 
                </label>
                <input
                    type="text" 
                    name="display" 
                    placeholder="enter display name"
                    value={display}
                    onChange={(e) => setDisplay(e.target.value)}/>

                <button type="submit" className="block"> Create an Account </button>
            </form>
        </div>
        )
    }

export default Signup
