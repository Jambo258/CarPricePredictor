import { useAuth } from "./Auth";
import { Routes, Route } from "react-router-dom";

import Home from "./Home";
import ProfilePage from "./ProfilePage";
import AdminPage from "./AdminPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

const RoutesComponent = () => {
  const { token, role } = useAuth();
  console.log(token);
  console.log(role);

  let routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      {token && role === "user" && (
        <Route path="/profilepage" element={<ProfilePage />} />
      )}
      {token && role === "admin" && (
        <Route path="/adminpage" element={<AdminPage />} />
      )}
      {!token && <Route path="/loginpage" element={<LoginPage />} />}
      {!token && <Route path="/registerpage" element={<RegisterPage />} />}
    </Routes>
  );

  return routes;
};

export default RoutesComponent;
