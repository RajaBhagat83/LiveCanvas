import express from "express"
import jwt  from "jsonwebtoken"
import { Request, Response } from "express";
import JWTSECRET from "../src/config"

export const Signin = (req:Request,res:Response) => {
  const {email ,password} =req.body;
  if(!email || !password){
    return res.json({
      msg  : "Fill all the required Fields"
    })
  }
 //db call to find
  const user = User.find({
    email : email,
    password:password
  })
  if(!user){
    res.json("User not found Please sign up");
  }
  const token  = jwt.sign({email : email },JWTSECRET,{ expiresIn : 3600})
  return res.json({
    email,
    token
  })
}