import Container from "react-bootstrap/Container";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
import axios from "axios";
import "./LoginPage.css";
// import { AuthContext } from "./Auth";
import { useAuth } from "./Auth";
const LoginPage = () => {
  const navigate = useNavigate();
  const { setUserToken } = useAuth();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email form")
      .required("Email is required"),
    password: Yup.string()
      .min(5, "Password must be at least 5 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const loginUser = {
        email: values.email,
        password: values.password,
      };
      try {
        const response = await axios.post(
          `http://localhost:3001/user/login`,
          loginUser
        );
        console.log(response.data);
        formik.resetForm();
        navigate("/");
        console.log(values);
        setUserToken(response.data.token)
      } catch (error) {
        console.log(error.response.data.error);
        formik.errors.password = error.response.data.error;
        console.log(error);
      }
    },
  });

  return (
    <Container className="login-form col-3">
      <Container className="mt-3 login-title">Login</Container>
      <Form onSubmit={formik.handleSubmit}>
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

        <Button className="mt-3 mb-3" variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
