import { Link, useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  return (
    <>
      <div className="container min-h-screen w-min-full bg-gray-100 flex flex-col items-center justify-center">
        <div className="w-120 bg-white p-6 rounded">
          <div className="text-center mb-4">
            <h2 className="pb-4 font-bold text-[30px]">CREATE AN ACCOUNT</h2>
            <p>
              After your account creation, the system automatically will redirect you to the Login page.
            </p>
          </div>

          <form>
            <div className="fields-container mb-5">
              <div className="field mb-3">
                <label>Username or Email</label>
                <input
                  type="text"
                  className="p-3 border rounded focus:outline-none w-full"
                  placeholder="Username or Email..."
                />
              </div>
              <div className="group-fields flex gap-2">
                <div className="field">
                  <label>Password</label>
                  <input
                    type="password"
                    className="p-3 border rounded focus:outline-none w-full"
                    placeholder="Password..."
                  />
                </div>
                <div className="field">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    className="p-3 border rounded focus:outline-none w-full"
                    placeholder="Confirm password..."
                  />
                </div>
              </div>
            </div>

            <div className="text-center">
              <button className="bg-gray-900 text-white p-4 rounded w-full mb-2 cursor-pointer">
                Register
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
