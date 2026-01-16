import express from "express"
import jwt  from "jsonwebtoken"
import { Request, Response } from "express";
import { JWTSECRET } from "@repo/backend-comn/config"
import {SiginSchema ,CreateUserSchema ,CreateRoomSchema} from "@repo/common/zod"
import { prisma } from "@repo/db/prisma";
const app = express();
app.use(express.json());

app.get("/health",(req,res)=>{
  return res.json({
    msg:"Http server health is fine"
  })
})

app.post('/signin',async(req,res)=>{
  const {email ,password} =SiginSchema.parse(req.body);
  if(!email || !password){
    return res.json({
      msg  : "Fill all the required Fields"
    })
  }
 //db call to find
  const user = await prisma.User.findUnique({
    where:{
      email:email,
      password:password
    }
  })
  if(!user){
    res.json("User not found Please sign up");
  }
  const token  = jwt.sign({email : email },JWTSECRET,{ expiresIn : 3600})
  return res.json({
    email,
    token
  })
})

app.post('/signup',async(req,res) =>{
  const { email , password } =CreateUserSchema.parse(req.body);
  if(!email || !password){
    return res.json({
      msg :"Please fill all ther required credentials"
    });
  }

  //find is user already exist
  const findUser = await prisma.User.findUnique({
    where : {
      email:email
    }
  })
  if(findUser){
    return res.json({
      msg:"user already User . PLease sign in"
    });
  }
 //create a user and store in db
  const createUser = prisma.User.create({
     data:{
      email :email,
      password:password
     }
  });

  const token = jwt.sign({ email : email},JWTSECRET,{expiresIn:3600});
  return res.json({
    email,
    token
  })

})

app.post("/createRoom",async(req,res)=>{
  const data = CreateRoomSchema.safeParse(req.body);
  if(!data.success){
    return res.status(404).json({
      msg:"Input has some fault data"
    })
  }
   res.json({
    email :"raja1@gmail.com"
  })
})

app.listen(8000,() => {
  console.log(`Serve runnning on port http://localhost:8000`);
})