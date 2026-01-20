import express from "express";
import jwt from "jsonwebtoken";
import { JWTSECRET } from "@repo/backend-comn/config";
import {
  SiginSchema,
  CreateUserSchema,
  CreateRoomSchema,
} from "@repo/common/zod";
import prisma from "@repo/db/config";
import UserMiddleware from "./middleware/verifyUser";

const app = express();
app.use(express.json());

//health checkpoint
app.get("/health", (req, res) => {
  return res.json({
    msg: "Http server health is fine",
  });
});

//signin endpoint
app.post("/signin", async (req, res) => {
  const result = SiginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(404).json({
      msg: "Fill all the required Fields",
    });
  }
  const { email, password } = result.data;
  //db call to find
  const user = await prisma.user.findUnique({
    where: {
      email: email,
      password: password,
    },
  });
  if (!user) {
    res.json("User not found Please sign up");
  }
  const token = jwt.sign({ email: email }, JWTSECRET, { expiresIn: 3600 });
  return res.json({
    email,
    token,
  });
});

//signup endpoint
app.post("/signup", async (req, res) => {
  console.log("Signup body:", req.body);
  const result = CreateUserSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(404).json({
      msg: "Please fill all ther required credentials",
      errors: result.error,
    });
  }

  const { id, email, password, name } = result.data;
  console.log("Attempting to create user with ID:", id, "Email:", email);
  //find is user already exist
  const findUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (findUser) {
    return res.status(404).json({
      msg: "user already exist with this email",
    });
  }
  //create a user and store in db
  const createUser = await prisma.user.create({
    data: {
      id: id,
      email: email,
      password: password,
      name: name,
    },
  });

  const token = jwt.sign({ email: email, name: name }, JWTSECRET, {
    expiresIn: 3600,
  });
  return res.json({
    name,
    email,
    token,
  });
});

//room endpoint
app.post("/room", UserMiddleware ,async (req, res) => {
  const data = CreateRoomSchema.safeParse(req.body);
  if (!data.success) {
    return res.status(404).json({
      msg: "Input has some fault data",
    });
  }
  const { name ,email } =req.user;
  res.json({
   name,
   email
  });
});

const server = app.listen(8001, () => {
  console.log(`Serve runnning on port http://localhost:8001`);
  // Keep the process alive
  setInterval(() => {}, 1000 * 60 * 60);
});

server.on("close", () => {
  console.log("Server closed");
});

process.on("SIGINT", () => {
  server.close(() => {
    console.log("Process terminated");
  });
});
