import axios from "axios";
import { createContext, useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useCallback } from "react";
import { useContext } from "react";
const AuthContext = createContext({});
let logoutTimer;

const AuthProvider = ( {children} ) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState();
  const [tokenExpirationDate, setTokenExpirationDate] = useState();

  const setUserToken = useCallback ((newToken, exp) => {
    const decodedToken = jwtDecode(newToken);
    console.log(decodedToken);
    setToken(newToken);
    setRole(decodedToken.role);
    const tokenExpirationDate =
    exp || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
  }, []);

  console.log(tokenExpirationDate)
  const removeUserToken =  useCallback(() => {
    setToken(null);
    setRole(null);
    setTokenExpirationDate(null);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
     const exp = localStorage.getItem("exp");
     console.log(token)
     console.log(exp)
    if (
      token  &&
       new Date(exp) > new Date()
    ) {
      setUserToken(
        token,
         new Date(exp)
      );
    }
  }, [setUserToken]);


  useEffect(() => {
    if (token && tokenExpirationDate) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken)
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
      localStorage.setItem("token", token);
      localStorage.setItem("exp", new Date(decodedToken.exp * 1000));
      // console.log(tokenExpirationDate)
      const remainingTime =
        tokenExpirationDate - new Date().getTime();
      console.log(remainingTime)
      logoutTimer = setTimeout(removeUserToken, remainingTime);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
      localStorage.removeItem("exp");
      clearTimeout(logoutTimer);
    }
  }, [token, removeUserToken, tokenExpirationDate]);

  const contextValue = useMemo(
    () => ({
      token,
      role,
      tokenExpirationDate,
      setUserToken,
      removeUserToken
    }),
    [token, role, tokenExpirationDate, removeUserToken, setUserToken]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AuthContext);
};
 export default AuthProvider;

