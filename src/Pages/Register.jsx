/* eslint-disable react-hooks/rules-of-hooks */
import { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../providers/AuthProvider";

const Register = () => {
  const { registerUser, updateProfileInfo } = useContext(AuthContext);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");
    const photoUrl = form.get("photo");

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    // Validate presence of uppercase letter
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter");
      return;
    }

    // Validate presence of lowercase letter
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter");
      return;
    }

    try {
      await registerUser(email, password);
      await updateProfileInfo(name, photoUrl);
      toast.success("Registration successful!");
    } catch (error) {
      toast.error("Registration failed. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex flex-col justify-center font-[sans-serif] mt-20 p-4">
        <div className="max-w-md w-full mx-auto border border-gray-300 rounded-lg p-6 shadow-xl transition-transform transform hover:scale-95">
          <div className="text-center mb-12">
            <h4>Register</h4>
          </div>
          <form onSubmit={handleRegister}>
            <div className="space-y-6">
              <div>
                <label className="text-sm mb-2 block">Name</label>
                <input
                  name="name"
                  type="text"
                  className="bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Name"
                />
              </div>
              <div>
                <label className="text-sm mb-2 block">Email Id</label>
                <input
                  name="email"
                  type="text"
                  className="bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter email"
                />
              </div>
              <div>
                <label className="text-sm mb-2 block">Photo URL</label>
                <input
                  name="photo"
                  type="text"
                  className="bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Photo url"
                />
              </div>
              <div>
                <label className="text-sm mb-2 block">Password</label>
                <input
                  name="password"
                  type="password"
                  className="bg-white border border-gray-300 w-full text-sm px-4 py-3 rounded-md outline-blue-500"
                  placeholder="Enter password"
                />
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm">
                  I accept the{" "}
                  <a
                    href="javascript:void(0);"
                    className="text-blue-600 font-semibold hover:underline ml-1"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            <div className="!mt-10">
              <button
                type="submit"
                className="w-full py-3 px-4 text-sm font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
              >
                Create an account
              </button>
            </div>
            <p className="text-sm mt-6 text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-semibold hover:underline ml-1"
              >
                Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
