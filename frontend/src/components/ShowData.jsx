import axios from "axios";
import { useEffect, useState } from "react";

const ShowData = () => {
    const [userData, setUserData] = useState([])
    console.log(userData)

    useEffect(() => {
        axios.get("http://127.0.0.1:8000/api/getinfo")
            .then(function (response) {
            setUserData(response.data.data)
          })
          .catch(function (error) {
            console.log(error);
          })
          
    }, [])
    return (
        <table>
            <thead>
                <tr>
                    <th> ID </th>
                    <th> username </th>
                    <th> password </th>
                </tr>
            </thead>


        <tbody>
            {userData.length > 0? (userData.map(user => (
                <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.password_hash}</td>
                </tr>
                ))):(
                    <tr><td> Loading</td></tr>
                )}
            </tbody>
        </table> 
    )
}
export default ShowData;