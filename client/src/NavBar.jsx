import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useAuth } from "./Auth";
const NavBar = () => {
  const {token, role, removeUserToken} = useAuth();

  return (
    <Navbar bg="secondary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Home
        </Navbar.Brand>
        <Nav className="me-auto">
          <>
            {token && role === "user" && (
              <Nav.Link as={Link} to="/profilepage">
                Profile Page
              </Nav.Link>
            )}
            {token && role === "admin" && (
              <Nav.Link as={Link} to="/adminpage">
                Admin Control Panel
              </Nav.Link>
            )}
            {token && (
              <Nav.Link as={Link} onClick={() => removeUserToken()}to="/">
                Logout
              </Nav.Link>
            )}
            {!token && (
              <Nav.Link as={Link} to="/loginpage">
                Login
              </Nav.Link>
            )}
            {!token && (
              <Nav.Link as={Link} to="/registerpage">
                Register
              </Nav.Link>
            )}
          </>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
