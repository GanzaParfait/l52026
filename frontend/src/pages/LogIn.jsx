import { Link, useNavigate } from "react-router-dom";

function LogIn() {
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

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
              <div className="field">
                <label>Password</label>
                <input
                  type="password"
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
                If no account, please{" "}
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
