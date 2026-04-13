import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function LogIn() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleLogIn = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", credentials);
      console.log("Check token if created from backend", response.data.token);
      localStorage.setItem("token", response.data.token);

      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
      toast.error(err.response?.data?.message || "Login failed. Please try again.");
    }
  }

  return (
    <>
      <div className="container min-h-screen w-min-full bg-gray-100 flex flex-col items-center justify-center">
        <div className="w-120 bg-white p-6 rounded">
          <div className="text-center mb-4">
            <h2 className="pb-4 font-bold text-[30px]">LOGIN FORM</h2>
            <p className="text-gray-600">
              Before accessing this page, please make sure that you are one from
              Train's System
            </p>
          </div>

          <form onSubmit={() => handleLogIn()}>
            <div className="fields-container mb-5">
              <div className="field mb-3">
                <label>Username or Email</label>
                <input
                  type="text"
                  onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                  className="p-3 border rounded focus:outline-none w-full"
                  placeholder="Username or Email..."
                />
              </div>
              <div className="field">
                <label>Password</label>
                <input
                  type="password"
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  className="p-3 border rounded focus:outline-none w-full"
                  placeholder="Password..."
                />
              </div>
            </div>

            <div className="text-center">
              <button
                className="bg-gray-900 text-white p-4 rounded w-full mb-2 cursor-pointer"
                onClick={handleLogIn}
              >
                LOGIN
              </button>
              <p className="text-gray-600">
                If no account, please { " " }
                <Link to="/register" className="text-blue-500 hover:underline ">
                  Create an account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default LogIn;
