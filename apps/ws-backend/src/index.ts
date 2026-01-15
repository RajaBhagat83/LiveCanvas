import express from "express"
import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken"
const app = express();
import JWTSECRET from "../../http-backend/src/config"

const wss = new WebSocketServer({port:8080});

 wss.on('connection',(ws,request) =>{
  const url = request.url;//ws://localhost:3000?token="123"
    if(!url){
      return ;
    }
    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token  =queryParams.get('token') ?? "";
   const decoded = jwt.verify(token,JWTSECRET);
   if(!decoded || !(decoded as JwtPayload).user){
    ws.close();
    return;
   }
  ws.on('message',(data)=>{
  
  })
}) 



console.log('WebSocket server is running on ws://localhost:8080');