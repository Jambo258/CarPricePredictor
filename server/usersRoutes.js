import { Router } from "express";
import middlewares from "./middlewares.js";
import argon2 from "argon2";
import { v4 as uuidv4 } from "uuid";
import "dotenv/config";
import jwt from "jsonwebtoken";
import axios from "axios";
import auth from "./auth.js";

import {
  deleteUser,
  findUser,
  getAllUsers,
  getUser,
  registerUser,
  updateUser,
} from "./db_queries.js";
import registerValidator from "./validators/registerValidator.js";
import loginValidator from "./validators/loginValidator.js";
import updateValidator from "./validators/updateValidator.js";
import predictValidator from "./validators/predictValidator.js";

const usersRouter = Router();

usersRouter.use(middlewares.loggerMiddleware);

usersRouter.post(
  "/register",
  registerValidator(),

  async (req, res) => {
    const { username, email, password } = req.body;
    const id = uuidv4();
    let hashedPassword = await argon2.hash(password);

    const foundUser = await findUser(email);
    if (foundUser) {
      return res.status(404).send({ error: "Email exists" });
    }
    // console.log(hashedPassword);
    // console.log(user);
    await registerUser(id, username, email, hashedPassword, process.env.ROLE);
    // console.log(result.rows[0])
    // console.log(result);
    const payload = { id: id, email: email, role: process.env.ROLE };
    const secret = process.env.SECRET;
    const options = { expiresIn: 60 * 60 };

    const token = jwt.sign(payload, secret, options);
    res.status(200).json({ token });
  }
);

usersRouter.post(
  "/login",
  loginValidator(),

  async (req, res) => {
    const { email, password } = req.body;

    const foundUser = await findUser(email);
    if (!foundUser) {
      return res.status(404).send({ error: "Couldnt find user" });
    }
    // console.log(foundUser);

    let authUser = await argon2.verify(foundUser.password, password);
    if (!authUser) {
      return res.status(401).send({ error: "Unauthorized" });
    }

    const payload = {
      id: foundUser.id,
      email: foundUser.email,
      role: foundUser.role,
    };
    const secret = process.env.SECRET;
    const options = { expiresIn: 60 * 60 };

    const token = jwt.sign(payload, secret, options);
    res.status(200).json({ token });
  }
);

usersRouter.use(auth);

usersRouter.get("/getallusers", async (req, res) => {
  if (req.user.role != process.env.ADMIN_ROLE) {
    return res.status(401).send({ error: "Unauthorized not admin" });
  }
  const result = await getAllUsers();
  res.send(result.rows);
});

usersRouter.get("/:id", async (req, res) => {
  const id = req.params.id;

  const result = await getUser(id);
  if (result.rowCount === 0) {
    return res.status(404).send({ error: "Couldnt find user" });
  }
  const user = result.rows[0];
  if (req.user.id === id || req.user.role === process.env.ADMIN_ROLE) {
    res.send(user);
  } else {
    return res
      .status(401)
      .send({ error: "Cant view other users details unless admin" });
  }
});

usersRouter.put(
  "/:id",
  updateValidator(),

  async (req, res) => {
    const id = req.params.id;
    const { username, email, password, role } = req.body;

    if (!username && !email && !password && !role) {
      return res
        .status(400)
        .send({ error: "username, email, password, role cant be empty" });
    }

    const User = await getUser(id);
    if (User.rowCount === 0) {
      return res.status(404).send({ error: "Couldnt find user" });
    }
    if (req.user.id === id || req.user.role === process.env.ADMIN_ROLE) {
      const user = User.rows[0];
      if (username) {
        user.username = username;
      }
      if (email) {
        const findUserEmail = await findUser(email);
        if (findUserEmail) {
          return res.status(404).send({ error: "Email exists" });
        }
        user.email = email;
      }
      if (password) {
        let hashedPassword = await argon2.hash(password);
        user.password = hashedPassword;
      }
      if (role) {
        if (req.user.role != process.env.ADMIN_ROLE) {
          return res.status(401).send({ error: "Cant change role unless admin" });
        }
        user.role = role;
      }
      await updateUser(user);
      res.send(user);
    } else {
      return res
        .status(401)
        .send({ error: "Cant update other users details unless admin" });
    }
  }
);

usersRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const findUser = await getUser(id);
  if (findUser.rowCount === 0) {
    return res.status(404).send({ error: "Couldnt find user" });
  }
  if (req.user.id === id || req.user.role === process.env.ADMIN_ROLE) {
    await deleteUser(id);
    res.status(200).send({ message: `deleted user ${id}` });
  } else {
    return res
      .status(401)
      .send({ error: "Cant delete other users unless admin" });
  }
});

usersRouter.post(
  "/predict",
  predictValidator(),

  async (req, res) => {
    const { kilometer, make, model, fuel, gear, offerType, hp, year } =
      req.body;

    const predictCar = {
      kilometer: kilometer,
      make: make,
      model: model,
      fuel: fuel,
      gear: gear,
      offerType: offerType,
      hp: hp,
      year: new Date().getFullYear() - year,
    };
    console.log(predictCar)
    try {
      let connection;
      if(process.env.DOCKER){
        connection = "http://flask-api:80/predict";
      } else if(process.env.DEPLOY){
        connection = "https://car-project-flask-api.onrender.com/predict";
      } else {
        connection = "http://localhost:80/predict";
      }
      // const connection = process.env.DOCKER
      //   ? "http://flask-api:80/predict"
      //   : "http://localhost:80/predict";
      const response = await axios.post(
        connection,
        predictCar
      );

      // console.log(response.data);
        if(response.data.error){
          return res
            .status(400)
            .json({ error: response.data.error });
        }
      res.json(response.data);
    } catch (error) {
      console.log(error);
    }
  }
);

export default usersRouter;
