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
            <div className="flex flex-col gap-4 items-center justify-center h-screen gap-1">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-3 tracking-tight">
                    Eunoia
                </h1>
                <h2 className="text-lg text-center text-gray-600 mb-6 px-4"> An anonymous message board for women in CS </h2>
                <div className="flex flex-row gap-4 w-72"> 
                    <button onClick={() => navigate("/login")}
                        className="w-full bg-linear-to-r from-purple-500 to-purple-700 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl hover:from-purple-600 hover:to-purple-800 transform hover:-translate-y-0.5 transition-all duration-200"> Log In </button> 
                    <button onClick={() => navigate("/signup")}
                    className="w-full bg-white text-purple-700 font-semibold py-4 px-6 rounded-xl border-2 border-purple-500 shadow-md hover:bg-purple-50 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"> Sign Up </button> 
                </div>
            </div>

        </div>
    )
}
export default LandingPage