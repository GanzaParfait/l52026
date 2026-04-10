import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function Register() {
  const initialFormData = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setTimeout(() => {
        if (formData.password !== formData.confirmPassword) {
          toast.error("Passwords doesn't match");
          return;
        }
      }, 2000);

      await axios.post("http://localhost:5000/api/auth/register", formData);
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 2000);

    } catch (err) {
      console.error("Registration failed:", err);
      toast.error(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();

  return (
    <>
      <div className="container min-h-screen w-min-full bg-gray-100 flex flex-col items-center justify-center">
        <div className="w-140 bg-white p-6 rounded">
          <div className="text-center mb-4">
            <h2 className="pb-4 font-bold text-[30px]">CREATE AN ACCOUNT</h2>
            <p>
              After your account creation, the system automatically will redirect you to the Login page.
            </p>
          </div>

          <form onSubmit={handleRegister}>
            <div className="fields-container mb-5">
              <div className="field mb-3">
                <label>Username or Email</label>
                <input
                  type="text"
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="p-3 border rounded focus:outline-none w-full"
                  placeholder="Username or Email..."
                />
              </div>
              <div className="group-fields flex gap-2">
                <div className="field">
                  <label>FirstName</label>
                  <input
                    type="text"
                    name="firstName"
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="p-3 border rounded focus:outline-none w-full"
                    placeholder="First name..."
                  />
                </div>
                <div className="field">
                  <label>LastName</label>
                  <input
                    type="text"
                    name="lastName"
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="p-3 border rounded focus:outline-none w-full"
                    placeholder="Last name..."
                  />
                </div>
              </div>
              <div className="group-fields flex gap-2">
                <div className="field">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="p-3 border rounded focus:outline-none w-full"
                    placeholder="Password..."
                  />
                </div>
                <div className="field">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="p-3 border rounded focus:outline-none w-full"
                    placeholder="Confirm password..."
                  />
                </div>
              </div>
            </div>

            <div className="text-center">
              <button type="button" disabled={loading} onClick={handleRegister} className="bg-gray-900 text-white p-4 rounded w-full mb-2 cursor-pointer">
                {loading ? "Registering..." : "Register"}
              </button>
              <p className="text-gray-600">
                Already have an account, please
                <Link
                  to="/login"
                  className="text-blue-500 hover:underline pl-2"
                >
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
