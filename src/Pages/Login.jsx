import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./login.css";
import { AuthContext } from "../providers/AuthProvider";

const Login = () => {
  const { LogIn, googleLogin } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    try {
      const result = await LogIn(email, password);
      console.log(result.user);
    } catch (error) {
      console.error(error);
      toast.error("Invalid email or password");
    }
  };
  const handleSocialLogin = (provider) => {
    provider()
      .then((result) => {
        console.log(result.user);
        toast("successfully logged in");
        navigate(location?.state ? location.state : "/");
      })
      .catch((error) => {
        toast.error("something went wrong");
        console.log(error);
      });
  };

  return (
    <div className="container mx-auto mt-24 flex items-center justify-center">
      <div>
        <div className="card">
          <div className="card2">
            <form className="form" onSubmit={handleLogin}>
              <p>Login</p>
              <h2
                id="heading"
                className="mb-3 text-3xl font-semibold text-center"
              >
                Login to your account
              </h2>
              <p
                id="heading"
                className="text-sm text-center dark:text-gray-600"
              >
                Dont have account?
                <Link
                  to="/register"
                  rel="noopener noreferrer"
                  className="focus:underline hover:underline text-blue-600 font-semibold  ml-1"
                >
                  Sign up here
                </Link>
              </p>
              <div id="heading" className="my-6 space-y-4">
                <button
                  aria-label="Login with Google"
                  onClick={() => handleSocialLogin(googleLogin)}
                  type="button"
                  className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                    className="w-5 h-5 fill-current"
                  >
                    <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
                  </svg>
                  <p>Login with Google</p>
                </button>
              </div>

              <div className="field">
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  height="16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                  className="input-icon"
                >
                  <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
                </svg>
                <input
                  type="email"
                  name="email"
                  className="input-field"
                  placeholder="email"
                  autoComplete="off"
                />
              </div>
              <div className="field">
                <svg
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  height="16"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                  className="input-icon"
                >
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                </svg>
                <input
                  type="password"
                  name="password"
                  className="input-field"
                  placeholder="Password"
                />
              </div>
              <div>
                <button className="button3 mt-5 w-full">Login</button>
              </div>
              <button className="button3">Forgot Password</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
