import React, { useState } from "react";
import Header from "./header";

const Auth = () => {
  const [values, setValues] = useState({});
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const doLogin = async () => {
    const res = await fetch("/login", {
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: "POST",
      body: JSON.stringify(values),
    });
    const resData = await res.json();
    if (resData.token) {
      localStorage.setItem("token", resData.token);
    }
  };
  return (
    <div className="mt-8 max-w-screen-lg lg:mx-auto mx-4">
      <Header />
      <form className="w-full mt-16">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-800 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="inline-full-name"
            >
              Email
            </label>
          </div>
          <div className="md:w-1/3">
            <input
              className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight "
              type="email"
              name="email"
              onChange={handleChange}
              placeholder="john@doe.com"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-800 font-bold md:text-right mb-1 md:mb-0 pr-4"
              for="inline-username"
            >
              Password
            </label>
          </div>
          <div className="md:w-1/3">
            <input
              className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight "
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="******************"
            />
          </div>
        </div>

        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              onClick={doLogin}
              className="bg-black text-white text-center py-2 px-4 rounded focus:outline-none"
              type="button"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Auth;
