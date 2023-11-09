import request from "supertest";
import { expect, beforeAll, afterAll } from "@jest/globals";
import server from "../index.js";
import pg from "pg";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();

const pool = new pg.Pool({
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
});

beforeAll(async () => {
  await pool.query("TRUNCATE TABLE users CASCADE");
});

afterAll(() => pool.end());

describe("user route", () => {
  let normalUsertoken = "";
  let normalUserId = "";
  let dummyUserToken = "";
  let dummyUserId = "";
  const userRegistrationEmptyBody = {};
  const userRegistrationFalseValues = {
    username: 12345,
    email: 12345,
    password: 12345,
  };
  const userRegistration = {
    username: "testguy",
    email: "testguy@gmail.com",
    password: "testguy",
  };
  const testUser = {
    username: "testingdummy",
    email: "testingdummy@gmail.com",
    password: "testingdummy",
  };
  const loginUserThatDoesntExist = {
    email: "testdude@gmail.com",
    password: "testdude",
  };
  const loginUserFalsePassword = {
    email: "testguy@gmail.com",
    password: "somepassword",
  };
  it("/user/register with empty request body", async () => {
    const response = await request(server)
      .post("/user/register")
      .set("Accept", "application/json")
      .send(userRegistrationEmptyBody);
    expect(response.statusCode).toBe(400);
  });
  it("/user/register with false values in request body", async () => {
    const response = await request(server)
      .post("/user/register")
      .set("Accept", "application/json")
      .send(userRegistrationFalseValues);
    expect(response.statusCode).toBe(400);
  });
  it("/user/register succeessfull registration", async () => {
    const response = await request(server)
      .post("/user/register")
      .set("Accept", "application/json")
      .send(userRegistration);
    expect(response.statusCode).toBe(200);
  });
  it("/user/register trying to register new user as same email that exists", async () => {
    const response = await request(server)
      .post("/user/register")
      .set("Accept", "application/json")
      .send(userRegistration);
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toEqual("Email exists");
  });
  it("/user/register to create dummy user", async () => {
    const response = await request(server)
      .post("/user/register")
      .set("Accept", "application/json")
      .send(testUser);
    expect(response.statusCode).toBe(200);
    dummyUserToken = response.body.token;
    const decodedToken = jwt.verify(dummyUserToken, process.env.SECRET);
    dummyUserId = decodedToken.id;
  });
  it("/user/login with empty request body", async () => {
    const response = await request(server)
      .post("/user/login")
      .set("Accept", "application/json")
      .send(userRegistrationEmptyBody);
    expect(response.statusCode).toBe(400);
  });

  it("/user/login with false values in request body", async () => {
    const response = await request(server)
      .post("/user/login")
      .set("Accept", "application/json")
      .send(userRegistrationFalseValues);
    expect(response.statusCode).toBe(400);
  });

  it("/user/login trying to log in as user that doesnt exist", async () => {
    const response = await request(server)
      .post("/user/login")
      .set("Accept", "application/json")
      .send(loginUserThatDoesntExist);
    expect(response.statusCode).toBe(404);
  });
  it("/user/login with false password", async () => {
    const response = await request(server)
      .post("/user/login")
      .set("Accept", "application/json")
      .send(loginUserFalsePassword);
    expect(response.statusCode).toBe(401);
  });
  it("/user/login successfull login", async () => {
    const response = await request(server)
      .post("/user/login")
      .set("Accept", "application/json")
      .send(userRegistration);
    expect(response.statusCode).toBe(200);
    normalUsertoken = response.body.token;
    const decodedToken = jwt.verify(normalUsertoken, process.env.SECRET);
    normalUserId = decodedToken.id;
  });
  it("/user/getallusers trying to get allusers data as user", async () => {
    const response = await request(server)
      .get("/user/getallusers")
      .set("Authorization", "Bearer " + normalUsertoken);

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toEqual("Unauthorized not admin");
  });
  it("/user/:id trying to get other user information by different id as own user id", async () => {
    const response = await request(server)
      .get(`/user/${dummyUserId}`)
      .set("Authorization", "Bearer " + normalUsertoken);
    expect(response.statusCode).toBe(401);
    expect(response.body.error).toEqual(
      "Cant view other users details unless admin"
    );
  });
  it("/user/:id get own user details with same id", async () => {
    const response = await request(server)
      .get(`/user/${normalUserId}`)
      .set("Authorization", "Bearer " + normalUsertoken);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toEqual(normalUserId);
  });
  it("/user/:id trying to change other user details while logged in as other user with different id", async () => {
    const response = await request(server)
      .put(`/user/${dummyUserId}`)
      .set("Authorization", "Bearer " + normalUsertoken)
      .set("Accept", "application/json")
      .send(userRegistration);
    expect(response.statusCode).toBe(401);
  });
  it("/user/:id trying to delete other user while logged in as other user with different id", async () => {
    const response = await request(server)
      .delete(`/user/${dummyUserId}`)
      .set("Authorization", "Bearer " + normalUsertoken);
    expect(response.statusCode).toBe(401);
  });

  it("/user/predict with missing values", async () => {
    const carValues = {};
    const response = await request(server)
      .post(`/user/predict`)
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + normalUsertoken)
      .send(carValues);
    expect(response.statusCode).toBe(400);
  });

  it("/user/predict without token", async () => {
    const carValues = {
      kilometer: 32,
      model: "108",
      make: "Peugeot",
      fuel: "Gasoline",
      gear: "Manual",
      offerType: "Used",
      hp: 72.0,
      year: 2021,
    };
    const response = await request(server)
      .post(`/user/predict`)
      .set("Accept", "application/json")
      .send(carValues);
    expect(response.statusCode).toBe(401);
  });
  it("/user/predict succeessfully", async () => {
    const carValues = {
      kilometer: 32,
      model: "108",
      make: "Peugeot",
      fuel: "Gasoline",
      gear: "Manual",
      offerType: "Used",
      hp: 72.0,
      year: 2021,
    };
    const response = await request(server)
      .post(`/user/predict`)
      .set("Accept", "application/json")
      .set("Authorization", "Bearer " + normalUsertoken)
      .send(carValues);
    expect(response.statusCode).toBe(200);
    expect(response.body.price_prediction).toEqual(expect.any(Number));
  });
});
