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
  const {  email, password } = result.data;
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
  const token = jwt.sign({ id:user?.id,email: email }, JWTSECRET, {
    expiresIn: 3600,
  });
  return res.json({
    id:user?.id,
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

  const { email, password, name } = result.data;
  //find is user already exist
  const findUser = await prisma.user.findFirst({
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
   const user =  await prisma.user.create({
    data: {
      email: email,
      password: password,
      name: name,
    },
  });

  const token = jwt.sign({ id:user.id,email: email, name: name }, JWTSECRET, {
    expiresIn: 3600,
  });
  return res.json({
    id:user.id,
    name,
    email,
    token,
  });
});

//room endpoint
app.post("/room", UserMiddleware, async (req, res) => {
  const result = CreateRoomSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(404).json({
      msg: "Input has some fault data",
    });
  }
  const { name } = result.data;
  const findRoom = await prisma.room.findUnique({
    where: {
      slug: name,
    },
  });
  if (findRoom) {
    return findRoom;
  }
  //@ts-ignore
const userId=req.user.id;
  const createRoom = await prisma.room.create({
    data: {
      slug: name,
      adminId:userId
    },
  });
  return res.json({
   roomId: createRoom.id,
  message: "Room Created Successfully",
  });
});

app.get("/chats/:roomId", async (req, res) => {
  const roomId = Number(req.params.roomId);
  console.log(roomId)
  if (!roomId) {
    return res.status(404).json({
      msg: "Room id not found",
    });
  }
  const findChats = await prisma.chat.findMany({
    where: {
      roomId: roomId
    },
    orderBy:{
      id:"desc"
    },
    take:50
  });


  return res.json({
     messages: findChats
  });
});

app.get("/room/:slug",async (req,res) => {
  const slug = req.params.slug;
  const room = await prisma.room.findFirst({
    where:{
       slug:slug
    }
  })
  return res.status(404).json({
    room
  })
})

const server = app.listen(8001, () => {
  console.log(`Serve runnning on port http://localhost:8001`);
  // Keep the process alive
  setInterval(() => {}, 1000 * 60 * 60);
});

server.on("close", () => {
  console.log("Server closed");
});
