import express from "express"
import { Request, Response } from "express";
import  jwt  from "jsonwebtoken";
import JWTSECRET from "../src/config"

export const Signup =async (req: Request ,res: Response) => {
  const { email , password } =req.body;
  if(!email || !password){
    return res.json({
      msg :"Please fill all ther required credentials"
    });
  }

  //find is user already exist
  const findUser = await User.findOne({
    email:email
  })
  if(findUser){
    return res.json({
      msg:"user already User . PLease sign in"
    });
  }
 //create a user and store in db
  const createUser = User.create({
     email:email,
     password:password
  });

  const token = jwt.sign({ email : email},JWTSECRET,{expiresIn:3600});
  return res.json({
    email,
    token
  })

}