import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  // Getting username and role from local storage
  const username = localStorage.getItem("username") || "User";
  const role = localStorage.getItem("role") || "No Role";

  // Removes user session and goes back to login page
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="flex justify-between items-center bg-gray-800 text-white p-4">
      <h1 className="text-lg font-bold">Task Management</h1>
      <p className="text-lg">
        Welcome, {username} <span className="font-bold">({role})</span>!
      </p>
      <button onClick={handleLogout} className="px-4 py-2 bg-red-500 rounded">
        Logout
      </button>
    </div>
  );
};

export default Navbar;
