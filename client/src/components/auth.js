import React, { useState, useContext } from "react";
import { Toast } from "../utils";
import classname from "classnames";
import Layout from "./layout";
import { UserContext } from "../contexts/UserProvider";

const Auth = () => {
  const [values, setValues] = useState({});
  const [loginActive, setLoginActive] = useState(true);
  const [error, setError] = useState(null);
  const { setIsLoggedIn, setUser, isLoggedIn } = useContext(UserContext);

  if (isLoggedIn) {
    window.location.pathname = "/";
  }
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const fetchLogin = async () => {
    try {
      const res = await fetch("/login", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(values),
      });
      const resData = await res.json();
      if (res.status === 200) {
        localStorage.setItem("token", resData.token);
        setUser({ email: values.email });
        setIsLoggedIn(true);
        Toast("You are logged in.");
      } else {
        setError("Email or password is wrong!");
        Toast("Email or password is wrong!");
      }
    } catch (error) {
      Toast(error.message);
      console.error(error);
    }
  };
  const fetchSignup = async () => {
    try {
      const res = await fetch("/signup", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.status === 201) {
        fetchLogin();
      } else if (res.status === 409) {
        const resData = await res.json();
        console.log(resData);

        setError(resData.message);
        Toast(resData.message);
      }
    } catch (error) {
      Toast(error.message);
      console.error(error);
    }
  };
  const doLogin = async (e) => {
    e.preventDefault();
    if (loginActive) {
      fetchLogin();
    } else {
      fetchSignup();
    }
  };
  const handleTab = (active) => {
    setLoginActive(active);
  };
  return (
    <Layout>
      <div className="w-full mt-16">
        <div className="md:flex md:w-1/2 md:mx-auto md:items-center mb-8 md:mb-16 text-lg font-bold text-black">
          <span
            onClick={() => {
              handleTab(true);
            }}
            className={classname(
              { "text-gray-500": !loginActive },
              "cursor-pointer"
            )}
          >
            Login
          </span>
          <span
            onClick={() => {
              handleTab(false);
            }}
            className={classname(
              "cursor-pointer border-l border-black ml-4 pl-4",
              {
                "text-gray-500": loginActive,
                "text-black": !loginActive,
              }
            )}
          >
            Signup
          </span>
        </div>
        <form onSubmit={doLogin}>
          <div className="md:flex md:items-center mb-8">
            <div className="md:w-1/3">
              <label
                className="block text-gray-800 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-full-name"
              >
                Email
              </label>
            </div>
            <div className="md:w-1/3 relative flex-col">
              <input
                className="bg-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight "
                type="email"
                name="email"
                onChange={handleChange}
                placeholder="john@doe.com"
              />
              {error && (
                <span
                  className="text-red-500 text-xs absolute "
                  style={{
                    bottom: "-1rem",
                    left: "0.25rem",
                  }}
                >
                  {error}
                </span>
              )}
            </div>
          </div>
          <div className="md:flex md:items-center mb-6">
            <div className="md:w-1/3">
              <label
                className="block text-gray-800 font-bold md:text-right mb-1 md:mb-0 pr-4"
                htmlFor="inline-username"
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
              <input
                onClick={doLogin}
                className="cursor-pointer bg-black text-white text-center py-2 px-4 rounded focus:outline-none"
                type="submit"
                value={loginActive ? "Login" : "Signup"}
              />
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Auth;
