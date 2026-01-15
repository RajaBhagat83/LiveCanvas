import express from "express"
import { Signin } from "../OnboardUser/Signin";
import { Signup } from "../OnboardUser/Signup";
import { CreateRoom } from "../OnboardUser/CreateRoom"
import VerifyMid from "../OnboardUser/VerifyMid"

const Router = express.Router();

Router.post('/signin',Signin);
Router.post('/signup',Signup);
Router.post('createRoom',VerifyMid,CreateRoom)


export default Router;