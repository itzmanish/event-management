import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <Link to="/" className="text-lg font-bold text-black">
        Eventos
      </Link>
      <div className="flex">
        <Link
          to="/auth"
          className="text-gray-700 hover:text-black mr-6 self-center"
        >
          Login
        </Link>
        <div className="px-4 py-3 text-center rounded bg-black text-white focus:outline-none w-32 cursor-pointer">
          Add Event
        </div>
      </div>
    </div>
  );
};

export default Header;
