import background from '../assets/background.png'
import { useNavigate } from 'react-router-dom';
const LandingPage = ({ }) => {
    const navigate = useNavigate();
    return (
        <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh",
          width: "100%"
        
        }}
      >
            <div className="flex flex-col items-center justify-center h-screen gap-1">
                <h1> Welcome to Wisteria Wall </h1>
                <div className="gap-4"> 
                    <button onClick={() => navigate("/login")}> Log In </button> 
                    <button onClick={() => navigate("/signup")}> Sign Up </button> 
                </div>
            </div>

        </div>
    )
}
export default LandingPage