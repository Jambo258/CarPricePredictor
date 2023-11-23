import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import Container from "react-bootstrap/Container";
import "./ProfileCard.css";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Form from "react-bootstrap/Form";
import ModalComponent from "./ModalComponent";
import axios from "axios";
import { useAuth } from "./Auth";
import Dropdown from "react-bootstrap/Dropdown";

const ProfileCard = (props) => {
  const [username, setUsername] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);
  const [Role, setRole] = useState(props.user.role);
  const { token, role } = useAuth();

  const roles = ["admin", "user"];

  const HandleRole = async (item) => {
    setRole(item);
    const userRole = {
      role: item
    }
    try {
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/user/${props.user.id}`,
          userRole,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        // console.log(response.data);
        if (role === "admin") {
          props.setUsers((prev) =>
            prev.map((element) => {
              if (element.id === props.user.id) {
                return { ...element, role: response.data.role };
              }
              return element;
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
  }

  const validationSchemaUsername = Yup.object().shape({
    username: Yup.string().required("Username is required"),
  });

  const validationSchemaEmail = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email form")
      .required("Email is required"),
  });

  const validationSchemaPassword = Yup.object().shape({
    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .required("Password is required"),
    retypePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Retype Password is required"),
  });

  const formikUsername = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: validationSchemaUsername,
    onSubmit: async (values) => {
      const modifiedUser = {
        username: values.username,
      };
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/user/${props.user.id}`,
          modifiedUser,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        // console.log(response.data);
        formikUsername.resetForm();
        setUsername(false);
        // console.log(values);
        if (role === "admin") {
          props.setUsers((prev) =>
            prev.map((element) => {
              if (element.id === props.user.id) {
                return { ...element, username: response.data.username };
              }
              return element;
            })
          );
        } else if (role === "user") {
          props.setUser((prev) => ({
            ...prev,
            username: response.data.username,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  const formikEmail = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchemaEmail,
    onSubmit: async (values) => {
      const modifiedUser = {
        email: values.email,
      };
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/user/${props.user.id}`,
          modifiedUser,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        // console.log(response.data);
        formikEmail.resetForm();
        setEmail(false);
        // console.log(values);
        if (role === "admin") {
          props.setUsers((prev) =>
            prev.map((element) => {
              if (element.id === props.user.id) {
                return { ...element, email: response.data.email };
              }
              return element;
            })
          );
        } else if (role === "user") {
          props.setUser((prev) => ({
            ...prev,
            email: response.data.email,
          }));
        }
      } catch (error) {
        console.log(error);
        formikEmail.errors.email = error.response.data.error;
      }
    },
  });
  const formikPassword = useFormik({
    initialValues: {
      password: "",
      retypePassword: "",
    },
    validationSchema: validationSchemaPassword,
    onSubmit: async (values) => {
      const modifiedUser = {
        password: values.password,
      };
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/user/${props.user.id}`,
          modifiedUser,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        // console.log(response.data);
        formikPassword.resetForm();
        setPassword(false);
        // console.log(values);
        if (role === "admin") {
          props.setUsers((prev) =>
            prev.map((element) => {
              if (element.id === props.user.id) {
                return { ...element, password: response.data.password };
              }
              return element;
            })
          );
        } else if (role === "user") {
          props.setUser((prev) => ({
            ...prev,
            password: response.data.password,
          }));
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <Card
      style={{
        width: "18rem",
        backgroundColor: "lightblue",
        marginTop: "2%",
        border: "1px solid black",
        borderRadius: "5px",
        marginBottom: "2%",
        margin: "auto",
      }}
    >
      <Card.Body>
        <Card.Title style={{ marginBottom: "15%" }}>
          Profile Card
          <ModalComponent id={props.user.id} setUsers={props.setUsers} />
        </Card.Title>
        <Card.Text>Username: {props.user.username}</Card.Text>
        <Card.Text>Email: {props.user.email}</Card.Text>
        <Card.Text>Password: {props.user.password}</Card.Text>
        <Card.Text>Role: {props.user.role}</Card.Text>
        <ListGroup className="list-group list-group-profile">
          <ListGroup.Item>
            <Button
              className="w-100"
              variant="primary"
              onClick={() => {
                setUsername(!username);
                setEmail(false);
                setPassword(false);
                formikUsername.resetForm();
              }}
            >
              Change username
            </Button>
            {username ? (
              <Form onSubmit={formikUsername.handleSubmit}>
                <Form.Group className="mt-3" controlId="formUsername">
                  <Form.Label>New Username</Form.Label>
                  <Form.Control
                    onChange={formikUsername.handleChange}
                    value={formikUsername.values.username}
                    name="username"
                    type="text"
                    placeholder="Username"
                  />
                  {formikUsername.touched.username &&
                  formikUsername.errors.username ? (
                    <div className="errors">
                      {formikUsername.errors.username}
                    </div>
                  ) : null}
                </Form.Group>
                <Button
                  className="mt-3 mb-3"
                  variant="primary"
                  onClick={() => {
                    formikUsername.resetForm();
                    setUsername(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="mt-3 mb-3 inline-button"
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            ) : null}
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              variant="primary"
              className="w-100"
              onClick={() => {
                setEmail(!email);
                setUsername(false);
                setPassword(false);
                formikEmail.resetForm();
              }}
            >
              Change Email
            </Button>
            {email ? (
              <Form onSubmit={formikEmail.handleSubmit}>
                <Form.Group className="mt-3" controlId="formEmail">
                  <Form.Label>New Email address</Form.Label>
                  <Form.Control
                    onChange={formikEmail.handleChange}
                    value={formikEmail.values.email}
                    name="email"
                    type="text"
                    placeholder="Email"
                  />
                  {formikEmail.touched.email && formikEmail.errors.email ? (
                    <Container className="errors">
                      {formikEmail.errors.email}
                    </Container>
                  ) : null}
                </Form.Group>
                <Button
                  className="mt-3 mb-3"
                  variant="primary"
                  onClick={() => {
                    formikEmail.resetForm();
                    setEmail(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="mt-3 mb-3 inline-button"
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            ) : null}
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              variant="primary"
              className="w-100"
              onClick={() => {
                setPassword(!password);
                setUsername(false);
                setEmail(false);
                formikPassword.resetForm();
              }}
            >
              Change Password
            </Button>
            {password ? (
              <Form onSubmit={formikPassword.handleSubmit}>
                <Form.Group className="mt-3" controlId="formPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    onChange={formikPassword.handleChange}
                    value={formikPassword.values.password}
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                  {formikPassword.touched.password &&
                  formikPassword.errors.password ? (
                    <div className="errors">
                      {formikPassword.errors.password}
                    </div>
                  ) : null}
                </Form.Group>
                <Form.Group className="mt-3" controlId="formRetypePassword">
                  <Form.Label>Retype Password</Form.Label>
                  <Form.Control
                    onChange={formikPassword.handleChange}
                    value={formikPassword.values.retypePassword}
                    name="retypePassword"
                    type="password"
                    placeholder="Retype Password"
                  />
                  {formikPassword.touched.retypePassword &&
                  formikPassword.errors.retypePassword ? (
                    <div className="errors">
                      {formikPassword.errors.retypePassword}
                    </div>
                  ) : null}
                </Form.Group>
                <Button
                  className="mt-3 mb-3"
                  variant="primary"
                  onClick={() => {
                    formikPassword.resetForm();
                    setPassword(false);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  className="mt-3 mb-3 inline-button"
                  variant="primary"
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            ) : null}
          </ListGroup.Item>
          {role && role === "admin" ? (
            <ListGroup.Item>
              <Container>Change role</Container>
              <Dropdown>
                <Dropdown.Toggle className="w-100" variant="primary">
                  {Role}
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{
                    width: "100%",
                  }}
                >
                  {roles.map((item, index) => (
                    <Dropdown.Item key={index} onClick={() => HandleRole(item)}>
                      {item}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
            </ListGroup.Item>
          ) : null}
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;