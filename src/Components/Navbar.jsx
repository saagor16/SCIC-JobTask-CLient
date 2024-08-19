import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Logout function
  const handleLogOut = () => {
    logOut();
  };

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Navbar items
  const navItems = (
    <>
      <li>
        <Link to="/" className="text-white hover:text-gray-200">
          Home
        </Link>
      </li>
      <li>
        <Link to="/products" className="text-white hover:text-gray-200">
          Products
        </Link>
      </li>
    </>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-10 bg-gradient-to-r from-teal-700 to-cyan-900 shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="flex items-center">
          <button
            tabIndex={0}
            className="lg:hidden px-3 py-2 text-white hover:text-gray-200"
            onClick={toggleMenu}
            aria-label="Menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <Link to="/" className="text-2xl font-bold text-white">
            My E-Commerce
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:items-center lg:space-x-6">
          <ul className="flex space-x-6">{navItems}</ul>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <button
                className="text-white hover:text-gray-200"
                onClick={toggleDropdown}
              >
                <img
                  src={user.photoURL || "/default-avatar.png"}
                  alt={user.displayName}
                  className="w-10 h-10 rounded-full"
                />
              </button>
              {isOpen && (
                <ul
                  ref={dropdownRef}
                  className="absolute right-0 mt-2 w-48 py-2 bg-white border border-gray-300 rounded-lg shadow-lg"
                >
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-2">
              <Link to="/register">
                <p className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">
                  Register
                </p>
              </Link>
              <Link to="/login">
                <p className="bg-white text-red-600 py-2 px-4 border border-red-600 rounded-md hover:bg-gray-100">
                  Login
                </p>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden fixed inset-0 z-20 bg-gray-900 bg-opacity-75 flex flex-col items-center justify-center">
            <button
              className="text-white absolute top-4 right-4 text-2xl"
              onClick={toggleMenu}
            >
              &times;
            </button>
            <ul className="flex flex-col space-y-4 text-white text-center">
              {navItems}
              <div className="flex flex-col items-center gap-4 mt-6">
                {user ? (
                  <button
                    onClick={handleLogOut}
                    className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
                  >
                    Logout
                  </button>
                  
                ) : (
                  <>
                    <Link to="/register">
                      <p className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700">
                        Register
                      </p>
                    </Link>
                    <Link to="/login">
                      <p className="bg-white text-red-600 py-2 px-4 border border-red-600 rounded-md hover:bg-gray-100">
                        Login
                      </p>
                    </Link>
                  </>
                )}
              </div>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
