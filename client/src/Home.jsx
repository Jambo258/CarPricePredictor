import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import Dropdown from "react-bootstrap/Dropdown";
import * as Yup from "yup";
import axios from "axios";
import "./Home.css";
import { useAuth } from "./Auth";
import { useState } from "react";
import Cars from "./file1.json";
const Home = () => {
  const { token } = useAuth();
  const [prediction, setPrediction] = useState();
  const [fuelType, setFuelType] = useState("Select fuelType");
  const [gearType, setGearType] = useState("Select gearType");
  const [offerType, setOfferType] = useState("Select offerType");
  const [make, setMake] = useState("Select Manufactorer");
  const [model, setModel] = useState([]);
  const [selectedModel, setSelectedModel] = useState("Select Model");
  const [filterText, setFilterText] = useState("");
  const fuelTypes = [
    "Diesel",
    "Gasoline",
    "Electric",
    "Electric/Gasoline",
    "Electric/Diesel",
    "Hydrogen",
    "Ethanol",
  ];
  const manufactorers = Object.keys(Cars);

  const gearTypes = ["Manual", "Automatic", "Semi-automatic"];
  const offerTypes = ["Used", "New"];

  const filteredResults = filterText
    ? manufactorers.filter((element) => element.startsWith(filterText))
    : manufactorers;

  const handleMake = (item) => {
    setMake(item);
    setModel(Cars[item].model);
    setFilterText("");
    formik.values.make = item;
  };

  const handleModel = (item) => {
    setSelectedModel(item);
    formik.values.model = item;
  };

  const handleFuelType = (item) => {
    setFuelType(item);
    formik.values.fuel = item;
  };
  const handlegearType = (item) => {
    setGearType(item);
    formik.values.gear = item;
  };
  const handleofferType = (item) => {
    setOfferType(item);
    formik.values.offerType = item;
  };

  const validationSchema = Yup.object().shape({
    kilometer: Yup.number()
      .min(0, "Kilometer must be positive")
      .required("Kilometer is required"),
    make: Yup.string().required("Manufactorer is required"),
    model: Yup.string().required("Model is required"),
    fuel: Yup.string().required("fuelType is required"),
    gear: Yup.string().required("Transmission is required"),
    offerType: Yup.string().required("OfferType is required"),
    horsePower: Yup.number()
      .min(1, "Horsepower must be positive")
      .required("Horsepower is required"),
    year: Yup.number()
      .min(1900, "Cars were invented in the 1900's")
      .max(2023, "Cannot set car year it was made in the future")
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
      horsePower: 100,
      year: 2010,
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
        year: values.year,
      };
      console.log(carDetails);
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/user/predict`,
          carDetails,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        // console.log(response.data);
        // console.log(formik.values);
        formik.resetForm();
        // console.log(formik.values)
        // console.log(values);
        setFuelType("Select fuelType");
        setGearType("Select gearType");
        setOfferType("Select offerType");
        setMake("Select Manufactorer");
        setSelectedModel("Select Model");
        setModel([]);
        formik.setFieldValue("make", "");
        formik.setFieldValue("model", "");
        formik.setFieldValue("fuel", "");
        formik.setFieldValue("gear", "");
        formik.setFieldValue("offerType", "");
        setPrediction(response.data.price_prediction);
      } catch (error) {
        console.log(error);
        formik.errors.year = error.response.data.error;
      }
    },
  });
  // console.log(formik.values.model);
  return (
    <>
      {token ? (
        <Container className="predict-form">
          <Image
            alt="Car"
            className="mt-3 rounded car-image"
            src="../images/car.png"
          />
          <Container className="mt-3 predict-title">
            Car Price Predictor
          </Container>
          <Form className="w-100" onSubmit={formik.handleSubmit}>
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
            <Form.Group className="mb-3 mt-3" controlId="formMake">
              <Dropdown>
                <Dropdown.Toggle
                  className="dropdown-component"
                  variant="secondary"
                >
                  {make}
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{
                    maxHeight: "200px",
                    overflowY: "auto",
                    width: "100%",
                  }}
                >
                  <Form.Control
                    type="text"
                    placeholder="Manufactorer"
                    value={filterText}
                    onChange={(e) => {
                      e.target.value =
                        e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1);
                      setFilterText(e.target.value);
                    }}
                  />
                  {filteredResults.map((item, index) => (
                    <Dropdown.Item key={index} onClick={() => handleMake(item)}>
                      {item}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              {formik.touched.make && formik.errors.make ? (
                <div className="errors">{formik.errors.make}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formModel">
              <Dropdown>
                <Dropdown.Toggle
                  className="dropdown-component"
                  variant="secondary"
                >
                  {selectedModel}
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{
                    maxHeight: "200px",
                    overflowY: "auto",
                    width: "100%",
                  }}
                >
                  {model.map((item, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => handleModel(item)}
                    >
                      {item}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              {formik.touched.model && formik.errors.model ? (
                <div className="errors">{formik.errors.model}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formFuel">
              <Dropdown>
                <Dropdown.Toggle
                  className="dropdown-component"
                  variant="secondary"
                >
                  {fuelType}
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{
                    maxHeight: "200px",
                    overflowY: "auto",
                    width: "100%",
                  }}
                >
                  {fuelTypes.map((item, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => handleFuelType(item)}
                    >
                      {item}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              {formik.touched.fuel && formik.errors.fuel ? (
                <div className="errors">{formik.errors.fuel}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGear">
              <Dropdown>
                <Dropdown.Toggle
                  className="dropdown-component"
                  variant="secondary"
                >
                  {gearType}
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{
                    maxHeight: "200px",
                    overflowY: "auto",
                    width: "100%",
                  }}
                >
                  {gearTypes.map((item, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => handlegearType(item)}
                    >
                      {item}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
              {formik.touched.gear && formik.errors.gear ? (
                <div className="errors">{formik.errors.gear}</div>
              ) : null}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formOfferType">
              <Dropdown>
                <Dropdown.Toggle
                  className="dropdown-component"
                  variant="secondary"
                >
                  {offerType}
                </Dropdown.Toggle>
                <Dropdown.Menu
                  style={{
                    maxHeight: "200px",
                    overflowY: "auto",
                    width: "100%",
                  }}
                >
                  {offerTypes.map((item, index) => (
                    <Dropdown.Item
                      key={index}
                      onClick={() => handleofferType(item)}
                    >
                      {item}
                    </Dropdown.Item>
                  ))}
                </Dropdown.Menu>
              </Dropdown>
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
          {prediction ? (
            <Container className="prediction">
              Price prediction: {prediction} €{" "}
            </Container>
          ) : null}
        </Container>
      ) : (
        <Container className="main-container">
          <Container>Welcome to Car price predictor application</Container>
          <Container>You need to Login to use car price predictor</Container>
        </Container>
      )}
    </>
  );
};

export default Home;
