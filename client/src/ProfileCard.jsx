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

const ProfileCard = () => {
  const [username, setUsername] = useState(false);
  const [email, setEmail] = useState(false);
  const [password, setPassword] = useState(false);

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
    onSubmit: (values) => {
      formikUsername.resetForm();
      setUsername(false);
      console.log(values);
    },
  });
  const formikEmail = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationSchemaEmail,
    onSubmit: (values) => {
      formikEmail.resetForm();
      setEmail(false);
      console.log(values);
    },
  });
  const formikPassword = useFormik({
    initialValues: {
      password: "",
      retypePassword: "",
    },
    validationSchema: validationSchemaPassword,
    onSubmit: (values) => {
      formikPassword.resetForm();
      setPassword(false);
      console.log(values);
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
        marginBottom: "179px",
      }}
    >
      <Card.Body>
        <Card.Title style={{ marginBottom: "15%" }}>
          Profile Card
          <ModalComponent />
        </Card.Title>
        <Card.Text>Username: aaaaaaaaaa </Card.Text>
        <Card.Text>Email: aaaaaaaaaaa</Card.Text>
        <Card.Text>Password: aaaaaaaaaaa</Card.Text>
        <ListGroup className="list-group list-group-profile">
          <ListGroup.Item>
            <Button
              variant="primary"
              onClick={() => {
                setUsername(!username);
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
              onClick={() => {
                setEmail(!email);
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
              onClick={() => {
                setPassword(!password);
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
        </ListGroup>
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;
