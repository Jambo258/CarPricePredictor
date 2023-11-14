import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import "./Home.css";
import { useAuth } from "./Auth";
const Home = () => {
  const { token} = useAuth();

  const validationSchema = Yup.object().shape({
    kilometer: Yup.number().min(0,"Kilometer must be positive").required("Kilometer is required"),
    make: Yup.string()
      .required("Manufactorer is required"),
    model: Yup.string()
      .required("Model is required"),
    fuel: Yup.string()
      .required("fuelType is required"),
    gear: Yup.string()
      .required("Transmission is required"),
    offerType: Yup.string()
      .required("OfferType is required"),
    horsePower: Yup.number()
      .min(0, "Horsepower must be positive")
      .required("Horsepower is required"),
    year: Yup.number()
      .min(1900, "Cars were invented in the 1900's")
      .max(2023,"Cannot set car year it was made in the future")
      .required("Year is required"),
  });

  const formik = useFormik({
    initialValues: {
      kilometer: 0,
      make: "",
      model: "",
      fuel: "",
      gear: "",
      offerType: "",
      horsePower: 0,
      year: 1900
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const carDetails = {
        kilometer: values.kilometer,
        make: values.make,
        model: values.model,
        fuel: values.fuel,
        gear: values.gear,
        offerType: values.offerType,
        hp: values.horsePower,
        year: values.year
      };
      try {
        const response = await axios.post(
          `http://localhost:3001/user/predict`,
          carDetails
        );
        console.log(response.data);
        formik.resetForm();
        console.log(values);
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <>
      {token ? (
        <Container className="predict-form col-3">
          <Image
            className="mt-3 rounded"
            height="125px"
            src="../images/car.png"
          />
          <Container className="mt-3 predict-title">
            Car Price Predictor
          </Container>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group className="" controlId="formKilometer">
              <Form.Label>Enter Kilometer value</Form.Label>
              <Form.Control
                name="kilometer"
                onChange={formik.handleChange}
                value={formik.values.kilometer}
                type="number"
                placeholder="Kilometer"
              />
              {formik.touched.kilometer && formik.errors.kilometer ? (
                <div className="errors">{formik.errors.kilometer}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="" controlId="formMake">
              <Form.Label>Enter manufactorer</Form.Label>
              <Form.Control
                name="make"
                onChange={formik.handleChange}
                value={formik.values.make}
                type="text"
                placeholder="Manufactorer"
              />
              {formik.touched.make && formik.errors.make ? (
                <div className="errors">{formik.errors.make}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="" controlId="formModel">
              <Form.Label>Enter Car model</Form.Label>
              <Form.Control
                name="model"
                onChange={formik.handleChange}
                value={formik.values.model}
                type="text"
                placeholder="Model"
              />
              {formik.touched.model && formik.errors.model ? (
                <div className="errors">{formik.errors.model}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="" controlId="formFuel">
              <Form.Label>Enter fueltype</Form.Label>
              <Form.Control
                name="fuel"
                onChange={formik.handleChange}
                value={formik.values.fuel}
                type="text"
                placeholder="Fueltype"
              />
              {formik.touched.fuel && formik.errors.fuel ? (
                <div className="errors">{formik.errors.fuel}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="" controlId="formGear">
              <Form.Label>Enter transmission type</Form.Label>
              <Form.Control
                name="gear"
                onChange={formik.handleChange}
                value={formik.values.gear}
                type="text"
                placeholder="Transmission"
              />
              {formik.touched.gear && formik.errors.gear ? (
                <div className="errors">{formik.errors.gear}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="" controlId="formOfferType">
              <Form.Label>Enter offerType</Form.Label>
              <Form.Control
                name="offerType"
                onChange={formik.handleChange}
                value={formik.values.offerType}
                type="text"
                placeholder="offerType"
              />
              {formik.touched.offerType && formik.errors.offerType ? (
                <div className="errors">{formik.errors.offerType}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="" controlId="formHp">
              <Form.Label>Enter horsepower value</Form.Label>
              <Form.Control
                name="horsePower"
                onChange={formik.handleChange}
                value={formik.values.horsePower}
                type="number"
                placeholder="Horsepower"
              />
              {formik.touched.horsePower && formik.errors.horsePower ? (
                <div className="errors">{formik.errors.horsePower}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="" controlId="formYear">
              <Form.Label>Enter year car is made</Form.Label>
              <Form.Control
                name="year"
                onChange={formik.handleChange}
                value={formik.values.year}
                type="number"
                placeholder="Year"
              />
              {formik.touched.year && formik.errors.year ? (
                <div className="errors">{formik.errors.year}</div>
              ) : null}
            </Form.Group>
            <Button className="mt-3 mb-3" variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      ) : (<Container>You need to Log in to use car price predictor</Container>)}
    </>
  );
};

export default Home;