import express from "express"
import { WebSocketServer } from "ws";
import {createServer} from "http"
const app = express();

const server = createServer(app);
const wss = new WebSocketServer({server:server});

wss.on('connection',(ws) =>{
  console.log("A User has connected ");
  ws.send("Something is send from the web socket server backend");
})

server.listen(8001,()=>{
    console.log(`Server listening on port http://localhost:8001`);
})
  
