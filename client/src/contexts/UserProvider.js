import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext(null);
let token = localStorage.getItem("token");
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchUser = async () => {
    const res = await fetch("/me", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (res.status === 200) {
      const resData = await res.json();
      setUser({ email: resData.email });
      setIsLoggedIn(true);
    }
  };
  useEffect(() => {
    if (token === undefined || token === "") {
      setIsLoggedIn(false);
      setUser({});
    }
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoggedIn, setUser, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
