import { useAuth } from "./Auth";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

import Home from "./Home";
import ProfilePage from "./ProfilePage";
import AdminPage from "./AdminPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import { useEffect, useState } from "react";

const RoutesComponent = () => {
  const { token, role, id } = useAuth();
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState();
  // console.log(token);
  // console.log(role);
  // console.log(id);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/getallusers`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        // console.log(response.data);
        setUsers(response.data);

      } catch (error) {
        console.log(error)
      }
    }
    const fetchSingularUserData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/user/${id}`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        // console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    if(token && role === "admin"){
      fetchData();
    } else if(token && role === "user"){
      fetchSingularUserData();
    }


  }, [role, token, id]);

  let routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      {token && role === "user" && (
        <Route
          path="/profilepage"
          element={<ProfilePage user={user} setUser={setUser} />}
        />
      )}
      {token && role === "admin" && (
        <Route
          path="/adminpage"
          element={<AdminPage users={users} setUsers={setUsers} />}
        />
      )}
      {!token && <Route path="/loginpage" element={<LoginPage />} />}
      {!token && <Route path="/registerpage" element={<RegisterPage />} />}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );

  return routes;
};

export default RoutesComponent;

