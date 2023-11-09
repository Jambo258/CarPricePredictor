import request  from "supertest";
import { expect } from "@jest/globals";
import server from "../index.js";

describe("Server", () => {
  it("Returns 404 on unknown route", async () => {
    const response = await request(server).get("/invalidaddress");
    expect(response.statusCode).toBe(404);
  });
  it("Returns 200 on valid address", async () => {
    const response = await request(server).get("/");
    expect(response.statusCode).toBe(200);
  });
});
