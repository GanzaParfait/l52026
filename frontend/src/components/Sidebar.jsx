import { NavLink } from "react-router-dom";
import UserAvatar from "/avatar.jpg";
import { useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const LogOut = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="w-70 flex flex-col justify-between bg-gray-900 min-h-screen text-white">
        <div className="top-header">
          <div className="text-center bg-gray-700 p-4 text-[16px] font-bold">
            <h2>Train System</h2>
          </div>

          <div className="flex flex-col items-center p-4 mb-2">
            <img
              src={UserAvatar}
              className="w-20 h-20 rounded-full"
              alt="Avatar"
            />
            <span>Super Admin</span>
          </div>

          <nav className="flex flex-col gap-2 p-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-700 hover:bg-gray-800 transition-all ease-in-out px-4 py-2 rounded-md"
                  : "hover:bg-gray-800 transition-all ease-in-out px-4 py-2 rounded-md"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-700 hover:bg-gray-800 transition-all ease-in-out px-4 py-2 rounded-md"
                  : "hover:bg-gray-800 transition-all ease-in-out px-4 py-2 rounded-md"
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/reports"
              className={({ isActive }) =>
                isActive
                  ? "bg-gray-700 hover:bg-gray-800 transition-all ease-in-out px-4 py-2 rounded-md"
                  : "hover:bg-gray-800 transition-all ease-in-out px-4 py-2 rounded-md"
              }
            >
              Report
            </NavLink>
          </nav>
        </div>

        <div className="bottom-container p-2">
          <button
            onClick={LogOut}
            className="bg-red-600 p-2 w-full font-bold cursor-pointer hover:bg-red-500 transition-all duration-5 ease-in-out rounded"
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
