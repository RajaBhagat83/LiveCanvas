import express, { urlencoded } from "express";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { JWTSECRET } from "@repo/backend-comn/config";
import {
  SiginSchema,
  CreateUserSchema,
  CreateRoomSchema,
} from "@repo/common/zod";
import { prisma } from "@repo/db/config";


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
  const result = CreateUserSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(404).json({
      msg: "Please fill all ther required credentials",
    });
  }

  const { email, password } = result.data;
  //find is user already exist

  //create a user and store in db
  const createUser = await prisma.user.create({
    data: {
      id:"1",
      email: email,
      password: password,
      name: "Raja"
    },
  });

  const token = jwt.sign({ email: email }, JWTSECRET, { expiresIn: 3600 });
  return res.json({
    email,
    token,
  });
});


//room endpoint
app.post("/room", async (req, res) => {
  const data = CreateRoomSchema.safeParse(req.body);
  if (!data.success) {
    return res.status(404).json({
      msg: "Input has some fault data",
    });
  }
  res.json({
    email: "raja1@gmail.com",
  });
});

app.listen(8001, () => {
  console.log(`Serve runnning on port http://localhost:8001`);
});
