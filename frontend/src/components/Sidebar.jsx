import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="h-screen w-64 bg-gray-50 border-r border-gray-200 p-6">
      <nav className="flex flex-col gap-12">
      <button
          onClick={() => navigate("/board")}
          className="text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition"
        >
          Board
        </button>


        <button
          onClick={() => navigate("/settings")}
          className="text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition"
        >
          Account Settings
        </button>

        <button
          onClick={() => navigate("/pinned")}
          className="text-left px-4 py-2 rounded-lg text-gray-700 hover:bg-purple-100 hover:text-purple-700 transition"
        >
          View Pins
        </button>


        <button
          onClick={() => {
            navigate("/")
            localStorage.removeItem("access_token");
          }}
          className="text-left px-4 py-2 rounded-lg text-gray-700  hover:bg-purple-100 hover:text-purple-700 transition"
        >
          Logout
        </button>

        <button
          onClick={() => navigate("/delete-account")}
          className="text-left px-4 py-2 rounded-lg text-red-600 hover:bg-red-100 transition"
        >
          Delete Account
        </button>

      </nav>
    </aside>
  );
};

export default Sidebar;
