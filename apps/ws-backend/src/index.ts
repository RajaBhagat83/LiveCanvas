import express from "express";
import { WebSocketServer } from "ws";
import jwt, { decode, JwtPayload } from "jsonwebtoken";
import { JWTSECRET } from "@repo/backend-comn/config"

const app = express();

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws, request) => {
  const url = request.url; //ws://localhost:3000?token="123"
  if (!url) {
    return;
  }
  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") ?? "";
  const decoded = jwt.verify(token, JWTSECRET);

  if(typeof decoded == "string"){
    ws.close();
    return;
  }

  if (!decoded || !(decoded).user) {
    ws.close();
    return;
  }
  ws.on("message", (data) => {
    ws.send("Message received");
  });
});

console.log("WebSocket server is running on ws://localhost:8080");
