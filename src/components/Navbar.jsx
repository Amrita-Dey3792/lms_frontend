import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { user, logout } = useContext(AuthContext);

  // Get first letter of username for fallback avatar
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "";
  };

  return (
    <nav className="sticky top-0 z-50 bg-indigo-600 bg-opacity-70 backdrop-blur-md text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            to="/"
            className="flex-shrink-0 font-bold text-2xl tracking-wide cursor-pointer"
          >
            LMS
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              Home
            </Link>
            <Link
              to="/courses"
              className="hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              Courses
            </Link>
            <Link
              to="/about"
              className="hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover:bg-indigo-700 px-3 py-2 rounded-md text-sm font-medium transition"
            >
              Contact
            </Link>
          </div>

          {/* Profile & Hamburger */}
          <div className="flex items-center space-x-4">
            {user ? (
              // Profile dropdown when logged in
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center focus:outline-none focus:ring-2 focus:ring-white rounded-full"
                  aria-haspopup="true"
                  aria-expanded={profileOpen ? "true" : "false"}
                >
                  {user.profile_pic ? (
                    <img
                      className="h-8 w-8 rounded-full object-cover"
                      src={user.profile_pic}
                      alt="User Avatar"
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-indigo-800 flex items-center justify-center text-white font-semibold text-lg select-none">
                      {getInitial(user.username)}
                    </div>
                  )}

                  <span className="ml-2 text-sm font-medium">{user.username}</span>
                  <svg
                    className="ml-1 h-4 w-4 fill-current"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5.23 7.21a.75.75 0 011.06-.02L10 10.67l3.71-3.48a.75.75 0 111.04 1.08l-4.25 4a.75.75 0 01-1.04 0l-4.25-4a.75.75 0 01-.02-1.06z" />
                  </svg>
                </button>

                {profileOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-700 ring-1 ring-black ring-opacity-5"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm hover:bg-indigo-100"
                      role="menuitem"
                      onClick={() => setProfileOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm hover:bg-indigo-100"
                      role="menuitem"
                      onClick={() => setProfileOpen(false)}
                    >
                      Settings
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setProfileOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-indigo-100"
                      role="menuitem"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Login button when not logged in
              <Link
                to="/login"
                className="bg-white text-indigo-600 font-semibold px-4 py-2 rounded-md shadow-md hover:bg-indigo-100 transition"
              >
                Login
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden focus:outline-none focus:ring-2 focus:ring-white rounded-md"
              aria-label="Toggle menu"
            >
              {menuOpen ? (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-indigo-700 bg-opacity-90">
          <Link
            to="/"
            className="block px-4 py-3 text-white hover:bg-indigo-800"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/courses"
            className="block px-4 py-3 text-white hover:bg-indigo-800"
            onClick={() => setMenuOpen(false)}
          >
            Courses
          </Link>
          <Link
            to="/about"
            className="block px-4 py-3 text-white hover:bg-indigo-800"
            onClick={() => setMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block px-4 py-3 text-white hover:bg-indigo-800"
            onClick={() => setMenuOpen(false)}
          >
            Contact
          </Link>
          {!user && (
            <Link
              to="/login"
              className="block px-4 py-3 text-white hover:bg-indigo-800 font-semibold border-t border-indigo-600"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
