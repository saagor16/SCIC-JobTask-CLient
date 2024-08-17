import { Link } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  // Get current year, month name, and date
  const currentYear = new Date().getFullYear();
  const todayDate = new Date();
  const options = { month: 'long', day: 'numeric' };
  const formattedDate = todayDate.toLocaleDateString('en-US', options);

  return (
    <footer className="bg-gradient-to-r from-teal-700 to-cyan-900 text-white py-8 mt-24">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center px-4">
        {/* Logo and Description */}
        <div className="mb-6 lg:mb-0">
          <Link to="/" className="text-2xl font-bold text-white hover:text-gray-300">
            My E-Commerce
          </Link>
          <p className="mt-2 text-gray-400 text-sm">
            Your one-stop shop for the best products.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col lg:flex-row lg:space-x-6 mb-6 lg:mb-0">
          <Link to="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link to="/products" className="hover:text-gray-300">
            Products
          </Link>
          <Link to="/about" className="hover:text-gray-300">
            About
          </Link>
          <Link to="/contact" className="hover:text-gray-300">
            Contact
          </Link>
        </div>

        {/* Social Media Links */}
        <div className="flex space-x-4 mb-6 lg:mb-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
            <FaFacebookF size={20} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
            <FaTwitter size={20} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
            <FaInstagram size={20} />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">
            <FaLinkedinIn size={20} />
          </a>
        </div>
      </div>

      {/* Bottom Text */}
      <div className=" py-4 text-center text-sm">
        <p>&copy; {currentYear} My E-Commerce. All rights reserved. | Today: {formattedDate}</p>
      </div>
    </footer>
  );
};

export default Footer;
