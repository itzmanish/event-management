import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { UserContext } from "../contexts/UserProvider";

const Header = () => {
  const { user, isLoggedIn, setIsLoggedIn, setUser } = useContext(UserContext);
  const logout = () => {
    localStorage.setItem("token", "");
    setUser({});
    setIsLoggedIn(false);
  };
  return (
    <div className="flex items-center justify-between">
      <Link to="/" className="text-lg font-bold text-black">
        Eventos
      </Link>
      <div className="flex">
        {isLoggedIn ? (
          <div className="text-gray-800 self-center mr-6 flex">
            <div className="border-r border-black pr-2 hidden md:block">
              {user.email.split("@")[0].toUpperCase()}
            </div>
            <div onClick={logout} className="cursor-pointer ml-2">
              Logout
            </div>
          </div>
        ) : (
          <Link
            to="/auth"
            className="text-gray-700 hover:text-black mr-6 self-center"
          >
            Login
          </Link>
        )}
        <Link
          to="/add"
          className="px-4 py-3 text-center rounded bg-black text-white focus:outline-none w-32 cursor-pointer"
        >
          Add Event
        </Link>
      </div>
    </div>
  );
};

export default Header;
