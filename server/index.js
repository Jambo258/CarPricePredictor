import express from "express";
import cors from "cors";
import middlewares from "./middlewares.js";
import usersRouter from "./usersRoutes.js";
import { createUsersTable } from "./db.js";

const server = express();
server.use(cors());
const PORT = process.env.PORT;
server.use(express.static("public"));
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

createUsersTable();

server.use("/user", usersRouter);

server.use(middlewares.unknownRoute);
if (process.env.NODE_ENV !== "test") {
  server.listen(PORT, () => console.log("Listening to port", PORT));
}
export default server;
