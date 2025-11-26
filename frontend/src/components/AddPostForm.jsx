import axios from "axios";
import { useState } from "react";

const AddPostForm = ( { setPage }) => {
    
    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [space, setSpace] = useState('')
    const [error, setError] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token')
        console.log("Token being sent:", token);

        axios.post('http://127.0.0.1:8000/api/posts', {
            title: title,
            body: body,
            space: space,
          },
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
          .then(function (response) {
            console.log(response.data);
            if (response.data.message === "success") {
                setPage("MessageBoard");
            }

          })
          .catch(function (error) {
            if (error.response) {
                console.log("Full error:", error.response);
                console.log("Error data:", error.response?.data);         
                setError("An error occured.");
                }})
        
    }

    return (
        <div className="m-8">
            <h1 className="text-lg font-bold mb-5"> Create Post</h1>
            <form onSubmit={handleSubmit}>
                <label className="block"> Title 
                </label>
                <input 
                    type="text" 
                    name="title" 
                    placeholder="enter title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />

                <label className="block"> Space 
                </label>
                <input 
                    type="text" 
                    name="space" 
                    placeholder="whatever you want"
                    value={space}
                    onChange={(e) => setSpace(e.target.value)}/>

                <label className="block"> Write your post here 
                </label>
                <textarea 
                    name="body" 
                    placeholder="max 500 characters"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}/>

                <button type="submit" className="block"> Add Post </button>
            </form>
            {error && <p className="text-red-500"> {error} </p>}
        </div>
        )
    }

export default AddPostForm
