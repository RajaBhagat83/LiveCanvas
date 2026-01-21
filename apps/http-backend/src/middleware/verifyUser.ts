import jwt, { decode } from "jsonwebtoken";
import { Request, Response ,NextFunction} from "express";
import { JWTSECRET } from "@repo/backend-comn/config"

const UserMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token  = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(404).json("Token expired or failed");
  }
  try {
    const decoded = jwt.verify(token, JWTSECRET);
    if (!decoded) {
      return res.json({
        msg: "Invalid Token",
      });
    }
    if(typeof decoded == "string"){
      return;
    }
    decoded.email ? console.log("email",decoded.email):decoded;
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(404).json("Error on token send");
  }
};
export default UserMiddleware;
