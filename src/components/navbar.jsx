import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ user, setUser }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // =========================
  // LOGOUT
  // =========================
  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setUser(null);
        setShowDropdown(false);
        navigate("/login");
      }
    } catch (error) {
      alert("Logout failed");
    }
  };

  return (
    <nav className="bg-slate-800">
      <div className="flex justify-between items-center px-4 h-14 py-5 mycontainer text-white">

        {/* Logo */}
        <div className="logo font-bold text-white text-2xl">
          <span className="text-green-700">&lt;</span>Pass op
          <span className="text-green-700">&gt;</span>
        </div>

        {/* Right side — Profile or Nav links */}
        {user ? (
          // Show profile avatar when logged in
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className="w-10 h-10 rounded-full bg-green-500 text-white font-bold text-lg
                         flex items-center justify-center hover:bg-green-400 transition
                         border-2 border-green-300 cursor-pointer"
            >
              {user.username.charAt(0).toUpperCase()}
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg
                              border border-gray-200 py-3 px-4 z-50">
                <p className="font-semibold text-gray-800 text-sm">
                  {user.username}
                </p>
                <p className="text-gray-500 text-xs mb-3">
                  {user.email}
                </p>
                <hr className="mb-3" />
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-500 hover:bg-red-600 text-white text-sm
                             font-semibold py-2 rounded-lg transition cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          // Show nav links when not logged in
          <ul>
            <li className="flex gap-4">
              <a className="hover:font-bold" href="#">Home</a>
              <a className="hover:font-bold" href="#">About</a>
              <a className="hover:font-bold" href="#">Contact</a>
            </li>
          </ul>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
