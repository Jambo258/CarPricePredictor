import Container from "react-bootstrap/Container";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegisterPage.css";
import { useAuth } from "./Auth";
const RegisterPage = () => {
  const navigate = useNavigate();
  const { setUserToken } = useAuth();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email form")
      .required("Email is required"),
    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .required("Password is required"),
    retypePassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Retype Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      retypePassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const newUser = {
        username: values.username,
        email: values.email,
        password: values.password,
      };
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/user/register`,
          newUser
        );
        // console.log(response.data);
        formik.resetForm();
        setUserToken(response.data.token);
        navigate("/");
        // console.log(values);
      } catch (error) {
        console.log(error);
        formik.errors.retypePassword = error.response.data.error;
      }
    },
  });

  return (
    <Container className="form col-3">
      <Container className="mt-3 title">Registration Form</Container>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group className="mt-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.username}
            name="username"
            type="text"
            placeholder="Username"
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="errors">{formik.errors.username}</div>
          ) : null}
        </Form.Group>
        <Form.Group className="mt-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.email}
            name="email"
            type="text"
            placeholder="Email"
          />
          {formik.touched.email && formik.errors.email ? (
            <Container className="errors">{formik.errors.email}</Container>
          ) : null}
        </Form.Group>
        <Form.Group className="mt-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.password}
            name="password"
            type="password"
            placeholder="Password"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="errors">{formik.errors.password}</div>
          ) : null}
        </Form.Group>
        <Form.Group className="mt-3" controlId="formRetypePassword">
          <Form.Label>Retype Password</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.retypePassword}
            name="retypePassword"
            type="password"
            placeholder="Retype Password"
          />
          {formik.touched.retypePassword && formik.errors.retypePassword ? (
            <div className="errors">{formik.errors.retypePassword}</div>
          ) : null}
        </Form.Group>

        <Button className="mt-3 mb-3" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterPage;
