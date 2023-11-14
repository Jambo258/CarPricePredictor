import request from "supertest";
import { expect } from "@jest/globals";
import server from "../index.js";

describe("admin route", () => {
  let adminToken = "";
  const loginAdmin = {
    email: "admin@admin.com",
    password: "admin",
  };
  const user = {
    id: "",
    username: "",
    email: "",
    password: "",
  };
  it("/user/login successfull login as admin", async () => {
    const response = await request(server)
      .post("/user/login")
      .set("Accept", "application/json")
      .send(loginAdmin);
    expect(response.statusCode).toBe(200);
    adminToken = response.body.token;
  });
  it("/user/getallusers returns all users", async () => {
    const response = await request(server)
      .get("/user/getallusers")
      .set("Authorization", "Bearer " + adminToken);

    expect(response.statusCode).toBe(200);
    expect(response.body[1]).toHaveProperty(
      "id",
      "username",
      "email",
      "password"
    );
    user.id = response.body[1].id;
    user.username = response.body[1].username;
    user.email = response.body[1].email;
    user.password = response.body[1].password;
  });
  it("/user/:id get user details by id as admin", async () => {
    const response = await request(server)
      .get(`/user/${user.id}`)
      .set("Authorization", "Bearer " + adminToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.id).toEqual(user.id);
  });
  it("/user/:id change user details as admin", async () => {
    const changedUserData = {
      email: "newemail@gmail.com",
    };
    const response = await request(server)
      .put(`/user/${user.id}`)
      .set("Authorization", "Bearer " + adminToken)
      .set("Accept", "application/json")
      .send(changedUserData);
    expect(response.statusCode).toBe(200);
    expect(response.body.email).toEqual(changedUserData.email);
  });
  it("/user/:id trying to change user email to one that already exists as admin", async () => {
    const changedUserData = {
      email: "newemail@gmail.com",
    };
    const response = await request(server)
      .put(`/user/${user.id}`)
      .set("Authorization", "Bearer " + adminToken)
      .set("Accept", "application/json")
      .send(changedUserData);
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toEqual("Email exists");
  });
  it("/user/:id deleting user as admin", async () => {
    const response = await request(server)
      .delete(`/user/${user.id}`)
      .set("Authorization", "Bearer " + adminToken);
    expect(response.statusCode).toBe(200);
    expect(response.body.message).toEqual(`deleted user ${user.id}`);
  });
});
