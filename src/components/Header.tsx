/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../utils/constants";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // ✅ Check login using backend route with cookie
  const checkAuth = async () => {
    try {
      const response = await axios.get(`${BACKEND_URL}me`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setIsLoggedIn(true);
      }
    } catch (err) {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // ✅ Logout handler
  const handleLogout = async () => {
    try {
      await axios.get(`${BACKEND_URL}logout`, {
        withCredentials: true,
      });
      setIsLoggedIn(false);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="flex justify-between items-center shadow px-4 py-2 bg-white">
      <h1 className="text-xl font-thin">Basic-Activity-Booking-App</h1>

      <div className="flex items-center font-thin">
        <Link to="/" className="px-4">Home</Link>
        <Link to="/bookings" className="px-4">Bookings</Link>
        <Link to="/activities" className="px-4">Host Activity</Link>

        {isLoggedIn ? (
          <button onClick={handleLogout} className="px-4 rounded-md cursor-pointer text-red-600">
            login
          </button>
        ) : (
          <Link to="/login" className="px-4 rounded-md cursor-pointer text-blue-600">
            Logout
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
