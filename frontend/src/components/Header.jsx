import { useState } from "react";
import UserImage from "/avatar.jpg";
import { Link, useNavigate } from "react-router-dom";
import { BiChevronDown } from "react-icons/bi";

function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const LogOut = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="p-4 bg-gray-900 w-min-full h-14 border border-gray-900 border-b-amber-100 text-white flex justify-between">
        <span>Welcome Back</span>
        <div
          className="user-profile flex gap-2 items-center cursor-pointer"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <img src={UserImage} className="h-10 w-10 rounded-full" alt="" />
          <span>John Doe</span>
          <BiChevronDown className="text-xl font-bold"></BiChevronDown>
        </div>
      </div>

      {showDropdown && (
        <div className="fixed inset-0 bg-black/50" onClick={() => setShowDropdown(false)}>
          <div className="profile-dropdown p-2 shadow fixed top-14 right-4 flex flex-col w-40 bg-white gap-2 rounded-md">
            <Link to="/profile" className="p-2 bg-white rounded-md">
              My Profile
            </Link>
            <button
              onClick={LogOut}
              className="bg-red-500 p-2 rounded-md text-white cursor-pointer hover:bg-red-400 text-bold"
            >
              Log Out
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
